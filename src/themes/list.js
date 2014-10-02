(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		themeListEncode : function(dataset) {
			
			var html = '';
			for (var i = 0; i < dataset.length; i++) {
				html = html + $.fn.thelittleboxoffice.template(dataset[i], "list/list_item");
			}
			return html;
		}		

	});
}( jQuery ));