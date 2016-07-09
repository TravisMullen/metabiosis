// jscs:disable maximumLineLength
'use strict';
var mockument = (function defineMockument() {

    var mockdoc = {},
        active = {},

        count = 0,
        prefix = 'mock-element-',

        defaultElementMap = [{
            type: 'div',
            id: 'mockument',
            classes: ['foo','bar']
        }, {
            type: 'ul',
            targetId: 'mockument',
            classes: ['mock-list-for-testing','some-additional-class']
        },{
            type: 'h1',
            id: 'headerJawn',
            target: '.foo.bar',
            text: 'This is a list to test against!',
            classes: ['red','white','blue']
        }, {
            type: 'li',
            text: 'kitsch.',
            target: '.mock-list-for-testing'
        },{
            type: 'li',
            text: 'Gochujang.',
            id: 'gochJawn',
            target: '.mock-list-for-testing'
        },{
            type: 'li',
            text: 'cornhole.',
            target: '.mock-list-for-testing'
        },{
            type: 'li',
            text: 'knausgaard.',
            target: '.mock-list-for-testing'
        },{
            type: 'li',
            text: 'chartreuse.',
            target: '.mock-list-for-testing'
        },{
            type: 'li',
            text: 'mlkshk keffiyeh.',
            target: '.mock-list-for-testing'
        }];

    // should this be a contructor 
    function merge(model) {
        var elm = {};

        elm.type = model.type || 'div';

        //giving each an ID for testing and memory management
        elm.id = model.id || ( prefix + (++count) ); 

        if ( active[ elm.id ] ) {
            elm.id = elm.id + '-dup';
        }
        console.log("elm.id",elm.id);

        elm.text = model.text || false;
        elm.classes = model.classes && model.classes.length ? model.classes : [];

        elm.targetId = model.targetId || false;
        // dont set target if there is a target id
        elm.target = model.target && elm.targetId === false ? model.target : false;

        return elm;
    }

    function addElement(elmConfig) {
        var elm,
            config,
            content,
            success,
            target = false;

        config = merge(elmConfig);

        // create a new div element 
        // and give it some content 
        // 
        elm = document.createElement(config.type);
        // set id
        if ( config.id ) {
            elm.setAttribute('id',config.id)
        }

        if ( config.classes && config.classes.length ) {
            for (var i = config.classes.length - 1; i >= 0; i--) {
                elm.classList.add( config.classes[i] );
            }
        }

        if (config.text) {
            content = document.createTextNode(config.text);
            elm.appendChild(content); //add the text node to the newly created div. 
        }

        if (config.targetId) {
            // add the newly created element and its content into the DOM 
            target = document.getElementById(config.targetId);
        }

        if (config.target) {
            // add the newly created element and its content into the DOM 
            target = document.querySelector(config.target);
        }
        

        if (target) {
            success = target.appendChild(elm);
        } else {
            success = document.body.appendChild(elm);
        }

        // if added to DOM then maintain in active array
        if (success) {
            // active.push(success.id);
            active[success.id] = { id: success.id };
        }
    }

    function updateActive( innerHTML ) {
        var elementId;
        for (elementId in active) {
            if ( innerHTML.indexOf(elementId) >= 0 ) {
                delete active[ elementId ];
            }
        }
    }
    
    function removeElement( elementId ) {
        var body,
            temp,
            success,
            id = elementId.id || elementId;

        temp = document.getElementById( id );
        delete active[ id ];

        if ( temp ) {
            body = document.querySelector( 'body' );
            success = body.removeChild( temp );
            if ( success.innerHTML ) {
                updateActive( success.innerHTML );
            }
        }
    }


    function removeAll() {
        var elementId;
        for (elementId in active) {
            removeElement( elementId );
        }
    }

    function build(elementMap) {
        for (var i = 0; i < elementMap.length; i++) {
            addElement( elementMap[i] );
        }
    }

    mockdoc.add = addElement;
    mockdoc.removeAll = removeAll;

    mockdoc.prefix = prefix;
    mockdoc.active = active;


    mockdoc.build = function( elementMap ) {
        if ( elementMap ) {
            build( elementMap );
        } else {
            build( defaultElementMap );
        }
    };

    return mockdoc;
})();

// mockument.build();
