(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		themeListEncode : function(dataset, options) {
			
			var html = '';
			var html_group = '';
			var i = null;

			if (dataset.cursor_with_object_group === false) {
				for (i = 0; i < dataset.data.length; i++) 
					html = html + $.fn.thelittleboxoffice.themeListItemEncode(dataset.data[i], options);
			} else {
				for (var index in dataset.data) {
					
					html_group = '';
					
					for (i = 0; i < dataset.data[index].data.length; i++) 
						html_group = html_group + $.fn.thelittleboxoffice.themeListItemEncode(dataset.data[index].data[i], options);
					
					html = html + $.fn.thelittleboxoffice.template({
						title : dataset.data[index].title, 
						content : html_group
					}, "list/list_group");
				}
			}
			
			return html;
		},

		themeListItemEncode : function(data_item, options) {
			
			data_item.options = options;
			data_item.first_performance = data_item.performances[0];
			data_item.last_performance = data_item.performances[data_item.performances.length - 1];
			data_item.first_performance_start_date_formatted = $.fn.thelittleboxoffice.formatDate(data_item.first_performance.start_date, options);
			data_item.last_performance_start_date_formatted = $.fn.thelittleboxoffice.formatDate(data_item.last_performance.start_date, options);

			if (data_item.first_performance_start_date_formatted != data_item.last_performance_start_date_formatted) {
				data_item.on_from_formatted = data_item.first_performance_start_date_formatted + ' - ' + data_item.last_performance_start_date_formatted;
			} else {
				data_item.on_from_formatted = data_item.first_performance_start_date_formatted;
			}

			for (var i = 0; i < data_item.performances.length; i++) {
				data_item.performances[i].start_date_formatted = $.fn.thelittleboxoffice.formatDateTime(
					data_item.performances[i].start_date + ' ' + data_item.performances[i].start_time
				, options);
			}

			return $.fn.thelittleboxoffice.template(data_item, "list/list_item");
		},

		themeListScript : function(options) {
			if (options.performance_click != null) {
				$(".lbo-list-item-performances li a").click(function(event) {
					event.preventDefault();
					options.performance_click(event.target, parseInt($(this).attr('data-performance-id')));
				});
			}
			if (options.event_title_click != null) {
				$(".lbo-list-item-title").click(function(event) {
					event.preventDefault();
					options.event_title_click(event.target, parseInt($(event.target).parents('.lbo-list-item').attr('data-event-id')));
				});
			}
		}
	});
}( jQuery ));