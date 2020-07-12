module.exports = function (grunt) {

	'use strict';

	const sass = require('node-sass');

	// Project configuration.
	grunt.initConfig({
		pkg: require('./package'),
		meta: {
			banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %> */'
		},

		copy: {
			jquery: {
				src: 'node_modules/jquery/dist/jquery.min.js',
				dest: 'build/jquery.min.js'
			}
		},

		jshint: {
			all: [
				'Gruntfile.js',
				'jquery.slider.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		sass: {
			options: {
				implementation: sass,
				sourceMap: true
			},
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'build/jquery.slider-<%= pkg.version %>.min.css': 'jquery.slider.scss',
					'build/normalize.css' : 'node_modules/normalize.css/normalize.css'
				}

			}
		},

		uglify: {
			deploy: {
				src: 'jquery.slider.js',
				dest: 'build/jquery.slider-<%= pkg.version %>.min.js'
			}
		},

		watch: {

			scss: {
				files: ['jquery.slider.scss'],
				tasks: 'sass'
			},

			js: {
				files: [
					'Gruntfile.js',
					'jquery.slider.js'
				],
				tasks: ['jshint', 'uglify']
			}
		}
	});

	// Load some stuff
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task
	grunt.registerTask('default', ['jshint', 'copy', 'sass', 'uglify']);

};
