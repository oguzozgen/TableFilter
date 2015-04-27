module.exports = function (grunt) {
    // Initializes the Grunt tasks with the following settings
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        version: '<%= pkg.version %>',
        dist_folder: 'dist/',
        source_folder: 'src/',
        frags_folder: 'frags/',

        // A list of files, which will be syntax-checked by JSHint
        jshint: {
            src: [
                'Gruntfile.js',
                '<%= source_folder %>*.js',
                'src-es6/**/*.js',
                '!<%= source_folder %>tablefilter.js'
                // ,
                // '!src-es6/tablefilter.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        watch: {
            files: [
                'src-es6/**/*.js',
                'src-es6/**/*.css'
                // ,
                // '<%= source_folder %>**/*.js',
                // '<%= source_folder %>**/*.css',
                // '<%= source_folder %>**/*.html'
            ],
            tasks: ['dev']
        },

        qunit: {
            files: ['test/**/*.html']
        },

        requirejs:{
            'compile-main': {
                options: {
                    baseUrl: '<%= source_folder %>',
                    include: [
                        '../libs/almond/almond',
                        '../libs/system'
                    ],
                    // exclude: [
                    //     'extensions/sortabletable/sortabletable',
                    //     'extensions/sortabletable/adapterSortabletable'
                    // ],
                    shim: {
                        'extensions/sortabletable/sortabletable': {
                            exports: 'SortableTable'
                        }
                    },
                    wrap: {
                        startFile: "<%= frags_folder %>start.frag",
                        endFile: "<%= frags_folder %>end.frag"
                    },
                    name: 'tablefilter',
                    out: '<%= dist_folder %>tablefilter.js',
                    optimize: 'none'
                }
            }
            // ,
            // 'compile-colsvisibility': {
            //     options: {
            //         baseUrl: '<%= source_folder %>extensions/colsVisibility',
            //         include: [
            //             '../../../libs/almond/almond'
            //         ],
            //         wrap: {
            //             startFile: "<%= frags_folder %>start.colsvisibility.frag",
            //             endFile: "<%= frags_folder %>end.colsvisibility.frag"
            //         },
            //         name: 'colsVisibility',
            //         out: '<%= dist_folder %>extensions/colsVisibility/colsVisibility.js',
            //         optimize: 'none',
            //         findNestedDependencies: true,
            //         removeCombined: true,
            //         generateSourceMaps: false
            //     }
            // }
        },

        // requirejs: {
        //     'compile-main': {
        //         options: {
        //             // appDir: "<%= dist_folder %>",
        //             baseUrl: '<%= source_folder %>',
        //             paths: {
        //                 almond: '../libs/almond/almond',
        //                 sortabletable: 'extensions/sortabletable/sortabletable',
        //                 adapterSortabletable: 'extensions/sortabletable/adapterSortabletable'
        //             },
        //             // include: ['../libs/almond/almond', 'tablefilter'],
        //             // exclude: [
        //             //     'extensions/sortabletable/sortabletable',
        //             //     'extensions/sortabletable/adapterSortabletable'
        //             // ],
        //             // name: 'tablefilter',
        //             // out: '<%= dist_folder %>tablefilter.js',
        //             dir: '<%= dist_folder %>',
        //             wrap: {
        //                 startFile: "<%= frags_folder %>start.frag",
        //                 endFile: "<%= frags_folder %>end.frag"
        //             },
        //             // insertRequire: ['tablefilter'],
        //             shim: {
        //                 'sortabletable': {
        //                     exports: 'SortableTable'
        //                 }
        //             },
        //             modules:[
        //                 {
        //                     name: 'extensions/sortabletable/adapterSortabletable',
        //                     include: [
        //                         'extensions/sortabletable/adapterSortabletable',
        //                         'extensions/sortabletable/sortabletable'
        //                     ]
        //                 },
        //                 {
        //                     name: 'tablefilter',
        //                     create: true,
        //                     include: [
        //                         'almond',
        //                         'tablefilter'
        //                     ],
        //                     exclude: ['require'],
        //                     excludeShallow: [
        //                         'adapterSortabletable'
        //                     ]
        //                 }
        //             ],
        //             removeCombined: true,
        //             findNestedDependencies: false,
        //             optimize: 'none'/*'uglify2'*/,
        //             generateSourceMaps: false/*,
        //             preserveLicenseComments: false,
        //             generateSourceMaps: true*/
        //         }
        //     }
        //     // ,
        //     // 'compile-extensions': {
        //     //     options:{
        //     //         baseUrl: '<%= source_folder %>extensions',
        //     //         dir: '<%= dist_folder %>/extensions',
        //     //         // paths: {
        //     //         //     sortabletable: 'sortabletable/sortabletable',
        //     //         //     adapterSortabletable: 'sortabletable/adapterSortabletable'
        //     //         // },
        //     //         wrap: {
        //     //             startFile: "<%= frags_folder %>start.sort.frag",
        //     //             endFile: "<%= frags_folder %>end.sort.frag"
        //     //         },
        //     //         modules:[
        //     //            {
        //     //                 name: 'sortabletable/adapterSortabletable',
        //     //                 include: [
        //     //                     'sortabletable/adapterSortabletable',
        //     //                     'sortabletable/sortabletable'
        //     //                 ]
        //     //             }
        //     //         ],
        //     //         removeCombined: true,
        //     //         findNestedDependencies: false,
        //     //         optimize: 'none'/*'uglify2',
        //     //         preserveLicenseComments: false,
        //     //         generateSourceMaps: true*/
        //     //     }
        //     // }
        // },

        concat: {
            /*js: {
                files: [{
                    src: ['<%= source_folder %>tablefilter.js'],
                    dest: '<%= dist_folder %>tablefilter.js'
                }]
            },*/
            css: {
                files: [{
                    src: ['<%= source_folder %>filtergrid.css'],
                    dest: '<%= dist_folder %>filtergrid.css'
                }]
            }
        },

        // and minified (source and destination files)
        uglify: {

            options: {
                banner: '/*------------------------------------------------------------------------ \n' +
                        '\t- TableFilter v<%= version %> by Max Guglielmi \n' +
                        '\t- build date: <%= grunt.template.today() %> \n' +
                        '\t- http://tablefilter.free.fr \n' +
                        '\t- Copyright (c) 2014, Licensed under the MIT License \n' +
                        '------------------------------------------------------------------------*/ \n'
            },

            js: {
                files: [{
                    src: ['<%= dist_folder %>tablefilter.js'],
                    dest: '<%= dist_folder %>tablefilter.js'
                }]
            }
        },

        cssmin: {
            combine: {
                options: {
                    banner: '/*------------------------------------------------------------------------ \n' +
                            '\t- TableFilter stylesheet by Max Guglielmi \n' +
                            '\t- (build date: <%= grunt.template.today() %>) \n' +
                            '\t- Edit below for your projects\' needs  \n' +
                            '------------------------------------------------------------------------*/ \n'
                },
                files: {
                    '<%= concat.css.files[0].dest %>': ['<%= concat.css.files[0].dest %>']
                }
            }
        },

        copy: {
            tablefilter: {
                files: [
                    { src: 'libs/sortabletable.js', dest: '<%= source_folder %>extensions/sortabletable/sortabletable.js' },
                    // { src: 'libs/es6-module-loader.js', dest: '<%= source_folder %>es6-module-loader.js' },
                    { src: 'src-es6/extensions/colsVisibility/colsVisibility.css', dest: '<%= source_folder %>extensions/colsVisibility/colsVisibility.css' },
                    // { src: 'libs/requirejs/require.js', dest: '<%= dist_folder %>require.js' },
                    // { src: ['**'], cwd: '<%= source_folder %>TF_Modules/', dest: '<%= dist_folder %>TF_Modules/', expand: true },

                    // TODO: remove ezEditTable and other extensions
                    { src: ['**'], cwd: 'libs/ezEditTable/', dest: '<%= source_folder %>extensions/ezEditTable/', expand: true },
                    { src: ['**'], cwd: 'libs/ezEditTable/', dest: '<%= dist_folder %>extensions/ezEditTable/', expand: true },
                    // { src: ['**'], cwd: '<%= source_folder %>extensions/colsVisibility/', dest: '<%= dist_folder %>extensions/colsVisibility/', expand: true },

                    //
                    { src: 'libs/es6-module-loader.src.js', dest: '<%= dist_folder %>es6-module-loader.src.js' },
                    { src: 'libs/es6-module-loader.js', dest: '<%= dist_folder %>es6-module-loader.js' },
                    { src: 'libs/es6-module-loader.js.map', dest: '<%= dist_folder %>es6-module-loader.js.map' },
                    { src: 'libs/system.js.map', dest: '<%= dist_folder %>system.js.map' },
                    { src: ['**'], cwd: '<%= source_folder %>TF_Themes/', dest: '<%= dist_folder %>TF_Themes/', expand: true }
                ]
            }
        },

        connect: {
            server:{
                options:{
                    port: 9000,
                    hostname: "*",
                    keepalive: true
                }
            }
        },

        babel: {
            'build-main': {
                options: {
                    sourceMap: true,
                    modules: 'amd',
                    compact: false
                },
                files: [{
                    expand: true,
                    cwd: 'src-es6',
                    src: ['*.js'],
                    dest: '<%= source_folder %>'
                },{
                    expand: true,
                    cwd: 'src-es6/modules',
                    src: ['*.js'],
                    dest: '<%= source_folder %>modules'
                }]
            },
            'build-extensions':{
                options: {
                    sourceMap: true,
                    modules: 'amd'
                },
                files: [{
                    expand: true,
                    cwd: 'src-es6/extensions',
                    src: ['**/*.js'],
                    dest: '<%= source_folder %>extensions'
                }]
            }
        }
    });

    // Load the plugins that provide the tasks we specified in package.json.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-babel');

    // This is the default task being executed if Grunt
    // is called without any further parameter.
    grunt.registerTask('default', ['jshint', 'toes5', 'build-requirejs', 'concat', 'uglify', 'cssmin', 'copy', 'qunit']);
    grunt.registerTask('build', ['jshint', 'toes5', 'build-requirejs', 'concat', /*'uglify',*/ 'cssmin', 'copy']);
    grunt.registerTask('dev', ['jshint', 'toes5', 'concat', 'cssmin', 'copy']);
    grunt.registerTask('build-requirejs', ['requirejs:compile-main', 'requirejs:compile-colsvisibility']);
    grunt.registerTask('toes5', ['babel:build-main','babel:build-extensions']);
    grunt.registerTask('test', ['qunit']);
    grunt.registerTask('server', ['connect']);
};
