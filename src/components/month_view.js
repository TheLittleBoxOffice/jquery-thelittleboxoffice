(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		month_view_default_options : {
			'target' : null
 		},

		monthView : function(options) {
			
			// extend the defaults with user options
			options = $.extend(this.default_options, options);
			console.log(options);
			$(options['target']).html('hello world');
		}

	});
}( jQuery ));