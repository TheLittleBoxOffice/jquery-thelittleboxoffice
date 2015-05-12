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

  return "<div class=\"item\">\n	<div class=\"carousel-caption\">\n		<img src=\""
    + alias3(((helper = (helper = helpers.image_large || (depth0 != null ? depth0.image_large : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"image_large","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "\"/>\n		<h1 class=\"lbo-title\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\n		<p class=\"lbo-teaser\">"
    + ((stack1 = ((helper = (helper = helpers.teaser || (depth0 != null ? depth0.teaser : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"teaser","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>\n		<a href=\""
    + alias3(((helper = (helper = helpers.link_view || (depth0 != null ? depth0.link_view : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"link_view","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn-primary\" role=\"button\">Learn more »</a>\n	</div>\n</div>";
},"useData":true});

this["templates"]["src/templates/carousel/carousel_wrapper.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div id=\"myCarousel\" class=\"carousel slide\" data-ride=\"carousel\">\n	<!-- Indicators -->\n	<ol class=\"carousel-indicators\">\n		<li data-target=\"#myCarousel\" data-slide-to=\"0\" class=\"active\"></li>\n		<li data-target=\"#myCarousel\" data-slide-to=\"1\"></li>\n		<li data-target=\"#myCarousel\" data-slide-to=\"2\"></li>\n		<li data-target=\"#myCarousel\" data-slide-to=\"3\"></li>\n	</ol>\n\n	<!-- Wrapper for slides -->\n	<div class=\"carousel-inner\" role=\"listbox\">\n		"
    + ((stack1 = ((helper = (helper = helpers.items_html || (depth0 != null ? depth0.items_html : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"items_html","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n	</div>\n\n	<!-- Left and right controls -->\n	<a class=\"left carousel-control\" href=\"#myCarousel\" role=\"button\" data-slide=\"prev\">\n		<span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\"></span>\n		<span class=\"sr-only\">Previous</span>\n	</a>\n	<a class=\"right carousel-control\" href=\"#myCarousel\" role=\"button\" data-slide=\"next\">\n		<span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span>\n		<span class=\"sr-only\">Next</span>\n	</a>\n	</div>";
},"useData":true});

this["templates"]["src/templates/list/list_item.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "\n	<div class=\"lbo-list-item\">\n		<div class=\"lbo-crop\">\n			<img src=\""
    + alias3(((helper = (helper = helpers.image_small || (depth0 != null ? depth0.image_small : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"image_small","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "\"/>\n		</div>\n		<a href=\""
    + alias3(((helper = (helper = helpers.link_view || (depth0 != null ? depth0.link_view : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"link_view","hash":{},"data":data}) : helper)))
    + "\" class=\"lbo-title\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n	</div>\n";
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