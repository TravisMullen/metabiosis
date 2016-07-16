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
            fail: 'fail',
            success: 'success',
            remove: 'remove',
            execute: 'execute'
        },

        failedMax = 2,
        failedCount = 0,
        failedAction,

        // data passed back from the action functions
        __augmented;

    // status = { status : 'active', success: undefined, failed: undefined };
    function clickSyth(target, focus) {
        console.log("target",target);
        var canceled,
            elm = (typeof target === 'string') ?
            document.querySelector(target) :
            target,
            evt = new MouseEvent('click', {
                'view': window,
                'button': 0,
                'bubbles': true,
                'cancelable': true
            });

        console.log("elm",elm);
        // elm.style.border = '1px solid #b368b3';
        // elm.style.backgroundColor = '#800080';
        // elm.style.color = '#32CD32';


        canceled = !elm.dispatchEvent(evt);

        if (canceled) {
            // A clickSyth called preventDefault.
            console.log('MouseEvent `click` canceled');
        } else {
            // None of the clickSyths called preventDefault.
            console.log('MouseEvent `click` NOT canceled');
        }
        if (focus) {
            console.log('focus!');
            elm.focus();
        }
    }

    function executeAction(target) {
        var elm = target[0] || target;
        // bind action to this function
        // 
        //  
        if (elm) {

            clickSyth( elm );
        }
        console.log("executeAction do action!", target[0] || target);
        return true;
    }

    // remove
    function completeAction(action) {
        var a = action || 'no action specified';

        failedCount = 0; //reset count

        // conplete action
        console.log("completeAction remove or complete!", a);
        return true;
    }

    function removeAction(action) {
        failedCount = 0; //reset count
        // __augmented = undefined;
        // this will be overridden in the events service
        return action;
    }

    function failAction(action) {
        if (failedAction === action) {
            ++failedCount;
            if (failedCount >= failedMax) {
                removeAction(action);
            }
        }
    }

    // function completeAction(action) {
    //     var a = action || 'no action specified';

    //     failedCount = 0; //reset count

    //     // conplete action
    //     console.log("completeAction remove or complete!", a);
    //     return true;
    // }

    function handleAction(actionModel) {
        // __readyHandler = false;

        // to do :: make module
        // split each CHECK POINT in seperate functions

        var target,
            // actionModel, // parse model?
            bindModel = {},
            compiledAction,
            boundAction;
            console.log("__augmented",__augmented);

        // check for valid object (model)
        if (typeof actionModel !== 'object') {
            mbss.log('no action model for the handler!');
            return status.fail;
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
                return status.fail;
            }
        } else {
            if ( __augmented === undefined ) {
                removeAction(actionModel);
                mbss.log('not valid target NOR previous augmented');
                return status.remove;
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
            actionModel.action = function(target) {
                mbss.log('No valid action, but you do have a valid target!', target);
                // return the target results to pass onto next action
                return target;
            };
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

        mbss.log('try target', actionModel.selector);

        // send filtered model for access within action

        // set tools 

        bindModel.$tools = actionModel.helpers || {};
        // set config info
        // console.log("var",var);
        // 
        bindModel.$config = actionModel.config || {};
        // set attempt info
        bindModel.$attempts = failedCount;
        if ((failedCount + 1) === (actionModel.attempts || mbss.maxFailedAttempts)) {
            // for use within actions to do "last resort" functionality
            bindModel.$lastAttempt = true;
        }

        boundAction = actionModel.action.bind(bindModel); // bind current scope for fn and data access
        try {
            // call and pass `targat` and `augmented` for subtarget
            compiledAction = boundAction(target, __augmented);
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
            removeAction(); // remove and move cause it aint getting any better
            mbss.log('not valid action function, complete (to be removed)');
            return status.remove;
        }

        // an evaluator had no results, move on to next action in queue
        if (compiledAction.length <= 0) {
            removeAction();
            mbss.log('not items found, complete to be removed as it had items to parse but found no matches');
            return status.remove;
        }

        if (compiledAction === false) { // false!
            failAction(actionModel);
            mbss.log('not items found, fail to be tried again');
            return status.fail;
        }


        mbss.log('compiledAction', compiledAction.length || compiledAction);

        // why be biased about the results. if they defined then return them. \
        // assumed to be compiledAction.length > 1;
        // 
        // return results
        __augmented = compiledAction;
        return __augmented;
    }

    mbss.handleAction = handleAction;
    mbss.active = __augmented;

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
