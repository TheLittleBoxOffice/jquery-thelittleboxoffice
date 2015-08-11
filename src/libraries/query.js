var lbo_previous = [];

(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		query : function(query, savePrevious) {

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

			// return the rows highlighted for filtering
			//console.log(query, dataset);
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
