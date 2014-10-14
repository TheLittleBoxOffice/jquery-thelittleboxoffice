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
			html = html + $.fn.thelittleboxoffice.template({
				"month_select" : $.fn.thelittleboxoffice.monthSelectEncode(),
			}, "month_view/month_view_base");

			// render out the html to the target
			$(options['target']).html(html);
			
			// hookup events
			this.monthViewHookUpEvents(options['target'].parent().find("select"));

			// fire the event
			$.fn.thelittleboxoffice.monthView_Change(null, $(options["target"]));
		},

		monthViewHookUpEvents : function(target) {
			$(target).change(this.monthView_Change);
		},

		monthView_Change : function(event, target) {

			var html = '';
			var month_view_div = target;
			var month_view_select = $(target).find("select");

			if (event != null) {
				month_view_div = $(event.currentTarget).parent().parent();
				month_view_select = $(month_view_div).find("select");
			}
			var dataset = $.fn.thelittleboxoffice.getMonthViewData(
				$(month_view_div).data("month_view_query_string"),
				$(month_view_select).val().split("_")[1],
				$(month_view_select).val().split("_")[0]
			);
			for (var p = 0; p < dataset.length; p++) {
				html = html + $.fn.thelittleboxoffice.template(dataset[p], "month_view/month_view_performance");
			}
			$(month_view_div).find(".lbo-performances").html(html);
		},

		monthSelectEncode : function() {				
			return $.fn.thelittleboxoffice.template({
				"active_months" : $.fn.thelittleboxoffice.getActiveMonths(),
			}, "month_view/month_view_select");
		}

	});
}( jQuery ));