/* globals require */

var gulp = require('gulp'),
    notify = require('gulp-notify'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint'),
    errors = [],
    warns = [],
    hadWarns = false,
    hadErrors = false;


gulp.task('lint', function() {
    gulp.src(['./js/*.js', 'gulpfile.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
    watch('./js/*.js', function() {
        gulp.src('./js/*.js')
            .pipe(jshint('.jshintrc'))
            .pipe(notify(function(file) {
                var msg = '';
                // send notifications 
                // -- for errors only, not warnings
                // -- if code was dirty and then bacame clean

                if (file.jshint.success && hadErrors === false && hadWarns === false) {
                    // Don't show something if success without previous errors
                    return false;
                }

                if (!file.jshint.results) {
                    file.jshint.results = [];
                }

                // Don't show warnings
                warns = file.jshint.results.map(function(data) {
                    // only show errors `err.error.code.indexOf('E') !== -1` (not warnings)

                    if (data.error && data.error.code.indexOf('E') !== -1 ) {
                    // 	console.log("data.error.code.indexOf('E')",data.error.code.indexOf('E'));
                        return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
                    } else {
                    	return false;
                    }
                });

                console.log("warns.length",warns.length);
                console.log("hadWarns",hadWarns);
                // Did we purge all the warnings?
                if (warns.length === 0) {
                    if ( hadWarns ) {
                        hadWarns = false;
                        return 'This jawn is passing `jshint` without \warnings or errors.';
                    }
                } else {
                    hadWarns = true;
                }


                // remove warnings (false) from map
            	errors = warns.filter(function(value) {
            		return value;
            	});
            	
                // Any errors?
                if (errors.length === 0) {

                    // success or not, if its no longer dirty
                    // let us know!
                    if (hadErrors) {
                        hadErrors = false;
                        msg += 'This jawn is passing `jshint` without errors.';
                        if (hadWarns) {
                            msg += ' You still have '+warns.length+' warnings. Nbd. ¯\\_(ツ)_/¯';
                        }
                        return msg;
                    }

                    return false;
                } else {
                    hadErrors = true;
                }


                return file.relative + " (" + errors.length + " errors)\n" + errors.join("\n");
            }))
            .pipe(jshint.reporter('jshint-stylish'));
    });
});

gulp.task('default', ['lint', 'watch']);
