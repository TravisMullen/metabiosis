// /* globals figgy, mBss */
// 'use strict';
// describe('The Handler', function() {
//     var service,
//         mock,
//         config;

//     beforeEach(function() {
//         // console.log( 'mBss', mBss );
//         // console.log( 'scope', window.scope );
//         config = figgy; // from global



//         // create fake DOM to parse

//         mock = function() {
//             // list of items
//             // 
//             var list = document.createElement('ul'),
//                 items = [];
//         };

//         // update based on returned fake elms


//         config.item = {
//             name: 'Hello World',
//             key: 'lipsum',
//             pathType: 'spec'
//         };

//         config.path = [{
//             // filtered,
//             target: '.inner-article',
//             action: function(target) {
//                 console.log('action target.length', target.length);
//                 var augmented = [],
//                     // fkey = this._bios.filterKey( 'Sold Out' ),
//                     content = target,
//                     fres; // check for ns

//                 augmented = ['hello'];
//                 // for ( var i = content.length - 1; i >= 0; i-- ) {
//                 //     fres = this._bios.filterKey( content[ i ].innerHTML );
//                 //     if ( fres.indexOf( fkey ) === -1 ) {
//                 //         console.log( 'fres', fres );
//                 //         augmented.unshift( target[ i ] );
//                 //     }
//                 // }

//                 // // if ( augmented.length ) {

//                 // // }
//                 // console.log( 'filterKey(\'Sold Out\') // augmented.length', augmented.length );
//                 return augmented; // if length 0 return false
//             }
//         }];
//         // testing!
//         // config.spec = true;

//         service = mBss;
//         // config = ;
//     });

//     it('should have handleAction', function() {
//         console.log("service", service);
//         expect(service.handleAction).toBeDefined();
//     });

//     it('should should accept action and return result', function() {
//         console.log("config.path", config.path);
//         var result,
//             // item,
//             action;

//         action = config.path;
//         action.helpers = config.helpers;
//         action.config = config.item;

//         result = service.handleAction(action);
//         console.log("RESULT =====>",result);
//         expect(result).toBeDefined();
//         // expect(result).not.toBeDefined();
//     });

//     // define targets
//     // define actions



//     // it( 'should have defined paths', function() {
//     //     var path;
//     //     for ( path in config.paths ) {
//     //         expect( config.paths[ path ].length ).toBeGreaterThan( 0 );
//     //     }
//     // });

//     // it( 'should have items', function() {
//     //     expect( config.items.length ).toBeGreaterThan( 0 );
//     // });

// });
