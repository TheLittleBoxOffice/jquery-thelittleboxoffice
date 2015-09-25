(function ( $ ) {
	$.fn.thelittleboxoffice = {};
	$.extend($.fn.thelittleboxoffice, {

		default_options : {
			'query' : '',
			'template' : 'default',
			'target' : null,
			'theme' : 'billboard',
			'item_class' : '',
			'item_template' : null,
			'wrapper_class' : '',
			'search_change' : null,
			'calendar_button_click' : null,
			'event_title_click' : null,
			'image_click' : null,
			'complete' : null,
			'performance_click' : null,
			'date_format' : 'D MMM YYYY',
			'time_format' : 'h:mma',
			'debug' : false
  		},

		build : function(options) {
			
			// extend the defaults with user options
			options = $.extend(this.default_options, options);
			
			// check target exists
			if ($(options.target).length == 0)
				throw "Target " + options.target.selector + " not found";

			// execute the query
			var dataset = $.fn.thelittleboxoffice.query(options.query, true, options);
			
			// build the theme and render
			var theme_function = $.fn.thelittleboxoffice.getThemeFunctionName(options.theme);
			$(options.target).html($.fn.thelittleboxoffice[theme_function](dataset, options));

			// run theme script if exists
			var script_function = $.fn.thelittleboxoffice.getScriptFunctionName(options.theme);
			if ($.fn.thelittleboxoffice[script_function] != undefined) 
				$.fn.thelittleboxoffice[script_function](options);

			// run complete function if exists
			if (options.complete != null) 
				options.complete(dataset);

			return dataset;
		},
		
		listCategories : function(options) {
			$(options.target).html(
				$.fn.thelittleboxoffice.template({'categories' : lbo_categories}, "misc/category_list")
			);
		},

		getScriptFunctionName : function(theme_name) {
			return "theme" + this.capitaliseFirstLetter(theme_name) + "Script";
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

		formatDate : function(str_date, options) {
			
			if (str_date != undefined) {
				var con_date = $.fn.thelittleboxoffice.strToDate(str_date);
				return moment(con_date).format(options.date_format);
			} else {
				return '';
			}
		},

		formatDateTime : function(str_date, options) {
			
			if (str_date != undefined) {
				var con_date = $.fn.thelittleboxoffice.strToDate(str_date);
				return moment(con_date).format(options.date_format + ' ' + options.time_format);
			} else {
				return '';
			}
		},

		strToDate : function(str_date) {

			var parts = str_date.split(" ");
			var date_parts = parts[0].split("-");

			if (parts.length == 2) {
				var time_parts = parts[1].split(":");
			} else {
				var time_parts = ['00', '00', '00'];
			}

			return new Date(
				parseInt(date_parts[0]),
				parseInt(date_parts[1] - 1),
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

			for (var i = 0; i < dataset.data.length; i++) {
				data_item = dataset.data[i];
				data_item.first = (i == 0) ? true : false;
				items_html = items_html + $.fn.thelittleboxoffice.template(dataset.data[i], "carousel/carousel_item");
			}

			return $.fn.thelittleboxoffice.template({items_html: items_html}, "carousel/carousel_wrapper");
		}		

	});
}( jQuery ));
(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		themeListEncode : function(dataset, options) {
			
			var html = '';
			var html_group = '';
			var i = null;

			if (dataset.cursor_with_object_group === false) {
				for (i = 0; i < dataset.data.length; i++) 
					html = html + $.fn.thelittleboxoffice.themeListItemEncode(dataset.data[i], options);
			} else {
				for (var index in dataset.data) {
					
					html_group = '';
					
					for (i = 0; i < dataset.data[index].data.length; i++) 
						html_group = html_group + $.fn.thelittleboxoffice.themeListItemEncode(dataset.data[index].data[i], options);
					
					html = html + $.fn.thelittleboxoffice.template({
						title : dataset.data[index].title, 
						content : html_group
					}, "list/list_group");
				}
			}
			
			return html;
		},

		themeListItemEncode : function(data_item, options) {
			
			var output = '';

			data_item.options = options;
			data_item.first_performance = data_item.performances[0];
			data_item.last_performance = data_item.performances[data_item.performances.length - 1];
			data_item.first_performance_start_date_formatted = $.fn.thelittleboxoffice.formatDate(data_item.first_performance.start_date, options);
			data_item.last_performance_start_date_formatted = $.fn.thelittleboxoffice.formatDate(data_item.last_performance.start_date, options);

			if (data_item.first_performance_start_date_formatted != data_item.last_performance_start_date_formatted) {
				data_item.on_from_formatted = data_item.first_performance_start_date_formatted + ' - ' + data_item.last_performance_start_date_formatted;
			} else {
				data_item.on_from_formatted = data_item.first_performance_start_date_formatted;
			}

			for (var i = 0; i < data_item.performances.length; i++) {
				data_item.performances[i].start_date_formatted = $.fn.thelittleboxoffice.formatDateTime(
					data_item.performances[i].start_date + ' ' + data_item.performances[i].start_time
				, options);
				data_item.performances[i].places_left = data_item.performances[i].places_total - data_item.performances[i].places_sold;
			}

			if (options.item_template == null) {
				output = $.fn.thelittleboxoffice.template(data_item, "list/list_item");
			} else {
				output = $.fn.thelittleboxoffice.templateString(data_item, options.item_template);
			}

			return output;
		},

		themeListScript : function(options) {
			if (options.performance_click != null) {
				$(".lbo-list-item-performances a").click(function(event) {
					event.preventDefault();
					options.performance_click(event.target, parseInt($(this).attr('data-performance-id')));
				});
			}
			if (options.event_title_click != null) {
				$(".lbo-list-item-title").click(function(event) {
					event.preventDefault();
					options.event_title_click(event.target, parseInt($(event.target).parents('.lbo-list-item').attr('data-event-id')));
				});
			}
		}
	});
}( jQuery ));
(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		themeSearchTextTimerId : null,

		themeSearchEncode : function(dataset, options) {
			return $.fn.thelittleboxoffice.template({ 
				search_form : $.fn.thelittleboxoffice.template(null, "search/search_form") 
			}, "search/search_wrapper");
		},

		themeSearchScript : function(options) {

			var ele_categories = $('form[name="lbo-form-search"] select[name="category[]"]');
			var ele_search = $('form[name="lbo-form-search"] input[name="search"]');

			// setup the categories dropdown
			//ele_categories.append('<option value="0"></option>');
			for (var c = 0; c < lbo_categories.length; c++) {
				ele_categories.append('<option value="' + lbo_categories[c].id + '">' + lbo_categories[c].title + '</option>');
			}
			ele_categories.selectpicker();
			ele_categories.change(function() {
				$('form#lbo-form-search').submit();
			});

			// setup the date picker
			$.fn.thelittleboxoffice.themeSearchDatePickerUpdate(false);

			// handle the text search
			$('input[name="search"]').keyup(function() {
				clearTimeout($.fn.thelittleboxoffice.themeSearchTextTimerId);
				$.fn.thelittleboxoffice.themeSearchTextTimerId = setTimeout(function() {
					$.fn.thelittleboxoffice.themeSearchExecuteSearch(options);
				}, 200);
			});

			// setup the form
			$('form#lbo-form-search').submit(function(event) {
				$.fn.thelittleboxoffice.themeSearchExecuteSearch(options);
				event.preventDefault();
				return false;
			});

			// fire the search
			$.fn.thelittleboxoffice.themeSearchExecuteSearch(options);
		},

		themeSearchDatePicker_Change : function (e) {
			$('form#lbo-form-search').submit();
		},

		themeSearchDatePickerUpdate : function(enabled_dates) {

			$('.lbo-search-datepicker').off("dp.change", $.fn.thelittleboxoffice.themeSearchDatePicker_Change);

			if ($('.lbo-search-datepicker').data("DateTimePicker") != undefined) 
				$('.lbo-search-datepicker').data("DateTimePicker").destroy();
			
			$('.lbo-search-datepicker').datetimepicker({
				format : 'DD MMMM YYYY',
				enabledDates : (enabled_dates === false) ? false : enabled_dates
			});

			$('.lbo-search-datepicker').on("dp.change", $.fn.thelittleboxoffice.themeSearchDatePicker_Change);
		},

		themeSearchExecuteSearch : function(options) {

			var query = '';
			var ele_results = $('.lbo-search-results');
			var ele_categories = $('form[name="lbo-form-search"] select[name="category[]"]');
			var categories = lbo_categories;
			var ele_group = null;
			var categories_id_string = '';
			var search_date_string = '';
			var search_string = $('input[name="search"]').val();

			ele_results.html('');

			if (ele_categories.val() != null && ele_categories.val().length > 0)
				categories = $.fn.thelittleboxoffice.apiGetCategoryByIds(ele_categories.val());

			for (var c = 0; c < categories.length; c++)
				categories_id_string += (categories_id_string == '') ? categories[c].id : ',' + categories[c].id;

			if ($('.lbo-search-datepicker').data("DateTimePicker").date() != null)
				search_date_string = 'start_date=' + $('.lbo-search-datepicker').data("DateTimePicker").date().format("YYYY-MM-DD") + ';';

			var dataset = $.fn.thelittleboxoffice.build({
				query : 'search=' + search_string + ';category_id=' + categories_id_string + ';order_desc=count;group=category;' + search_date_string,
				target : ele_results,
				theme : 'list',
				item_class : options.item_class,
				item_template : options.item_template
			});

			$.fn.thelittleboxoffice.themeSearchDatePickerUpdate(dataset.available_dates);

			$('.lbo-list-item-btn-performances').each(function(index, value) {
				$(value).click(function(event) {

					// fire the calendar button click event
					if (options.calendar_button_click != null) 
						options.calendar_button_click(value, $(value).data("event-id"));
					
					event.preventDefault();
				});
			});

			// fire the change events
			if (options.search_change != null)
				options.search_change(dataset, categories);
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
(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		apiGetCategoryByIds : function(category_ids) {

			var out = new Array();

			for (var i = 0; i < category_ids.length; i++) {
				out.push($.fn.thelittleboxoffice.apiGetCategoryById(category_ids[i]));
			}

			return out;
		},

		apiGetCategoryById : function(category_id) {
			for (var c = 0; c < lbo_categories.length; c++) {
				if (lbo_categories[c].id == category_id) 
					return lbo_categories[c];
			}
			return false;
		},

		apiCategoriesToIdString : function(categories) {

			var out = '';
			for (var c = 0; c < categories.length; c++) {
				if (out != '') out += ',';
				out += categories[c].id;
			}
			return out;
		}
		
	});
}( jQuery ));
var lbo_previous = [];

(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		query : function(query, savePrevious, options) {

			// start debug
			if (options.debug == true) {
				var start = new Date().getTime();
				console.log("query recieved", query);
			}

			// clone the dataset and convert the commands to objects
			var dataset = this.reCreateDataSet();
			var commands = this.decodeCommands(query);

			// check the query
			if (this.checkQueryString(query) == true) {

				// apply all the command in the query
				for (var i = 0; i < commands.length; i++) {
					dataset = this.processCommand(commands[i], dataset);
					// console.log(commands[i], dataset);
				}

				// add to the previous array
				if (savePrevious === true)
					this.addToPrevious(dataset);
			}

			// figure out what performance dates are available
			dataset.available_dates = this.getAvailableDates(dataset);

			// end debug
			if (options.debug == true) {
				var end = new Date().getTime();
				var time = (end - start) / 1000;
				console.log("Execution time " + time + " seconds");
			}

			// return the results
			return dataset;
		},

		reCreateDataSet : function() {
			output = this.createDataSet();
			for (var i = 0; i < lbo_events.length; i++)
				output.data.push(lbo_events[i]);
			return output;
		},

		cloneDataSet : function(dataset) {
			return jQuery.extend(true, {}, dataset);
		},

		addToPrevious : function(filtered) {
			for (var i = 0; i < filtered.data.length; i++)
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

		checkQueryString : function(query_string) {
			if (query_string != '') {
				if (query_string.trim().slice(-1) != ';')
					throw "Query does not end with a semicolon.";
			}
			return true;
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
				commands = this.sortCommands(commands);
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

		sortCommands : function(commands) {
			commands.sort(function(a, b) {
				var a_sort_val = $.fn.thelittleboxoffice.sortCommandValue(a.name);
				var b_sort_val = $.fn.thelittleboxoffice.sortCommandValue(b.name);
				if (a_sort_val > b_sort_val) {
					return 1;
				} else {
					return -1;
				}
			});
			return commands;
		},

		sortCommandValue : function(command_name) {
			switch (command_name) {
				case 'original':
					return 0;
				case 'category_id':
					return 1;
				case 'event_id':
					return 2;
				case 'search':
					return 3;
				case 'start_date':
					return 4;
				case 'limit':
					return 100;
				case 'sort':
					return 98;
				case 'group':
					return 99;
				case 'order_asc':
					return 100;
				case 'order_desc':
					return 101;
			}
		},

		translateFieldName : function(field) {
			switch (field) {
				case "event_id":
					return "id";
				default:
					return field;
			}
		},

		getAvailableDates : function(dataset) {
			var out = [];
			var raw = [];

			if (dataset.cursor_with_object_group != false) {
				for (var g in dataset.data) {
					for (var e in dataset.data[g].data) {
						for (var p in dataset.data[g].data[e].performances) {
							raw[dataset.data[g].data[e].performances[p].start_date.replace(/-/gi, "")] =
								dataset.data[g].data[e].performances[p].start_date;
						}
					}
				}
			} else {
				for (var e in dataset.data) {
					for (var p in dataset.data[e].performances) {
						raw[dataset.data[e].performances[p].start_date.replace(/-/gi, "")] =
							dataset.data[e].performances[p].start_date;
					}
				}
			}
			for (var r in raw) {
				out.push(raw[r]);
			}
			return out;
		},

		processCommand : function(command, output) {

			switch (command.name) {
				case 'all':
					return this.processCommandAll(output);
				case 'original':
					return this.processCommandOriginal(output);
				case 'category_id':
					return this.processCommandCategoryId(command.operand, command.params, output);
				case 'start_date':
					return this.processCommandStartDate(command.operand, command.params, output);
				case 'event_id':
					return this.processCommandEventId(command.operand, command.params, output);
				case 'sort':
					return this.processCommandSort(command.operand, command.params, output);
				case 'limit':
					return this.processCommandLimit(command.operand, command.params, output);
				case 'group':
					return this.processCommandGroup(command.operand, command.params, output);
				case 'search':
					return this.processCommandSearch(command.operand, command.params, output);
				case 'order_asc':
					return this.processCommandOrder(command.operand, command.params, output, 'asc');
				case 'order_desc':
					return this.processCommandOrder(command.operand, command.params, output, 'desc');
			}
		},

		processCommandOrder : function(operand, params, dataset, direction) {

			var data_clone = jQuery.extend(true, {}, dataset).data;
			var ordered = null;

			if (direction == 'asc') {
				var ordered = JSLINQ(data_clone).OrderBy(function(item) {
					return item.count;
				});
			} else {
				var ordered = JSLINQ(data_clone).OrderByDescending(function(item) {
					return item.count;
				});
			}

			var filtered = [];
			for (var key in ordered.items) {
				if (ordered.items[key] != undefined) {
					filtered.push(ordered.items[key]);
				}
			}

			dataset.data = filtered;

			return dataset;
		},

		processCommandSearch : function(operand, params, dataset) {

			var out = jQuery.extend(true, {}, dataset);

			if (params[0] != '') {
				out.data = [];
				for (var i = 0; i < dataset.data.length; i++) {
					if (dataset.data[i].title.toLowerCase().indexOf(params[0].toLowerCase()) > -1)
						out.data.push(dataset.data[i]);
				}
			}
			return out;
		},

		processCommandGroup : function(operand, params, dataset) {
			if (params == 'category')
				return this.processCommandGroupCategory(operand, params, dataset);
		},

		processCommandGroupCategory : function(operand, params, dataset) {

			var out = jQuery.extend(true, {}, dataset);
			var category_allowed = true;

			out.data = [];
			out.cursor_with_object_group = 'category';

			for (var i = 0; i < dataset.data.length; i++) {
				for (var c = 0; c < dataset.data[i].categories.length; c++) {

					category_allowed = true;

					// if also searching by category exlude other categories that
					// these events are in
					if (dataset.allowed_groups !== false) {
						if (dataset.allowed_groups.indexOf(dataset.data[i].categories[c]) == -1)
							category_allowed = false;
					}
					
					// make sure a group exists for this category
					if (category_allowed) {
						if (typeof out.data[dataset.data[i].categories[c]] == 'undefined') {
							out.data[dataset.data[i].categories[c]] = {
								title : $.fn.thelittleboxoffice.apiGetCategoryById(dataset.data[i].categories[c]).title,
								data : [],
								count : 0
							};
						}
						// add the category
						out.data[dataset.data[i].categories[c]].data.push(dataset.data[i]);
						out.data[dataset.data[i].categories[c]].count = out.data[dataset.data[i].categories[c]].data.length;
					}
				}
			}
			
			return out;
		},

		createDataSet : function() {
			return {
				query : '',
				data : [],
				available_dates : [],
				allowed_groups : false,
				cursor_with_object_group : false,
			}
		},

		processCommandLimit : function(operand, params, dataset) {

			var out = this.cloneDataSet(dataset);
			out.data = [];
			var limit = parseInt(params.pop());

			for (var i = 0; i < dataset.data.length; i++) {
				if (i < limit)
					filtered.data.push(dataset.data[i]);
			}

			return filtered;
		},

		processCommandAll : function(dataset) {
			return dataset;
		},

		processCommandStartDate : function(operand, params, dataset) {
			var out = this.cloneDataSet(dataset);
			out.data = [];

			for (var e = 0; e < dataset.data.length; e++) {
				for (var p = 0; p < dataset.data[e].performances.length; p++) {
					if (dataset.data[e].performances[p].start_date == params[0]) {
						out.data.push(dataset.data[e]);
						break;
					}
				}
			}

			return out;
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

			for (var i = 0; i < dataset.data.length; i++) {

				present = false;
				dataset.data[i]["filter_" + field] = false;

				for (var p = 0; p < params.length; p++) {
					if (String(dataset.data[i][field]) == String(params[p].value))
						present = true;
				}

				if (present)
					dataset.data[i]["filter_" + field] = true;
			}
		},

		applyCategoryIdFilter : function(operand, param, dataset) {

			var filtered = this.cloneDataSet(dataset);
			var found = [];

			filtered.data = [];
			filtered.allowed_groups = [];

			for (var p = 0; p < param.length; p++)
				filtered.allowed_groups.push(param[p].value);

			for (var i = 0; i < dataset.data.length; i++) {
				for (var c = 0; c < dataset.data[i].categories.length; c++) {
					for (var p = 0; p < param.length; p++) {
						if (dataset.data[i].categories[c] == param[p].value) {
							if (found.indexOf(dataset.data[i].id) == -1) {
								filtered.data.push(dataset.data[i]);
								found.push(dataset.data[i].id);
							}
							break;
						}
					}
				}
			}
			
			return filtered;
		},

		applyOriginalFilter : function(dataset) {

			var filtered = this.cloneDataSet(dataset);
			var found = false;

			filtered.data = [];

			for (var i = 0; i < dataset.data.length; i++) {
				found = false;
				for (var p = 0; p < lbo_previous.length; p++) {
					if (dataset.data[i].id == lbo_previous[p].id)
						found = true;
				}
				if (found == false)
					filtered.push(dataset.data[i]);
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

			for (var e = 0; e < dataset.data.length; e++) {
				for (var p = 0; p < dataset.data[e].performances.length; p++) {
					var performance = {};

					performance.title = dataset.data[e].title;
					performance.image_large = dataset.data[e].image_large;
					performance.teaser = dataset.data[e].teaser;
					performance.start_date = dataset.data[e].performances[p].start_date;
					performance.start_time = dataset.data[e].performances[p].start_time;
					performance.link_book = dataset.data[e].link_book;

					performances.push(performance);
				}
			}

			return performances;
		}

	});
}( jQuery ));

//-----------------------------------------------------------------------
// Part of the LINQ to JavaScript (JSLINQ) v2.10 Project - http://jslinq.codeplex.com
// Copyright (C) 2009 Chris Pietschmann (http://pietschsoft.com). All rights reserved.
// This project is licensed under the Microsoft Reciprocal License (Ms-RL)
// This license can be found here: http://jslinq.codeplex.com/license
//-----------------------------------------------------------------------
(function() {
    JSLINQ = window.JSLINQ = function(dataItems) {
        return new JSLINQ.fn.init(dataItems);
    };
    JSLINQ.fn = JSLINQ.prototype = {
        init: function(dataItems) {
            this.items = dataItems;
        },

        // The current version of JSLINQ being used
        jslinq: "2.10",

        ToArray: function() { return this.items; },
        Where: function(clause) {
            var item;
            var newArray = new Array();

            // The clause was passed in as a Method that return a Boolean
            for (var index = 0; index < this.items.length; index++) {
                if (clause(this.items[index], index)) {
                    newArray[newArray.length] = this.items[index];
                }
            }
            return new JSLINQ(newArray);
        },
        Select: function(clause) {
            var item;
            var newArray = new Array();

            // The clause was passed in as a Method that returns a Value
            for (var i = 0; i < this.items.length; i++) {
                if (clause(this.items[i])) {
                    newArray[newArray.length] = clause(this.items[i]);
                }
            }
            return new JSLINQ(newArray);
        },
        OrderBy: function(clause) {
            var tempArray = new Array();
            for (var i = 0; i < this.items.length; i++) {
                tempArray[tempArray.length] = this.items[i];
            }
            return new JSLINQ(
            tempArray.sort(function(a, b) {
                var x = clause(a);
                var y = clause(b);
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            })
        );
        },
        OrderByDescending: function(clause) {
            var tempArray = new Array();
            for (var i = 0; i < this.items.length; i++) {
                tempArray[tempArray.length] = this.items[i];
            }
            return new JSLINQ(
            tempArray.sort(function(a, b) {
                var x = clause(b);
                var y = clause(a);
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            })
        );
        },
        SelectMany: function(clause) {
            var r = new Array();
            for (var i = 0; i < this.items.length; i++) {
                r = r.concat(clause(this.items[i]));
            }
            return new JSLINQ(r);
        },
        Count: function(clause) {
            if (clause == null)
                return this.items.length;
            else
                return this.Where(clause).items.length;
        },
        Distinct: function(clause) {
            var item;
            var dict = new Object();
            var retVal = new Array();
            for (var i = 0; i < this.items.length; i++) {
                item = clause(this.items[i]);
                // TODO - This doens't correctly compare Objects. Need to fix this
                if (dict[item] == null) {
                    dict[item] = true;
                    retVal[retVal.length] = item;
                }
            }
            dict = null;
            return new JSLINQ(retVal);
        },
        Any: function(clause) {
            for (var index = 0; index < this.items.length; index++) {
                if (clause(this.items[index], index)) { return true; }
            }
            return false;
        },
        All: function(clause) {
            for (var index = 0; index < this.items.length; index++) {
                if (!clause(this.items[index], index)) { return false; }
            }
            return true;
        },
        Reverse: function() {
            var retVal = new Array();
            for (var index = this.items.length - 1; index > -1; index--)
                retVal[retVal.length] = this.items[index];
            return new JSLINQ(retVal);
        },
        First: function(clause) {
            if (clause != null) {
                return this.Where(clause).First();
            }
            else {
                // If no clause was specified, then return the First element in the Array
                if (this.items.length > 0)
                    return this.items[0];
                else
                    return null;
            }
        },
        Last: function(clause) {
            if (clause != null) {
                return this.Where(clause).Last();
            }
            else {
                // If no clause was specified, then return the First element in the Array
                if (this.items.length > 0)
                    return this.items[this.items.length - 1];
                else
                    return null;
            }
        },
        ElementAt: function(index) {
            return this.items[index];
        },
        Concat: function(array) {
            var arr = array.items || array;
            return new JSLINQ(this.items.concat(arr));
        },
        Intersect: function(secondArray, clause) {
            var clauseMethod;
            if (clause != undefined) {
                clauseMethod = clause;
            } else {
                clauseMethod = function(item, index, item2, index2) { return item == item2; };
            }

            var sa = secondArray.items || secondArray;

            var result = new Array();
            for (var a = 0; a < this.items.length; a++) {
                for (var b = 0; b < sa.length; b++) {
                    if (clauseMethod(this.items[a], a, sa[b], b)) {
                        result[result.length] = this.items[a];
                    }
                }
            }
            return new JSLINQ(result);
        },
        DefaultIfEmpty: function(defaultValue) {
            if (this.items.length == 0) {
                return defaultValue;
            }
            return this;
        },
        ElementAtOrDefault: function(index, defaultValue) {
            if (index >= 0 && index < this.items.length) {
                return this.items[index];
            }
            return defaultValue;
        },
        FirstOrDefault: function(defaultValue) {
            return this.First() || defaultValue;
        },
        LastOrDefault: function(defaultValue) {
            return this.Last() || defaultValue;
        }
    };
    JSLINQ.fn.init.prototype = JSLINQ.fn;
})();

(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		templateString : function(dataset, template_source) {
			var template = Handlebars.compile(template_source);
			return this.bakeTemplate(
				template, 
				dataset
			);
		},

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

  return "<div class=\"item\" >\n	<div class=\"lbo-content\">\n		<h3 class=\"lbo-title\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h3>\n		<p class=\"lbo-teaser\">"
    + ((stack1 = ((helper = (helper = helpers.teaser || (depth0 != null ? depth0.teaser : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"teaser","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "<div class=\"paragraph-end details-light\"></div></p>\n		<a href=\""
    + alias3(((helper = (helper = helpers.link_view || (depth0 != null ? depth0.link_view : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"link_view","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn-primary\" role=\"button\">Learn more »</a>\n	</div>\n	<div class=\"lbo-image\">\n		<img src=\""
    + alias3(((helper = (helper = helpers.image_large || (depth0 != null ? depth0.image_large : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"image_large","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "\"/>\n	</div>\n</div>";
},"useData":true});

this["templates"]["src/templates/carousel/carousel_wrapper.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div id=\"owl-example\" class=\"owl-carousel\">\n\n	<!-- Wrapper for slides -->\n	"
    + ((stack1 = ((helper = (helper = helpers.items_html || (depth0 != null ? depth0.items_html : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"items_html","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n	\n	\n		\n</div>";
},"useData":true});

this["templates"]["src/templates/list/list_group.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function";

  return "<div class=\"group\">\n	<span class=\"title\">"
    + this.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</span>\n	<div class=\"content\">\n		"
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n	</div>\n</div>";
},"useData":true});

this["templates"]["src/templates/list/list_item.html"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "			<div class=\"lbo-crop\">\n				<img src=\""
    + alias3(((helper = (helper = helpers.image_large || (depth0 != null ? depth0.image_large : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"image_large","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "\"/>\n			</div>\n";
},"3":function(depth0,helpers,partials,data) {
    var helper, alias1=this.escapeExpression, alias2=this.lambda;

  return "					<tr>\n						<td><a href=\"#\" data-performance-id=\""
    + alias1(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias1(alias2((depth0 != null ? depth0.start_date_formatted : depth0), depth0))
    + "</a></td>\n						<td><span>"
    + alias1(alias2((depth0 != null ? depth0.places_left : depth0), depth0))
    + "</span></td>\n					</tr>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.escapeExpression, alias2=helpers.helperMissing, alias3="function";

  return "\n	<div class=\"lbo-list-item "
    + alias1(this.lambda(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.item_class : stack1), depth0))
    + " lbo-list-item-"
    + alias1(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-event-id=\""
    + alias1(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n		<a href=\""
    + alias1(((helper = (helper = helpers.link_view || (depth0 != null ? depth0.link_view : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(depth0,{"name":"link_view","hash":{},"data":data}) : helper)))
    + "\" class=\"lbo-title\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.image_small : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "			<div class=\"lbo-list-item-performances\">\n				<table class=\"table\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.performances : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "				</table>\n			</div>\n			<div class=\"lbo-list-item-title\">"
    + alias1(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</div>\n			<div class=\"lbo-list-item-date-summary\">\n				"
    + alias1(((helper = (helper = helpers.on_from_formatted || (depth0 != null ? depth0.on_from_formatted : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(depth0,{"name":"on_from_formatted","hash":{},"data":data}) : helper)))
    + "\n			</div>\n			<div class=\"lbo-list-item-controls\">\n				<button class=\"lbo-list-item-btn-performances btn btn-default\" type=\"button\" class=\"btn btn-xs btn-primary\" data-event-id=\""
    + alias1(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n					<span class=\"glyphicon glyphicon-calendar\"></span>\n				</button>\n			</div>\n		</a>\n	</div>\n";
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

this["templates"]["src/templates/search/search_form.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<form id=\"lbo-form-search\" name=\"lbo-form-search\" class=\"form-inline\">\n	<div class=\"input-group lbo-search-text\">\n		<input name=\"search\" type=\"text\" class=\"form-control\" placeholder=\"Search\"/>\n	</div>\n	<div class=\"input-group lbo-search-category\">\n		<select name=\"category[]\" class=\"selectpicker\" multiple=\"true\" title=\"Category\"></select>\n	</div>\n	<div class=\"input-group date lbo-search-datepicker\">\n		<input type=\"text\" class=\"form-control\" placeholder=\"Date\"/>\n		<span class=\"input-group-addon\">\n			<span class=\"glyphicon glyphicon-calendar\"></span>\n		</span>\n	</div>	\n</form>";
},"useData":true});

this["templates"]["src/templates/search/search_group.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"lbo-search-group "
    + alias3(((helper = (helper = helpers.group_class || (depth0 != null ? depth0.group_class : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"group_class","hash":{},"data":data}) : helper)))
    + "\">\n	<h2>"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\n	<div id=\"lbo-search-group-content-"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"lbo-search-group-content\"></div>\n</div>";
},"useData":true});

this["templates"]["src/templates/search/search_wrapper.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"lbo-search\">\n\n	"
    + ((stack1 = ((helper = (helper = helpers.search_form || (depth0 != null ? depth0.search_form : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"search_form","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n\n	<div class=\"lbo-search-results\"></div>\n\n</div>";
},"useData":true});