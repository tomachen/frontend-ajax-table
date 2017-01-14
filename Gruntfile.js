module.exports = function (grunt) {
	var SRC_DIR = 'src'
	var TEST_DIR = 'test'
	var BUILD_DIR = 'build'

	grunt.initConfig({
		jshint: {
			dev: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: [
					SRC_DIR + '/**/*.js'
				]
			}
		},
		clean: {
			build: [BUILD_DIR],
			test: [TEST_DIR + '/test.js']
		},
		copy: {
			build: {
				files: [
					//copy folders
					{
						cwd: SRC_DIR + '/styles',
						src: '**',
						dest: BUILD_DIR + '/styles',
						flatten: false,
						expand: true
					}
				]
			}
		},
		jasmine: {
			dev: {
				options: {
					keepRunner: false,
					outfile: TEST_DIR + '/test.html',
					specs: [TEST_DIR + '/test.js']
				}
			}
		},
		targethtml: {
			build: {
				files: (function() {
					var config = {};
					config[BUILD_DIR + '/index.html'] = SRC_DIR + '/index.html'
					return config;
				}())
			}
		},
		systemjs: {
			build: {
				src: SRC_DIR + '/modules/main.js',
				dest: BUILD_DIR + '/build.js',
				options: {
					baseURL: SRC_DIR,
					config: 'system.config.js',
					type: 'build', //build, bundle
					format: 'umd',
					minify: true,
					mangle: true,
					sourceMaps: true
				}
			},
			test: {
				src: TEST_DIR + '/spec.js',
				dest: TEST_DIR + '/test.js',
				options: {
					baseURL: TEST_DIR,
					config: 'system.config.js',
					type: 'build', //build, bundle
					format: 'umd',
					minify: false
				}
			}
		},
		watch: {
			sources: {
				files: [
					SRC_DIR + '/**/*.*',
					TEST_DIR + '/**/*.*'
				],
				//tasks: ['jshint'],
				options: {
					interrupt: true,
					livereload: 35729
				}
			}
		},
      browserSync: {
			bsFiles: {
				src: [
					SRC_DIR + '/**/*.js',
					SRC_DIR + '/**/*.css',
					SRC_DIR + '/**/*.html'
				]
			},
			//https://www.browsersync.io/docs/options
			options: {
				watchTask: true,
				server: {
					baseDir: '.'
				},
				// proxy: '',
				// host: '',
				// port: 3000,
				// https: true,
				startPath: '/' + SRC_DIR,
				// browser: ['google chrome', 'firefox'']
				// localOnly: true,
				cors: false,
				open: 'external',
				notify: false,
				reloadOnRestart: true,
				reloadDelay: 0,
				reloadDebounce: 0,
				reloadThrottle: 0,
				ghostMode: {
					clicks: true,
					forms: true,
					scroll: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-targethtml');
	grunt.loadNpmTasks('grunt-systemjs-bundler');
	grunt.loadNpmTasks('grunt-browser-sync');		

	grunt.registerTask('start', ['browserSync', 'watch']);
	grunt.registerTask('code', ['jshint:dev']);
	grunt.registerTask('test', ['systemjs:test', 'jasmine', 'clean:test']);
	grunt.registerTask('build', ['clean:build', 'systemjs:build', 'targethtml:build', 'copy:build']);
};