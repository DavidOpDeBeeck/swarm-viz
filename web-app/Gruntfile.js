module.exports = function ( grunt ) {
    var app = {
        'js'    : ['app/custom/**/*.js', 'app/app.js', 'app/app-*.js' , 'app/**/*.js'],
        'css'   : ['app/reset.sass', 'app/**/*.sass'],
        'html'  : 'app/**/*.html'
    };

    var libs = {
        'js'      : ['libs/js/jquery.min.js',
                     'libs/js/jquery.nicescroll.min.js',
                     'libs/js/angular.min.js',
                     'libs/js/*'],
        'css'     : 'libs/css/*'
    };

    var release = {
        'app'     : {
            'js'  : 'static/assets/js/app.js',
            'css' : 'static/assets/css/app.css',
            'sass' : 'static/assets/css/app.sass',
            'html': 'static/assets/html/'
        },
        'libs'     : {
            'js'   : 'static/assets/js/libs.js',
            'css'  : 'static/assets/css/libs.css'
        }
    };

    var dependencies = {
        'js' : [
            ['jquery', 'dist/jquery.min.js'],
            ['nicescroll', 'jquery.nicescroll.min.js'],
            ['angular', 'angular.min.js'],
            ['angular-ui-router', 'release/angular-ui-router.min.js'],
            ['angular-nicescroll', 'angular-nicescroll.js'],
            ['angular-resource', 'angular-resource.min.js'],
            ['angular-socket-io', 'socket.min.js'],
            ['vis', 'dist/vis.min.js']
        ],
        'css' : [
            ['font-awesome', 'css/font-awesome.min.css'],
            ['vis', 'dist/vis.min.css']
        ],
        'fonts' : [
            ['font-awesome', 'fonts/*.*']
        ],
        'output' : {
            'js' : 'libs/js',
            'css': 'libs/css',
            'fonts': 'static/assets/fonts'
        }
    };

    dependencies.js.forEach((dependency, index) => {
        dependencies.js[ index ] = 'node_modules/' + dependency[0] + '/' + dependency[1];
    });

    dependencies.css.forEach((dependency, index) => {
        dependencies.css[ index ] = 'node_modules/' + dependency[0] + '/' + dependency[1];
    });

    dependencies.fonts.forEach((dependency, index) => {
        dependencies.fonts[ index ] = 'node_modules/' + dependency[0] + '/' + dependency[1];
    });

    ///////////////////

    var sassConfig = {
        options: {
            indentedSyntax: true
        },
        dist: { files: {} }
    }
    sassConfig.dist.files[release.app.css] = release.app.sass;

    ///////////////////

    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),
        clean: {
            'release': [
                release.app.js,
                release.app.css,
                release.app.html
            ]
        },
        copy: {
            'app-templates': {
                files: [{
                    expand: true,
                    flatten: true,
                    src: app.html,
                    dest: release.app.html
                }]
            },
            'dependencies-js': {
                files: [{
                    expand: true,
                    flatten: true,
                    src: dependencies.js,
                    dest: dependencies.output.js
                }]
            },
            'dependencies-css': {
                files: [{
                    expand: true,
                    flatten: true,
                    src: dependencies.css,
                    dest: dependencies.output.css
                }]
            },
            'dependencies-fonts': {
                files: [{
                    expand: true,
                    flatten: true,
                    src: dependencies.fonts,
                    dest: dependencies.output.fonts
                }]
            }
        },
        concat: {
            'app-js': {
                options: {
                    separator: ';'
                },
                src: app.js,
                dest: release.app.js
            },
            'app-css': {
                src: app.css,
                dest: release.app.sass
            },
            'libs-js': {
                options: {
                    separator: ';\n'
                },
                src: libs.js,
                dest: release.libs.js
            },
            'libs-css': {
                src: libs.css,
                dest: release.libs.css
            }
        },
        babel: {
            options: {
                sourceMap: false,
                presets: [ 'es2015' ]
            },
            'release': {
                files: [{
                    src: release.app.js,
                    dest: release.app.js
                }]
            }
        },
        sass: sassConfig
    } );

    ///////////////////

    grunt.loadNpmTasks( 'grunt-babel' );
    grunt.loadNpmTasks( 'grunt-sass' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );

    grunt.registerTask( 'dependencies', [
        'copy:dependencies-js',
        'copy:dependencies-css',
        'copy:dependencies-fonts'
    ] );

    grunt.registerTask( 'release', [ 'clean', 'copy:app-templates', 'concat', 'babel', 'sass' ] );
};
