this["templates"] = this["templates"] || {};

this["templates"]["src/templates/billboard/billboard_item.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "\n	<div class=\"lbo-billboard-item\">\n		<div class=\"lbo-crop\">\n			<img src=\""
    + escapeExpression(((helper = (helper = helpers.image_large || (depth0 != null ? depth0.image_large : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"image_large","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "\"/>\n		</div>\n		<h1 class=\"lbo-title\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\n		<p class=\"lbo-teaser\">";
  stack1 = ((helper = (helper = helpers.teaser || (depth0 != null ? depth0.teaser : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"teaser","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</p>\n		<a href=\""
    + escapeExpression(((helper = (helper = helpers.link_view || (depth0 != null ? depth0.link_view : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"link_view","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn-primary btn-lg\" role=\"button\">Learn more »</a>\n	</div>\n";
},"useData":true});



this["templates"]["src/templates/list/list_item.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "\n	<div class=\"lbo-list-item\">\n		<div class=\"lbo-crop\">\n			<img src=\""
    + escapeExpression(((helper = (helper = helpers.image_small || (depth0 != null ? depth0.image_small : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"image_small","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "\"/>\n		</div>\n		<a href=\""
    + escapeExpression(((helper = (helper = helpers.link_view || (depth0 != null ? depth0.link_view : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"link_view","hash":{},"data":data}) : helper)))
    + "\" class=\"lbo-title\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n	</div>\n";
},"useData":true});



this["templates"]["src/templates/misc/category_list.html"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "    <li>"
    + escapeExpression(lambda((depth0 != null ? depth0.id : depth0), depth0))
    + " &#58; "
    + escapeExpression(lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<ul>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.categories : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</ul>";
},"useData":true});



this["templates"]["src/templates/month_view/month_view_base.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "<div class=\"lbo-month-view\">\n	\n	";
  stack1 = ((helper = (helper = helpers.month_select || (depth0 != null ? depth0.month_select : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"month_select","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n\n	<ul class=\"lbo-performances\">\n		\n	</ul>\n</div>\n";
},"useData":true});



this["templates"]["src/templates/month_view/month_view_performance.html"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li>	\n	<div class=\"lbo-image\">\n		<img src=\""
    + escapeExpression(((helper = (helper = helpers.image_large || (depth0 != null ? depth0.image_large : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"image_large","hash":{},"data":data}) : helper)))
    + "\" />\n	</div>\n	<span class=\"lbo-time\">\n		<span class=\"lbo-start-month-day\">"
    + escapeExpression(((helper = (helper = helpers.start_date_month_day || (depth0 != null ? depth0.start_date_month_day : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"start_date_month_day","hash":{},"data":data}) : helper)))
    + "</span>\n		<span class=\"lbo-start-day\">"
    + escapeExpression(((helper = (helper = helpers.start_date_day || (depth0 != null ? depth0.start_date_day : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"start_date_day","hash":{},"data":data}) : helper)))
    + "</span>\n	</span>\n	<div class=\"lbo-title\">\n		<a href=\""
    + escapeExpression(((helper = (helper = helpers.link_book || (depth0 != null ? depth0.link_book : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"link_book","hash":{},"data":data}) : helper)))
    + "\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</a>\n	</div>\n</li>";
},"useData":true});



this["templates"]["src/templates/month_view/month_view_select.html"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "			<option value=\""
    + escapeExpression(lambda((depth0 != null ? depth0.month : depth0), depth0))
    + "_"
    + escapeExpression(lambda((depth0 != null ? depth0.year : depth0), depth0))
    + "\">"
    + escapeExpression(lambda((depth0 != null ? depth0.text_month : depth0), depth0))
    + " "
    + escapeExpression(lambda((depth0 != null ? depth0.year : depth0), depth0))
    + "</option>	\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "	<select class=\"form-control\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.active_months : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "	</select>";
},"useData":true});