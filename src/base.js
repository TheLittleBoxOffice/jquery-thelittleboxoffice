(function ( $ ) {
	$.fn.thelittleboxoffice = {};
	$.extend($.fn.thelittleboxoffice, {

		default_options : {
			'query' : '',
			'template' : 'default'
		},

		build : function(options) {

			// extend the defaults with user options
			options = $.extend(this.default_options, options);
			
			// execute the query
			//var dataset = $.fn.thelittleboxoffice.query(options.query);
			
			var template = $.fn.thelittleboxoffice.template({"message" : "Hello World"}, "Standard");

			console.log('#########################');
			console.log(template);
		}
	});
}( jQuery ));