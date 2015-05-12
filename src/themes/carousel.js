(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		themeCarouselEncode : function(dataset) {
			
			var html = '';
			var items_html = '';

			for (var i = 0; i < dataset.length; i++) {
				items_html = items_html + $.fn.thelittleboxoffice.template(dataset[i], "carousel/carousel_item");
			}

			return $.fn.thelittleboxoffice.template({items_html: items_html}, "carousel/carousel_wrapper");
		}		

	});
}( jQuery ));