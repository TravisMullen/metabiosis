'use strict';
var mBss = (function(mbss) {

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

    // Action Handler

     * ========================================================================== */
    var status = {
            pending: 'pending',
            fail: 'fail',
            success: 'success',
            remove: 'remove',
            execute: 'execute'
        },
        active,

        // put this in an object to pass back with removed
        failedMax = 2,
        failedCount = 0,
        failedAction,

        // data passed back from the action functions
        augmented;

    function setStatus( stat ) {
        active = status[ stat ];
        return active;
    }

    function getStatus( stat ) {
        var s = active;
        if ( stat ) {
            s = ( status[ stat ] === active );
        }
        return s;
    }

    function isActive( stat ) {
        return getStatus( 'pending' );
    }

    function removeAction(action) {
        console.log("removeAction",removeAction);
        // placeholder function for event service to map to
        // so action service can call when finished
        // action.failedCount = failedCount;
        failedCount = 0; //reset count
        mbss.log("removeAction !", action);
        // this will be overridden in the events service
        return action;
    }

    function failAction(action) {
        if (failedAction === action) {
            ++failedCount;
            if (failedCount >= failedMax) {
                removeAction(action);
            }
        } else {
            failedAction = action;
            failedCount = 1;
        }
        action.failedCount = failedCount;
        mbss.log("failAction" + failedCount + " of " + failedMax);
    }

    function handleAction(actionModel) {

        var target,
            bindModel = {},
            compiledAction,
            boundAction;


        active = true;


        // console.log("handleAction",actionModel);
        // check for valid object (model)
        if (typeof actionModel !== 'object') {
            mbss.log('no action model for the handler!');
            mbss.removeAction(actionModel);
            return setStatus( 'remove' );
        }


        // TARGET (set by user or result from processed augmented data)
        // if valid taget, save as key and set the query as the target
        // if no target, bypass
        // 
        if (typeof actionModel.target === 'string') {

            // if 'body', bypass querySelector
            actionModel.selector = actionModel.target;

            if (actionModel.target.indexOf('body') === 0) {
                target = [document.body];
            } else {
                target = document.querySelectorAll(actionModel.selector);
            }

            // check target, cause lets not proceed if its not valid
            if (!target) {
                // if no target, maybe the DOM is still loading, 
                // queue fail check to try again
                failAction(actionModel);
                mbss.log('target not valid, failing action');
                return setStatus( 'fail' );
            }
        } else {
            if ( augmented === undefined ) {
                mbss.removeAction(actionModel);
                mbss.log('not valid target NOR previous augmented');
                return setStatus( 'remove' );
            }
        }

        // ACTION
        // confirm action function
        // if not define, make it check for a valid target to click
        // 
        // not here, you in thoery could have 
        // no specified target AND no specified action and still pass back the last augmented
        // this is to keep events from breaking if there is a invalid action item
        if (typeof actionModel.action !== 'function') {
            // actionModel.action = function(target) {
                mbss.log('No valid action, but you do have a valid target! REMOVE');
                // return the target results to pass onto next action
                // return target;
            // };
            mbss.removeAction( actionModel );
            return setStatus( 'remove' );
        }


        // if ( option ) {
        // if fails, return last match (to augmented)?
        // }

        // action:
        // true *-> continue to next action
        // Array.length > 0 *-> coninue to next action, pass (augmented) array
        // if === 0, (typeof number) treat as subtarget (no fired event?)
        // false *-> try again (call event check or all to failed attempt queue?)

        // return strings for insruction? [
        // 'jumpToAction',
        // 'jumpToLastAction',
        // 'skipAction',
        // 'repeatAction' // happens if falsy (when action is true only)
        // 'ifFailed' only complete step is previous failed, is ignore step
        // 'isSuccess' this is default, only process if previous returns a defined var
        // 'submit' // fires click event on last returned augment
        // ]
        // 
        if (actionModel.firstAction) {
            // new item/action path, clear out old augmented
            augmented = [];
        }
        if (actionModel.lastAction) {
            console.log("trigger a timmout!");
        }
        // mbss.log('try target', actionModel.selector);
        // console.log("mbss.tools",mbss.tools);
        bindModel.$tools = actionModel.helpers || mbss.tools;
        // 
        bindModel.$config = actionModel.$config || {};
        // set attempt info
        bindModel.$attempts = failedCount;
        if ((failedCount + 1) === failedMax) {
            // for use within actions to do "last resort" functionality
            bindModel.$lastAttempt = true;
        }
        // console.log("actionModel.action",actionModel.action.toString());
        // console.log("bindModel",bindModel);
        // console.log("bindModel.$tools",bindModel.$tools);
        // console.log("bindModel.$config",bindModel.$config);
        boundAction = actionModel.action.bind(bindModel); // bind current scope for fn and data access
        try {
            // call and pass `targat` and `augmented` for subtarget
            compiledAction = boundAction(target, augmented);
        } catch (e) {
            if (e instanceof TypeError) {
                mbss.log('TypeError with Action', e);
                // statements to handle TypeError exceptions
            } else if (e instanceof RangeError) {
                mbss.log('RangeError with Action', e);
                // statements to handle RangeError exceptions
            } else if (e instanceof EvalError) {
                mbss.log('EvalError with Action', e);
                // statements to handle EvalError exceptions
            } else {
                // statements to handle any unspecified exceptions
                mbss.log('Error with Action', e);
                // maybe we should splice it out
            }

            // this errorored, it should be removed
        }

        mbss.log('typeof compiledAction ', typeof compiledAction);
        // mbss.log("compiled after call",compiled);
        if (typeof compiledAction === 'undefined') { // check for null or NaN?
            mbss.removeAction(actionModel); // remove and move cause it aint getting any better
            mbss.log('not valid action function, complete (to be removed)');
            return setStatus( 'remove' );
        }

        if (compiledAction === false || compiledAction.length === undefined) { // false!
            // failAction(actionModel);
            // 
            mbss.log('not items found, fail to be tried again');
            mbss.removeAction(actionModel);
            return setStatus( 'fail');
        }


        // an evaluator had no results, move on to next action in queue
        if (compiledAction.length <= 0) {
            mbss.removeAction(actionModel);
            mbss.log('not items found, complete to be removed as it had items to parse but found no matches');
            return setStatus( 'remove' );
        }

        mbss.log('compiledAction', compiledAction.length);

        // why be biased about the results. if they defined then return them. \
        // assumed to be compiledAction.length > 1;
        // 
        // return results
        // 
        // if 
        // if (compiledAction.length === undefined && augmented.length === undefined) {
            // augmented = [];
        // } else {
        augmented = compiledAction;
        // console.log( augmented" augmented);
        mbss.removeAction( actionModel );
        return augmented;
    }

    mbss.handleAction = handleAction; // to be used by event handler
    mbss.removeAction = removeAction; // to be overridden by event handler

    mbss.isActive = isActive;
    mbss.getStatus = getStatus;

    mbss.getAugmented = function() {
        return augmented;
    };

    // mbss.failedCount = failedCount;
    // mbss.failedMax = failedMax;


    // should be external 
    mbss.log = function(message, variable) {
        // if ( mbss.devMode ) {
        if (variable) {
            console.log(message, variable);
        } else {
            console.log(message);
        }
        return false;
        // }
    };

    // exported 
    return mbss;
}(mBss || {}));
