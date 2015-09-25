var test_suite = {

	run : function(test_name) {
		test_suite.clear();
		test_suite.add_message("Running test " + test_name);
		var start = new Date().getTime();
		window["test_suite"]["test_" + test_name]();	
		var end = new Date().getTime();
		var time = (end - start) / 1000;
		test_suite.add_message("Execution time " + time + " seconds");
	},

	add_message : function(message) {
		$('#output').append('<div class="message">' + message + '</div>');
	},

	clear : function() {
		$('#output').html('');
		$('#render').html('');
	},

	test_straight : function() {
		
		var result = $.fn.thelittleboxoffice.query('', false);
		console.log(result);
		test_suite.add_message(result.data.length + " objects returned");
	},

	test_category_id : function () {

		var result = $.fn.thelittleboxoffice.query('category_id=108;', false);
		console.log(result);
		test_suite.add_message(result.data.length + " objects returned");
	},

	test_build_search : function() {
		$.fn.thelittleboxoffice.build({
			query : '',
			target : $('#render'),
			theme : 'search',
			item_class : 'card',
			item_template : 'hello world',
			event_title_click : function(element, event_id) {
				location.href = u('/event/view/' + event_id);
			},
			performance_click : function(element, performance_id) {
				location.href = u('/book/selection/' + performance_id);
			}
		});
	}
};