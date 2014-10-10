(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		getMonthViewData : function(query, month) {
			
			var dataset = $.fn.thelittleboxoffice.convertDataSetToPerformance(
				$.fn.thelittleboxoffice.query(query)
			);

			dataset = $.fn.thelittleboxoffice.filterByMonth(dataset, month);
			dataset = $.fn.thelittleboxoffice.sortByStartDate(dataset);
			dataset = $.fn.thelittleboxoffice.addFormattedStartDate(dataset);

			return dataset;
		},

		filterByMonth : function(dataset, month) {

			var filtered = [];
			
			for (var p = 0; p < dataset.length; p++) {
				if (parseInt(dataset[p].start_date.split("-")[1]) == parseInt(month)) {
					filtered.push(dataset[p]);
				}
			}
			
			return filtered;
		},

		addFormattedStartDate : function(dataset) {

			for (var p = 0; p < dataset.length; p++) {
				console.log($.fn.thelittleboxoffice.strToDate(dataset[p].start_date + ' ' + dataset[p].start_time));
				dataset[p].formatted_start_date = $.fn.thelittleboxoffice.strToDate(dataset[p].start_date + ' ' + dataset[p].start_time);
			}

			return dataset;
		},

		sortByStartDate : function(dataset) {

			return dataset.sort(function(a, b) {
				
				var adate = $.fn.thelittleboxoffice.dateToInt(a.start_date + a.start_time);
				var bdate = $.fn.thelittleboxoffice.dateToInt(b.start_date + b.start_time);
				
				if (adate < bdate)
					return -1;
				if (adate > bdate)
					return 1;

				return 0;
			});
		}
	});
}( jQuery ));