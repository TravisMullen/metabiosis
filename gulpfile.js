/* globals require, __dirname */

'use strict';
var // required 
    gulp = require( 'gulp' ),
    notify = require( 'gulp-notify' ),
    watch = require( 'gulp-watch' ),
    jshint = require( 'gulp-jshint' ),
    jasmine = require( 'gulp-jasmine' ),
    jscs = require( 'gulp-jscs' ),
    jscsStylish = require( 'gulp-jscs-stylish' ),
    karma = require( 'karma' ),

    // globals
    Server, // for karma

    errors = [],
    warns = [],
    hadWarns = false,
    hadErrors = false;

    // declare `Server` jawn.
    Server = karma.Server;


gulp.task( 'lint', function() {
    gulp.src( [ './js/*.js', 'gulpfile.js' ] )
        .pipe( jshint( '.jshintrc' ) )
        .pipe( jshint.reporter( 'jshint-stylish' ) );
});

gulp.task( 'validate', function() {
    gulp.src( [ './js/*.js', 'gulpfile.js' ] )
        .pipe( jshint( '.jshintrc' ) ) // check the quality

    .pipe( jscs({ fix : false }) ) // enforce style guide
        .pipe( jscsStylish.combineWithHintResults() ) // combine with jshint results 

    .pipe( jshint.reporter( 'jshint-stylish' ) );
});


gulp.task( 'watch', function() {
    watch( './js/*.js', function( file ) {

        gulp.src( file.history ) // use `.history[]` to pipe only file with change event
            .pipe( jshint( '.jshintrc' ) ) // check the quality

        // .pipe( jscs({ fix : false } ) )                       // enforce style guide
        // .pipe( jscsStylish.combineWithHintResults() )       // combine with jshint results 

        .pipe( notify( function( file ) {
            var note = { title : '', message : '' };

            // send notifications 
            // -- for errors only, not warnings
            // -- if code was dirty and then bacame clean

            if ( file.jshint.success && hadErrors === false && hadWarns === false ) {
                // Don't show something if success without previous errors
                return false;
            }


            if ( !file.jshint.results ) {
                file.jshint.results = [];
            }

            // Don't show warnings
            warns = file.jshint.results.map( function( data ) {
                // only show errors `err.error.code.indexOf('E') !== -1` (not warnings)

                note.title = file.relative;

                if ( data.error && data.error.code.indexOf( 'E' ) !== -1 ) {
                    //  console.log("data.error.code.indexOf('E')",data.error.code.indexOf('E'));
                    note.message = '(' + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
                    return note.message;
                } else {
                    return false;
                }
            });

            // Did we purge all the warnings?
            if ( warns.length === 0 ) {
                if ( hadWarns ) {
                    hadWarns = false;
                    hadErrors = false;
                    note.message = 'PASSED :: This jawn is passing `jshint` and `jscs` without \warnings or errors.'
                    return note.message;
                }
            } else {
                hadWarns = true;
            }


            // remove warnings (false) from map
            errors = warns.filter( function( value ) {
                return value;
            });

            // Any errors?
            if ( errors.length === 0 ) {

                // success or not, if its no longer dirty
                // let us know!
                if ( hadErrors ) {
                    hadErrors = false;
                    note.message += 'PASSED :: This jawn is passing `jshint` and `jscs` without errors.';
                    if ( hadWarns ) {
                        note.message += ' You still have ' + warns.length + ' warnings. Nbd. ¯\\_(ツ)_/¯';
                    }
                    return note;
                }

                return false;
            } else {
                hadErrors = true;
            }
            note.message = ' (' + errors.length + ' errors)\n' + errors.join( '\n' )
            return note;
        }) )

        .pipe( jshint.reporter( 'jshint-stylish' ) );
    });
});


// run `clean` and copy over cleaned-up files from build 
// if you don't want to manually update those spaces and commas

gulp.task( 'clean', function() {
    // clean that shit up!
    gulp.src( './js/*.js' )
        .pipe( jscs({ fix : true }) )
        .pipe( jscsStylish() )
        // .pipe( jscs.reporter( ) )
        .pipe( jscs.reporter( 'fail' ) )
        .pipe( gulp.dest( './js' ) );

});

gulp.task( 'clean-gulpfile', function() {
    // might as well clean that gulpfile up, too!
    gulp.src( 'gulpfile.js' )
        .pipe( jscs({ fix : true }) )
        .pipe( jscsStylish() )
        .pipe( jscs.reporter( 'fail' ) )
        .pipe( gulp.dest( './' ) );
});

gulp.task( 'test-lint', function() {

    gulp.src( [ './spec/**/*.js' ] )
        .pipe( jshint( '.jshintrc' ) )
        // .pipe(jshint({ predef: 'jasmine '}))
        .pipe( jshint({
            predef : [
                'describe',
                'beforeEach', 
                'it', 
                'expect', 
                'afterEach'
            ]
        }) )
        .pipe( jshint.reporter( 'jshint-stylish' ) );

});

gulp.task( 'test-style', function() {

    // clean that shit up!
    gulp.src( './spec/*.js' )
        .pipe( jscs({ fix : true }) )
        .pipe( jscsStylish() )
        .pipe( gulp.dest( './spec' ) );

    gulp.src( './spec/*.js' )
        // .pipe( jscs({ fix : true }) )
        .pipe( jscsStylish() )
        // .pipe( jscs.reporter( ) )
        .pipe( jscs.reporter( 'fail' ) )
        .pipe( gulp.dest( './spec' ) );

});

// gulp.task('test-jasmine', function() {
// gulp.src('spec/test.js')
//     // gulp-jasmine works on filepaths so you can't have any plugins before it 
//     .pipe(jasmine());

// });

gulp.task( 'test-run', function( done ) {
    return new Server({
        configFile : __dirname + '/karma.conf.js',
        singleRun : true
    }, done ).start();
});


gulp.task( 'test-watch', function( done ) {
    return new Server({
        configFile : __dirname + '/karma.conf.js'
    }, done ).start();
});

gulp.task( 'test-watch-chrome', function( done ) {
    return new Server({
        configFile : __dirname + '/karma.conf.js',
        browsers: ['Chrome']
    }, done ).start();
});
// general tasks

gulp.task( 'default', [ 'clean', 'watch' ] );

gulp.task( 'build', [ 'clean', 'validate' ] );

gulp.task( 'test', [ 'test-lint', 'test-style', 'test-watch' ] );

gulp.task( 'run', [ 'test-run' ] );
