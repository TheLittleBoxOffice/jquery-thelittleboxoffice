(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		themeSearchTextTimerId : null,

		themeSearchEncode : function(dataset, options) {
			return $.fn.thelittleboxoffice.template({ 
				search_form : $.fn.thelittleboxoffice.template(null, "search/search_form") 
			}, "search/search_wrapper");
		},

		themeSearchScript : function(options) {

			var ele_categories = $('form[name="lbo-form-search"] select[name="category[]"]');
			var ele_search = $('form[name="lbo-form-search"] input[name="search"]');

			// setup the categories dropdown
			ele_categories.append('<option value="0"></option>');
			for (var c = 0; c < lbo_categories.length; c++) {
				ele_categories.append('<option value="' + lbo_categories[c].id + '">' + lbo_categories[c].title + '</option>');
			}
			ele_categories.change(function() {
				$('form#lbo-form-search').submit();
			});

			// handle the text search
			$('input[name="search"]').keyup(function() {
				clearTimeout($.fn.thelittleboxoffice.themeSearchTextTimerId);
				$.fn.thelittleboxoffice.themeSearchTextTimerId = setTimeout(function() {
					$.fn.thelittleboxoffice.themeSearchExecuteSearch(options);
				}, 200);
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

		themeSearchDatePicker_Change : function (e) {
			$('form#lbo-form-search').submit();
		},

		themeSearchDatePickerUpdate : function(enabled_dates) {

			$('.lbo-search-datepicker').off("dp.change", $.fn.thelittleboxoffice.themeSearchDatePicker_Change);

			if ($('.lbo-search-datepicker').data("DateTimePicker") != undefined) {
				$('.lbo-search-datepicker').data("DateTimePicker").destroy();
			}

			$('.lbo-search-datepicker').datetimepicker({
				format : 'DD MMMM YYYY',
				enabledDates : (enabled_dates === false) ? false : enabled_dates
			});

			$('.lbo-search-datepicker').on("dp.change", $.fn.thelittleboxoffice.themeSearchDatePicker_Change);
		},

		themeSearchExecuteSearch : function(options) {

			var query = '';
			var ele_results = $('.lbo-search-results');
			var ele_categories = $('form[name="lbo-form-search"] select[name="category[]"]');
			var categories = lbo_categories;
			var ele_group = null;
			var categories_id_string = '';
			var search_date_string = '';
			var search_string = $('input[name="search"]').val();

			ele_results.html('');

			$.fn.thelittleboxoffice.themeSearchDatePickerUpdate(false);

			if (ele_categories.val() != null && ele_categories.val().length > 0)
				categories = $.fn.thelittleboxoffice.apiGetCategoryByIds(ele_categories.val());

			for (var c = 0; c < categories.length; c++)
				categories_id_string += (categories_id_string == '') ? categories[c].id : ',' + categories[c].id;

			if ($('.lbo-search-datepicker').data("DateTimePicker").date() != null)
				search_date_string = 'start_date=' + $('.lbo-search-datepicker').data("DateTimePicker").date().format("YYYY-MM-DD") + ';';

			var dataset = $.fn.thelittleboxoffice.build({
				query : 'search=' + search_string + ';category_id=' + categories_id_string + ';order_desc=count;group=category;' + search_date_string,
				target : ele_results,
				theme : 'list',
				item_class : options.item_class
			});

			$('.lbo-list-item-btn-performances').each(function(index, value) {
				$(value).click(function(event) {

					// fire the calendar button click event
					if (options.calendar_button_click != null) 
						options.calendar_button_click(value, $(value).data("event-id"));
					
					event.preventDefault();
				});
			});

			// fire the change events
			if (options.search_change != null)
				options.search_change(dataset, categories);
		}
	});
}( jQuery ));
