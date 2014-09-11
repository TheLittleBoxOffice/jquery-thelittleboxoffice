module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				stripBanners: true
			},
			dist_js: {
				src: [
					'src/*.js',
					'src/templates/*.js'
				],
				dest: 'build/tmp/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'build/tmp/<%= pkg.name %>.js',
				dest: 'build/<%= pkg.name %>.min.js'
			}
		},
		clean: {
			folder: 'build/tmp'
		}
	});

	// Load the plugins.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	// Default task(s).
	grunt.registerTask('default', ['concat', 'uglify']);
	//grunt.registerTask('default', ['concat', 'uglify', 'clean']);
};