(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		month_view_default_options : {
			'target' : null
 		},

		monthView : function(options) {
			
			var html = '';

			// extend the defaults with user options
			options = $.extend(this.month_view_default_options, options);

			// encode the month view
			html = html + $.fn.thelittleboxoffice.template(null, "month_view/month_view_base");

			// render out the html to the target
			$(options['target']).html(html);

			// hookup events
			this.monthViewHookUpEvents(options['target']);
		},

		monthViewHookUpEvents : function(target) {

			$(target).click(this.monthView_Click);
		},

		monthView_Click : function() {

			var month = $(this).find('select').val();

			console.log($.fn.thelittleboxoffice.getMonthViewData(month));
		}
	});
}( jQuery ));