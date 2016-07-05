/* globals KeyboardEvent */
// http://jsfiddle.net/vWx8V/
'use strict';
var keyCodes = ( function() {
    var exp = {},
        codes = {
            'backspace' : 8,
            'tab' : 9,
            'enter' : 13,
            'shift' : 16,
            'ctrl' : 17,
            'alt' : 18,
            'pause/break' : 19,
            'caps lock' : 20,
            'esc' : 27,
            'space' : 32,
            'page up' : 33,
            'page down' : 34,
            'end' : 35,
            'home' : 36,
            'left' : 37,
            'up' : 38,
            'right' : 39,
            'down' : 40,
            'insert' : 45,
            'delete' : 46,
            'command' : 91,
            'right click' : 93,
            'numpad *' : 106,
            'numpad +' : 107,
            'numpad -' : 109,
            'numpad .' : 110,
            'numpad /' : 111,
            'num lock' : 144,
            'scroll lock' : 145,
            'my computer' : 182,
            'my calculator' : 183,
            ';' : 186,
            '=' : 187,
            ',' : 188,
            '-' : 189,
            '.' : 190,
            '/' : 191,
            '`' : 192,
            '[' : 219,
            '\\' : 220,
            ']' : 221,
            '\'' : 222
        },
        i,
        speed = 1000;

    // lower case chars
    for ( i = 97; i < 123; i++ ) { codes[ String.fromCharCode( i ) ] = i - 32; }

    // numbers
    for ( i = 48; i < 58; i++ ) { codes[ i - 48 ] = i; }

    // function keys
    for ( i = 1; i < 13; i++ ) { codes[ 'f' + i ] = i + 111; }

    // numpad keys
    for ( i = 0; i < 10; i++ ) { codes[ 'numpad ' + i ] = i + 96; }

    function clickSyth( target, focus ) {
        var canceled,
            elm = ( typeof target === 'string' ) ? 
                    document.querySelector( target ) :
                    target,
            evt = new MouseEvent( 'click', {
                'view' : window,
                'button' : 0,
                'bubbles' : true,
                'cancelable' : true
            });


        elm.style.border = '1px solid #b368b3';
        elm.style.backgroundColor = '#800080';
        elm.style.color = '#32CD32';


        canceled = !elm.dispatchEvent( evt );

        if ( canceled ) {
            // A clickSyth called preventDefault.
            console.log( 'MouseEvent `click` canceled' );
        } else {
            // None of the clickSyths called preventDefault.
            console.log( 'MouseEvent `click` NOT canceled' );
        }
        if ( focus ) {
            console.log( 'focus!' );
            elm.focus();
        }
    }

    function keySynth( code, target ) {
        var down,
            delay,
            elm = ( typeof target === 'string' ) ? 
                    document.querySelector( target ) :
                    target, 
            // elm = target,
            keyCode = code,
            config = {
                    elm : target,
                    keyCode : keyCode
                },

            kdown = new KeyboardEvent( 'keydown', {
                // 'view' : window,
                // 'button' : 0,
                'code' : keyCode,
                'bubbles' : true,
                'cancelable' : true
            });
            // kpress = new KeyboardEvent( 'keypress', {
            //     // 'view' : window,
            //     // 'button' : 0,
            //     'code' : keyCode,
            //     'bubbles' : true,
            //     'cancelable' : true
            // }),
            // kup = new KeyboardEvent( 'keyup', {
            //     // 'view' : window,
            //     // 'button' : 0,
            //     'code' : keyCode,
            //     'bubbles' : true,
            //     'cancelable' : true
            // });


        // config = Object.create( config );

        // if ( keyCode === 16 ) {
        //     delay = speed * 1.98;
        // }

        // // fire down right away
        // down = !elm.dispatchEvent( kdown );
        // if ( down ) {
        //     // A clickSyth called preventDefault.
        //     console.log( 'KeyDown canceled' );
        // } else {
        //     // None of the clickSyths called preventDefault.
        //     console.log( 'KeyDown NOT canceled' );
        // }

        // fire press after 25% of the delay
        // setTimeout( function() {
            var kpress = new KeyboardEvent( 'keypress', {
                    // 'view' : window,
                    // 'button' : 0,
                    'code' : config.keyCode,
                    'bubbles' : true,
                    'cancelable' : true
                }),
                press;
                console.log( 'fig', config );
                console.log( 'fig.elm', config.elm );
                config.$elm = document.querySelector( config.elm );
                press = !config.$elm.dispatchEvent( kpress );
                console.log( 'kpress : keyCode', config.keyCode );
            if ( press ) {
                // A clickSyth called preventDefault.
                console.log( 'KeyPress canceled' );
            } else {
                // None of the clickSyths called preventDefault.
                console.log( 'KeyPress NOT canceled' );
            }
        // }, delay / 4 );

        // fire up on the completed delay
        // setTimeout( function() {
        //     var kup = new KeyboardEvent( 'keyup', {
        //             // 'view' : window,
        //             // 'button' : 0,
        //             'code' : config.keyCode,
        //             'bubbles' : true,
        //             'cancelable' : true
        //         }),
        //         up;
        //         config.$elm = document.querySelector( config.elm );
        //         up = !config.$elm.dispatchEvent( kup );
        //         console.log( 'kup : keyCode', config.keyCode );
        //     if ( up ) {
        //         // A clickSyth called preventDefault.
        //         console.log( 'KeyUp canceled' );
        //     } else {
        //         // None of the clickSyths called preventDefault.
        //         console.log( 'KeyUp NOT canceled' );
        //     }
        // }, delay );

    }

    function applyKeys( path, target, cb ) {
        var p = path.slice( 0 );
        ( function keyStroke() {
            setTimeout( function() {
                var stroke = p.shift();
                console.log( 'stroke', stroke );
                if ( stroke ) {
                    keySynth( stroke, target );
                    keyStroke(); // call self again
                } else {
                    if ( typeof cb === 'function' ) {
                        console.log( 'done // call back!' );
                        cb( path );
                    }
                    return true;
                }
            }, speed );
        }() );
    }


    function convertToActionPath( text, target, cb ) {
        var elm = target,
            // elm = document.querySelector( target ),
            actions = [];

        if ( !elm ) {
            console.log( 'bad target!' );
            return; }

        // todo :: apply promisec
        console.log( 'convertToActionPath', text );
        console.log( 'target', elm );

        if ( typeof text === 'string' ) {
            for ( var i = 0; i < text.length; i++ ) {
                var t = text[ i ].slice( 0 );
                if ( t.match( /[A-Z]/ ) ) {
                    actions.push( codes.shift  );
                }
                actions.push( codes[ text[ i ] ] );
            }
        }

        // elm.onblur = function() {
        //     console.log("blurred!");
            clickSyth( elm, true );
        // };
        console.log( 'actions', actions );
        applyKeys( actions, elm )

        // else {
        //     return actions;
        // }
    }


    exp.convertToActionPath = convertToActionPath;
    exp.applyKeys = applyKeys;
    exp.keySynth = keySynth;
    exp.clickSyth = clickSyth;
    exp.codes = codes;

    return exp;
}() );

// keyCodes.clickSyth('[name="login-username"]');
// keyCodes.clickSyth('[name="login-username"]');

keyCodes.convertToActionPath( 'tRravIs', '[name="login-username"]', function( data ) {
    console.log( 'done!', data );
});


