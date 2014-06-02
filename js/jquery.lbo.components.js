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
			filterSelect_Change: function(plugin, element, settings) {

				var category_id = $(element).find('select.lbo-filter').val();
				var category_item_array = [];
				var found = false;

				$(element).find('.lbo-event').each(function(index, value) {
					category_item_array = $(value).find('input.lbo-item-categories').val().split('==[]==');
					found = false;
					for (var x = 0; x < category_item_array.length; x++) {
						if (category_item_array[x] == category_id) {
							found = true;
						}
					}
					if (!found) {
						$(value).css('display', 'none');
					} else {
						$(value).css('display', 'block');
					}
					found = false;
				});
			},
			encodeFilters: function(plugin, element, settings) {
				
				var select = $('<select class="lbo-filter"></select>').appendTo(element);
				var categories = plugin.getCategoriesData();
				
				for (var i = 0; i < categories.length; i++) {
					$("<option />", {value: categories[i].id, text: categories[i].title}).appendTo(select);
				}

				select.change(function() {
					plugin.filterSelect_Change(plugin, element, settings);
				});				
			},
			encodeItem: function(plugin, element, settings, event) {
				switch (settings.view_type) {
					case "list":
						return plugin.viewList(event);
						break;
					case "grid":
						return plugin.viewEvent(event);
						break;
				}
			},
			viewList: function(event) {
				
				return	'<li class="lbo-event lbo-event-' + event.id + '">' +
							'<figure>' + 
								'<div class="crop"><img src="' + event.image_large + '"/></div>' +
								'<input type="hidden" class="lbo-item-categories" value="' + event.categories.join('==[]==') + '"/>' +
								'<figcaption>' +
									'<h3>' + event.title + '</h3>' +
									'<span>' + event.teaser + '</span>' +
									'<a href="' + event.link + '">Book Tickets</a>' +
								'</figcaption>' +
							'</figure>' +
						'</li>';
			},
			viewEvent: function(event) {
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














/*
(function( $ ){

	var defaults = {
	    client_id: 0,
	    view_type: "list"
	};
	
	var build = function(element) {	
		
		var events = getEventsData(element);
		var view_type = getOption(this, view_type);
		var html = '<ul class="' + getWrapperClasses() + '">';
		console.log(view_type);
		$(events).each(function(index, value) {
			encodeItem(view_type, value);
		});

		html += '</ul>';
		element.html(html);
	}

	var getWrapperClasses = function(view_type) {
		switch (view_type) {
			case "list":
				return '';
				break;
			case "grid":
				return 'cs-style-3 grid';
				break;
		}
	}

	var encodeItem = function(view_type, event) {
		switch (view_type) {
			case "list":
				return viewFilter(event);
				break;
			case "grid":
				return viewEvent(event);
				break;
		}
	}

	var viewFilter = function(event) {
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
	}

	var viewEvent = function(event) {
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
	}
	var getEventsData = function(element) {
		return lbo_events;		
	}
	var setPosition = function(element, animate) {
		
	}
	var onClickHandler = function() {
				
	}
	var getOption = function(inst, name) {
        var obj = $(inst).data("lbocomponents");
        return (obj || defaults)[name];
    }
	var setOption = function(inst, name, value) {
        var obj = $(inst).data("lbocomponents");
        if (!obj) {
            obj = $.extend({}, defaults);
            inst.data("lbocomponents", obj);
        }
        obj[name] = value;
    }
	var methods = {
	
		init : function(options) {
			
			// mix options with defaults and save
			var settings = $.extend( true, {}, defaults, options );
			this.data("lbocomponents", settings);
			
			// build the elements
			build(this);
						
		},
		click : function(callback) {
			setOption(this, 'click_callback', callback);
		},
		complete : function(callback) {
			setOption(this, 'complete_callback', callback);
		}
	};
	
	jQuery.fn.lbocomponents = function(method) {
		
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.lbo.eventsboard' );
		}
	}
	
})( jQuery );
*/