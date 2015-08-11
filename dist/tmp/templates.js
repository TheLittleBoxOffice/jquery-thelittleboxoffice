this["templates"] = this["templates"] || {};

this["templates"]["src/templates/billboard/billboard_item.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "\n	<div class=\"lbo-billboard-item\">\n		<div class=\"lbo-crop\">\n			<img src=\""
    + alias3(((helper = (helper = helpers.image_large || (depth0 != null ? depth0.image_large : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"image_large","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "\"/>\n		</div>\n		<h1 class=\"lbo-title\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\n		<p class=\"lbo-teaser\">"
    + ((stack1 = ((helper = (helper = helpers.teaser || (depth0 != null ? depth0.teaser : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"teaser","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>\n		<a href=\""
    + alias3(((helper = (helper = helpers.link_view || (depth0 != null ? depth0.link_view : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"link_view","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn-primary\" role=\"button\">Learn more »</a>\n	</div>\n";
},"useData":true});

this["templates"]["src/templates/carousel/carousel_item.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"item\" >\n	<div class=\"lbo-content\">\n		<h3 class=\"lbo-title\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h3>\n		<p class=\"lbo-teaser\">"
    + ((stack1 = ((helper = (helper = helpers.teaser || (depth0 != null ? depth0.teaser : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"teaser","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "<div class=\"paragraph-end details-light\"></div></p>\n		<a href=\""
    + alias3(((helper = (helper = helpers.link_view || (depth0 != null ? depth0.link_view : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"link_view","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn-primary\" role=\"button\">Learn more »</a>\n	</div>\n	<div class=\"lbo-image\">\n		<img src=\""
    + alias3(((helper = (helper = helpers.image_large || (depth0 != null ? depth0.image_large : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"image_large","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "\"/>\n	</div>\n</div>";
},"useData":true});

this["templates"]["src/templates/carousel/carousel_wrapper.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div id=\"owl-example\" class=\"owl-carousel\">\n\n	<!-- Wrapper for slides -->\n	"
    + ((stack1 = ((helper = (helper = helpers.items_html || (depth0 != null ? depth0.items_html : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"items_html","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n	\n	\n		\n</div>";
},"useData":true});

this["templates"]["src/templates/list/list_group.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function";

  return "<div class=\"group\">\n	<span class=\"title\">"
    + this.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</span>\n	<div class=\"content\">\n		"
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n	</div>\n</div>";
},"useData":true});

this["templates"]["src/templates/list/list_item.html"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "			<div class=\"lbo-crop\">\n				<img src=\""
    + alias3(((helper = (helper = helpers.image_large || (depth0 != null ? depth0.image_large : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"image_large","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "\"/>\n			</div>\n";
},"3":function(depth0,helpers,partials,data) {
    var helper, alias1=this.escapeExpression;

  return "				<li><a href=\"#\" data-performance-id=\""
    + alias1(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias1(this.lambda((depth0 != null ? depth0.start_date_formatted : depth0), depth0))
    + "</a></li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.escapeExpression, alias2=helpers.helperMissing, alias3="function";

  return "\n	<div class=\"lbo-list-item "
    + alias1(this.lambda(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.item_class : stack1), depth0))
    + " lbo-list-item-"
    + alias1(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-event-id=\""
    + alias1(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n		<a href=\""
    + alias1(((helper = (helper = helpers.link_view || (depth0 != null ? depth0.link_view : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(depth0,{"name":"link_view","hash":{},"data":data}) : helper)))
    + "\" class=\"lbo-title\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.image_small : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "			<ul class=\"lbo-list-item-performances\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.performances : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "			</ul>\n			<div class=\"lbo-list-item-title\">"
    + alias1(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</div>\n			<div class=\"lbo-list-item-date-summary\">\n				"
    + alias1(((helper = (helper = helpers.on_from_formatted || (depth0 != null ? depth0.on_from_formatted : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(depth0,{"name":"on_from_formatted","hash":{},"data":data}) : helper)))
    + "\n			</div>\n			<div class=\"lbo-list-item-controls\">\n				<button class=\"lbo-list-item-btn-performances btn btn-default\" type=\"button\" class=\"btn btn-xs btn-primary\" data-event-id=\""
    + alias1(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n					<span class=\"glyphicon glyphicon-calendar\"></span>\n				</button>\n			</div>\n		</a>\n	</div>\n";
},"useData":true});

this["templates"]["src/templates/misc/category_list.html"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "    <li>"
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + " &#58; "
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<ul>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.categories : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});

this["templates"]["src/templates/month_view/month_view_base.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"lbo-month-view\">\n	\n	"
    + ((stack1 = ((helper = (helper = helpers.month_select || (depth0 != null ? depth0.month_select : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"month_select","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n\n	<ul class=\"lbo-performances\">\n		\n	</ul>\n</div>\n";
},"useData":true});

this["templates"]["src/templates/month_view/month_view_performance.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<li>	\n	<div class=\"lbo-image\">\n		<img src=\""
    + alias3(((helper = (helper = helpers.image_large || (depth0 != null ? depth0.image_large : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"image_large","hash":{},"data":data}) : helper)))
    + "\" />\n	</div>\n	<span class=\"lbo-time\">\n		<span class=\"lbo-start-month-day\">"
    + alias3(((helper = (helper = helpers.start_date_month_day || (depth0 != null ? depth0.start_date_month_day : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"start_date_month_day","hash":{},"data":data}) : helper)))
    + "</span>\n		<span class=\"lbo-start-day\">"
    + alias3(((helper = (helper = helpers.start_date_day || (depth0 != null ? depth0.start_date_day : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"start_date_day","hash":{},"data":data}) : helper)))
    + "</span>\n	</span>\n	<div class=\"lbo-title\">\n		<a href=\""
    + alias3(((helper = (helper = helpers.link_book || (depth0 != null ? depth0.link_book : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"link_book","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n	</div>\n</li>";
},"useData":true});

this["templates"]["src/templates/month_view/month_view_select.html"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "			<option value=\""
    + alias2(alias1((depth0 != null ? depth0.month : depth0), depth0))
    + "_"
    + alias2(alias1((depth0 != null ? depth0.year : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.text_month : depth0), depth0))
    + " "
    + alias2(alias1((depth0 != null ? depth0.year : depth0), depth0))
    + "</option>	\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "	<select class=\"form-control\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.active_months : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	</select>";
},"useData":true});

this["templates"]["src/templates/search/search_form.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<form id=\"lbo-form-search\" name=\"lbo-form-search\" class=\"form-inline\">\n	<div class=\"input-group lbo-search-text\">\n		<input name=\"search\" type=\"text\" class=\"form-control\" placeholder=\"Search\"/>\n	</div>\n	<div class=\"input-group lbo-search-category\">\n		<select name=\"category[]\" class=\"selectpicker\" multiple=\"true\" title=\"Category\"></select>\n	</div>\n	<div class=\"input-group date lbo-search-datepicker\">\n		<input type=\"text\" class=\"form-control\" placeholder=\"Date\"/>\n		<span class=\"input-group-addon\">\n			<span class=\"glyphicon glyphicon-calendar\"></span>\n		</span>\n	</div>	\n</form>";
},"useData":true});

this["templates"]["src/templates/search/search_group.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"lbo-search-group "
    + alias3(((helper = (helper = helpers.group_class || (depth0 != null ? depth0.group_class : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"group_class","hash":{},"data":data}) : helper)))
    + "\">\n	<h2>"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\n	<div id=\"lbo-search-group-content-"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"lbo-search-group-content\"></div>\n</div>";
},"useData":true});

this["templates"]["src/templates/search/search_wrapper.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"lbo-search\">\n\n	"
    + ((stack1 = ((helper = (helper = helpers.search_form || (depth0 != null ? depth0.search_form : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"search_form","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n\n	<div class=\"lbo-search-results\"></div>\n\n</div>";
},"useData":true});