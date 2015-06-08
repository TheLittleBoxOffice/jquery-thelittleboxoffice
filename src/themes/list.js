(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		themeListEncode : function(dataset, options) {
			
			var html = '';
			var html_group = '';
			var i = null;

			if (dataset.cursor_with_object_group === false) {
				for (i = 0; i < dataset.length; i++) {
					dataset.data[i].options = options;
					html = html + $.fn.thelittleboxoffice.themeListItemEncode(dataset[i], options);
				}
			} else {
				for (var index in dataset.data) {
					html_group = '';
					
					for (i = 0; i < dataset.data[index].data.length; i++) 
						html_group = html_group + $.fn.thelittleboxoffice.themeListItemEncode(dataset.data[index].data[i], options);
					
					html = html + $.fn.thelittleboxoffice.template({
						title : dataset.data[index].title, 
						content : html_group
					}, "list/list_group");
				}
			}

			return html;
		},

		themeListItemEncode : function(data_item, options) {
			return $.fn.thelittleboxoffice.template(data_item, "list/list_item");
		}

	});
}( jQuery ));