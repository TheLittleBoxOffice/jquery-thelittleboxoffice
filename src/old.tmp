// /*
//  *  jQuery The Little Boxoffice Components Plugin
//  *  An open source jquery plugin for creating widgets displaying data from thelittleboxoffice.com.
//  *  https://github.com/TheLittleBoxOffice/jquery-thelittleboxoffice
//  *
//  *  Made by Colin Piggott
//  *  Under MIT License
//  */
// // the semi-colon before function invocation is a safety net against concatenated
// // scripts and/or other plugins which may not be closed properly.
// ;(function ( $, window, document, undefined ) {

// 		// Create the defaults once
// 		var pluginName = "lbo",
// 			defaults = {
// 				client_id: 0,
// 				view_type: "list",
// 				categories: [],
// 				use_bootstrap: false,
// 				use_social_likes: true,
// 				event_id_list: '',
// 				category_list: [],
// 				limit: 0
// 			};

// 		// The actual plugin constructor
// 		function Plugin ( element, options ) {
// 			this.element = element;
// 			this.settings = $.extend( {}, defaults, options );
// 			this._defaults = defaults;
// 			this._name = pluginName;
// 			this.init();
// 		}

// 		Plugin.prototype = {
// 			init: function () {
// 				this.build(this, this.element, this.settings);
// 				this.readSelectionFromCookies(this, this.element, this.settings);
// 				this.filterSelect_Change(this, this.element, this.settings);
// 			},
// 			build: function(plugin, element, settings) {				
// 				var html = "";
// 				plugin.encodeFilters(plugin, element, settings);				
// 				switch (settings.view_type) {
// 					case "feature":
// 						$(element).append(plugin.buildFeature(plugin, element, settings));
// 						$('.lbo-social-likes').socialLikes();		
// 						break;
// 					case "timeline":
// 						$(element).append(plugin.buildTimeLine(plugin, element, settings));
// 						break;
// 					case "boardwalk":
// 						$(element).append(plugin.buildBoardWalk(plugin, element, settings));
// 						break;
// 				}
// 			},
// 			buildBoardWalk: function(plugin, element, settings) {
// 				var out = [], html = '';
// 				var categories = plugin.getEventsByCategory(plugin, element, settings);
// 				var category = null;
// 				html += '<div class="lbo-board-walk">';
// 				for (var category_id in categories) {					
// 					category = plugin.getCategoryById(plugin, element, settings, category_id);
// 					html += '<div class="lbo-board-walk-item">';
// 						html += '<div class="lbo-category-title">' + category.title + '</div>';
// 						html += '<ul>';
// 						$(categories[category_id]).each(function(index, event) {
// 							html += plugin.viewBoadwalkItem(plugin, element, settings, event);
// 						});
// 						html += '</ul>';
// 					html += '</div>';
// 				}
// 				html += '</div>';

// 				return html;
// 			},
// 			buildFeature: function(plugin, element, settings) {
// 				var html = '';
// 				var events = this.getEventsData(plugin, element, settings);

// 				html += '<ul class="' + plugin.getWrapperClasses(element, settings) + '">';
// 				$(events).each(function(index, event) {
// 					html += plugin.viewFeature(plugin, element, settings, event);
// 				});
// 				html += '</ul>';

// 				return html;
// 			},
// 			buildTimeLine: function(plugin, element, settings) {
// 				var html = '';
// 				var performance_dates = this.getPerformancesByDateData(plugin, element, settings);
// 				html += '<div class="lbo-timeline-wrapper">';
// 				html += '<ul class="' + plugin.getWrapperClasses(element, settings) + '">';
// 				for (var performance_date in performance_dates) {
// 					html += plugin.viewCalendar(plugin, element, settings, performance_dates[performance_date]);
// 				};
// 				html += '</ul></div>';

// 				return html;
// 			},
// 			/* data functions */
// 			getWrapperClasses: function(element, settings) {
// 				switch (settings.view_type) {
// 					case "feature": return 'lbo-feature-list';
// 					case "grid": return 'lbo-events-grid cs-style-3 grid';
// 					case "timeline": return 'lbo-timeline';
// 				}
// 			},
// 			getEventsData: function(plugin, element, settings) {
// 				var out = [];
				
// 				if (settings.event_id_list.length == 0) {
// 					out = lbo_events;
// 				} else {
// 					var event_id_array = settings.event_id_list;
// 					for (var i = 0; i < lbo_events.length - 1; i++) {
// 						if (event_id_array.indexOf(parseInt(lbo_events[i].id)) > -1) {
// 							out.push(lbo_events[i]);
// 						}
// 					}
// 				}
// 				return out;
// 			},
// 			getCategoriesData: function() {
// 				return lbo_categories;
// 			},
// 			getVenuesData: function() {
// 				return lbo_venues;
// 			},
// 			getPerformancesByDateData: function(plugin, element, settings) {
// 				var events = plugin.getEventsData(plugin, element, settings);
// 				var performances_sorted = [];
// 				var day_index = null , time_index = null; 
// 				$(events).each(function(index, event) {
// 					$(event.performances).each(function(index, performance) {
// 						day_index = performance.start_date.replace(/-/gi, "");
// 						time_index = day_index.concat(performance.start_time.replace(/:/gi, ""));
// 						performance_index = time_index.concat(performance.id);
						
// 						if (performances_sorted[day_index] == undefined) {
// 							performances_sorted[day_index] = [];
// 						} 
// 						performance.event = event;
// 						performances_sorted[day_index][performance_index] = performance;
// 					});
// 				});
// 				return performances_sorted;
// 			},
// 			getEventsByCategory: function(plugin, element, settings) {
// 				var out = [];
// 				var events = plugin.getEventsData(plugin, element, settings);
// 				$(events).each(function(index, event) {
// 					$(event.categories).each(function(index, category) {
// 						if (out[category] == undefined) 
// 							out[category] = [];
// 						out[category].push(event);
// 					});
// 				});		
// 				return out;
// 			},
// 			getCategoryById: function(plugin, element, settings, category_id) {
// 				var out = null;
// 				$(plugin.getCategoriesData()).each(function(index, category) {
// 					if (category.id == category_id) {
// 						out = category;
// 					}
// 				});
// 				return out;
// 			},
// 			/* events */
// 			filterSelect_Change: function(plugin, element, settings) {

// 				var selected_category_id = $(element).find('select.lbo-filter-category').val();
// 				var selected_venue_id = $(element).find('select.lbo-filter-venue').val();

// 				var category_item_array = [];
// 				var venue_item_id = null;
// 				var found = false;

// 				$(element).find('.lbo-event').each(function(index, value) {

// 					found = false;

// 					category_item_array = String($(value).data('item-categories')).split('==[]==');
// 					venue_item_id = $(value).data('item-venue');
					
// 					// category search
// 					if (selected_category_id != 0) {
// 						for (var x = 0; x < category_item_array.length; x++) {
// 							if (category_item_array[x] == selected_category_id) {
// 								found = true;
// 							}
// 						}
// 					} else {
// 						found = true;
// 					}
					
// 					// venue search
// 					if (selected_venue_id != 0 && venue_item_id != selected_venue_id) {
// 						found = false;
// 					}
					
// 					if (!found) {
// 						//$(value).css('display', 'none');
// 					} else {
// 						$(value).css('display', 'block');
// 					}

// 					found = false;
// 				});

// 				plugin.saveSelectionToCookies(plugin, element, settings);
// 			},
// 			saveSelectionToCookies: function(plugin, element, settings) {
// 				var category_id = $(element).find('select.lbo-filter-category').val();
// 				var venue_id = $(element).find('select.lbo-filter-venue').val();
// 				plugin.setCookie("lbo_category_id", category_id, 7);
// 				plugin.setCookie("lbo_venue_id", venue_id, 7);
// 			},
// 			readSelectionFromCookies: function(plugin, element, settings) {			
// 				var category_id = (plugin.getCookie("lbo_category_id") == null) ? "0" : plugin.getCookie("lbo_category_id");
// 				var venue_id = (plugin.getCookie("lbo_venue_id") == null) ? "0" : plugin.getCookie("lbo_venue_id");
// 				$(element).find('select.lbo-filter-category').val(category_id);
// 				$(element).find('select.lbo-filter-venue').val(venue_id);
// 			},
// 			encodeFilters: function(plugin, element, settings) {
// 				switch (settings.view_type) {
// 					case "list":
// 						return plugin.encodeFiltersList(plugin, element, settings);
// 						break;
// 					case "timeline":
// 						return plugin.encodeFiltersCalendarBar(plugin, element, settings);
// 						break;
// 				}
// 			},
// 			encodeFiltersCalendarBar: function(plugin, element, settings) {

// 			},
// 			encodeFiltersList: function(plugin, element, settings) {

// 				var categories_select = $('<select class="lbo-filter-category"></select>').appendTo(element);
// 				var categories = plugin.getCategoriesData();

// 				var venues_select = $('<select class="lbo-filter-venue"></select>').appendTo(element);
// 				var venues = plugin.getVenuesData();

// 				// var months_select = $('<select class="lbo-filter-month"></select>').appendTo(element);
// 				// var months = new Array();
				
// 				// months[0] = "January";
// 				// months[1] = "February";
// 				// months[2] = "March";
// 				// months[3] = "April";
// 				// months[4] = "May";
// 				// months[5] = "June";
// 				// months[6] = "July";
// 				// months[7] = "August";
// 				// months[8] = "September";
// 				// months[9] = "October";
// 				// months[10] = "November";
// 				// months[11] = "December";
				
// 				// $("<option />", {value: 0, text: "All Months"}).appendTo(months_select);
// 				// for (var i = 0; i < months.length; i++) {
// 				// 	$("<option />", {value: i, text: months[i]}).appendTo(months_select);
// 				// }
// 				$("<option />", {value: 0, text: "All Categories"}).appendTo(categories_select);
// 				for (var i = 0; i < categories.length; i++) {
// 					$("<option />", {value: categories[i].id, text: categories[i].title}).appendTo(categories_select);
// 				}
// 				$("<option />", {value: 0, text: "All Venues"}).appendTo(venues_select);
// 				for (i = 0; i < venues.length; i++) {
// 					$("<option />", {value: venues[i].id, text: venues[i].title}).appendTo(venues_select);
// 				}
// 				categories_select.change(function() {
// 					plugin.filterSelect_Change(plugin, element, settings);
// 				});		
// 				venues_select.change(function() {
// 					plugin.filterSelect_Change(plugin, element, settings);
// 				});				
// 				// months_select.change(function() {
// 				// 	plugin.filterSelect_Change(plugin, element, settings);
// 				// });
// 			},
// 			encodeSocialLikes: function(plugin, element, settings, event) {
// 				var out = "";
// 				if (settings.use_social_likes == true) {
// 					out = plugin.viewSocialLike(plugin, element, settings, event);
// 				}
// 				return out;
// 			},
// 			/* views */
// 			viewBoadwalkItem: function(plugin, element, settings, event) {
// 				return '' +
// 					'<li class="lbo-event-' + event.id + '">' + 
// 						'<a href="' + event.link_view + '">' + 
// 							'<img src="' + event.image_small + '"/>' + 
// 							'<span>' + event.title + '</span>' +
// 						'</a>' + 
// 					'</li>';
// 			},
// 			viewSocialLike: function(plugin, element, settings, event) {
// 				return '' + 
// 					'<div class="lbo-social-likes" data-counters="no" data-url="' + event.link + '" data-title="' + event.title + '">' +
// 						'<div class="facebook" title="Share link on Facebook">Facebook</div>' +
// 						'<div class="twitter" title="Share link on Twitter">Twitter</div>' +
// 						'<div class="plusone" title="Share link on Google+">Google+</div>' +
// 						'<div class="pinterest" title="Share image on Pinterest" data-media="' + event.image_large + '">Pinterest</div>' +
// 					'</div>';
// 			},
// 			viewCalendar: function(plugin, element, settings, performance_dates) {
// 				var html_main = '<div class="lbo-performance-date">';
// 				var html_performances = '';
// 				var html_date = '';

// 				for (var performance_date in performance_dates) {
// 					html_date = performance_dates[performance_date].start_date;
// 					book_link = performance_dates[performance_date].event.link_base + '/book/selection/' + performance_dates[performance_date].id;
// 					html_performances += 
// 						'<div class="lbo-performance-date-item"><a href="' + book_link + '">' +
// 							plugin.formatTime(performance_dates[performance_date].start_time) + 
// 							'</a> <a href="' + performance_dates[performance_date].event.link_view + '">' + performance_dates[performance_date].event.title + '</a>' +
// 						'</div>';
// 				}
				
// 				html_main += '<div class="lbo-date-header">' + plugin.formatDate(plugin, html_date) + '</div>';
// 				html_main += '<div class="lbo-perfromance-date-items">' + html_performances + '</div>';
// 				html_main += '</div>';

// 				return html_main;
// 			},
// 			viewFeature: function(plugin, element, settings, event) {
// 				var button_class = (settings.use_bootstrap == true) ? "lbo-event-book btn btn-primary" : "lbo-event-book";
// 				var social_likes = plugin.encodeSocialLikes(plugin, element, settings, event);
// 				var performances_code = "";
// 				var pdate = null;
// 				var fulldate = '';
// 				var datetext = plugin.viewFeatureDate(plugin, element, settings, event);
				
// 				$(event.performances).each(function(index, performance) {
// 					performances_code += '<div class="lbo-performance" data-raw="' + performance.start_date + " " + performance.start_time + '">' + '' + '</div>';
// 				});

// 				return	'<li class="lbo-event lbo-event-' + event.id + '" data-item-categories="' + event.categories.join('==[]==') + '" data-item-venue="' + event.venue_id + '">' +
// 							'<figure>' +
// 								'<div class="crop"><img src="' + event.image_large + '"/></div>' +
// 								'<figcaption>' +
// 									'<h3><a href="' + event.link_view + '">' + event.title + '</a></h3>' +
// 									datetext +
// 									'<div class="lbo-event-teaser">' + event.teaser + '</div>' +
// 								'</figcaption>' +
// 								'<div class="performances">' +
// 									performances_code +
// 								'</div>' +
// 								'<div class="lbo-event-footer">' + 
// 									social_likes + 
// 									'<a class="btn btn-default lbo-event-performances" href="#">Performances</a>' +
// 									'<a class="' + button_class + '" href="' + event.link_book + '">Book Tickets</a>' +
// 								'</div>' +
// 							'</figure>' +
// 						'</li>';
// 			},
// 			viewGrid: function(settings, event) {
// 				return	'<li>' +
// 							'<figure class="lbo-eb-event">' + 
// 								'<div class="crop"><img src="' + event.image_large + '"/></div>' +
// 								'<figcaption>' +
// 									'<h3>' + event.title + '</h3>' +
// 									'<span>' + event.teaser + '</span>' +
// 									'<a href="' + event.link_book + '">Book Tickets</a>' +
// 								'</figcaption>' +
// 							'</figure>' +
// 						'</li>';
// 			},
// 			viewFeatureDate: function(plugin, element, settings, event) {
// 				var performance_first = $(event.performances).first();
// 				var performance_last = $(event.performances).last();
// 				var link_book = event.url_base + '/book/selection/';
// 				var out = '<strong class="lbo-event-dates">' + 
// 					plugin.formatDate(plugin, performance_first[0].start_date) + " " + plugin.formatTime(performance_first[0].start_time);
// 				if (event.performances.length > 1) 
// 					out = out + ' - ' + plugin.formatDate(plugin, performance_last[0].start_date) + " " + plugin.formatTime(performance_last[0].start_time);
// 				out = out + '</strong>';
// 				return out;
// 			},

// 			/* utiliy functions */
// 			formatDate: function(plugin, str_date) {
// 				var date_parts = str_date.split('-');
// 				var day = plugin.getStringDay(str_date);
// 				return day + ' ' + date_parts[2] + ' ' + plugin.getStringMonth(str_date) + ' ' + date_parts[0];
// 			},
// 			formatTime: function(str_time) {
// 				return str_time.substr(0, str_time.lastIndexOf(':'));
// 			},	
// 			getStringDay: function(str_date) {
// 				var d = new Date(str_date);
// 				var weekday = new Array(7);
// 				weekday[0]=  "Sunday";
// 				weekday[1] = "Monday";
// 				weekday[2] = "Tuesday";
// 				weekday[3] = "Wednesday";
// 				weekday[4] = "Thursday";
// 				weekday[5] = "Friday";
// 				weekday[6] = "Saturday";
// 				return weekday[d.getDay()];
// 			},
// 			getStringMonth: function(str_date) {
// 				var d = new Date(str_date);
// 				var month = new Array();
// 				month[0] = "January";
// 				month[1] = "February";
// 				month[2] = "March";
// 				month[3] = "April";
// 				month[4] = "May";
// 				month[5] = "June";
// 				month[6] = "July";
// 				month[7] = "August";
// 				month[8] = "September";
// 				month[9] = "October";
// 				month[10] = "November";
// 				month[11] = "December";
// 				return month[d.getMonth()];
// 			},
// 			setCookie: function(name,value,days) {
// 				if (days) {
// 					var date = new Date();
// 					date.setTime(date.getTime()+(days*24*60*60*1000));
// 					var expires = "; expires="+date.toGMTString();
// 				}
// 				else var expires = "";
// 				document.cookie = name+"="+value+expires+"; path=/";
// 			},
// 			getCookie: function(name) {
// 				var nameEQ = name + "=";
// 				var ca = document.cookie.split(';');
// 				for(var i=0;i < ca.length;i++) {
// 					var c = ca[i];
// 					while (c.charAt(0)==' ') c = c.substring(1,c.length);
// 					if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
// 				}
// 				return null;
// 			},
// 			hasSelectValue: function(select, value) {
// 				$(select).find('option').each(function(index, value) {
					
// 				});
// 			}
// 		};

// 		// A really lightweight plugin wrapper around the constructor,
// 		// preventing against multiple instantiations
// 		$.fn[ pluginName ] = function ( options ) {
// 			this.each(function() {
// 				if ( !$.data( this, "plugin_" + pluginName ) ) {
// 					$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
// 				}
// 			});

// 			// chain jQuery functions
// 			return this;
// 		};

// })( jQuery, window, document );
