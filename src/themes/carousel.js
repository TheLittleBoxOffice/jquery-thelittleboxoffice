(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		themeCarouselEncode : function(dataset, options) {
			
			var html = '';
			var items_html = '';
			var data_item = null;

			console.log(dataset);

			for (var i = 0; i < dataset.length; i++) {
				data_item = dataset[i];
				data_item.first = (i == 0) ? true : false;
				items_html = items_html + $.fn.thelittleboxoffice.template(dataset[i], "carousel/carousel_item");
			}

			return $.fn.thelittleboxoffice.template({items_html: items_html}, "carousel/carousel_wrapper");
		}		

	});
}( jQuery ));