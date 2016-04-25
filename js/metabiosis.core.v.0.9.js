'use strict';
var mBss = (function() {

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
            BEAT: undefined, // drop (or stop) the beat
            COUNT: 0, // keep a count just incase
            RATE: 1000 // 1s
        },

        // actions consolidated into events
        eventQueue = [],
        eventHash = {},

        // a. item specific event paths iterated over for each item
        // b. events paths for each item rendered out into flat(ter) array 
        handlerQueue = [],

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
        activeActions = [],

        // general config placeholder
        __config = {}; // end private vars



    /* ========================================================================== *
        Private Functions
     * ========================================================================== */
    function queueHandler() {


        // how many types left
        var rKeys = __itemKeys.length,
            // how many items for each type left
            // get first
            rItems = __items[__itemKeys[0]].length,
            // how many actions left
            // first first
            rActions = activeActions.length;

        // select first type
        // select first item
        // execute first action

        // remove action (if success)

        // if no more actions, remove item
        // if no more items, remove type


        if (rActions.length === 0) {

            mbss.log('we got not actions!');
        }

        // durations.events = 

        // if () {

        // }


        console.log('move that handler along');
    }
    // events
    function startEvents(c) {
        __HEART.BEAT = window.setInterval(function() {
            mbss.log('beating!', ++__HEART.COUNT);


            if (eventQueue.length) {
                // console.log("pass into the handler // eventQueue[0]", dis.eventQueue[0]);
                // dis.handler();

                queueHandler();
                // fire event
                // if success then remove it
                //
                return;
            }

            // stop self
            window.clearInterval(__HEART.BEAT);
        }, __HEART.RATE);
    }

    // get events for each items
    function queueEvents(pathsForKey, key) {
        var actions = [],
            events = [],
            last;


        for (var i = 0; i < pathsForKey.length; i++) {

            actions.push(pathsForKey[i]);

            // if there is a next action and its `fibulate`
            if (pathsForKey[i + 1] && !pathsForKey[i + 1].fibulate) {
                // dont add the event yet
                // we already added to the action so we good fam
                events.push(actions.slice(0));
                actions = [];
                // } else {
            }

            // console.log("events",events);
            // console.log("actions",actions);
            // console.log("actions.length",actions.length);
        }

        // one events are renderd, place in to a hash
        eventHash[key] = events;

    }

    function processEvents(paths, keys) {

        // do some stuff here to prep any items
        for (var i = 0; i < keys.length; i++) {
            // items and item keys to set-up paths for each
            if (paths[keys[i]]) {
                queueEvents(paths[keys[i]], keys[i]);
            }
        }
        // console.log("processItems queueEvents.length",queueEvents.length);
        // if (queueEvents.length) {
        //     return true;
        // }
    }

    // create event queue for each item

    // start handler for event queue

    // process data
    // make sure action paths and items are valid
    // build events queues
    // build items queue
    // 
    function processConfig(cfg) {
        if (typeof(cfg.paths) === 'object') {
            __paths = cfg.paths;
            // mbss.log("we got paths!");
        } else {
            mbss.log('you need some action paths!');
            return false;
        }
        if (typeof(cfg.paths) === 'object') {
            __itemKeys = Object.keys(cfg.items);
            __items = cfg.items;
            mbss.log('itemKeys: ' + __itemKeys);
        } else {
            mbss.log('you need some action items!');
            return false;
        }

        mbss.log('valid config');

        // var p = processItems( __items, __itemKeys );
        // if (p) {
        //     mbss.log("items and actions are processed");
        //     return true;
        // } 
        var p = processEvents(__paths, __itemKeys);
        if (p) {
            mbss.log('items and actions are processed');
            return true;
        }
    }

    // put items in event queue
    // function processItems( items, keys ) {

    //     // do some stuff here to prep any items
    //     for (var i = 0; i < keys.length; i++) {
    //         // items and item keys to set-up paths for each
    //         queueEvents( items[ keys[i] ], keys[i], paths );
    //     }
    //     // console.log("processItems queueEvents.length",queueEvents.length);
    //     // if (queueEvents.length) {
    //     //     return true;
    //     // }
    // }

    // // consolidate events
    // function addActionPaths(item, key, paths) {
    //     var actions = [],
    //      events = [],
    //      // _item = item,
    //      // t = {};
    //     // var p = paths;
    //     if (paths[key].length) {

    //     for (var i = 0; i < paths[key].length; i++) {

    //         // console.log("paths[key][i]", paths[key][i]);

    //         // // paths[key][i]; // add script
    //         // paths[key][i].$config = item; // add item config
    //         // paths[key][i].$key = key; // add item config
    //         // // paths[key][i].$seq = seq; // 

    //         // // use this to track back to `__items[$seq]`

    //         // // paths[key][i].$config

    //         // // if (paths[key][i].fibulate) {
    //         // //     actions.push(paths[key][i]);
    //         // // //     // return;
    //         // // } else {
    //         // //     if (actions.length) {

    //         // //     }
    //         // events.push(paths[key][i]);
    //         // }
    //     }

    //     } else {
    //      mbss.log("no action paths for this type of jawn");
    //      // return false;
    //     }
    //     return events;
    // }


    // add action paths, consolidate into (timed) events for each
    // fibulate actions into events here
    // function addActionPaths(item, key, paths, seq) {
    //     var actions = [],
    //         events = [],
    //         // _item = item,
    //         t = {};
    //     // var p = paths;
    //     if ( paths[key].length ) {

    //         for (var i = 0; i < paths[key].length; i++) {

    //             console.log("paths[key][i]",paths[key][i]);

    //             // paths[key][i]; // add script
    //             paths[key][i].$config = item; // add item config
    //             paths[key][i].$key = key; // add item config
    //             paths[key][i].$seq = seq; // 

    //             // use this to track back to `__items[$seq]`

    //             // paths[key][i].$config

    //             // if (paths[key][i].fibulate) {
    //             //     actions.push(paths[key][i]);
    //             // //     // return;
    //             // } else {
    //             //     if (actions.length) {

    //             //     }
    //                 events.push(paths[key][i]);
    //             // }
    //         }

    //     } else {
    //         mbss.log("no action paths for this type of jawn");
    //         // return false;
    //     }
    //     return events;
    // }

    // var durations = {
    //     events: 0,
    //     items: 0
    // };




    //     function handler() {

    //     // to do :: split into seperate functions
    //     var target,
    //         actionModel = {},
    //         bindModel = {},
    //         compiledAction,
    //         boundAction;


    //     // console.log("eventQueue", eventQueue);
    //     actionModel = this.handlerQueue[0] || this.handlerQueue;
    //     if (!actionModel) {
    //         console.log("no action model for the handler!");
    //         return;
    //     }
    //     // set a ref to eval attribs like `attempts`
    //     this.active.action.model = actionModel;

    //     console.log("actionModel", actionModel);
    //     console.log("this.active.action.augmented", this.active.action.augmented);

    //     // if submit, act on returned augmented target
    //     if (typeof actionModel.submit !== 'undefined' && this.active.action.augmented) {
    //         console.log("submit!");
    //         // if submit is a number,
    //         // then try and pull that index from augmented
    //         // if (typeof actionModel.submit === 'number') {
    //         //     if (this.active.action.augmented[actionModel.submit]) {
    //         //         this.clickSyth(this.active.action.augmented[actionModel.submit]);
    //         //         return;
    //         //     }
    //         // }
    //         // this.active.action.augmented

    //         actionModel.target = this.active.action.augmented[0].querySelector('[href]');
    //         // submit
    //         console.log("submit !! actionModel.target",actionModel.target);
    //         // actionModel.subtarget = actionModel.submit;

    //         this.clickSyth(actionModel.target);
    //         this.active.action.augmented = []; //reset

    //         // if (typeof actionModel.action !== 'function') {
    //         //     actionModel.action = function(target, augmented) {
    //         //         // if (augmented.length > 1) {
    //         //         //     // console.log("augmented.splice",augmented.splice);
    //         //         //     return augmented.splice(0,1);
    //         //         // }
    //         //         // console.log("default: true - target.leng/'h", augmented.length);
    //         //         return augmented;
    //         //     };
    //         // }
    //         // // this.clickSyth

    //         // // else just target first in array
    //         // this.clickSyth(this.active.action.augmented[0] || this.active.action.augmented);
    //         return;
    //     }

    //     // if validate, act on returned augmented target
    //     if (typeof actionModel.validate === 'string') {
    //         console.log("validate!");
    //         actionModel.target = actionModel.validate;
    //     }


    //     // if valid taget, save as key and set the query as the target
    //     // if no target, bypass
    //     if (typeof actionModel.target === 'string') {

    //         // if 'body', bypass querySelector
    //         actionModel.selector = actionModel.target;
    //         if (actionModel.target.indexOf('body') === 0) {
    //             target = [document.body];
    //         } else {
    //             target = document.querySelectorAll(actionModel.selector);
    //         }

    //         // check target, cause lets not proceed if its not valid
    //         if (!target) {
    //             // if no target, maybe the DOM is still loading, 
    //             // queue fail check to try again
    //             this.failedCheck(actionModel);
    //             return;
    //         }
    //     }

    //     // confirm action function
    //     // if not define, make it check for a valid target to click

    //     if (typeof actionModel.action !== 'function') {
    //         actionModel.action = function(target) {
    //             console.log("default: true - target.length", target.length);
    //             return target.length > 0;
    //         };
    //     }

    //     // is subtarget/ alter target to be subtarget, 
    //     // and its action should already be expecting the augmented as 2nd arg
    //     if (typeof actionModel.subtarget === 'string') {
    //         console.log("actionModel.subtarget", actionModel.subtarget);
    //         actionModel.selector = actionModel.subtarget;
    //         target = document.querySelectorAll(actionModel.selector);
    //         // check target, cause lets not proceed if its not valid
    //         if (!target) {
    //             // if no target, maybe the DOM is still loading, 
    //             // queue fail check to try again
    //             this.failedCheck(actionModel);
    //             return;
    //         } else {

    //         }
    //         //     // augmented target // other attribs
    //         //     // no click event cause its a subtarget so return that ish right here.
    //         //     // return actionModel.action(target, augmented);
    //         //     actionModel.action(target, this.active.action.augmented[actionModel.target]);
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

    //     console.log("try target", actionModel.selector);

    //     // send filtered model for access within action

    //     // set tools 
    //     bindModel._bios = this.compileTools();
    //     // set config info
    //     bindModel._config = JSON.parse( this.active.event.config );
    //     // set attempt info
    //     bindModel._attempts = this.failed.attempts;
    //     if ((this.failed.attampts + 1) === (actionModel.attempts || this.__failedEventAttemptsMax)) {
    //         bindModel._lastAttempt = true;
    //     }
    //     console.log("bindModel", bindModel);
    //     boundAction = actionModel.action.bind(bindModel); // bind current scope for fn and data access
    //     try {
    //         compiledAction = boundAction(target, this.active.action.augmented); // call and pass `targat` and `augmented` for subtarget
    //     } catch (e) {
    //         if (e instanceof TypeError) {
    //             console.log("TypeError with Action", e);
    //             // statements to handle TypeError exceptions
    //         } else if (e instanceof RangeError) {
    //             console.log("RangeError with Action", e);
    //             // statements to handle RangeError exceptions
    //         } else if (e instanceof EvalError) {
    //             console.log("EvalError with Action", e);
    //             // statements to handle EvalError exceptions
    //         } else {
    //             // statements to handle any unspecified exceptions
    //             console.log("Error with Action", e);
    //             // maybe we should splice it out
    //         }

    //         // this errorored, it should be removed
    //     }

    //     console.log("typeof compiledAction ", typeof compiledAction);
    //     // console.log("compiled after call",compiled);
    //     if (typeof compiledAction === 'undefined') { // check for null or NaN?
    //         console.log("action was bad... removing action");
    //         this.removeAction(); // remove and move cause it aint getting any better
    //         return;
    //     }

    //     // an evaluator had no results, move on to next action in queue
    //     if (compiledAction.length === 0) {
    //         this.removeAction();
    //     }

    //     if (compiledAction === false) { // false!
    //         this.failedCheck(actionModel);
    //         return;
    //     }


    //     console.log("compiledAction", compiledAction);

    //     // if validate then remove cause task is complete, time to do `core`
    //     if (compiledAction && actionModel.validate) {
    //         this.removeAction();
    //     }

    //     if (compiledAction.length && !actionModel.submit) {
    //         // returning arrays means we queuing up a subtarget, no click for you.
    //         this.active.action.augmented = compiledAction;
    //         // move on to next action
    //         this.removeAction();
    //     } else {
    //         // if is valid taget and not out of attempts
    //         // if nothing else fails... its time to be clicked
    //         // if (this.active.event.type !== 'validate') {
    //         this.clickSyth(target);
    //         // }
    //     }


    //     // }

    //     // return compiled; // if nothing is returned, then the show is over...
    // };







    function failedCheck(model) {
        // console.log("failedCheck", model);
        // // ** how to tell if key (oject name)this.failed.attampts > model.attempts || this.__failedEventAttemptsMax
        // var failedEventAttemptsMax = model.attempts || this.__failedEventAttemptsMax;
        // console.log("model.selector", model.selector);
        // console.log("failedEventAttemptsMax", failedEventAttemptsMax);
        // console.log("this.failed", this.failed);
        // console.log("this.failed.attempts", this.failed.attempts);
        // if (model.selector === this.failed.selector) {
        //     // ++this.failed.attempts;
        //     console.log("Failed attempts for this action: ", this.failed.attampts);
        //     // too many attampts?
        //     if (++this.failed.attempts > failedEventAttemptsMax) {

        //         this.removeAction(); // remove
        //         this.failed.attampts = 0; // reset

        //         console.log("too many attempts, removing!");
        //         // too many attempts, move on!
        //         return false; // false means GTFO
        //     }
        // }
        // this.failed.selector = model.selector;
        // // lets wait and try again (dont remove from queue)
        // return true;
        // // }
    }


    function removeAction() {
        // // also shortqueue here

        // // handlerQueue = this.clone(this.eventQueue[0]);
        // // always assume working of fist nestest array
        // var n = this.handlerQueue.splice(0, 1);
        // console.log("remove action from handlerQueue!", n);
        // // return n;
    }

    function clickSyth(target) {
        // var canceled,
        //     evt = new MouseEvent('click', {
        //         'view': window,
        //         'button': 0,
        //         'bubbles': true,
        //         'cancelable': true
        //     });

        // target = target[0] || target; // if array, break out first
        // console.log("clickSyth // target", target);
        // // this is moved to handler // this should NOT be getting bad targets...
        // // if (!target) {
        // //     console.log("no target yet, still waiting");
        // //     this.failedCheck(selector);
        // // }

        // if (target && this.__visualCues) {
        //     target.style.border = '1px solid #b368b3';
        //     target.style.backgroundColor = '#800080';
        //     target.style.color = '#32CD32';
        //     // return;
        // }


        // canceled = !target.dispatchEvent(evt);

        // this.removeAction(); // remove completed event

        // if (canceled) {
        //     // A clickSyth called preventDefault.
        //     console.log("MouseEvent `click` canceled");
        // } else {
        //     // None of the clickSyths called preventDefault.
        //     console.log("MouseEvent `click` NOT canceled");
        // }
    }

    // function buildQueue(argument) {
    //     for (var i = 0; i < Things.length; i++) {
    //         Things[i]
    //     }
    // }



    /* ========================================================================== *
        Public Module Properties 
     * ========================================================================== */

    mbss.__development = true;
    mbss.__visualCues = true;

    /* ========================================================================== *
        Public Module Properties 
     * ========================================================================== */
    // // expose some actions ?
    // mbss.actions = {
    //     click: clickSyth
    // };
    mbss.run = function(config) {
        var c = processConfig(config);
        if (c) {
            mbss.log('starting the show!');
            startEvents(c);
        }
    };

    mbss.kill = function() {
        mbss.log('stop it');
        window.clearInterval(__HEART.BEAT);
    };

    mbss.log = function(message, variable) {
        if (mbss.__development) {
            if (variable) {
                console.log(message, variable);
            } else {
                console.log(message);
            }
            return false;
        }
    };

    // force stop on the window 
    // use `kill` or `kx`
    window.kill = window.kx = function() {
        mbss.kill();
    };

    // exported 
    return mbss;
}());


/* ========================================================================== *

config

 * ========================================================================== */


var conny = {
    // types: [
    //  'hats',
    // ],
    paths: {
        'hats': [{
                target: '[href$="shop/all"]',
                action: true
            }, {
                target: '[href$="shop/all/hats"]',
                action: true,
                rate: 3000 // slow for just this action
                    // }, { 
                    //     // validates shouldnt fire clicks for true
                    //     target: '[href$="shop/all/hats"].current',
                    //     // validate: true 
                    //     action: true

            }, { // is sold out
                // filtered,
                target: '.inner-article',
                action: function(target) {
                    console.log('target.length', target.length);
                    var augmented = [],
                        fkey = this._bios.filterKey('Sold Out'),
                        content = target,
                        fres; // check for ns
                    console.log('fkey', fkey);
                    this._config.turd = 'travis';
                    for (var i = content.length - 1; i >= 0; i--) {
                        fres = this._bios.filterKey(content[i].innerHTML);
                        if (fres.indexOf(fkey) === -1) {
                            console.log('fres', fres);
                            augmented.unshift(target[i]);
                        }
                    }

                    // if ( augmented.length ) {

                    // }
                    console.log('filterKey(\'Sold Out\') // augmented.length', augmented.length);
                    return augmented; // if length 0 return false
                }
            }, {
                // target: false,
                subtarget: '.inner-article h1',
                fibulate: true,
                // subtargets to be queried on each top level scope (no actions), 
                // then passing in the augmented from previous target. 
                // if no value then treated as target

                // for loop will be required to gather all subtargets

                // if (subtarget) {
                //     action(last, a1);
                // } else {
                //     action(target, a1);
                // }
                action: function(target, augmentedParent) {
                    console.log('THIS', this);
                    var augmented = [],
                        fkey = this._bios.filterKey(this._config.key), // key needs to be defined in instances
                        fres;
                    // bind config file to get access to key
                    // content = target.all || target; // check for ns
                    console.log('fkey', fkey);
                    console.log('this._config.key', this._config.key);
                    console.log('this._config', this._config);

                    for (var i = augmentedParent.length - 1; i >= 0; i--) {
                        fres = this._bios.filterKey(augmentedParent[i].innerHTML);
                        console.log('fres', fres);
                        console.log('fres.indexOf(fkey)', fres.indexOf(fkey));
                        if (fres.indexOf(fkey) >= 0) {
                            augmented.unshift(augmentedParent[i]);
                        }
                    }
                    console.log('augmented.length', augmented.length);
                    if (augmented.length) {
                        console.log('filterKey(this._config.key) // new augmented', augmented);
                        return augmented;
                    } else {
                        console.log("filterKey(this._config.key) // last augmentedParent", augmentedParent);
                        return augmentedParent;
                    }
                }
            },

            {
                // target: false,
                subtarget: '.inner-article p',
                fibulate: true,
                // subtargets to be queried on each top level scope (no actions), 
                // then passing in the augmented from previous target. 
                // if no value then treated as target

                // for loop will be required to gather all subtargets

                // if (subtarget) {
                //     action(last, a1);
                // } else {
                //     action(target, a1);
                // }
                action: function(target, augmentedParent) {
                        console.log('THIS', this);
                        var augmented = [],
                            fkey = this._bios.filterKey(this._config.style), // key needs to be defined in instances
                            fres;
                        // bind config file to get access to key
                        // content = target.all || target; // check for ns
                        console.log('fkey', fkey);
                        console.log('this._config.key', this._config.key);
                        console.log('this._config.turd', this._config.turd);

                        for (var i = augmentedParent.length - 1; i >= 0; i--) {
                            fres = this._bios.filterKey(augmentedParent[i].innerHTML);
                            console.log('fres', fres);
                            console.log('fres.indexOf(fkey)', fres.indexOf(fkey));
                            if (fres.indexOf(fkey) >= 0) {
                                augmented.unshift(augmentedParent[i]);
                            }
                        }
                        console.log('style :: // augmented.length', augmented.length);
                        if (augmented.length) {
                            console.log('style // new augmented', augmented);
                            return augmented;
                        } else {
                            console.log('style // last augmentedParent', augmentedParent);
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



                submit: '[href]'

                // subtarget: '.inner-article [href]',
                // action: true
            }, {
                target: '[value="add to cart"]',
                action: true
            }
        ],
        'checkout': [{
                target: '[href$="checkout"]',
                action: true
            },
            // fill out form
            {
                target: '.button.checkout',
                action: true
            }
        ]
    },
    items: {
        'hats': [{
            name: 'Cord Zip Bell Hat',
            key: 'cord zip bell hat',
            keys: ['cord zip', 'bell hat'],
            size: 'M/L',
            style: 'olive'
        }, {
            name: 'Corduroy 5-Panel',
            key: 'Corduroy 5 Panel',
            keys: ['Corduroy', '5-Panel'],
            style: 'navy'
        }, {
            name: 'Camp Cap',
            key: 'camp cap'
        }],
        checkout: [{
            name: 'Offal Knausgaard', // text input
            email: 'offal@chicharrones.com', // text input
            tel: '(555) 322-3331', // text input
            address: '8633 Intelligentsia St', // text input
            zip: '19146', // text input
            city: 'Williamsburg', // text input

            state: 'TX', // drop down
            country: 'USA', // drop down

            saveAddress: true, // checkbox

            ccType: null, // drop down
            ccNumber: null,
            ccExpDateMM: null, // drop down
            ccExpDateYY: null, // drop down
            ccCVV: null, // security code // text input

            acceptTerms: true // checkbox
        }]
    }

};


mBss.run(conny); // { paths: { type : [  actions[] ] } , items: { type : [ item: {} ] } };
