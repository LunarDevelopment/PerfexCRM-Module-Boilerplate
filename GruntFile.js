/*
 * Copyright (c) 2019.
 *
 */

module.exports = function(grunt) {
    //
    // Paths
    //

    /**
     * with trailing slash
     * bower_components/ (mostly)
     * @type {string}
     */
    let path_bower = 'bower_components/';
    /**
     * with trailing slash
     * vendor/ (mostly)
     * @type {string}
     */
    let path_composer = 'vendor/';

    /**
     * This folder will be watched and JS concated, mangled, minified
     *
     * with trailing slash
     * @type {string}
     */
    let path_js_src_dir = 'assets/js/';
    /**
     * The folder in which the JS output should be saved
     *
     * with trailing slash
     * @type {string}
     */
    let path_js_build_dir = 'dist/';

    /**
     * The main Sass file that should be transpiled, but:
     *
     * without extension
     * @type {string}
     */
    let path_sass_src_file = 'assets/style/main';
    /**
     * The folder where most sass files are located, will be used for the CSS file watcher
     *
     * with trailing slash
     * @type {string}
     */
    let path_sass_src_dir = 'assets/style/';
    /**
     * The folder in which the CSS should be saved
     *
     * with trailing slash
     * @type {string}
     */
    let path_sass_build_dir = 'dist/';
    /**
     * Name of the CSS file, but:
     *
     * without extension
     * @type {string}
     */
    let path_sass_build_file = 'style';

    /**
     * The source image folder, will be watched and all images optimized and copied into path_img_build
     *
     * with trailing slash
     * @type {string}
     */
    let path_img_src = 'assets/media/';
    /**
     * The folder in which the optimized images are saved
     *
     * with trailing slash
     * @type {string}
     */
    let path_img_build = 'dist/media/';

    //
    // JS concat
    //

    let js_concat = [
        path_bower + 'jQuery/dist/jquery.min.js',
        path_js_src_dir + '**/*.js'
    ];

    //
    // Options
    //

    /**
     * imagemin level of optimization for png and dynamic (svg|gif)
     * @type {number}
     */
    let img_optimization_lvl = 3;
    /**
     * imagemin level of builded image quality for jpeg and dynamic (svg|gif)
     * @type {number}
     */
    let img_quality_lvl = 90;

    //
    // Watcher
    //

    /**
     * The more files must be scanned the longer it takes, keep the list clean!
     * @type {[*]}
     */
    let watch_css = [
        path_sass_src_dir + '**/*.scss',
        '!**/node_modules/**',
        '!**/*.min.css'
    ];
    /**
     * The more files must be scanned the longer it takes, keep the list clean!
     * @type {[*]}
     */
    let watch_js = [
        path_js_src_dir + '**/*.js',
        '!**/node_modules/**',
        '!**/*.min.js'
    ];
    /**
     * The more files must be scanned the longer it takes, keep the list clean!
     * @type {[*]}
     */
    let watch_img = [
        path_img_src + '**/*.{gif,svg,png,jpg}',
    ];

    require('time-grunt')(grunt);

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // JS
        concat: {
            dist: {
                // warns when something was not found but was specified
                nonull: true,
                src: js_concat,
                dest: path_js_build_dir + 'js.js'
            }
        },
        uglify: {
            build: {
                options: {
                    sourceMap: true,
                    mangle: {
                        properties: true,
                        toplevel: false,
                        reserved: ['jQuery', 'jquery']
                    }
                },
                src: path_js_build_dir + 'js.js',
                dest: path_js_build_dir + 'js.min.js'
            }
        },

        // CSS
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    [path_sass_build_dir + path_sass_build_file + '.css']: path_sass_src_file + '.scss'
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: path_sass_build_dir,
                    src: [path_sass_build_file + '.css', '!' + path_sass_build_file + '.css.map'],
                    dest: path_sass_build_dir,
                    ext: '.min.css'
                }]
            }
        },
        postcss: {
            options: {
                map: false,
                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({browsers: 'last 4 versions'})
                ]
            },
            dist: {
                src: path_sass_build_dir + path_sass_build_file + '.min.css'
            }
        },

        // Image
        imagemin: {
            png: {
                options: {
                    optimizationLevel: img_optimization_lvl
                },
                files: [{
                    expand: true,
                    cwd: path_img_src,
                    src: ['**/*.png'],
                    dest: path_img_build
                }]
            },
            jpg: {
                options: {
                    quality: img_quality_lvl,
                    progressive: true,
                    use: [require('imagemin-mozjpeg')()]
                },
                files: [{
                    expand: true,
                    cwd: path_img_src,
                    src: ['**/*.jpg'],
                    dest: path_img_build
                }]
            },
            dynamic: {
                options: {
                    optimizationLevel: img_optimization_lvl,
                    quality: img_quality_lvl,
                    svgoPlugins: [{removeViewBox: false}]
                },
                files: [{
                    expand: true,
                    cwd: path_img_src,
                    src: ['**/*.{gif,svg}'],
                    dest: path_img_build
                }]
            }
        },

        // Multi Tasking
        concurrent: {
            image: ['imagemin:png', 'imagemin:jpg', 'imagemin:dynamic'],
            build: [['js'], ['css'], 'concurrent:image']
        },

        // JS and CSS/Sass file watcher
        watch: {
            css: {
                files: watch_css,
                tasks: ['css']
            },
            js: {
                files: watch_js,
                tasks: ['js']
            },
            image: {
                files: watch_img,
                tasks: ['image']
            }
        }
    });

    // Multi-Thread Task Runner
    grunt.loadNpmTasks('grunt-concurrent');

    // JS
    grunt.registerTask('js', ['concat', 'uglify']);

    // SASS
    grunt.registerTask('css', ['sass', 'cssmin', 'postcss']);

    // Images
    grunt.registerTask('image', ['concurrent:image']);

    // Build All
    grunt.registerTask('build', ['concurrent:build']);
};
