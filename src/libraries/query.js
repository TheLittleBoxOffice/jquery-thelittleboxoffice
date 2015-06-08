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
				}
				
				// add to the previous array
				if (savePrevious === true)
					this.addToPrevious(dataset);
			
			}

			console.log('Query executed - ', query, dataset);

			// return the rows highlighted for filtering
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
				var a_sort_val = $.fn.thelittleboxoffice.sortCommandValue(a.command);
				var b_sort_val = $.fn.thelittleboxoffice.sortCommandValue(b.command);
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
				case 'start_date':
					return 3;
				case 'search':
					return 3;
				case 'sort':
					return 98;
				case 'group_a':
					return 99;
				case 'limit':
					return 100;
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
				case 'group_a':
					return this.processCommandGroup(command.operand, command.params, output);
			}
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

					if (dataset.allowed_groups !== false) {
						if (dataset.allowed_groups.indexOf(dataset.data[i].categories[c]) == -1) {
							category_allowed = false;
						}
					}

					// make sure a group exists for this category
					if (category_allowed) {
						if (typeof out.data[dataset.data[i].categories[c]] == 'undefined') {
							out.data[dataset.data[i].categories[c]] = {
								title : $.fn.thelittleboxoffice.apiGetCategoryById(dataset.data[i].categories[c]).title,
								data : []
							};
						}
						// add the category
						out.data[dataset.data[i].categories[c]].data.push(dataset.data[i]);
					}
				}
			}
			
			return out;
		},

		createDataSet : function() {
			return {
				data : [],
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

		processCommandStartDate : function(dataset) {
			console.log('WWooo yea!');
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
			var found = false;

			filtered.data = [];
			filtered.allowed_groups = [];

			for (var p = 0; p < param.length; p++) {
				filtered.allowed_groups.push(param[p].value);
			}

			for (var i = 0; i < dataset.data.length; i++) {
				for (var c = 0; c < dataset.data[i].categories.length; c++) {
					found = false;
					for (var p = 0; p < param.length; p++) {
						if (dataset.data[i].categories[c] == param[p].value) {
							found = true;
						}
					}
					if (found)
						filtered.data.push(dataset.data[i]);
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
