(function ( $ ) {
	$.fn.thelittleboxoffice = {};
	$.extend($.fn.thelittleboxoffice, {

		default_options : {
			'query' : '',
			'template' : 'default',
			'target' : null
		},

		build : function(options) {
			
			// extend the defaults with user options
			options = $.extend(this.default_options, options);
			
			// execute the query
			var dataset = $.fn.thelittleboxoffice.query(options.query);
			
			// build the template
			var template = $.fn.thelittleboxoffice.template({"message" : "Hello World"}, "Standard");

			// render to the target
			$(options.target).html(template);
		}
	});
}( jQuery ));