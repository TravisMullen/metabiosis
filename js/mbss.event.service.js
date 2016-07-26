
mBss = (function(mbss) {
'use strict';
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

    // Event Handler

     * ========================================================================== */

    var heart,
        removeActionService = mbss.removeAction,
        tools = {},
        eventQueue = [];

    function setHeart(config) {
        // accept a config
        return {
            count : 0,
            rate : 1000, 
            kills : 0
        };
    }

    function addTools( helpers ) {
        var tool;
        // add the imported to any predefined 
        for ( tool in helpers ) {
            tools[tool] = helpers[tool];
        }
        return tools;
    }

    function addEvent(actionPath, item) {
        var action,
            path = [];

        for (var i = 0; i < actionPath.length; i++) {
            action = Object.create( actionPath[i] );

            // action.$tools = tools;
            action.$config = item;

            if (i === 0) {
                action.firstAction = true;
            } else if (i === actionPath.length - 1) {
                action.lastAction = true;
            }

            path.push( action );
        }

        eventQueue = eventQueue.concat(path);
        // return eventQueue;
    }

    function build(items, actionsPaths, helpers) {
        var actions,
            item;

        if ( typeof helpers === 'object' ) {
            addTools(helpers);
        }

        if (items.length) {

            for (var i = 0; i < items.length; i++) {
                actions = actionsPaths[ items[i].pathType ];

                item = Object.freeze( items[i] );

                addEvent( actions, item );
            }
        } else if (typeof items === 'object') {
            mbss.log('single item');

        } else {
            mbss.log('not valid items');
        }

        heart = setHeart();
        return eventQueue;
    }

    function doEvent() {
        // var event;
        if (eventQueue.length) {
            mbss.handleAction(eventQueue[0]);
        //     return eventQueue.length;
        // } else {
        //     return false;
        }
    }

    function init(items, actionsPaths, helpers) {
        build(items, actionsPaths, helpers);
        run();
        return eventQueue;
    }

    function run() {
        heart.beat = window.setInterval( function() {
            console.log( 'beating!', ++heart.count );


            if ( eventQueue.length ) {
                // console.log("pass into the handler // eventQueue[0]", eventQueue);
                // dis.handler();

                doEvent();
                // fire event
                // if success then remove it
                //
                return;
            }

            // stop self
            window.clearInterval( heart.beat );
        // }, (heart.count === 0) ? heart.count : heart.rate );
        }, heart.rate );
        // return heart;
    }


    mbss.kill = function() {
        heart.beat = undefined;
        heart.count = 0;
        return heart.kills;
    };


    mbss.reset = function() {
        heart.beat = undefined;
        eventQueue = [];
        return eventQueue;
    };

    mbss.killCount = function() {
        // console.log("killCount",heart.kills);
        return heart.kills;
    };

    mbss.isRunning = function() {
        // console.log("isRunning .beat",heart.beat);
        // return heart.beat;
        if (heart.beat) {
            return true;
        } else {
            return false;
        }
    };

    // overrides
    mbss.removeAction = function(action) {
        console.log("action",action);
        mbss.log('removeAction Event Handler',action.action);
        if (eventQueue.length) {
            console.log("removeAction",eventQueue.length);
            eventQueue.shift();
            mbss.eventQueue = eventQueue;
            console.log("removed!!! ",eventQueue.length);
        }
        return removeActionService(action);
    };

    // mbss.eventQueue = eventQueue;

    mbss.getQueue = function() {
        return eventQueue;
    };
    mbss.addEvent = addEvent;
    mbss.build = build;
    mbss.init = init;

    mbss.tools = tools;
    mbss.addTools = addTools;

    // mbss.kills

    mbss.heart = function() {
        var beat = mbss.isRunning();
        console.log("beat",beat);
        return { 
            beat: beat,
            rate: heart.rate,
            kills: heart.kills,
            count: heart.count
        };
        // return Object.freeze(heart);
    };

    // mbss.kill = kill;
    // mbss.reset = reset;

    // mbss.pause = 

    // exported 
    return mbss;
}(mBss));
