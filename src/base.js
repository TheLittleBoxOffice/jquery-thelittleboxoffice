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

			// run theme script if exists
			var script_function = $.fn.thelittleboxoffice.getScriptFunctionName(options.theme);
			if ($.fn.thelittleboxoffice[script_function] != undefined) 
				$.fn.thelittleboxoffice[script_function](options);
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