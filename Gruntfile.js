module.exports = function (grunt) {
	var SRC_DIR = 'src',
		TEST_DIR = 'test',
		BUILD_DIR = 'build',
        TASKS_DIR = 'tasks',
		MODULE_NAME = 'sample-module';

	grunt.initConfig({
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
		jshint: {
			dev: {
				options: {
					jshintrc: TASKS_DIR + '/.jshintrc'
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
		jasmine: {
			dev: {
				options: {
					//polyfills: [''],
					vendor: [
						'./node_modules/systemjs-builder/node_modules/systemjs/dist/system.src.js'
					],
					//helpers: [''],
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
				src: SRC_DIR + '/index.js',
				dest: BUILD_DIR + '/build.js',
				options: {
					baseURL: SRC_DIR,
					config: 'system.config.js',
					type: 'sfx', //sfx, bundle
					format: 'umd',
					minify: true,
					mangle: true,
					sourceMaps: true
				}
			},
			test: {
				src:  TEST_DIR + '/spec.js',
				dest: TEST_DIR + '/test.js',
				options: {
					baseURL: TEST_DIR,
					config: 'system.config.js',
					type: 'sfx', //sfx, bundle
					format: 'umd',
					minify: false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-targethtml');
	grunt.loadTasks(TASKS_DIR + '/grunt-systemjs-bundler/tasks');


	grunt.registerTask('live', ['watch']);
	grunt.registerTask('code', ['jshint:dev']);
	grunt.registerTask('test', ['systemjs:test', 'jasmine', 'clean:test']);
	grunt.registerTask('build', ['clean:build', 'systemjs:build', 'targethtml:build']);
};