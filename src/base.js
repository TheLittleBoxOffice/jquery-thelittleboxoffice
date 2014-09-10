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
			var data = $.fn.thelittleboxoffice.query(options.query)

			console.log('#########################');
			console.log(data);
		}
	});
}( jQuery ));