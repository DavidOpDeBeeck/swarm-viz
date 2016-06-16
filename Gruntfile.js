module.exports = function ( grunt ) {

    var app = {
        'js'    : [ 'app/app.js', 'app/app-*.js' , 'app/**/*.js' ],
        'css'   : 'app/**/*.css',
        'html'  : 'app/**/*.html'
    };
    var libs = {
        'js' : [ 'libs/js/angular.min.js' , 'libs/js/*.js' ],
        'css': 'libs/css/*.css'
    }
    var dist = {
        'default' : './static/dist',
        'app'     : {
            'js'  : './static/dist/js/app.js',
            'css' : './static/dist/css/app.css',
            'html': './static/dist/html/'
        },
        'libs'     : {
            'js'   : './static/dist/js/libs.js',
            'css'  : './static/dist/css/libs.css'
        },
    };

    ///////////////////

    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),
        clean: [ dist.default ],
        concat: {
            'app-js': {
                options: {
                    separator: ';'
                },
                src: app.js,
                dest: dist.app.js
            },
            'app-css': {
                src: app.css,
                dest: dist.app.css
            },
            'lib-js': {
                options: {
                    separator: ';\n'
                },
                src: libs.js,
                dest: dist.libs.js
            },
            'lib-css': {
                src: libs.css,
                dest: dist.libs.css
            }
        },
        babel: {
            options: {
                sourceMap: false,
                presets: [ 'es2015' ]
            },
            app: {
                files: [ {
                    src: dist.app.js,
                    dest: dist.app.js
                } ]
            }
        },
        ngAnnotate: {
            app: {
                files: {
                    "./static/dist/js/app.js": [ "./static/dist/js/app.js" ]
                }
            }
        },
        copy: {
            templates: {
                files: [ {
                    expand: true,
                    flatten: true,
                    src: app.html,
                    dest: dist.app.html
                } ]
            }
        }
    } );

    ///////////////////

    grunt.loadNpmTasks( 'grunt-babel' );
    grunt.loadNpmTasks( 'grunt-ng-annotate' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );

    grunt.registerTask( 'default', [ 'clean', 'concat', 'babel', 'ngAnnotate', 'copy' ] );
};
