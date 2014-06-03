/*
 *  jQuery Boilerplate - v3.3.2
 *  A jump-start for jQuery plugins development.
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "lboComponents",
			defaults = {
				client_id: 0,
				view_type: "list",
				categories: []
			};

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = element;
			// jQuery has an extend method which merges the contents of two or
			// more objects, storing the result in the first object. The first object
			// is generally empty as we don't want to alter the default options for
			// future instances of the plugin
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		Plugin.prototype = {
			init: function () {
				// Place initialization logic here
				// You already have access to the DOM element and
				// the options via the instance, e.g. this.element
				// and this.settings
				// you can add more functions like the one below and
				// call them like so: this.yourOtherFunction(this.element, this.settings).
				this.build(this, this.element, this.settings);
				this.readSelectionFromCookies(this, this.element, this.settings);
				this.filterSelect_Change(this, this.element, this.settings);
			},
			build: function(plugin, element, settings) {	

				var html = '';
				var events = this.getEventsData();

				plugin.encodeFilters(plugin, element, settings);

				html += '<ul class="' + this.getWrapperClasses(element, settings) + '">';
				$(events).each(function(index, value) {
					html += plugin.encodeItem(plugin, element, settings, value);
				});
				html += '</ul>';

				$(element).append(html);
			},
			getWrapperClasses: function(element, settings) {

				switch (settings.view_type) {
					case "list":
						return 'lbo-events-list';
						break;
					case "grid":
						return 'lbo-events-grid cs-style-3 grid';
						break;
				}
			},
			getEventsData: function() {
				return lbo_events;
			},
			getCategoriesData: function() {
				return lbo_categories;
			},
			getVenuesData: function() {
				return lbo_venues;
			},
			filterSelect_Change: function(plugin, element, settings) {

				var category_id = $(element).find('select.lbo-filter-category').val();
				var category_item_array = [];
				var venue_id = $(element).find('select.lbo-filter-venue').val();
				var venue_item_id = null;
				var found = false;

				$(element).find('.lbo-event').each(function(index, value) {

					found = false;
					category_item_array = $(value).find('input.lbo-item-categories').val().split('==[]==');
					venue_item_id = $(value).find('input.lbo-item-venue').val();
					
					// category search
					if (category_id != 0) {
						for (var x = 0; x < category_item_array.length; x++) {
							if (category_item_array[x] == category_id) {
								found = true;
							}
						}
					} else {
						found = true;
					}
					
					// venue search
					if (found == true && venue_id != 0 && venue_item_id != venue_id) {
						found = false;
					}
					
					if (!found) {
						$(value).css('display', 'none');
					} else {
						$(value).css('display', 'block');
					}

					found = false;
				});

				plugin.saveSelectionToCookies(plugin, element, settings);
			},
			saveSelectionToCookies: function(plugin, element, settings) {
				var category_id = $(element).find('select.lbo-filter-category').val();
				var venue_id = $(element).find('select.lbo-filter-venue').val();
				plugin.setCookie("lbo_category_id", category_id, 7);
				plugin.setCookie("lbo_venue_id", venue_id, 7);
			},
			readSelectionFromCookies: function(plugin, element, settings) {			
				var category_id = (plugin.getCookie("lbo_category_id") == null) ? "0" : plugin.getCookie("lbo_category_id");
				var venue_id = (plugin.getCookie("lbo_venue_id") == null) ? "0" : plugin.getCookie("lbo_venue_id");
				$(element).find('select.lbo-filter-category').val(category_id);
				$(element).find('select.lbo-filter-venue').val(venue_id);
			},
			encodeFilters: function(plugin, element, settings) {
				
				var categories_select = $('<select class="lbo-filter-category"></select>').appendTo(element);
				var categories = plugin.getCategoriesData();

				var venues_select = $('<select class="lbo-filter-venue"></select>').appendTo(element);
				var venues = plugin.getVenuesData();
		
				$("<option />", {value: 0, text: "All Categories"}).appendTo(categories_select);
				for (var i = 0; i < categories.length; i++) {
					$("<option />", {value: categories[i].id, text: categories[i].title}).appendTo(categories_select);
				}
				$("<option />", {value: 0, text: "All Venues"}).appendTo(venues_select);
				for (i = 0; i < venues.length; i++) {
					$("<option />", {value: venues[i].id, text: venues[i].title}).appendTo(venues_select);
				}
				categories_select.change(function() {
					plugin.filterSelect_Change(plugin, element, settings);
				});		
				venues_select.change(function() {
					plugin.filterSelect_Change(plugin, element, settings);
				});				
			},
			encodeItem: function(plugin, element, settings, event) {
				switch (settings.view_type) {
					case "list":
						return plugin.viewList(event);
						break;
					case "grid":
						return plugin.viewGrid(event);
						break;
				}
			},
			viewList: function(event) {
				return	'<li class="lbo-event lbo-event-' + event.id + '">' +
							'<figure>' +
								'<div class="crop"><img src="' + event.image_large + '"/></div>' +
								'<input type="hidden" class="lbo-item-categories" value="' + event.categories.join('==[]==') + '"/>' +
								'<input type="hidden" class="lbo-item-venue" value="' + event.venue_id + '"/>' +
								'<figcaption>' +
									'<h3>' + event.title + '</h3>' +
									'<span>' + event.teaser + '</span>' +
									'<a href="' + event.link + '">Book Tickets</a>' +
								'</figcaption>' +
							'</figure>' +
						'</li>';
			},
			viewGrid: function(event) {
				return	'<li>' +
							'<figure class="lbo-eb-event">' + 
								'<div class="crop"><img src="' + event.image_large + '"/></div>' +
								'<figcaption>' +
									'<h3>' + event.title + '</h3>' +
									'<span>' + event.teaser + '</span>' +
									'<a href="' + event.link + '">Book Tickets</a>' +
								'</figcaption>' +
							'</figure>' +
						'</li>';
			},
			setCookie: function(name,value,days) {
				if (days) {
					var date = new Date();
					date.setTime(date.getTime()+(days*24*60*60*1000));
					var expires = "; expires="+date.toGMTString();
				}
				else var expires = "";
				document.cookie = name+"="+value+expires+"; path=/";
			},
			getCookie: function(name) {
				var nameEQ = name + "=";
				var ca = document.cookie.split(';');
				for(var i=0;i < ca.length;i++) {
					var c = ca[i];
					while (c.charAt(0)==' ') c = c.substring(1,c.length);
					if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
				}
				return null;
			},
			hasSelectValue: function(select, value) {
				$(select).find('option').each(function(index, value) {
					
				});
			}
		};

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
			this.each(function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
				}
			});

			// chain jQuery functions
			return this;
		};

})( jQuery, window, document );
