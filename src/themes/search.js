(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		themeSearchEncode : function(dataset, options) {
			
			var html = '';

			var data = {
				search_form : $.fn.thelittleboxoffice.template(null, "search/search_form")
			}

			html = html + $.fn.thelittleboxoffice.template(data, "search/search_wrapper");

			return html;
		},

		themeSearchScript : function(options) {

			// setup the datepicker
			$('.lbo-search-datepicker').datetimepicker();

			// setup the categories dropdown
			var ele_categories = $('form[name="lbo-form-search"] select[name="category"]');
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
		},

		themeSearchExecuteSearch : function(options) {
			
			var query = '';
			var ele_results = $('.lbo-search-results');
			var ele_categories = $('form[name="lbo-form-search"] select[name="category"]');

			ele_results.html('');
			
			if (ele_categories.val() > 0) 
				query += 'category_id=' + ele_categories.val() + ';';
			
			$.fn.thelittleboxoffice.build({
				query : query,
				target : ele_results,
				theme : 'list',
				item_class : 'card'
			});
		}

	});
}( jQuery ));