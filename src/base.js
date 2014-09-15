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
			var dataset = $.fn.thelittleboxoffice.query(options.query);
			
			// build the theme and render
			var theme_function = $.fn.thelittleboxoffice.getThemeFunctionName(options.theme);
			$(options.target).html($.fn.thelittleboxoffice[theme_function](dataset));
			
		},

		getThemeFunctionName : function(theme_name) {
			return "theme" + this.capitaliseFirstLetter(theme_name) + "Encode";
		},

		capitaliseFirstLetter : function(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
	});
}( jQuery ));