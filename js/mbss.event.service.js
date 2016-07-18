
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

    var removeActionService = mbss.removeAction,
        eventQueue = [];

    function addEvent(actionPath, item) {
        var event = Object.create( actionPath );
        if (typeof item === 'object') { 
            event.$config = Object.create( item );
        }
        eventQueue.push(event);
        return event;
    }

    function build(items, actionsPaths) {
        var result = false;
        if (items.length) {
            mbss.log('collection of items');
            items.forEach(function( item ) {
                addEvent( item.pathType, item );
            });
        } else if (typeof items === 'object') {
            mbss.log('single item');

        } else {
            mbss.log('not valid items');
        }
        return result;
    }

    function startEvent() {
        if (eventQueue.length) {

            return eventQueue.length;
        } else {
            return false;
        }
    }

    function init(items, actionsPaths) {
        // body...
        // 
        // craete debounce that as long as eventQueue has lenth, queue next event
    }

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

    // mbss.pause = 

    // exported 
    return mbss;
}(mBss));
