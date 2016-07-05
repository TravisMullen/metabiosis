// karma.conf.js
module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        reporters: ['spec'],
        browsers: ['PhantomJS'],

        // browsers: ['PhantomJS','PhantomJS_custom'],

        files: [
            // 'libs/jquery-1.11.3.min.js',
            'js/metabiosis.v.1.0.js',
            'spec/**/*.js'
        ],


        // // you can define custom flags 
        // customLaunchers: {
        //     'PhantomJS_custom': {
        //         base: 'PhantomJS',
        //         options: {
        //             windowName: 'myWindow',
        //             settings: {
        //                 webSecurityEnabled: false
        //             },
        //         },
        //         flags: ['--load-images=true'],
        //         debug: true
        //     }
        // },

        // phantomjsLauncher: {
        //     // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom) 
        //     exitOnResourceError: true
        // }
    });
};
