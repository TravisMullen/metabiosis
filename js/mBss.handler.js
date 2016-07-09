'use strict';
var mBss = ( function( mbss ) {

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
            failed : 'Event Failed',
            complete : 'Event Completed',
            execute : 'Executing Event Action (Click)'

        },

        failedMax = 2,
        failedCount = 0,
        failedAction,

        // data passed back from the action functions
        __augmented; 

    // status = { status : 'active', success: undefined, failed: undefined };

    function executeAction( target ) {
        // bind action to this function
        console.log("executeAction do action!",target);
        return true;
    }

    // remove
    function completeAction(action) {
        var a = action || 'no action specified';

        failedCount = 0; //reset count

        // conplete action
        console.log("completeAction remove or complete!",a);
        return true;
    }

    function failAction(action) {
        if ( failedAction === action ) {
            ++failedCount;
            if ( failedCount >= failedMax ) {
                completeAction( action );
            }
        }
    }

    function handleAction( actionModel ) {
        // __readyHandler = false;

        // to do :: make module
        // split each CHECK POINT in seperate functions

        var target,
            // actionModel, // parse model?
            bindModel = {},
            compiledAction,
            boundAction;

        // actionModel = __actionQueue[ 0 ];
        console.log( 'actionModel', actionModel );
        // check for valid object (model)
        if ( typeof actionModel !== 'object' ) {
            mbss.log( 'no action model for the handler!' );
            return 'not valid action model';
        }


        // SUBMIT 
        // requires augmented data, otherwise use target w/ "default" action
        // act on returned augmented target
        if ( typeof actionModel.submit !== 'undefined' && ( __augmented && __augmented.length ) ) {

            // set target to result's link
            actionModel.target = __augmented[ 0 ].querySelector( '[href]' );

            mbss.log( 'submit using augmented data from last action', actionModel.target );
            // actionModel.subtarget = actionModel.submit;

            executeAction( actionModel.target );
            __augmented = []; //reset

            return 'submit is defined, action executed'; // break;
        }

        // VALIDATE 
        // if validate, act on returned augmented target
        if ( typeof actionModel.validate === 'string' ) {
            mbss.log( 'validate!' );
            actionModel.target = actionModel.validate;
        }



        // TARGET (set by user or result from processed augmented data)
        // if valid taget, save as key and set the query as the target
        // if no target, bypass
        if ( typeof actionModel.target === 'string' ) {

            // if 'body', bypass querySelector
            actionModel.selector = actionModel.target;
            if ( actionModel.target.indexOf( 'body' ) === 0 ) {
                target = [ document.body ];
            } else {
                target = document.querySelectorAll( actionModel.selector );
            }

            // check target, cause lets not proceed if its not valid
            if ( !target ) {
                // if no target, maybe the DOM is still loading, 
                // queue fail check to try again
                failAction( actionModel );
                return 'target not valid, failing action';
            }
        }

        // ACTION
        // confirm action function
        // if not define, make it check for a valid target to click
        if ( typeof actionModel.action !== 'function' ) {
            actionModel.action = function( target ) {
                mbss.log( 'default: true - target.length', target.length );
                return target.length > 0;
            };
        }

        // SUBTARGET // for access to `__augmented` data in `actionModel.action`
        // is subtarget/ alter target to be subtarget, 
        // and its action should already be expecting the augmented as 2nd arg
        if ( typeof actionModel.subtarget === 'string' ) {

            // if the last target returned empty then nothing else left to do
            if ( typeof __augmented === 'undefined' || __augmented.length === 0 ) {
                failAction( actionModel );
                return 'no augmented items, fail action';
            }

            actionModel.selector = actionModel.subtarget;

            target = document.querySelectorAll( actionModel.selector );

            // check target, cause lets not proceed if its not valid
            if ( !target ) {
                // if no target, maybe the DOM is still loading, 
                // queue fail check to try again
                failAction( actionModel );
                return 'not valid target, fail action';
            // } else {

            }
            //     // augmented target // other attribs
            //     // no click event cause its a subtarget so return that ish right here.
            //     // return actionModel.action(target, augmented);
            //     actionModel.action(target, __augmented[actionModel.target]);
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

        mbss.log( 'try target', actionModel.selector );

        // send filtered model for access within action

        // set tools 

        bindModel._bios = actionModel.helpers;
        // set config info
        bindModel._config = actionModel.config;
        // set attempt info
        bindModel._attempts = failedCount;
        if ( ( failedCount + 1 ) === ( actionModel.attempts || mbss.maxFailedAttempts ) ) {
            // for use within actions to do "last resort" functionality
            bindModel._lastAttempt = true;
        }

        boundAction = actionModel.action.bind( bindModel ); // bind current scope for fn and data access
        try {
            // call and pass `targat` and `augmented` for subtarget
            compiledAction = boundAction( target, __augmented );
        } catch ( e ) {
            if ( e instanceof TypeError ) {
                mbss.log( 'TypeError with Action', e );
                // statements to handle TypeError exceptions
            } else if ( e instanceof RangeError ) {
                mbss.log( 'RangeError with Action', e );
                // statements to handle RangeError exceptions
            } else if ( e instanceof EvalError ) {
                mbss.log( 'EvalError with Action', e );
                // statements to handle EvalError exceptions
            } else {
                // statements to handle any unspecified exceptions
                mbss.log( 'Error with Action', e );
                // maybe we should splice it out
            }

            // this errorored, it should be removed
        }

        mbss.log( 'typeof compiledAction ', typeof compiledAction );
        // mbss.log("compiled after call",compiled);
        if ( typeof compiledAction === 'undefined' ) { // check for null or NaN?
            mbss.log( 'action was bad... removing action' );
            completeAction(); // remove and move cause it aint getting any better
            return 'not valid action function, complete (to be removed)';
        }

        // an evaluator had no results, move on to next action in queue
        if ( compiledAction.length === 0 ) {
            // if () {

            // }
            completeAction();
            return 'not items found, complete to be removed';
        }

        if ( compiledAction === false ) { // false!
            failAction( actionModel );
            return 'not items found, fail to be tried again or removed';
        }


        mbss.log( 'compiledAction', compiledAction );

        // if validate then remove cause task is complete, time to do `core`
        if ( compiledAction && actionModel.validate ) {
            completeAction();
            return 'if was a validation tast, complete for removed and do not execute action (click)';
        }

        // if we are returning some augmented data
        // save it
        // and if (not) a submit action
        if ( compiledAction.length >= 1 && !actionModel.submit ) {
            // returning arrays means we queuing up a subtarget, no click for you.
            __augmented = compiledAction;
            // move on to next action
            completeAction();
            return 'has augmetmented ('+__augmented.length+'), complete and move on to next action';
        } else {
            // if is valid target and not out of attempts
            // if nothing else fails... its time to be clicked
            // if (this.active.event.pathType !== 'validate') {
            executeAction( target );
            return 'only one augmented ('+__augmented.length+'), so found be the needle, execute action';
            // }
        }

    }

    mbss.handleAction = handleAction;

    // should be external 
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

    // exported 
    return mbss;
}( mBss || {} ) );

