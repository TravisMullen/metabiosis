
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

    var heart = {
            count : 0,
            rate : 1000, 
            kills : 0
        },
        removeActionService = mbss.removeAction,
        tools = {},
        eventQueue = [];

    function addEvent(actionPath, item) {
        var action,
            path = [];

        for (var i = 0; i < actionPath.length; i++) {

            action = Object.create( actionPath[i] );
            // action.$tools = tools;
            action.$config = item;

            path.push( action );
        }
        console.log("mbss.tools",mbss.tools);
        eventQueue = eventQueue.concat(path);

        return eventQueue;
    }

    function setTools( helpers ) {
        var tool;
        for ( tool in helpers ) {
            console.log(" setTools tool",tool);
            tools[tool] = helpers[tool];
        }
            console.log(" setTools tools",tools);
    }

    function build(items, actionsPaths, helpers) {
        var actions,
            item;

        if (helpers) {
            setTools(helpers);
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

        return eventQueue;
    }

    function doEvent() {
        var event;
        if (eventQueue.length) {
            event = eventQueue[0];
            mbss.handleAction(event);
            return eventQueue.length;
        } else {
            return false;
        }
    }

    function init(items, actionsPaths, helpers) {
        build(items, actionsPaths, helpers);
        run();
    }

    function run() {
        console.log("run");
                doEvent();
        window.setInterval( function() {
            console.log( 'beating!', ++heart.cout );


            if ( __eventQueue.length ) {
                console.log("pass into the handler // __eventQueue[0]", eventQueue);
                // dis.handler();

                doEvent();
                // fire event
                // if success then remove it
                //
                return;
            }

            // stop self
            window.clearInterval( heart.beat );
        }, heart.rate );
    }


    mbss.kill = function() {
        heart.beat = undefined;
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
        var removed;
        mbss.log('removeAction Event Handler');
        if (eventQueue.length) {
            removed = eventQueue.shift();
            mbss.log('remove from event queue');
        }
        // method override, has access to old through removeActionService...
        return removeActionService(action);
    };

    mbss.eventQueue = eventQueue;
    mbss.addEvent = addEvent;
    mbss.build = build;
    mbss.init = init;

    mbss.tools = tools;

    mbss.heart = function() {
        return heart;
        // return Object.freeze(heart);
    };

    // mbss.kill = kill;
    // mbss.reset = reset;

    // mbss.pause = 

    // exported 
    return mbss;
}(mBss));
