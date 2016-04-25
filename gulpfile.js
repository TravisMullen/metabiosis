/* globals require */

'use strict';
var gulp = require( 'gulp' ),
    notify = require( 'gulp-notify' ),
    watch = require( 'gulp-watch' ),
    jshint = require( 'gulp-jshint' ),
    jscs = require( 'gulp-jscs' ),
    jscsStylish = require( 'gulp-jscs-stylish' ),
    errors = [],
    warns = [],
    hadWarns = false,
    hadErrors = false;


gulp.task( 'lint', function() {
    gulp.src( [ './js/*.js', 'gulpfile.js' ] )
        .pipe( jshint( '.jshintrc' ) )
        .pipe( jshint.reporter( 'jshint-stylish' ) );
});

gulp.task( 'validate', function() {
    gulp.src( [ './js/*.js', 'gulpfile.js' ] )
        .pipe( jshint( '.jshintrc' ) )                      // check the quality

        .pipe( jscs({ fix : false } ) )                       // enforce style guide
        .pipe( jscsStylish.combineWithHintResults() )       // combine with jshint results 

        .pipe( jshint.reporter( 'jshint-stylish' ) );
});


gulp.task( 'watch', function() {
    watch( './js/*.js', function() {
        gulp.src( './js/*.js' )
            .pipe( jshint( '.jshintrc' ) )                      // check the quality

            // .pipe( jscs({ fix : false } ) )                       // enforce style guide
            // .pipe( jscsStylish.combineWithHintResults() )       // combine with jshint results 

            .pipe( notify( function( file ) {
                var msg = '';

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

                    if ( data.error && data.error.code.indexOf( 'E' ) !== -1 ) {
                        //  console.log("data.error.code.indexOf('E')",data.error.code.indexOf('E'));
                        return '(' + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
                    } else {
                        return false;
                    }
                });

                // Did we purge all the warnings?
                if ( warns.length === 0 ) {
                    if ( hadWarns ) {
                        hadWarns = false;
                        hadErrors = false;
                        return 'PASSED :: This jawn is passing `jshint` and `jscs` without \warnings or errors.';
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
                        msg += 'PASSED :: This jawn is passing `jshint` and `jscs` without errors.';
                        if ( hadWarns ) {
                            msg += ' You still have ' + warns.length + ' warnings. Nbd. ¯\\_(ツ)_/¯';
                        }
                        return msg;
                    }

                    return false;
                } else {
                    hadErrors = true;
                }


                return file.relative + ' (' + errors.length + ' errors)\n' + errors.join( '\n' );
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


// general tasks

gulp.task( 'default', [ 'clean', 'watch' ] );

gulp.task( 'build', [ 'clean', 'validate' ] );
