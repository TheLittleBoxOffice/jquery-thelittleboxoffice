module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		handlebars: {
			compile : {
				options: {
					namespace: 'templates'
				},
				files: {
					'dist/tmp/templates.js' : [
						'src/templates/*/*.html',
						'src/templates/*.html'
					]
				}
			}
		},
		concat: {
			options: {
				stripBanners: true
			},
			dist_js: {
				src: [
					'src/*.js',
					'src/themes/*.js',
					'dist/tmp/templates.js'
				],
				dest: 'dist/tmp/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'dist/tmp/<%= pkg.name %>.js',
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		},
		clean: {
			folder: 'dist/tmp'
		}
	});

	// Load the plugins.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-handlebars');

	// Default task(s).
	grunt.registerTask('default', ['handlebars', 'concat', 'uglify']);
};