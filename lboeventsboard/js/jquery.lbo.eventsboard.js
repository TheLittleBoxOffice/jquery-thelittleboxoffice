(function( $ ){

	var defaults = {
	    client_id: 0,
	};
	
	var build = function(element) {	
		
		var events = getEventsData(element);
		var html = '<ul class="cs-style-3 grid">';
		$(events).each(function(index, value) {
			html += encodeEvent(value);
		});
		html += '</ul>';
		element.html(html);
	}

	var encodeEvent = function(event) {
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
        var obj = $(inst).data("lboeventsboard");
        return (obj || defaults)[name];
    }
	var setOption = function(inst, name, value) {
        var obj = $(inst).data("lboeventsboard");
        if (!obj) {
            obj = $.extend({}, defaults);
            inst.data("lboeventsboard", obj);
        }
        obj[name] = value;
    }
	var methods = {
	
		init : function(options) {
			
			// mix options with defaults and save
			var settings = $.extend( true, {}, defaults, options );
			this.data("lboeventsboard", settings);
			
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
	
	jQuery.fn.lboeventsboard = function(method) {
		
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.lbo.eventsboard' );
		}
	}
	
})( jQuery );
