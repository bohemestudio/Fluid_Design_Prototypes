/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        /* Below here is where you edit: */
        uglify: {
            lib: {
                options: {
                    sourceMap: 'lib.map',
                    sourceMapRoot: '/git/frontend_boilerplate/'
                },
                //array of paths to library js files you are using
                src: [
                    'components/lib/jquery/jquery-1.9.1.js'
                ],
                dest: 'js/lib.js'
            },

            polyfills: {
                options: {
                    sourceMap: 'polyfills.map',
                    sourceMapRoot: '/git/frontend_boilerplate/'
                },
                //array of paths to polyfill js files you are using
                src: [
                    'components/polyfills/console.log.js',
                    'components/polyfills/es5-shim.js'
                    //'components/polyfills/jquery.cssHooks.backgroundPosition.js'
                ],
                dest: 'js/polyfills.js'
            },

            ext: {
                options: {
                    sourceMap: 'ext.map',
                    sourceMapRoot: '/git/frontend_boilerplate/'
                },
                //array of paths to extension (i.e. plugins) js files you are using
                src: [
                    'components/ext/jquery/jquery.easing/jquery.easing.js',
                    'components/ext/jquery/jquery.scrollTo/jquery.scrollto.js',
                    'components/ext/jquery/jquery.tubeplayer/jquery.tubeplayer.js',
                    'components/ext/jquery/jquery.waypoints/waypoints.min.js'
                ],
                dest: 'js/ext.js'
            },

            app: {
                options: {
                    sourceMap: 'app.map',
                    sourceMapRoot: '/git/frontend_boilerplate/',
                    compress: false,
                    mangle: false,
                    beautify: true
                },
                src: [
                    'js/app/*.js'
                ],
                dest: 'js/app.js'
            }
        },


        imagemin: {
            all: {
                options: {
                    optimizationLevel: 7,
                    progressive: true
                },
                files: {
                    // 'img/output.png': 'img/input.png',
                    // 'img/output.jpeg': 'img/input.jpeg'
                }
            }
        },


        concat: {
            cssLib: {
                src: [
                    'components/lib/normalize/normalize.css',
                    'components/lib/h5bp/main.css'
                ],
                dest: 'css/lib.css'
            }
        },


        /* you shouldn't need to edit below here */
        copy: {
            app: {
                files: [
                    {
                        expand: false,
                        src: ['app.map'],
                        dest: 'js/app.map',
                        filter: 'isFile'
                    }
                ]
            },
            lib: {
                files: [
                    {
                        expand: false,
                        src: ['lib.map'],
                        dest: 'js/lib.map',
                        filter: 'isFile'
                    }
                ]
            },
            ext: {
                files: [
                    {
                        expand: false,
                        src: ['ext.map'],
                        dest: 'js/ext.map',
                        filter: 'isFile'
                    }
                ]
            },
            polyfills: {
                files: [
                    {
                        expand: false,
                        src: ['polyfills.map'],
                        dest: 'js/polyfills.map',
                        filter: 'isFile'
                    }
                ]
            }
        },


        clean: {
            app: {
                src: [
                    'app.map'
                ]
            },
            lib: {
                src: [
                    'lib.map'
                ]
            },
            ext: {
                src: [
                    'ext.map'
                ]
            },
            polyfills: {
                src: [
                    'polyfills.map'
                ]
            }
        },


        jshint: {
            all: [
                'Gruntfile.js',
                'js/app/*.js'
            ]
        },


        compass: {
            dev: {
                options: {
                    sassDir: 'css/scss',
                    cssDir: 'css',
                    debugInfo: true,
                    noLineComments: true
                }
            },
            dist: {
                options: {
                    sassDir: 'css/scss',
                    cssDir: 'css',
                    environment: 'production'
                }
            }
        },


        watch: {
            image: {
                files: [
                    'img/*.png',
                    'img/*.jpg',
                    'img/*.jpeg'
                ],
                tasks: [
                    'imagemin:all'
                ]
            },

            jsComponentsExt: {
                files: [
                    'components/ext/*.js',
                    'components/ext/**/*.js'
                ],
                tasks: [
                    'uglify:ext',
                    'copy:ext',
                    'clean:ext'
                ]
            },
            jsComponentsLib: {
                files: [
                    'components/lib/*.js',
                    'components/lib/**/*.js'
                ],
                tasks: [
                    'uglify:lib',
                    'copy:lib',
                    'clean:lib'
                ]
            },
            jsComponentsPolyfills: {
                files: [
                    'components/polyfills/*.js',
                    'components/polyfills/**/*.js'
                ],
                tasks: [
                    'uglify:polyfills',
                    'copy:polyfills',
                    'clean:polyfills'
                ]
            },
            jsApp: {
                files: [
                    'js/app/**/*.js'
                ],
                tasks: [
                    'jshint',
                    'uglify:app',
                    'copy:app',
                    'clean:app'
                ]
            },

            cssLib: {
                files: [
                    'components/lib/*.css',
                    'components/lib/**/*.css',
                    'components/lib/**/**/*.css',

                    'components/ext/*.css',
                    'components/ext/**/*.css',
                    'components/ext/**/**/*.css'
                ],
                tasks: ['concat:cssLib'],
                options: {
                    livereload: true
                }
            },
            cssApp: {
                files: ['css/**/*.scss'],
                tasks: ['compass:dev'],
                options: {
                    nospawn: true,
                    livereload: true
                }
            }
        }
    });

    // Default task.
    grunt.registerTask('default', [
        'jshint',
        'uglify',
        'copy',
        'clean',
        'concat',
        'imagemin:all',
        'compass:dist'
    ]);


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
};
