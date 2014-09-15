(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		themeBillboardEncode : function(dataset) {
			
			var html = '';

			for (var i = 0; i < dataset.length; i++) {
				console.log(dataset[i]);
				html = html + $.fn.thelittleboxoffice.template(dataset[i], "billboard/billboard_item");
			}

			return html;

		}

	});
}( jQuery ));