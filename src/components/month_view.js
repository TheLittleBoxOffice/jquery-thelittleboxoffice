(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		month_view_default_options : {
			'query' : 'test',
			'target' : null
 		},

		monthView : function(options) {
			
			var html = '';

			// extend the defaults with user options
			options = $.extend(this.month_view_default_options, options);

			// store the options in the data
			$(options['target']).data("month_view_query_string", options.query);
			
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

			var html = '';

			var dataset = $.fn.thelittleboxoffice.getMonthViewData(
				$(this).data("month_view_query_string"),
				$(this).find('select').val()
			);
			for (var p = 0; p < dataset.length; p++) {
				html = html + $.fn.thelittleboxoffice.template(dataset[p], "month_view/month_view_performance");
			}

			$(this).find(".lbo-performances").html(html);
		}
	});
}( jQuery ));