// jscs:disable maximumLineLength
'use strict';
var figgy = ( function setConfig() {
    var scope = {},
        helpers = {
            filterKey : function ( name ) {
                var key = '';
                if ( name !== undefined ) {
                    key = name;
                    key = key.replace( /[^a-zA-Z0-9]/g, '' ); // remove all non-alphas and non-number
                    key = key.toLowerCase();
                }
                return key;
            }
        }, // end tools
        paths = {
            hats : [ {
                    target : '[href$="shop/all"]',
                    action : true,
                    attempts : 2
                }, {
                    target : '[href$="shop/all/hats"]',
                    action : true,
                    rate : 3000 // slow for just this action
                        // }, { 
                        //     // validates shouldnt fire clicks for true
                        //     target: '[href$="shop/all/hats"].current',
                        //     // validate: true 
                        //     action: true

                }, { // is sold out
                    // filtered,
                    target : '.inner-article',
                    action : function( target ) {
                        console.log( 'target.length', target.length );
                        var augmented = [],
                            fkey = this._bios.filterKey( 'Sold Out' ),
                            content = target,
                            fres; // check for ns
                        console.log( 'fkey', fkey );
                        this._config.turd = 'travis';
                        for ( var i = content.length - 1; i >= 0; i-- ) {
                            fres = this._bios.filterKey( content[ i ].innerHTML );
                            if ( fres.indexOf( fkey ) === -1 ) {
                                console.log( 'fres', fres );
                                augmented.unshift( target[ i ] );
                            }
                        }

                        // if ( augmented.length ) {

                        // }
                        console.log( 'filterKey(\'Sold Out\') // augmented.length', augmented.length );
                        return augmented; // if length 0 return false
                    }
                }, {
                    // target: false,
                    subtarget : '.inner-article h1',
                    fibulate : true,
                    // subtargets to be queried on each top level scope (no actions), 
                    // then passing in the augmented from previous target. 
                    // if no value then treated as target

                    // for loop will be required to gather all subtargets

                    // if (subtarget) {
                    //     action(last, a1);
                    // } else {
                    //     action(target, a1);
                    // }
                    action : function( target, augmentedParent ) {
                        console.log( 'THIS', this );
                        var augmented = [],
                            fkey = this._bios.filterKey( this._config.key ), // key needs to be defined in instances
                            fres;
                        // bind config file to get access to key
                        // content = target.all || target; // check for ns
                        console.log( 'fkey', fkey );
                        console.log( 'this._config.key', this._config.key );
                        console.log( 'this._config', this._config );

                        for ( var i = augmentedParent.length - 1; i >= 0; i-- ) {
                            fres = this._bios.filterKey( augmentedParent[ i ].innerHTML );
                            console.log( 'fres', fres );
                            console.log( 'fres.indexOf(fkey)', fres.indexOf( fkey ) );
                            if ( fres.indexOf( fkey ) >= 0 ) {
                                augmented.unshift( augmentedParent[ i ] );
                            }
                        }
                        console.log( 'augmented.length', augmented.length );
                        if ( augmented.length ) {
                            console.log( 'filterKey(this._config.key) // new augmented', augmented );
                            return augmented;
                        } else {
                            console.log( 'filterKey(this._config.key) // last augmentedParent', augmentedParent );
                            return augmentedParent;
                        }
                    }
                },

                {
                    // target: false,
                    subtarget : '.inner-article p',
                    fibulate : true,
                    // subtargets to be queried on each top level scope (no actions), 
                    // then passing in the augmented from previous target. 
                    // if no value then treated as target

                    // for loop will be required to gather all subtargets

                    // if (subtarget) {
                    //     action(last, a1);
                    // } else {
                    //     action(target, a1);
                    // }
                    action : function( target, augmentedParent ) {
                            console.log( 'THIS', this );
                            var augmented = [],
                                fkey, // key needs to be defined in instances
                                fres;

                            // if no attrib then move on
                            if ( !this._config.style ) {
                                return augmentedParent;
                            }

                            fkey = this._bios.filterKey( this._config.style ); // key needs to be defined in instances

                            // bind config file to get access to key
                            // content = target.all || target; // check for ns
                            // console.log( 'fkey', fkey );
                            // console.log( 'this._config.key', this._config.key );
                            // console.log( 'this._config.turd', this._config.turd );

                            for ( var i = augmentedParent.length - 1; i >= 0; i-- ) {
                                fres = this._bios.filterKey( augmentedParent[ i ].innerHTML );
                                console.log( 'fres', fres );
                                console.log( 'fres.indexOf(fkey)', fres.indexOf( fkey ) );
                                if ( fres.indexOf( fkey ) >= 0 ) {
                                    augmented.unshift( augmentedParent[ i ] );
                                }
                            }
                            console.log( 'style :: // augmented.length', augmented.length );
                            if ( augmented.length ) {
                                console.log( 'style // new augmented', augmented );
                                return augmented;
                            } else {
                                console.log( 'style // last augmentedParent', augmentedParent );
                                return augmentedParent;
                            }
                        }
                        // on product PAGE

                    // }, {
                    //     subtarget: '.inner-article p',
                    //     action: f3unction(target, augmentedParent) {
                    //         console.log("THIS", this);
                    //         var augmented = [],
                    //             this._bios.filterKey(this._config.style); // key needs to be defined in instances
                    //         // bind config file to get access to key
                    //         for (var i = augmentedParent.length - 1; i >= 0; i--) {
                    //             if (augmentedParent[i].innerHTML.indexOf(fkey) === -1) {
                    //                 augmented.unshift(augmentedParent[i]);
                    //             }
                    //         }
                    //         return augmented; // if length 0 return false
                    //     }
                }, {
                    // default: true (first/0 index in array)
                    // or pass in index to attempt to be pulled from array
                    // submit: true



                    submit : '[href]'

                    // subtarget: '.inner-article [href]',
                    // action: true
                }, {
                    target : '[value="add to cart"]',
                    action : true
                }
            ],
            jackets : [ {
                    target : '[href$="shop/all"]',
                    action : true
                }, {
                    target : '[href$="shop/all/jackets"]',
                    action : true,
                    rate : 3000 // slow for just this action
                        // }, { 
                        //     // validates shouldnt fire clicks for true
                        //     target: '[href$="shop/all/hats"].current',
                        //     // validate: true 
                        //     action: true

                }, { // is sold out
                    // filtered,
                    target : '.inner-article',
                    action : function( target ) {
                        console.log( 'target.length', target.length );
                        var augmented = [],
                            fkey = this._bios.filterKey( 'Sold Out' ),
                            content = target,
                            fres; // check for ns

                        for ( var i = content.length - 1; i >= 0; i-- ) {
                            fres = this._bios.filterKey( content[ i ].innerHTML );
                            if ( fres.indexOf( fkey ) === -1 ) {
                                console.log( 'fres', fres );
                                augmented.unshift( target[ i ] );
                            }
                        }

                        // if ( augmented.length ) {

                        // }
                        console.log( 'filterKey(\'Sold Out\') // augmented.length', augmented.length );
                        return augmented; // if length 0 return false
                    }
                }, {
                    // target: false,
                    subtarget : '.inner-article h1',
                    fibulate : true,
                    // subtargets to be queried on each top level scope (no actions), 
                    // then passing in the augmented from previous target. 
                    // if no value then treated as target

                    // for loop will be required to gather all subtargets

                    // if (subtarget) {
                    //     action(last, a1);
                    // } else {
                    //     action(target, a1);
                    // }
                    action : function( target, augmentedParent ) {
                        console.log( 'THIS', this );
                        var augmented = [],
                            fkey = this._bios.filterKey( this._config.key ), // key needs to be defined in instances
                            fres;
                        // bind config file to get access to key
                        // content = target.all || target; // check for ns
                        console.log( 'fkey', fkey );
                        console.log( 'this._config.key', this._config.key );
                        console.log( 'this._config', this._config );

                        for ( var i = augmentedParent.length - 1; i >= 0; i-- ) {
                            fres = this._bios.filterKey( augmentedParent[ i ].innerHTML );
                            console.log( 'fres', fres );
                            console.log( 'fres.indexOf(fkey)', fres.indexOf( fkey ) );
                            if ( fres.indexOf( fkey ) >= 0 ) {
                                augmented.unshift( augmentedParent[ i ] );
                            }
                        }
                        console.log( 'augmented.length', augmented.length );
                        if ( augmented.length ) {
                            console.log( 'filterKey(this._config.key) // new augmented', augmented );
                            return augmented;
                        } else {
                            console.log( 'filterKey(this._config.key) // last augmentedParent', augmentedParent );
                            return augmentedParent;
                        }
                    }
                },

                {
                    // target: false,
                    subtarget : '.inner-article p',
                    fibulate : true,
                    // subtargets to be queried on each top level scope (no actions), 
                    // then passing in the augmented from previous target. 
                    // if no value then treated as target

                    // for loop will be required to gather all subtargets

                    // if (subtarget) {
                    //     action(last, a1);
                    // } else {
                    //     action(target, a1);
                    // }
                    action : function( target, augmentedParent ) {
                            console.log( 'THIS', this );
                            var augmented = [],
                                fkey = this._bios.filterKey( this._config.style ), // key needs to be defined in instances
                                fres;
                            // bind config file to get access to key
                            // content = target.all || target; // check for ns
                            console.log( 'fkey', fkey );
                            console.log( 'this._config.key', this._config.key );
                            console.log( 'this._config.turd', this._config.turd );

                            for ( var i = augmentedParent.length - 1; i >= 0; i-- ) {
                                fres = this._bios.filterKey( augmentedParent[ i ].innerHTML );
                                console.log( 'fres', fres );
                                console.log( 'fres.indexOf(fkey)', fres.indexOf( fkey ) );
                                if ( fres.indexOf( fkey ) >= 0 ) {
                                    augmented.unshift( augmentedParent[ i ] );
                                }
                            }
                            console.log( 'style :: // augmented.length', augmented.length );
                            if ( augmented.length ) {
                                console.log( 'style // new augmented', augmented );
                                return augmented;
                            } else {
                                console.log( 'style // last augmentedParent', augmentedParent );
                                return augmentedParent;
                            }
                        }
                        // on product PAGE

                    // }, {
                    //     subtarget: '.inner-article p',
                    //     action: f3unction(target, augmentedParent) {
                    //         console.log("THIS", this);
                    //         var augmented = [],
                    //             this._bios.filterKey(this._config.style); // key needs to be defined in instances
                    //         // bind config file to get access to key
                    //         for (var i = augmentedParent.length - 1; i >= 0; i--) {
                    //             if (augmentedParent[i].innerHTML.indexOf(fkey) === -1) {
                    //                 augmented.unshift(augmentedParent[i]);
                    //             }
                    //         }
                    //         return augmented; // if length 0 return false
                    //     }
                }, {
                    // default: true (first/0 index in array)
                    // or pass in index to attempt to be pulled from array
                    // submit: true



                    submit : '[href]'

                    // subtarget: '.inner-article [href]',
                    // action: true
                }, {
                    target : '[value="add to cart"]',
                    action : true
                }
            ],
            checkout : [ {
                    target : '[href$="checkout"]',
                    action : true
                },
                // fill out form
                {
                    target : '.button.checkout',
                    action : true
                }
            ]
        }, // end paths

        items = [ // order is assumed to be true
            {
                name : 'Cord Zip Bell Hat',
                key : 'cord zip bell hat',
                keys : [ 'cord zip', 'bell hat' ],
                size : 'M/L',
                style : 'olive',
                pathType : 'hats'
            }, {
                name : 'Corduroy 5-Panel',
                key : 'Corduroy 5 Panel',
                keys : [ 'Corduroy', '5-Panel' ],
                style : 'navy',
                pathType : 'hats'
            }, {
                name : 'Camp Cap',
                key : 'camp cap',
                pathType : 'hats'
            }, {
                name : 'north face',
                key : 'north face',
                pathType : 'jackets'
            },

            {
                name : 'checkout',
                key : 'north face',
                data : {
                    name : 'Offal Knausgaard', // text input
                    email : 'offal@chicharrones.com', // text input
                    tel : '(555) 322-3331', // text input
                    address : '8633 Intelligentsia St', // text input
                    zip : '19146', // text input
                    city : 'Williamsburg', // text input

                    state : 'TX', // drop down
                    country : 'USA', // drop down

                    saveAddress : true, // checkbox

                    ccType : null, // drop down
                    ccNumber : null,
                    ccExpDateMM : null, // drop down
                    ccExpDateYY : null, // drop down
                    ccCVV : null, // security code // text input

                    acceptTerms : true // checkbox
                },
                pathType : 'checkout'
            }

        ]; // end items 

    scope.paths = paths;
    scope.items = items;
    scope.helpers = helpers;

    return scope;
} )();