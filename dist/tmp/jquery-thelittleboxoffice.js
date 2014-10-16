(function ( $ ) {
	$.fn.thelittleboxoffice = {};
	$.extend($.fn.thelittleboxoffice, {

		default_options : {
			'query' : '',
			'template' : 'default',
			'target' : null,
			'theme' : 'billboard'
 		},

		build : function(options) {
			
			// extend the defaults with user options
			options = $.extend(this.default_options, options);
			
			// execute the query
			var dataset = $.fn.thelittleboxoffice.query(options.query, true);

			// build the theme and render
			var theme_function = $.fn.thelittleboxoffice.getThemeFunctionName(options.theme);
			$(options.target).html($.fn.thelittleboxoffice[theme_function](dataset));
		},
		
		listCategories : function(options) {
			$(options.target).html(
				$.fn.thelittleboxoffice.template({'categories' : lbo_categories}, "misc/category_list")
			);
		},

		getThemeFunctionName : function(theme_name) {
			return "theme" + this.capitaliseFirstLetter(theme_name) + "Encode";
		},

		capitaliseFirstLetter : function(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		},

		dateToInt : function(str_date) {
			return parseInt(str_date.replace(/-/gi, "").replace(/:/gi, ""));
		},

		strToDate : function(str_date) {
			var parts = str_date.split(" ");
			var date_parts = parts[0].split("-");
			var time_parts = parts[1].split(":");
			return new Date(
				parseInt(date_parts[0]),
				parseInt(date_parts[1]),
				parseInt(date_parts[2]),
				parseInt(time_parts[0]),
				parseInt(time_parts[1]),
				parseInt(time_parts[2])
			);
		},

		getWeekDays : function() {
			return [
				"Sun",
				"Mon",
				"Tue",
				"Wed",
				"Thu",
				"Fri",
				"Sat"
			];
		},

		getMonths : function() {
			return [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			];
		}
		
	});
}( jQuery ));
var lbo_previous = [];

(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		query : function(query, savePrevious) {
			
			// clone the dataset and convert the commands to objects
			var dataset = this.cloneDataSet();
			var commands = this.decodeCommands(query);
			
			// apply all the command in the query
			for (var i = 0; i < commands.length; i++) {
				dataset = this.processCommand(commands[i], dataset);
			}

			// add to the previous array
			if (savePrevious === true)
				this.addToPrevious(dataset);
			
			// return the rows highlighted for filtering
			return dataset;
		},

		cloneDataSet : function() {
			output = [];
			for (var i = 0; i < lbo_events.length; i++) 
				output.push(lbo_events[i]);
			return output;
		},

		addToPrevious : function(filtered) {
			for (var i = 0; i < filtered.length; i++)
				lbo_previous.push(filtered[i]);
		},

		hasFilter : function(commands) {

			var out = false;

			for (var i = 0; i < commands.length; i++) {
				if ($.inArray(commands[i].name, ["category_id", "event_id"])) 
					out = true;
			}

			return out;
		},

		decodeCommands : function(query_string) {

			var commands = [];
			var query_array = [];
			var alpha = null; 
			var match = null;

			if (query_string.length > 0) {
				query_array = query_string.split(';');
				for (var i = 0; i < query_array.length; i++) {
					match = query_array[i].match(/([^A-Z_])/i);
					if (match != null) {
						alpha = match.index;	
						commands.push({
							'name' : query_array[i].substring(0, alpha),
							'operand' : query_array[i].substring(alpha, alpha + 1),
							'params' : query_array[i].substring(alpha + 1, query_array[i].length).split(',') 
						});
					} 
				}
				commands.sort(function(a, b) {
					var out = 9999;
					switch (a.name) {
						case 'original':
							out = 0;
						case 'category_id':
							out = 1;
							break;
						case 'event_id':
							out = 2
							break;
						case 'search':
							out = 3;
							break;
						case 'sort':
							out = 98;
							break;
						case 'limit':
							out = 99;
							break;
					}
					return out;
				});
			}
			if (this.hasFilter(commands) == false) {
				commands.push({
					'name' : 'all',
					'operand' : '',
					'params' : '' 
				});
			}
			
			return commands;
		},

		translateFieldName : function(field) {
			switch (field) {
				case "event_id":
					return "id";
				default:
					return field;
			}
		},

		processCommand : function(command, output) {
			switch (command.name) {
				case 'all':
					return this.processCommandAll(output);
				case 'original':
					return this.processCommandOriginal(output);
				case 'category_id':
					return this.processCommandCategoryId(command.operand, command.params, output);
				case 'event_id':
					return this.processCommandEventId(command.operand, command.params, output);
				case 'sort':
					return this.processCommandSort(command.operand, command.params, output);
				case 'limit':
					return this.processCommandLimit(command.operand, command.params, output);
			}
		},

		processCommandLimit: function(operand, params, dataset) {
			var limit = parseInt(params.pop());
			var filtered = [];

			for (var i = 0; i < dataset.length; i++) {
				if (i < limit) 
					filtered.push(dataset[i]);
			}
			
			return filtered;
		},

		processCommandAll : function(dataset) {
			return dataset;
		},

		processCommandEventId : function(operand, params, dataset) {
			this.applyFilter(this.translateFieldName("event_id"), operand, this.decodeParams(operand, params), dataset);
		},

		processCommandOriginal : function(dataset) {
			if (lbo_previous.length > 0) {
				return this.applyOriginalFilter(dataset);
			} else {
				return dataset;
			}
		},

		processCommandCategoryId : function(operand, params, dataset) {	
			return this.applyCategoryIdFilter(operand, this.decodeParams(operand, params), dataset);
		},

		processCommandSort : function(operand, params, output) {},

		applyFilter : function(field, operand, params, dataset) {

			var present = false;

			for (var i = 0; i < dataset.length; i++) {				
				
				present = false;
				dataset[i]["filter_" + field] = false;

				for (var p = 0; p < params.length; p++) {	
					if (String(dataset[i][field]) == String(params[p].value)) 
						present = true;
				}

				if (present) 
					dataset[i]["filter_" + field] = true;
			}
		},

		applyCategoryIdFilter : function(operand, param, output) {

			var filtered = [];
			var found = false;
			for (var i = 0; i < output.length; i++) {
				for (var c = 0; c < output[i].categories.length; c++) {
					found = false;
					for (var p = 0; p < param.length; p++) {
						if (output[i].categories[c] == param[p].value) {
							found = true;
						}
					}
					if (found)
						filtered.push(output[i]);
				}
			}
			
			return filtered;
		},

		applyOriginalFilter : function(dataset) {

			var filtered = [];
			var found = false;
			
			for (var i = 0; i < dataset.length; i++) {
				found = false;
				for (var p = 0; p < lbo_previous.length; p++) {
					if (dataset[i].id == lbo_previous[p].id) 
						found = true;
				}
				if (found == false)
					filtered.push(dataset[i]);
			}
			
			return filtered;
		},
		
		decodeParams : function(operand, params) {

			var output = [];
			var option = null;

			for (var i = 0; i < params.length; i++) {
				output.push({
					'value' : params[i].replace(/\"/g, '').replace('!', ''),
				});
			}

			return output;
		},

		convertDataSetToPerformance : function(dataset) {

			var performances = [];
			
			for (var e = 0; e < dataset.length; e++) {
				for (var p = 0; p < dataset[e].performances.length; p++) {
					var performance = {};
					
					performance.title = dataset[e].title;
					performance.image_large = dataset[e].image_large;
					performance.teaser = dataset[e].teaser;
					performance.start_date = dataset[e].performances[p].start_date;
					performance.start_time = dataset[e].performances[p].start_time;
					performance.link_book = dataset[e].link_book;

					performances.push(performance);
				}
			}
			
			return performances;
		}
		
	});
}( jQuery ));

(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		template : function(dataset, template_name) {
			return this.bakeTemplate(
				this.getTemplate(template_name), 
				dataset
			);
		},

		getTemplate : function(template_name) {
			return templates["src/templates/" + template_name + ".html"];
		},

		bakeTemplate : function(template, dataset) {
			return template(dataset);
		}
		
	});
}( jQuery ));
(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		themeBillboardEncode : function(dataset) {
			
			var html = '';
			for (var i = 0; i < dataset.length; i++) {
				html = html + $.fn.thelittleboxoffice.template(dataset[i], "billboard/billboard_item");
			}
			return html;
		},

		themeBillboardSmallEncode : function(dataset) {
			
			var html = '';
			for (var i = 0; i < dataset.length; i++) {
				html = html + $.fn.thelittleboxoffice.template(dataset[i], "billboard/billboard_small_item");
			}
			return html;
		}		

	});
}( jQuery ));
(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		themeListEncode : function(dataset) {
			
			var html = '';
			for (var i = 0; i < dataset.length; i++) {
				html = html + $.fn.thelittleboxoffice.template(dataset[i], "list/list_item");
			}
			return html;
		}		

	});
}( jQuery ));
(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		month_view_default_options : {
			'query' : 'test',
			'target' : null
 		},

		monthView : function(options) {
			
			var html = '';

			// extend the defaults with user options
			options = $.extend(this.month_view_default_options, options);

			// store the options in the data
			$(options['target']).data("month_view_query_string", options.query);

			// encode the month view
			html = html + $.fn.thelittleboxoffice.template({
				"month_select" : $.fn.thelittleboxoffice.monthSelectEncode(),
			}, "month_view/month_view_base");

			// render out the html to the target
			$(options['target']).html(html);
			
			// hookup events
			this.monthViewHookUpEvents(options['target'].parent().find("select"));

			// fire the event
			$.fn.thelittleboxoffice.monthView_Change(null, $(options["target"]));
		},

		monthViewHookUpEvents : function(target) {
			$(target).change(this.monthView_Change);
		},

		monthView_Change : function(event, target) {

			var html = '';
			var month_view_div = target;
			var month_view_select = $(target).find("select");

			if (event != null) {
				month_view_div = $(event.currentTarget).parent().parent();
				month_view_select = $(month_view_div).find("select");
			}
			var dataset = $.fn.thelittleboxoffice.getMonthViewData(
				$(month_view_div).data("month_view_query_string"),
				$(month_view_select).val().split("_")[1],
				$(month_view_select).val().split("_")[0]
			);
			for (var p = 0; p < dataset.length; p++) {
				html = html + $.fn.thelittleboxoffice.template(dataset[p], "month_view/month_view_performance");
			}
			$(month_view_div).find(".lbo-performances").html(html);
		},

		monthSelectEncode : function() {				
			return $.fn.thelittleboxoffice.template({
				"active_months" : $.fn.thelittleboxoffice.getActiveMonths(),
			}, "month_view/month_view_select");
		}

	});
}( jQuery ));
(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		getActiveMonths : function() {

			var months = $.fn.thelittleboxoffice.getMonths();
			var dataset = $.fn.thelittleboxoffice.cloneDataSet();
			var unsorted = [];
			var out = [];
			var month, year, combined;

			for (var e = 0; e < dataset.length; e++) {
				for (var p = 0; p < dataset[e].performances.length; p++) {

					month = dataset[e].performances[p].start_date.split("-")[1];
					year = dataset[e].performances[p].start_date.split("-")[0];
					combined = String(year).concat(String(month));
					
					if (unsorted[combined] == undefined) {
						unsorted[combined] = {
							"month" : month,
							"year" : year
						};
					}
				}
			}
			
			var keys = Object.keys(unsorted).sort();

			for (e = 0; e < keys.length; e++) {
				unsorted[keys[e]]["text_month"] = months[parseInt(unsorted[keys[e]]["month"]) - 1];
				unsorted[keys[e]]["key"] = keys[e];
				out.push(unsorted[keys[e]]);
			}
			
			return out;
		},

		getMonthViewData : function(query, year, month) {

			var dataset = $.fn.thelittleboxoffice.convertDataSetToPerformance(
				$.fn.thelittleboxoffice.query(query, false)
			);

			dataset = $.fn.thelittleboxoffice.filterByYearAndMonth(dataset, year, month);
			dataset = $.fn.thelittleboxoffice.sortByStartDate(dataset);
			dataset = $.fn.thelittleboxoffice.addFormattedStartDate(dataset);
			
			return dataset;
		},
		
		filterByYearAndMonth : function(dataset, year, month) {

			var filtered = [];
			
			for (var p = 0; p < dataset.length; p++) {
				if (parseInt(dataset[p].start_date.split("-")[1]) == parseInt(month) &&
						parseInt(dataset[p].start_date.split("-")[0]) == parseInt(year)) {

					filtered.push(dataset[p]);
				}
			}
			
			return filtered;
		},

		addFormattedStartDate : function(dataset) {

			var weekdays = $.fn.thelittleboxoffice.getWeekDays();

			for (var p = 0; p < dataset.length; p++) {
				
				var start_date = $.fn.thelittleboxoffice.strToDate(dataset[p].start_date + ' ' + dataset[p].start_time);
				var weekdays = $.fn.thelittleboxoffice.getWeekDays();

				dataset[p].start_date_day = weekdays[start_date.getDay()];
				dataset[p].start_date_month_day = start_date.getDate();
				dataset[p].start_date_short = start_date.getMinutes() + ":" + start_date.getHours();
			}

			return dataset;
		},

		sortByStartDate : function(dataset) {

			return dataset.sort(function(a, b) {
				
				var adate = $.fn.thelittleboxoffice.dateToInt(a.start_date + a.start_time);
				var bdate = $.fn.thelittleboxoffice.dateToInt(b.start_date + b.start_time);
				
				if (adate < bdate)
					return -1;
				if (adate > bdate)
					return 1;

				return 0;
			});
		}
	});
}( jQuery ));
this["templates"] = this["templates"] || {};

this["templates"]["src/templates/billboard/billboard_item.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\n	<div class=\"lbo-billboard-item\">\n		<div class=\"lbo-crop\">\n			<img src=\"";
  if (helper = helpers.image_large) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.image_large); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"/>\n		</div>\n		<h1 class=\"lbo-title\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h1>\n		<p class=\"lbo-teaser\">";
  if (helper = helpers.teaser) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.teaser); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n		<a href=\"";
  if (helper = helpers.link_view) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.link_view); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"btn btn-primary btn-lg\" role=\"button\">Learn more »</a>\n	</div>\n";
  return buffer;
  });

this["templates"]["src/templates/list/list_item.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\n	<div class=\"lbo-list-item\">\n		<div class=\"lbo-crop\">\n			<img src=\"";
  if (helper = helpers.image_small) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.image_small); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"/>\n		</div>\n		<a href=\"";
  if (helper = helpers.link_view) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.link_view); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"lbo-title\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a>\n	</div>\n";
  return buffer;
  });

this["templates"]["src/templates/misc/category_list.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " &#58; "
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n";
  return buffer;
  }

  buffer += "<ul>\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.categories), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>";
  return buffer;
  });

this["templates"]["src/templates/month_view/month_view_base.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function";


  buffer += "<div class=\"lbo-month-view\">\n	\n	";
  if (helper = helpers.month_select) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.month_select); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	<ul class=\"lbo-performances\">\n		\n	</ul>\n</div>\n";
  return buffer;
  });

this["templates"]["src/templates/month_view/month_view_performance.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li>	\n	<div class=\"lbo-image\">\n		<img src=\"";
  if (helper = helpers.image_large) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.image_large); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n	</div>\n	<span class=\"lbo-time\">\n		<span class=\"lbo-start-month-day\">";
  if (helper = helpers.start_date_month_day) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.start_date_month_day); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n		<span class=\"lbo-start-day\">";
  if (helper = helpers.start_date_day) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.start_date_day); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n	</span>\n	<div class=\"lbo-title\">\n		<a href=\"";
  if (helper = helpers.link_book) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.link_book); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a>\n	</div>\n</li>";
  return buffer;
  });

this["templates"]["src/templates/month_view/month_view_select.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<option value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.month)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "_"
    + escapeExpression(((stack1 = (depth0 && depth0.year)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.text_month)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.year)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>	\n		";
  return buffer;
  }

  buffer += "	<select class=\"form-control\">\n		";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.active_months), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</select>";
  return buffer;
  });