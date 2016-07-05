'use strict';
var mBss = ( function() {

    /* ========================================================================== *
           __       
          / <`        /|\ 
         (  / @    @ ( V )     Metabiosis // mBss
          \(_ _\__/_ _)/       -+-+-+-+-+-+-+-+-
        (\ `-/      \-' /)     Nimble
         "===\ mBss /==="      Automation
          .==')____(`==.       Framework
         ' .='     `=.

      <==========================================================================>

        author:     Travis Mullen
        version:    0.9
        circa:      4.2016

     * ========================================================================== */


    /* ========================================================================== *

    // Module Export Pattren
    // http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html

     * ========================================================================== */

    var mbss = {}, // `mbss` Public Module namespace

        /* ========================================================================== *
            Private Properties
         * ========================================================================== */

        __HEART = {
            // BEAT: undefined, // drop (or stop) the beat
            COUNT : 0, // keep a count just incase
            RATE : 1000, // 1s
            KILLS : 0
        },

        // actions consolidated into events
        __eventQueue = [],

        // a. item specific event paths iterated over for each item
        // b. events paths for each item rendered out into flat(ter) array 
        // handlerQueue = [],
        // __readyHandler = true,

        // items type: key as name of each item type
        __itemKeys,

        // items for event path
        // each type as array by item type
        __items,


        // action paths 
        // each type as array by item type
        __paths,

        // active action set
        // put push actions into this array them remove them as complete for each item
        __actionQueue = [],

        // placeholder for data to be passed down the action path
        __augmentedFailed, // if alraedy returned zero
        __augmented,

        // failed action attempts
        __failed = 0,
        __failedTarget,

        // general config placeholder
        __config = {}; // end private vars



    /* ========================================================================== *
        Private Functions
     * ========================================================================== */

    /* ========================================================================== *
        
        Helper Functions for use within 'actions'

     * ========================================================================== */

    // __config.tools = {
    //     filterKey : function( name ) {
    //         var key = '';
    //         if ( name !== undefined ) {
    //             key = name;
    //             key = key.replace( /[^a-zA-Z0-9]/g, '' ); // remove all non-alphas and non-number
    //             key = key.toLowerCase();
    //         }
    //         return key;
    //     }
    // }

    // function filterKey( name ) {
    //     var key = '';
    //     if ( name !== undefined ) {
    //         key = name;
    //         key = key.replace( /[^a-zA-Z0-9]/g, '' ); // remove all non-alphas and non-number
    //         key = key.toLowerCase();
    //     }
    //     return key;
    // }

    // function compileTools() {
    //     // what functions should we grab from prototype
    //     // to be bound to the `action` fns
    //     var toolList = [ 'filterKey' ],
    //         tools = {};
    //     for ( var i = toolList.length - 1; i >= 0; i-- ) {
    //         // move functions from this scope the actions scope for binding
    //         tools[ toolList[ i ] ] = _config.tools[ toolList[ i ] ]; // add functions by name
    //     }
    //     return tools;
    // }


    /* ========================================================================== *
        
        HANDLER & dependencies (should be module)

     * ========================================================================== */

    // function queueHandler() {

    //     // add actions from event queue

    //     // if there are active actions pending
    //     // don't queue any new ones
    //     mbss.log( '__actionQueue set ', __actionQueue );
    //     if ( __actionQueue.length ) {
    //         mbss.log( 'we still got some actions to complete, skip a beat!' );
    //     } else {
    //         // if ( __eventQueue.length ) {
    //             __actionQueue = __eventQueue.shift();
    //         // } else {
    //         //     mbss.log('thats it, show is over!');
    //         //     return;
    //         // }
    //     }

    //     mbss.log( '__actionQueue ', __actionQueue );

    //     // if ( __readyHandler ) {
    //     handleAction( __actionQueue );
    //     // }

    // }

    // BEAT
    // if events in queue, 
    // call handler on event
    // if event has set fibulate 
    // (not) timeout

    // events
    function dropABeat() {
        // only looking for the first `rate` in the array
        // because fibulated actions should not have ratea at all 
        var rate = ( __eventQueue[ 0 ] &&  
                        __eventQueue[ 0 ][ 0 ] && 
                        __eventQueue[ 0 ][ 0 ].rate ) ?
                    __eventQueue[ 0 ][ 0 ].rate :
                    __HEART.RATE;

            // mbss.log( rate/1000 + ' sec rate' );

        // if ( __eventQueue.length ) {
            __HEART.BEAT = window.setTimeout( function() {
                mbss.log( 'beating!', ++__HEART.COUNT );

                // console.log("queueHandler",queueHandler);
                
                // queueHandler();

            }, rate );
            // console.log("dropABeat __HEART.BEAT",__HEART.BEAT);
        // } else {
        //     mbss.log( 'show is over! *=========> ' );
        // }
    }

    // function removeAction() {
    //     // also shortqueue here
    //     // if ( __actionQueue.length >= 2 ) {
    //     //     __readyHandler = true;
    //     //     queueHandler();
    //     //     return;
    //     // }

    //     // handlerQueue = this.clone(this.__eventQueue[0]);
    //     // always assume working of fist nestest array
    //     var n = __actionQueue.splice( 0, 1 );
    //     mbss.log( 'remove action from handlerQueue!', n );

    //     dropABeat();
    // }

    // function clickSyth( target ) {
    //     var canceled,
    //         evt = new MouseEvent( 'click', {
    //             'view' : window,
    //             'button' : 0,
    //             'bubbles' : true,
    //             'cancelable' : true
    //         });

    //     target = target[ 0 ] || target; // if array, break out first
    //     mbss.log( 'clickSyth // target', target );
    //     // this is moved to handler // this should NOT be getting bad targets...
    //     // if (!target) {
    //     //     mbss.log("no target yet, still waiting");
    //     //     failedCheck(selector);
    //     // }

    //     if ( target && mBss.visualCues ) {
    //         target.style.border = '1px solid #b368b3';
    //         target.style.backgroundColor = '#800080';
    //         target.style.color = '#32CD32';
    //         // return;
    //     }


    //     canceled = !target.dispatchEvent( evt );

    //     removeAction(); // remove completed event

    //     if ( canceled ) {
    //         // A clickSyth called preventDefault.
    //         mbss.log( 'MouseEvent `click` canceled' );
    //     } else {
    //         // None of the clickSyths called preventDefault.
    //         mbss.log( 'MouseEvent `click` NOT canceled' );
    //     }
    // }

    // // return boolean to confirm if handler should dump the action
    // // maintain ref of current failed
    // function failedCheck( model ) {
    //     mbss.log( 'failedCheck', model );
    //     // ** how to tell if key (oject name)__failed > model.attempts || mbss.maxFailedAttempts
    //     var failedEventAttemptsMax = model.attempts || mbss.maxFailedAttempts;
    //     mbss.log( 'model.selector', model.selector );
    //     mbss.log( 'failedEventAttemptsMax', failedEventAttemptsMax );

    //     if ( model.selector === __failedTarget ) {
    //         ++__failed;
    //         // ++__failed;
    //         mbss.log( 'Failed attempts for this action: ', __failed );
    //         // too many attampts?
    //         if ( __failed >= failedEventAttemptsMax ) {

    //             removeAction(); // remove
    //             __failed = 0; // reset

    //             mbss.log( 'too many attempts, removing!' );

    //             // too many attempts, move on!
    //             return; // false means GTFO
    //         }
    //     }

    //     __failedTarget = model.selector;

    //     // try again by...
    //     dropABeat();
    // }


    // // HANDLER

    // function handleAction() {
    //     // __readyHandler = false;

    //     // to do :: make module
    //     // split each CHECK POINT in seperate functions

    //     var target,
    //         actionModel,
    //         bindModel = {},
    //         compiledAction,
    //         boundAction;

    //     console.log( '__actionQueue', __actionQueue );
    //     actionModel = __actionQueue[ 0 ];
    //     console.log( 'actionModel', actionModel );
    //     // check for valid object (model)
    //     if ( typeof actionModel !== 'object' ) {
    //         mbss.log( 'no action model for the handler!' );
    //         return;
    //     }


    //     // SUBMIT 
    //     // requires augmented data, otherwise use target w/ "default" action
    //     // act on returned augmented target
    //     if ( typeof actionModel.submit !== 'undefined' && ( __augmented && __augmented.length ) ) {

    //         // set target to result's link
    //         actionModel.target = __augmented[ 0 ].querySelector( '[href]' );

    //         mbss.log( 'submit using augmented data from last action', actionModel.target );
    //         // actionModel.subtarget = actionModel.submit;

    //         clickSyth( actionModel.target );
    //         __augmented = []; //reset

    //         return; // break;
    //     }

    //     // VALIDATE 
    //     // if validate, act on returned augmented target
    //     if ( typeof actionModel.validate === 'string' ) {
    //         mbss.log( 'validate!' );
    //         actionModel.target = actionModel.validate;
    //     }



    //     // TARGET (set by user or result from processed augmented data)
    //     // if valid taget, save as key and set the query as the target
    //     // if no target, bypass
    //     if ( typeof actionModel.target === 'string' ) {

    //         // if 'body', bypass querySelector
    //         actionModel.selector = actionModel.target;
    //         if ( actionModel.target.indexOf( 'body' ) === 0 ) {
    //             target = [ document.body ];
    //         } else {
    //             target = document.querySelectorAll( actionModel.selector );
    //         }

    //         // check target, cause lets not proceed if its not valid
    //         if ( !target ) {
    //             // if no target, maybe the DOM is still loading, 
    //             // queue fail check to try again
    //             failedCheck( actionModel );
    //             return;
    //         }
    //     }

    //     // ACTION
    //     // confirm action function
    //     // if not define, make it check for a valid target to click
    //     if ( typeof actionModel.action !== 'function' ) {
    //         actionModel.action = function( target ) {
    //             mbss.log( 'default: true - target.length', target.length );
    //             return target.length > 0;
    //         };
    //     }

    //     // SUBTARGET // for access to `__augmented` data in `actionModel.action`
    //     // is subtarget/ alter target to be subtarget, 
    //     // and its action should already be expecting the augmented as 2nd arg
    //     if ( typeof actionModel.subtarget === 'string' ) {

    //         // if the last target returned empty then nothing else left to do
    //         if ( typeof __augmented === 'undefined' || __augmented.length === 0 ) {
    //             failedCheck( actionModel );
    //             return;
    //         }

    //         actionModel.selector = actionModel.subtarget;

    //         target = document.querySelectorAll( actionModel.selector );

    //         // check target, cause lets not proceed if its not valid
    //         if ( !target ) {
    //             // if no target, maybe the DOM is still loading, 
    //             // queue fail check to try again
    //             failedCheck( actionModel );
    //             return;
    //         // } else {

    //         }
    //         //     // augmented target // other attribs
    //         //     // no click event cause its a subtarget so return that ish right here.
    //         //     // return actionModel.action(target, augmented);
    //         //     actionModel.action(target, __augmented[actionModel.target]);
    //     }



    //     // if ( option ) {
    //     // if fails, return last match (to augmented)?
    //     // }

    //     // action:
    //     // true *-> continue to next action
    //     // Array.length > 0 *-> coninue to next action, pass (augmented) array
    //     // if === 0, (typeof number) treat as subtarget (no fired event?)
    //     // false *-> try again (call event check or all to failed attempt queue?)

    //     // return strings for insruction? [
    //     // 'jumpToAction',
    //     // 'jumpToLastAction',
    //     // 'skipAction',
    //     // 'repeatAction' // happens if falsy (when action is true only)
    //     // 'ifFailed' only complete step is previous failed, is ignore step
    //     // 'isSuccess' this is default, only process if previous returns a defined var
    //     // 'submit' // fires click event on last returned augment
    //     // ]

    //     mbss.log( 'try target', actionModel.selector );

    //     // send filtered model for access within action

    //     // set tools 

    //     bindModel._bios = __config.tools;
    //     // set config info
    //     bindModel._config = actionModel.$$config;
    //     // set attempt info
    //     bindModel._attempts = __failed;
    //     if ( ( __failed + 1 ) === ( actionModel.attempts || mbss.maxFailedAttempts ) ) {
    //         // for use within actions to do "last resort" functionality
    //         bindModel._lastAttempt = true;
    //     }

    //     boundAction = actionModel.action.bind( bindModel ); // bind current scope for fn and data access
    //     try {
    //         // call and pass `targat` and `augmented` for subtarget
    //         compiledAction = boundAction( target, __augmented );
    //     } catch ( e ) {
    //         if ( e instanceof TypeError ) {
    //             mbss.log( 'TypeError with Action', e );
    //             // statements to handle TypeError exceptions
    //         } else if ( e instanceof RangeError ) {
    //             mbss.log( 'RangeError with Action', e );
    //             // statements to handle RangeError exceptions
    //         } else if ( e instanceof EvalError ) {
    //             mbss.log( 'EvalError with Action', e );
    //             // statements to handle EvalError exceptions
    //         } else {
    //             // statements to handle any unspecified exceptions
    //             mbss.log( 'Error with Action', e );
    //             // maybe we should splice it out
    //         }

    //         // this errorored, it should be removed
    //     }

    //     mbss.log( 'typeof compiledAction ', typeof compiledAction );
    //     // mbss.log("compiled after call",compiled);
    //     if ( typeof compiledAction === 'undefined' ) { // check for null or NaN?
    //         mbss.log( 'action was bad... removing action' );
    //         removeAction(); // remove and move cause it aint getting any better
    //         return;
    //     }

    //     // an evaluator had no results, move on to next action in queue
    //     if ( compiledAction.length === 0 ) {
    //         // if () {

    //         // }
    //         removeAction();
    //         return;
    //     }

    //     if ( compiledAction === false ) { // false!
    //         failedCheck( actionModel );
    //         return;
    //     }


    //     mbss.log( 'compiledAction', compiledAction );

    //     // if validate then remove cause task is complete, time to do `core`
    //     if ( compiledAction && actionModel.validate ) {
    //         removeAction();
    //         return;
    //     }

    //     // if we are returning some augmented data
    //     // save it
    //     // and if (not) a submit action
    //     if ( compiledAction.length >= 1 && !actionModel.submit ) {
    //         // returning arrays means we queuing up a subtarget, no click for you.
    //         __augmented = compiledAction;
    //         // move on to next action
    //         removeAction();
    //     } else {
    //         // if is valid taget and not out of attempts
    //         // if nothing else fails... its time to be clicked
    //         // if (this.active.event.pathType !== 'validate') {
    //         clickSyth( target );
    //         // }
    //     }

    // }



    // // get events for each items
    function queueEvents( item, pathsForItem ) {
        var actions = [],
            events = [],
            action;

        // just a little protection as its a read-only config
        // Object.freeze( config );

        // mbss.log( 'queueEvents // config', item );

        for ( var i = 0; i < pathsForItem.length; i++ ) {
            // copy dem paths
            action = Object.create( pathsForItem[ i ] );
            // get the item info and throw it on the $config
            action.$$config = Object.create( item );
            // place it an action array until we are sure its a unique (heartbeat) event
            actions.push( action );


            // create an event for action 
            // unless has fibulations

            // is there a 'next' action
            // and does it (not) `fibulate`
            if ( ( pathsForItem[ i + 1 ] &&
                    !pathsForItem[ i + 1 ].fibulate ) ) {
                // dont add the event yet
                // we already added to the action so we good fam
                events.push( actions.slice( 0 ) );
                actions = []; // clear actions

                // mbss.log( 'queueEvents // events', event );
            }
        }


        __eventQueue = __eventQueue.concat( events );

    }

    // // for each item, get all the actions required 
    // // and place then in order into the events queue
    function processItems( items, paths ) {
        for ( var i = 0; i < items.length; i++ ) {
            // items and item keys to set-up paths for each
            queueEvents( items[ i ], paths[ items[ i ].pathType ] );
        }
        return queueEvents.length;
    }



    // // get keys from item array
    // // keep keys in order of items
    function getKeys( rawItems ) {
        var keys = [],
            unique = '';
        for ( var i = rawItems.length - 1; i >= 0; i-- ) {
            if ( unique.indexOf( rawItems[ i ].pathType ) === -1 ) {
                keys.unshift( rawItems[ i ].pathType );
                unique = keys.join();
            }

        }
        return keys;
    }

    // process data
    // make sure action paths and items are valid
    // build events queues
    // build items queue
    // 
    function processConfig( cfg ) {
        if ( typeof( cfg.paths ) === 'object' ) {
            __paths = cfg.paths;
            // mbss.log("we got paths!");
        } else {
            mbss.log( 'you need some action paths!' );
            return false;
        }
        // if ( typeof( cfg.items ) === 'object' ) {
        if ( typeof( cfg.items ) === 'object' && cfg.items.length ) {
            __itemKeys = getKeys( cfg.items );
            __items = cfg.items;
        } else {
            mbss.log( 'you need some action items!' );
            return false;
        }

        return processItems( __items, __paths );
    }


    // var durations = {
    //     events: 0,
    //     items: 0
    // };



    // function buildQueue(argument) {
    //     for (var i = 0; i < Things.length; i++) {
    //         Things[i]
    //     }
    // }



    /* ========================================================================== *
        Public Module Properties 
     * ========================================================================== */

    mbss.devMode = true;
    mbss.visualCues = true;
    mbss.maxFailedAttempts = 4;

    /* ========================================================================== *
        Public Module Properties 
     * ========================================================================== */
    // // expose some actions ?
    // mbss.actions = {
    //     click: clickSyth
    // };
    mbss.run = function( config ) {
        // console.log("run",config);

        if ( config === undefined ) {
            // mbss.kill();
            throw 'requires a config object';
            // throw new TypeError('requires a config object');
            // return;
        }
        if (__config !== config) {
            __config = config;
        }
        if ( __config || __config.spec ) {
            // exposeInsides();
            // 
            mbss.spec = {
                'eventQueue': __eventQueue,
                'actionQueue': __actionQueue,
                'paths': __paths,
            }
        }
        // console.log("__HEART.BEAT",__HEART.BEAT);
        var c = processConfig( __config );
        if ( c ) {
            // mbss.log( 'starting the show!', c );
            dropABeat( c );
        }
    };

    mbss.kill = function() {
        console.log("mbss.spec.eventQueue.length",mbss.spec.eventQueue.length);
        // console.log("kill pre __HEART.BEAT",__HEART.BEAT);
        // __eventQueue.re

// while(__eventQueue.length > 0) {
//     __eventQueue.pop();
// }
        window.clearInterval( __HEART.BEAT );
        ++__HEART.KILLS;
        __HEART.BEAT = undefined;
        console.log("mbss.spec.eventQueue.length",mbss.spec.eventQueue.length);
        // mbss.log( 'stop it' ,__HEART.KILLS );
        // console.log("kill post__HEART.BEAT",__HEART.BEAT);
        return __HEART.KILLS;
    };

    mbss.killCount = function() {
        // console.log("killCount",__HEART.KILLS);
        return __HEART.KILLS;
    };

    mbss.isRunning = function() {
        // console.log("isRunning .BEAT",__HEART.BEAT);
        // return __HEART.BEAT;
        if (__HEART.BEAT) {
            return true;
        } else {
            return false;
        }
    };

    mbss.log = function( message, variable ) {
        if ( mbss.devMode ) {
            if ( variable ) {
                console.log( message, variable );
            } else {
                console.log( message );
            }
            return false;
        }
    };

    // force stop on the window 
    // use `kill()` or `kx()`
    window.kill = window.kx = function() {
        mbss.kill();
    };

    // exported 
    return mbss;
}() );

