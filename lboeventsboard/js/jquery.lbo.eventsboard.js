(function( $ ){

	var defaults = {
	    client_id: 0,
	};
	
	var build = function(element) {	
			
		var data = getEventsData(element);
		element.html('hello world');
	}

	var getEventsData = function(element) {

		var client_id = getOption(element, 'client_id');
		
		
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
