(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		getMonthViewData : function(month, query) {
			
			var event_data = $.fn.thelittleboxoffice.query(query);
			var perf_data = [];

			for (var e = 0; e < event_data.length; e++) {
				
			}

			return event_data;
		}

	});
}( jQuery ));