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
				categories: [],
				use_bootstrap: false,
				use_social_likes: true,
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
				var html = "";

				plugin.encodeFilters(plugin, element, settings);
								
				switch (settings.view_type) {
					case "list":
						html = plugin.buildList(plugin, element, settings);
						break;
					case "calendar-bar":
						html = plugin.buildCalendar(plugin, element, settings);
						break;
				}

				$(element).append(html);
				$('.social-likes').socialLikes();
			},
			buildList: function(plugin, element, settings) {
				var html = '';
				var events = this.getEventsData();
				html += '<ul class="' + plugin.getWrapperClasses(element, settings) + '">';
				$(events).each(function(index, event) {
					html += plugin.encodeItem(plugin, element, settings, event);
				});
				html += '</ul>';
				return html;
			},
			buildCalendar: function(plugin, element, settings) {
				var html = '';
				var performance_dates = this.getPerformancesByDateData(plugin, element, settings);
				
				html += '<div class="lbo-vertical-line"></div><ul class="' + plugin.getWrapperClasses(element, settings) + '">';
				for (var performance_date in performance_dates) {
					html += plugin.viewCalendar(plugin, element, settings, performance_dates[performance_date]);
				};
				html += '</ul>';

				return html;
			},
			getWrapperClasses: function(element, settings) {
				switch (settings.view_type) {
					case "list": return 'lbo-events-list';
					case "grid": return 'lbo-events-grid cs-style-3 grid';
					case "calendar-bar": return 'lbo-calendar-bar';
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
			getPerformancesByDateData: function(plugin, element, settings) {
				var events = plugin.getEventsData();
				var performances_sorted = [];
				var day_index = null , time_index = null; 
				$(events).each(function(index, event) {
					$(event.performances).each(function(index, performance) {
						day_index = performance.start_date.replace(/-/gi, "");
						time_index = day_index.concat(performance.start_time.replace(/:/gi, ""));
						performance_index = time_index.concat(performance.id);
						if (performances_sorted[day_index] == undefined) {
							performances_sorted[time_index] = [];
							performance.event = event;
							performances_sorted[time_index][performance_index] = performance;
						}
					});
				});
				return performances_sorted;
			},
			filterSelect_Change: function(plugin, element, settings) {

				var category_id = $(element).find('select.lbo-filter-category').val();
				var category_item_array = [];
				var venue_id = $(element).find('select.lbo-filter-venue').val();
				var venue_item_id = null;
				var found = false;

				$(element).find('.lbo-event').each(function(index, value) {

					// found = false;
					// category_item_array = $(value).find('input.lbo-item-categories').val().split('==[]==');
					// venue_item_id = $(value).find('input.lbo-item-venue').val();
					
					// // category search
					// if (category_id != 0) {
					// 	for (var x = 0; x < category_item_array.length; x++) {
					// 		if (category_item_array[x] == category_id) {
					// 			found = true;
					// 		}
					// 	}
					// } else {
					// 	found = true;
					// }
					
					// // venue search
					// console.log(venue_id, venue_item_id);
					// if (venue_id != 0 && venue_item_id != venue_id) {
					// 	found = false;
					// }
					
					// if (!found) {
					// 	$(value).css('display', 'none');
					// } else {
					// 	$(value).css('display', 'block');
					// }

					// found = false;
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
				switch (settings.view_type) {
					case "list":
						return plugin.encodeFiltersList(plugin, element, settings);
						break;
					case "calendar-bar":
						return plugin.encodeFiltersCalendarBar(plugin, element, settings);
						break;
				}
			},
			encodeFiltersCalendarBar: function(plugin, element, settings) {

			},
			encodeFiltersList: function(plugin, element, settings) {

				var categories_select = $('<select class="lbo-filter-category"></select>').appendTo(element);
				var categories = plugin.getCategoriesData();

				var venues_select = $('<select class="lbo-filter-venue"></select>').appendTo(element);
				var venues = plugin.getVenuesData();

				var months_select = $('<select class="lbo-filter-month"></select>').appendTo(element);
				var months = new Array();
				
				months[0] = "January";
				months[1] = "February";
				months[2] = "March";
				months[3] = "April";
				months[4] = "May";
				months[5] = "June";
				months[6] = "July";
				months[7] = "August";
				months[8] = "September";
				months[9] = "October";
				months[10] = "November";
				months[11] = "December";
				
				$("<option />", {value: 0, text: "All Months"}).appendTo(months_select);
				for (var i = 0; i < months.length; i++) {
					$("<option />", {value: i, text: months[i]}).appendTo(months_select);
				}
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
				months_select.change(function() {
					plugin.filterSelect_Change(plugin, element, settings);
				});
			},
			encodeSocialLikes: function(plugin, element, settings, event) {
				var out = "";
				if (settings.use_social_likes == true) {
					out = plugin.viewSocialLike(plugin, element, settings, event);
				}
				return out;
			},
			encodeItem: function(plugin, element, settings, event) {
				switch (settings.view_type) {
					case "list":
						return plugin.viewList(plugin, element, settings, event);
						break;
					case "grid":
						return plugin.viewGrid(plugin, element, settings, event);
						break;
				}
			},
			viewSocialLike: function(plugin, element, settings, event) {
				return '' + 
					'<div class="social-likes" data-counters="no" data-url="' + event.link + '" data-title="' + event.title + '">' +
						'<div class="facebook" title="Share link on Facebook">Facebook</div>' +
						'<div class="twitter" title="Share link on Twitter">Twitter</div>' +
						'<div class="plusone" title="Share link on Google+">Google+</div>' +
						'<div class="pinterest" title="Share image on Pinterest" data-media="' + event.image_large + '">Pinterest</div>' +
					'</div>';
			},
			viewCalendar: function(plugin, element, settings, performance_dates) {
				var html_main = '<div class="lbo-performance-date">';
				var html_performances = '';
				var html_date = '';

				for (var performance_date in performance_dates) {
					html_date = performance_dates[performance_date].start_date;
					html_performances += 
						'<div class="lbo-perfromance-date-item">' + 
							performance_dates[performance_date].start_time + 
							' ' + performance_dates[performance_date].event.title + 
						'</div>';
				}
				console.log(plugin.formatDate(html_date));
				html_main += '<div class="lbo-date-header">' + html_date + '</div>';
				html_main += '<div class="lbo-perfromance-date-items">' + html_performances + '</div>';
				html_main += '</div>';

				return html_main;
			},
			viewList: function(plugin, element, settings, event) {
				var button_class = (settings.use_bootstrap == true) ? "lbo-event-book btn btn-primary" : "lbo-event-book";
				var social_likes = plugin.encodeSocialLikes(plugin, element, settings, event);
				var performances_code = "";
				var pdate = null;
				var fulldate = '';
				$(event.performances).each(function(index, performance) {
					performances_code += '<div class="lbo-performance" data-raw="' + performance.start_date + " " + performance.start_time + '">' + '' + '</div>';
				});
				return	'<li class="lbo-event lbo-event-' + event.id + '" data-item-categories="' + event.categories.join('==[]==') + '" data-item-venue="' + event.venue_id + '">' +
							'<figure>' +
								'<div class="crop"><img src="' + event.image_large + '"/></div>' +
								'<figcaption>' +
									'<h3><a href="' + event.link_view + '">' + event.title + '</a></h3>' +
									'<div class="lbo-event-teaser">' + event.teaser + '</div>' +
								'</figcaption>' +
								'<div class="performances">' +
									performances_code +
								'</div>' +
								'<div class="lbo-event-footer">' + 
									social_likes + 
									'<a class="btn btn-performances" href="#">Performances</a>' +
									'<a class="' + button_class + '" href="' + event.link_book + '">Book Tickets</a>' +
								'</div>' +
							'</figure>' +
						'</li>';
			},
			viewGrid: function(settings, event) {
				return	'<li>' +
							'<figure class="lbo-eb-event">' + 
								'<div class="crop"><img src="' + event.image_large + '"/></div>' +
								'<figcaption>' +
									'<h3>' + event.title + '</h3>' +
									'<span>' + event.teaser + '</span>' +
									'<a href="' + event.link_book + '">Book Tickets</a>' +
								'</figcaption>' +
							'</figure>' +
						'</li>';
			},
			/* utiliy functions */
			formatDate: function(str_date) {
				var d = new Date(str_date);
				console.log(d.getMonth());
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
