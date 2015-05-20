(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		themeListEncode : function(dataset, options) {
			
			var html = '';
			for (var i = 0; i < dataset.length; i++) {
				dataset[i].options = options;
				html = html + $.fn.thelittleboxoffice.template(dataset[i], "list/list_item");
			}
			return html;
		}		

	});
}( jQuery ));