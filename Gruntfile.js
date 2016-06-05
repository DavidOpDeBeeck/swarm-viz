module.exports = function ( grunt ) {

    var app = './static/app/';

    ///////////////////

    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),
        clean: [ 'dist' ],
        concat: {
            'app-js': {
                options: {
                    separator: ';'
                },
                src: [ app + '*/app.*.js', app + '**/*.js' ],
                dest: 'dist/js/app.js'
            },
            'app-css': {
                src: app + '**/*.css',
                dest: 'dist/css/app.css'
            }
        },
        babel: {
            options: {
                sourceMap: false,
                presets: [ 'es2015' ]
            },
            app: {
                files: [ {
                    src: 'dist/js/app.js',
                    dest: 'dist/js/app.js'
                } ]
            }
        }
    });

    ///////////////////

    grunt.loadNpmTasks( 'grunt-babel' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );

    grunt.registerTask( 'default', [ 'clean', 'concat', 'babel' ] );
};
