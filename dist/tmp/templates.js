this["templates"] = this["templates"] || {};

this["templates"]["src/templates/billboard/billboard_item.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\n	<div class=\"lbo-billboard-item\">\n		<div class=\"lbo-crop\">\n			<img src=\"";
  if (helper = helpers.image_large) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.image_large); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"/>\n		</div>\n		<h1 class=\"lbo-title\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h1>\n		<p class=\"lbo-teaser\">";
  if (helper = helpers.teaser) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.teaser); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n		<a href=\"";
  if (helper = helpers.link_view) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.link_view); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"btn btn-primary btn-lg\" role=\"button\">Learn more »</a>\n	</div>\n";
  return buffer;
  });

this["templates"]["src/templates/list/list_item.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\n	<div class=\"lbo-list-item\">\n		<div class=\"lbo-crop\">\n			<img src=\"";
  if (helper = helpers.image_small) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.image_small); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" alt=\"";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"/>\n		</div>\n		<a href=\"";
  if (helper = helpers.link_view) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.link_view); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"lbo-title\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a>\n	</div>\n";
  return buffer;
  });

this["templates"]["src/templates/misc/category_list.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " &#58; "
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n";
  return buffer;
  }

  buffer += "<ul>\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.categories), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>";
  return buffer;
  });

this["templates"]["src/templates/month_view/month_view_base.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function";


  buffer += "<div class=\"lbo-month-view\">\n	\n	";
  if (helper = helpers.month_select) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.month_select); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	<ul class=\"lbo-performances\">\n		\n	</ul>\n</div>\n";
  return buffer;
  });

this["templates"]["src/templates/month_view/month_view_performance.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li>	\n	<div class=\"lbo-image\">\n		<img src=\"";
  if (helper = helpers.image_large) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.image_large); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n	</div>\n	<span class=\"lbo-time\">\n		<span class=\"lbo-start-month-day\">";
  if (helper = helpers.start_date_month_day) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.start_date_month_day); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n		<span class=\"lbo-start-day\">";
  if (helper = helpers.start_date_day) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.start_date_day); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\n	</span>\n	<div class=\"lbo-title\">\n		<a href=\"";
  if (helper = helpers.link_book) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.link_book); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a>\n	</div>\n</li>";
  return buffer;
  });

this["templates"]["src/templates/month_view/month_view_select.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<option value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.month)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "_"
    + escapeExpression(((stack1 = (depth0 && depth0.year)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.text_month)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.year)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>	\n		";
  return buffer;
  }

  buffer += "	<select class=\"form-control\">\n		";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.active_months), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</select>";
  return buffer;
  });