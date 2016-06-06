module.exports = function ( grunt ) {

    var app = './static/app/';
    var dist = {};

    dist.default = './static/dist/';
    dist.js = dist.default+'js/app.js';
    dist.css = dist.default+'css/app.css';

    ///////////////////

    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),
        clean: [ dist.default ],
        concat: {
            'app-js': {
                options: {
                    separator: ';'
                },
                src: [ app + '*/app*.js', app + '**/*.js' ],
                dest: dist.js
            },
            'app-css': {
                src: app + '**/*.css',
                dest: dist.css
            }
        },
        babel: {
            options: {
                sourceMap: false,
                presets: [ 'es2015' ]
            },
            app: {
                files: [ {
                    src: dist.js,
                    dest: dist.js
                } ]
            }
        },
        ngAnnotate: {
            app: {
                files: {
                    "./static/dist/js/app.js": [ "./static/dist/js/app.js" ]
                }
            }
        }
    } );

    ///////////////////

    grunt.loadNpmTasks( 'grunt-babel' );
    grunt.loadNpmTasks( 'grunt-ng-annotate' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );

    grunt.registerTask( 'default', [ 'clean', 'concat', 'babel', 'ngAnnotate' ] );
};
