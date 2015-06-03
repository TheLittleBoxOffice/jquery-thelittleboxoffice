(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		apiGetCategoryByIds : function(category_ids) {

			var out = new Array();

			for (var i = 0; i < category_ids.length; i++) {
				for (var c = 0; c < lbo_categories.length; c++) {
					if (lbo_categories[c].id == category_ids[i]) 
						out.push(lbo_categories[c]);
				}
			}

			return out;
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