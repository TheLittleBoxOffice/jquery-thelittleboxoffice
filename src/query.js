(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		query : function(query_string) {
			
			var dataset = this.cloneDataSet();
			var commands = this.decodeCommands(query_string);
			
			for (var i = 0; i < commands.length; i++) {
				this.processCommand(commands[i], dataset);
			}
			
			// return the rows highlighted for filtering
			return this.getFiltered(dataset, commands);
		},

		cloneDataSet : function() {
			
			output = [];

			for (var i = 0; i < lbo_events.length; i++) {
				output.push(lbo_events[i]);
			}

			return output;
		},

		decodeCommands : function(query_string) {

			var commands = [];
			var query_array = query_string.split(';');
			var alpha = null; 

			for (var i = 0; i < query_array.length; i++) {
				alpha = query_array[i].match(/([^A-Z_])/i).index;
				commands.push({
					'name' : query_array[i].substring(0, alpha),
					'operand' : query_array[i].substring(alpha, alpha + 1),
					'params' : query_array[i].substring(alpha + 1, query_array[i].length).split(',') 
				});
			}
			commands.sort(function(a, b) {
				var out = 9999;
				switch (a.name) {
					case 'cat':
						out = 0;
						break;
				}
				return out;
			});

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
				case 'category_id':
					output = this.processCommandCategoryId(command.operand, command.params, output);
					break;
				case 'event_id':
					output = this.processCommandEventId(command.operand, command.params, output);
					break;
				case 'sort':
					output = this.processCommandSort(command.operand, command.params, output);
					break;
			}
		},

		processCommandEventId : function(operand, params, dataset) {
			this.applyFilter(this.translateFieldName("event_id"), operand, this.decodeParams(operand, params), dataset);
		},

		processCommandCategoryId : function(operand, params, dataset) {

			// var decoded_params = this.decodeParams(operand, params);
		
			// for (var i = 0; i < decoded_params.length; i++) {
			// 	filtered = this.applyCatFilter(operand, decoded_params[i], filtered);
			// }

			// return filtered;
		},

		processCommandSort : function(operand, params, output) {
			console.log('Not Implemented');			
		},

		applyFilter : function(field, operand, params, dataset) {

			var present = false;

			for (var i = 0; i < dataset.length; i++) {				
				
				present = false;
				dataset[i]["filter_" + field] = false;

				for (var p = 0; p < params.length; p++) {	
					if (String(dataset[i][field]) == String(params[p].value)) {
						present = true;
					}
				}

				if (present) 
					dataset[i]["filter_" + field] = true;
			}
		},

		applyCategoryIdFilter : function(operand, param, output) {

			var filtered = [];
			var present = false;

			for (var i = 0; i < output.length; i++) {
				present = false;
				for (var c = 0; c < output[i].categories.length; c++) {
					if (output[i].categories[c] == param.value) {
						present = true;
					}
				}
				if (operand == '=') {
					if (present) {
						filtered.push(output[i]);
					}
				} else {
					if (!present) {
						filtered.push(output[i]);	
					}
				}
			}
			
			return filtered;
		},

		getFiltered : function(dataset, commands) {

			var field_trans = null;
			var output = [];

			for (var i = 0; i < dataset.length; i++) {
				for (var c = 0; c < commands.length; c++) {
					
					console.log(dataset[i]["filter_" + this.translateFieldName(commands[c].name)]);
					
					if (dataset[i]["filter_" + this.translateFieldName(commands[c].name)] == true) {
						output.push(dataset[i]);
					}
				}
			}
			return output;
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
		}

	});
}( jQuery ));