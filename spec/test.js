// /* globals figgy, mBss */
// 'use strict';
// describe( 'A proper config', function() {
//     var biosis,
//         config;

//     beforeEach( function() {
//         // console.log( 'mBss', mBss );
//         // console.log( 'scope', window.scope );
//         config = figgy; // from global

//         // testing!
//         config.spec = true;

//         biosis = mBss;
//         // config = ;
//     });

//     it( 'should have paths', function() {
//         expect( config.paths ).toBeDefined();
//     });

//     it( 'should have defined paths', function() {
//         var path;
//         for ( path in config.paths ) {
//             expect( config.paths[ path ].length ).toBeGreaterThan( 0 );
//         }
//     });

//     it( 'should have items', function() {
//         expect( config.items.length ).toBeGreaterThan( 0 );
//     });

// });


// describe( 'Metabiosis (mBss)', function() {
//     var biosis,
//         config;

//     beforeEach( function() {
//         config = figgy; // from global

//         // set it loose!
//     });
// //     

//     // afterEach(function() {
//     //     // stop it!
//     //     biosis.kill();
//     // });

//     it( 'exists', function() {
//         expect( mBss ).toBeDefined();
//     });

//     it( 'can run', function() {
//         expect( mBss.run ).toBeDefined();
//     });

//     it( 'can be killed', function() {
//         expect( mBss.kill ).toBeDefined();
//     });

    
//     describe( 'should run', function() {

//         afterEach( function() {
//                 // stop it!
//             mBss.kill();
//         });

//         it( 'and require config else throw expection', function() {
//             expect( mBss.run ).toThrow();
//         });

//         it( 'and give statuses to show it is running', function() {
//             mBss.run( config );
//             expect( mBss.isRunning() ).toBeTruthy();
//         });

//         it( 'and show apply `mBss.spec` testing globals', function() {
//             mBss.run( config );
//             expect( mBss.spec ).toBeDefined();
//         });

//         it( 'and give statuses to show it can be killed', function() {
//             // mBss.run( config );
//             expect( mBss.killCount() ).toBeGreaterThan( 0 );
//         });

//     });

//     describe( 'should kill and give statuses', function() {

//         beforeEach( function() {
//             mBss.run( config );
//             mBss.kill();
//         });

//         it( 'to show it is not running', function() {
//             expect( mBss.isRunning() ).toBeFalsy();
//         });

//         it( 'to show it can be killed', function() {
//             // console.log("mBss.killCount()",mBss.killCount());
//             expect( mBss.killCount() ).toBeGreaterThan( 0 );
//         });

//     });


//     describe( 'should load event queue', function() {

//         beforeEach( function() {
//             mBss.run( config );
//         });
//         afterEach( function() {
//             mBss.kill();
//         });

//         it( 'with events', function() {
//             expect( mBss.spec.eventQueue ).toBeDefined();
//             console.log( 'mBss.spec.eventQueue.length', mBss.spec.eventQueue.length );
//             expect( mBss.spec.eventQueue.length ).toBeGreaterThan( 0 );
//         });

//         // it( 'with events', function() {
//         // });
//         // it( 'to show it can be killed', function() {
//         //     // console.log("mBss.killCount()",mBss.killCount());
//         //     expect( mBss.killCount() ).toBeGreaterThan( 0 );
//         // });

//     });
//         // mBss.kill();

//         // expect( mBss.isRunning() ).not.toBeFalsy();
//         // expect( mBss.killCount() ).not.toBeGreaterThan( 0 );
//     // describe('should have a queue', function() {
//         // var queue,
//         //     mBss;

// //     //     beforeEach(function() {
// //     //         // console.log( 'mBss', mBss );
// //     //         // console.log( 'scope', window.scope );
// //     //         mBss(figgy);
// //     //         mBss = biosis;
// //     //         // config = ;
// //     //     });

// //     //     it('should have a queue of ', function() {
// //     //         console.log("config.paths", config.paths);
// //     //         expect(config.paths).toBeDefined();
// //     //     });

// //     //     it('should have items', function() {
// //     //         console.log("config.items.length", config.items.length);
// //     //         expect(config.items.length).toBeDefined();
// //     //     });

//     // });

// });

// // describe( 'A web instance', function() {
// //     var biosis,
// //         config;

// //     beforeEach( function() {
// //      // console.log( 'mBss', mBss );
// //      // console.log( 'scope', window.scope );
// //          config = figgy; // from global
// //          biosis = mBss;
// //         // config = ;
// //     });

// //     it( 'should have a user agent', function() {
// //      // var page = require('webpage').create();
// //      console.log('The default user agent is ' + myWindow.settings.userAgent);
// //      myWindow.settings.userAgent = 'SpecialAgent';
// //      myWindow.open('http://www.httpuseragent.org', function(status) {
// //        if (status !== 'success') {
// //          console.log('Unable to access network');
// //        } else {
// //          var ua = page.evaluate(function() {
// //            return document.getElementById('myagent').textContent;
// //          });
// //          console.log(ua);
// //        }
// //        phantom.exit();
// //      });
// //     });

// //     it( 'should my-window', function() {
// //      console.log("myWindow",myWindow);
// //         expect( myWindow ).toBeDefined();
// //     });

// // });



// /// todo
// /// 
// /// test 1. creates item array
// ///  had paths
// ///  exectues based on action
// ///  and/or called function (binds scope)
// ///  scope t ohelper functions
// ///  removes tasts one complete
// ///  retries if max attempts not reached
// ///  
// ///  make local stoage encryption 
// ///  give user specic key to reverse
// // rse
