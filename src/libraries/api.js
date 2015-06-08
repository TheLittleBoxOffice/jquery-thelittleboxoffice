(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		apiGetCategoryByIds : function(category_ids) {

			var out = new Array();

			for (var i = 0; i < category_ids.length; i++) {
				out.push($.fn.thelittleboxoffice.apiGetCategoryById(category_ids[i]));
			}

			return out;
		},

		apiGetCategoryById : function(category_id) {
			for (var c = 0; c < lbo_categories.length; c++) {
				if (lbo_categories[c].id == category_id) 
					return lbo_categories[c];
			}
			return false;
		},

		apiCategoriesToIdString : function(categories) {

			var out = '';
			for (var c = 0; c < categories.length; c++) {
				if (out != '') out += ',';
				out += categories[c].id;
			}
			return out;
		}
		
	});
}( jQuery ));