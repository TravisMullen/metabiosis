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

    function failAction(action) {
        if (failedAction === action) {
            ++failedCount;
            if (failedCount >= failedMax) {
                completeAction(action);
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


        // check for valid object (model)
        if (typeof actionModel !== 'object') {
            mbss.log('no action model for the handler!');
            return status.fail;
        }


        // SUBMIT 
        // requires augmented data, otherwise use target w/ "default" action
        // act on returned augmented target
        if (typeof actionModel.submit !== 'undefined' && (__augmented && __augmented.length)) {

            // set target to result's link
            actionModel.target = __augmented[0].querySelector('[href]');

            mbss.log('submit using augmented data from last action', actionModel.target);
            // actionModel.subtarget = actionModel.submit;

            executeAction( actionModel.target );
            __augmented = []; //reset
            mbss.log('submit is defined, action executed');
            return status.success; // break;
        }

        // VALIDATE 
        // if validate, act on returned augmented target
        if (typeof actionModel.validate === 'string') {
            mbss.log('validate!');
            actionModel.target = actionModel.validate;
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
        }

        // console.log("document.querySelector('body').innerHTML",document.querySelector('#items-to-test').innerHTML);
        // ACTION
        // confirm action function
        // if not define, make it check for a valid target to click
        if (typeof actionModel.action !== 'function') {
            actionModel.action = function(target) {
                mbss.log('default: true - target.length', target.length);
                return target.length > 0;
            };
        }

        // SUBTARGET // for access to `__augmented` data in `actionModel.action`
        // is subtarget/ alter target to be subtarget, 
        // and its action should already be expecting the augmented as 2nd arg
        // 
        console.log("actionModel.subtarget", actionModel.subtarget);

        // TODO :: make this boolean as the subtarget selector is not needed

        if (actionModel.subtarget) {
            // if ( typeof actionModel.subtarget === 'string' ) {

            // if the last target returned empty then nothing else left to do
            if (typeof __augmented === 'undefined' || __augmented.length === 0) {
                failAction(actionModel);
                mbss.log('no augmented items, fail subtarget action');
                return status.fail;
            }

            actionModel.selector = 'is a subtarget';
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

        bindModel.$tools = actionModel.helpers;
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
            mbss.log('action was bad... removing action');
            completeAction(); // remove and move cause it aint getting any better
            mbss.log('not valid action function, complete (to be removed)');
            return status.remove;
        }

        // an evaluator had no results, move on to next action in queue
        if (compiledAction.length === 0) {
            // if () {

            // }
            completeAction();
            mbss.log('not items found, complete to be removed as it had items to parse but found no matches');
            return status.remove;
        }

        if (compiledAction === false) { // false!
            failAction(actionModel);
            mbss.log('not items found, fail to be tried again');
            return status.fail;
        }


        mbss.log('compiledAction', compiledAction.length || compiledAction);

        // if validate then remove cause task is complete, time to do `core`
        if (compiledAction && actionModel.validate) {
            completeAction();
            mbss.log('if was a validation tast, complete for removed and do not execute action (click)');
            return status.remove;
        }

        // if we are returning some augmented data
        // save it
        // and if (not) a submit action
        if (compiledAction.length >= 1 && !actionModel.submit) {
            // returning arrays means we queuing up a subtarget, no click for you.
            __augmented = compiledAction;
            // move on to next action
            completeAction();
            mbss.log('has augmetmented (' + __augmented.length + '), complete and move on to next action');
            return status.success;
        } else {
            // if is valid target and not out of attempts
            // if nothing else fails... its time to be clicked
            // if (this.active.event.pathType !== 'validate') {
            executeAction(target);
            mbss.log('only one augmented (' + __augmented.length + '), so found be the needle, execute action');
            // return 'only one augmented (' + __augmented.length + '), so found be the needle, execute action';
            return status.execute;
            // }
        }

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
