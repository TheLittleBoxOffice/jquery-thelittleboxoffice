(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		themeSearchEncode : function(dataset, options) {
			var data = { search_form : $.fn.thelittleboxoffice.template(null, "search/search_form") };
			return $.fn.thelittleboxoffice.template(data, "search/search_wrapper");
		},

		themeSearchScript : function(options) {

			// setup the datepicker
			$('.lbo-search-datepicker').datetimepicker({
				format : 'DD MMMM YYYY',
				enabledDates : $.fn.thelittleboxoffice.themeSearchGetAvailableDates()
			});
			$('.lbo-search-datepicker').on("dp.change", function (e) {
				$('form#lbo-form-search').submit();
			});

			// setup the categories dropdown
			var ele_categories = $('form[name="lbo-form-search"] select[name="category[]"]');
			ele_categories.append('<option value="0"></option>');
			for (var c = 0; c < lbo_categories.length; c++) {
				ele_categories.append('<option value="' + lbo_categories[c].id + '">' + lbo_categories[c].title + '</option>');
			}
			ele_categories.change(function() {
				$('form#lbo-form-search').submit();
			});

			// setup the form
			$('form#lbo-form-search').submit(function(event) {
				$.fn.thelittleboxoffice.themeSearchExecuteSearch(options);
				event.preventDefault();
				return false;
			});

			// fire the search
			$.fn.thelittleboxoffice.themeSearchExecuteSearch(options);
		},

		themeSearchGetAvailableDates : function(events) {

			for (var e = 0; e < lbo_events.length; e++) {
				for (var p = 0; p < lbo_events[e].performances[p]; p++) {
					console.log(lbo_events[e].performances[p]);
				}
			}
		},

		themeSearchExecuteSearch : function(options) {
			
			var query = '';
			var ele_results = $('.lbo-search-results');
			var ele_categories = $('form[name="lbo-form-search"] select[name="category[]"]');
			var categories = lbo_categories;
			var ele_group = null;
			var categories_id_string = '';			
			var search_date_string = '';

			ele_results.html('');

			if ($('.lbo-search-datepicker').data("DateTimePicker").date() != null) 
				search_date_string = 'start_date=' + $('.lbo-search-datepicker').data("DateTimePicker").date().format("YYYY-MM-DD") + ';';
			
			if (ele_categories.val() != null && ele_categories.val().length > 0) 
				categories = $.fn.thelittleboxoffice.apiGetCategoryByIds(ele_categories.val());

			for (var c = 0; c < categories.length; c++) 
				categories_id_string += (categories_id_string == '') ? categories[c].id : ',' + categories[c].id;
			
			$.fn.thelittleboxoffice.build({
				query : 'category_id=' + categories_id_string + ';group_a=category;' + search_date_string,
				target : ele_results,
				theme : 'list'
			});
			
			// fire the change events
			if (options.change != null)
				options.change(categories);
		}
	});
}( jQuery ));