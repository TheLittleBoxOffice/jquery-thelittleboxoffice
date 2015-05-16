(function ( $ ) {
	$.fn.thelittleboxoffice = {};
	$.extend($.fn.thelittleboxoffice, {

		default_options : {
			'query' : '',
			'template' : 'default',
			'target' : null,
			'theme' : 'billboard',
			'item_class' : '',
			'wrapper_class' : ''
  		},

		build : function(options) {
			
			// extend the defaults with user options
			options = $.extend(this.default_options, options);
			
			// execute the query
			var dataset = $.fn.thelittleboxoffice.query(options.query, true);

			// build the theme and render
			var theme_function = $.fn.thelittleboxoffice.getThemeFunctionName(options.theme);
			$(options.target).html($.fn.thelittleboxoffice[theme_function](dataset, options));
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

		themeBillboardEncode : function(dataset, options) {
			
			var html = '';
			for (var i = 0; i < dataset.length; i++) {
				html = html + $.fn.thelittleboxoffice.template(dataset[i], "billboard/billboard_item");
			}
			return html;
		},

		themeBillboardSmallEncode : function(dataset, options) {
			
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

		themeCarouselEncode : function(dataset, options) {
			
			var html = '';
			var items_html = '';
			var data_item = null;

			console.log(dataset);

			for (var i = 0; i < dataset.length; i++) {
				data_item = dataset[i];
				data_item.first = (i == 0) ? true : false;
				items_html = items_html + $.fn.thelittleboxoffice.template(dataset[i], "carousel/carousel_item");
			}

			return $.fn.thelittleboxoffice.template({items_html: items_html}, "carousel/carousel_wrapper");
		}		

	});
}( jQuery ));
(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		themeListEncode : function(dataset, options) {
			
			var html = '';
			for (var i = 0; i < dataset.length; i++) {
				dataset[i].options = options;
				console.log(options);
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

this["templates"]["src/templates/billboard/billboard_item.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "\n	<div class=\"lbo-billboard-item\">\n		<div class=\"lbo-crop\">\n			<img src=\""
    + alias3(((helper = (helper = helpers.image_large || (depth0 != null ? depth0.image_large : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"image_large","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "\"/>\n		</div>\n		<h1 class=\"lbo-title\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\n		<p class=\"lbo-teaser\">"
    + ((stack1 = ((helper = (helper = helpers.teaser || (depth0 != null ? depth0.teaser : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"teaser","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>\n		<a href=\""
    + alias3(((helper = (helper = helpers.link_view || (depth0 != null ? depth0.link_view : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"link_view","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn-primary\" role=\"button\">Learn more »</a>\n	</div>\n";
},"useData":true});

this["templates"]["src/templates/carousel/carousel_item.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"item\" >\n	<div class=\"row\">\n		<div class=\"col-md-6 lbo-image\">\n			<img src=\""
    + alias3(((helper = (helper = helpers.image_large || (depth0 != null ? depth0.image_large : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"image_large","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "\"/>\n		</div>\n		<div class=\"col-md-6 lbo-content\">\n			<h1 class=\"lbo-title\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\n			<p class=\"lbo-teaser\">"
    + ((stack1 = ((helper = (helper = helpers.teaser || (depth0 != null ? depth0.teaser : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"teaser","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>\n			<a href=\""
    + alias3(((helper = (helper = helpers.link_view || (depth0 != null ? depth0.link_view : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"link_view","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn-primary\" role=\"button\">Learn more »</a>\n		</div>\n	</div>\n</div>";
},"useData":true});

this["templates"]["src/templates/carousel/carousel_wrapper.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div id=\"owl-example\" class=\"owl-carousel\">\n\n	<!-- Wrapper for slides -->\n	"
    + ((stack1 = ((helper = (helper = helpers.items_html || (depth0 != null ? depth0.items_html : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"items_html","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n	\n	\n		\n</div>";
},"useData":true});

this["templates"]["src/templates/list/list_item.html"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "		<div class=\"lbo-crop\">\n			<img src=\""
    + alias3(((helper = (helper = helpers.image_small || (depth0 != null ? depth0.image_small : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"image_small","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "\"/>\n		</div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.escapeExpression, alias2=helpers.helperMissing, alias3="function";

  return "\n	<div class=\"lbo-list-item "
    + alias1(this.lambda(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.item_class : stack1), depth0))
    + "\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.image_small : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "		<a href=\""
    + alias1(((helper = (helper = helpers.link_view || (depth0 != null ? depth0.link_view : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(depth0,{"name":"link_view","hash":{},"data":data}) : helper)))
    + "\" class=\"lbo-title\">"
    + alias1(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n		<div class=\"paragraph-end details-light\"></div>\n	</div>\n";
},"useData":true});

this["templates"]["src/templates/misc/category_list.html"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "    <li>"
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + " &#58; "
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<ul>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.categories : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});

this["templates"]["src/templates/month_view/month_view_base.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"lbo-month-view\">\n	\n	"
    + ((stack1 = ((helper = (helper = helpers.month_select || (depth0 != null ? depth0.month_select : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"month_select","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n\n	<ul class=\"lbo-performances\">\n		\n	</ul>\n</div>\n";
},"useData":true});

this["templates"]["src/templates/month_view/month_view_performance.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<li>	\n	<div class=\"lbo-image\">\n		<img src=\""
    + alias3(((helper = (helper = helpers.image_large || (depth0 != null ? depth0.image_large : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"image_large","hash":{},"data":data}) : helper)))
    + "\" />\n	</div>\n	<span class=\"lbo-time\">\n		<span class=\"lbo-start-month-day\">"
    + alias3(((helper = (helper = helpers.start_date_month_day || (depth0 != null ? depth0.start_date_month_day : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"start_date_month_day","hash":{},"data":data}) : helper)))
    + "</span>\n		<span class=\"lbo-start-day\">"
    + alias3(((helper = (helper = helpers.start_date_day || (depth0 != null ? depth0.start_date_day : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"start_date_day","hash":{},"data":data}) : helper)))
    + "</span>\n	</span>\n	<div class=\"lbo-title\">\n		<a href=\""
    + alias3(((helper = (helper = helpers.link_book || (depth0 != null ? depth0.link_book : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"link_book","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n	</div>\n</li>";
},"useData":true});

this["templates"]["src/templates/month_view/month_view_select.html"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "			<option value=\""
    + alias2(alias1((depth0 != null ? depth0.month : depth0), depth0))
    + "_"
    + alias2(alias1((depth0 != null ? depth0.year : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.text_month : depth0), depth0))
    + " "
    + alias2(alias1((depth0 != null ? depth0.year : depth0), depth0))
    + "</option>	\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "	<select class=\"form-control\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.active_months : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	</select>";
},"useData":true});