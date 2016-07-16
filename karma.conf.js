// karma.conf.js
module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        reporters: ['spec'],

        // use Chrome cause Phanton doesnt have click events!
        browsers: ['Chrome'],

        // browsers: ['PhantomJS','PhantomJS_custom'],

        files: [
            // libs (if ever used)
            // 'libs/jquery-1.11.3.min.js',

            // mockument
            'spec/mockument/mockument.js',
            // 'spec/mockument/mockumentSpec.js',

            // Metabiosis // mBss
            'js/action.service.js',
            'spec/*.js'
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
