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
			$.fn.thelittleboxoffice.monthView_Change(null, $(options["target"]).find("select"));
		},

		monthViewHookUpEvents : function(target) {
			$(target).change(this.monthView_Change);
		},

		monthView_Change : function(event, target) {

			var html = '';

			if (event != null) {
				target = $(event.currentTarget).find("select");
			}

			console.log(target)
			console.log($(this).data("month_view_query_string"));
			
			var dataset = $.fn.thelittleboxoffice.getMonthViewData(
				$(this).data("month_view_query_string"),
				$(target).val().split("_")[1],
				$(target).val().split("_")[0]
			);
			for (var p = 0; p < dataset.length; p++) {
				html = html + $.fn.thelittleboxoffice.template(dataset[p], "month_view/month_view_performance");
			}
			$(this).find(".lbo-performances").html(html);
		},

		monthSelectEncode : function() {				
			return $.fn.thelittleboxoffice.template({
				"active_months" : $.fn.thelittleboxoffice.getActiveMonths(),
			}, "month_view/month_view_select");
		}

	});
}( jQuery ));