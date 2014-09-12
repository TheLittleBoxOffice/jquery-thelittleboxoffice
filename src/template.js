(function ( $ ) {
	$.extend($.fn.thelittleboxoffice, {

		template : function(dataset, template_name) {
			return this.bakeTemplate(
				this.getTemplate(template_name), 
				dataset
			);
		},

		getTemplate : function(template_name) {
			return templates["src/templates/standard.hbs"];
		},

		bakeTemplate : function(template, dataset) {
			return template(dataset);
		}
	});
}( jQuery ));