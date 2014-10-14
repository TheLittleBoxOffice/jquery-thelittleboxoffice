(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		getActiveMonths : function() {

			var months = $.fn.thelittleboxoffice.getMonths();
			var dataset = $.fn.thelittleboxoffice.cloneDataSet();
			var unsorted = [];
			var out = [];
			var month, year, combined;

			for (var e = 0; e < dataset.length; e++) {
				for (var p = 0; p < dataset[e].performances.length; p++) {

					month = dataset[e].performances[p].start_date.split("-")[1];
					year = dataset[e].performances[p].start_date.split("-")[0];
					combined = String(year).concat(String(month));
					
					if (unsorted[combined] == undefined) {
						unsorted[combined] = {
							"month" : month,
							"year" : year
						};
					}
				}
			}
			
			var keys = Object.keys(unsorted).sort();

			for (e = 0; e < keys.length; e++) {
				unsorted[keys[e]]["text_month"] = months[parseInt(unsorted[keys[e]]["month"]) - 1];
				unsorted[keys[e]]["key"] = keys[e];
				out.push(unsorted[keys[e]]);
			}
			
			return out;
		},

		getMonthViewData : function(query, year, month) {

			var dataset = $.fn.thelittleboxoffice.convertDataSetToPerformance(
				$.fn.thelittleboxoffice.query(query, false)
			);

			dataset = $.fn.thelittleboxoffice.filterByYearAndMonth(dataset, year, month);
			dataset = $.fn.thelittleboxoffice.sortByStartDate(dataset);
			dataset = $.fn.thelittleboxoffice.addFormattedStartDate(dataset);
			
			return dataset;
		},
		
		filterByYearAndMonth : function(dataset, year, month) {

			var filtered = [];
			
			for (var p = 0; p < dataset.length; p++) {
				if (parseInt(dataset[p].start_date.split("-")[1]) == parseInt(month) &&
						parseInt(dataset[p].start_date.split("-")[0]) == parseInt(year)) {

					filtered.push(dataset[p]);
				}
			}
			
			return filtered;
		},

		addFormattedStartDate : function(dataset) {

			var weekdays = $.fn.thelittleboxoffice.getWeekDays();

			for (var p = 0; p < dataset.length; p++) {
				
				var start_date = $.fn.thelittleboxoffice.strToDate(dataset[p].start_date + ' ' + dataset[p].start_time);
				var weekdays = $.fn.thelittleboxoffice.getWeekDays();

				dataset[p].start_date_day = weekdays[start_date.getDay()];
				dataset[p].start_date_month_day = start_date.getDate();
				dataset[p].start_date_short = start_date.getMinutes() + ":" + start_date.getHours();
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