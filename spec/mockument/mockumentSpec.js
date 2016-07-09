/* globals mockument */
'use strict';
describe('Mockument', function() {
    var service,

        count,
        prefix,

        // body,
        // temp,
        data;

    function cleanElm( element ) {
        var body,
            temp;

        temp = document.getElementById( element.id ) || 
                document.getElementById( ( prefix + (++count) ) );
        // console.log("pre temp",temp);
        if ( temp ) {
            body = document.querySelector( 'body' );
            body.removeChild( temp );
        }
        // console.log("cleanElm temp",temp);
    }

    beforeEach(function() {

        service = mockument;

        // for testing and clean-up
        count = 0;
        prefix = service.prefix;

        data = [{
            type: 'div',
            // id: 'mockument',
            id: 'turd',
            classes: ['foo-class', 'bar-class', 'spec-testing']
        }, {
            type: 'ul',
            targetId: 'mockument',
            classes: ['mock-list-for-testing', 'some-additional-class']
        }, {
            type: 'li',
            text: 'kitsch.',
            target: '.mock-list-for-testing'
        }, {
            type: 'li',
            text: 'Gochujang.',
            // id: 'gochJawn',
            target: '.mock-list-for-testing'
        }, {
            type: 'h1',
            id: 'headerJawn',
            target: '.foo-class.bar-class',
            // targetId: 'gochJawn',
            text: 'This is a list to test against!',
            classes: ['red', 'white', 'blue', 'spec-testing']
        }];


    });

    afterEach(function() {
        service.removeAll();
    });

    describe('should have add method', function() {
        it('publically defined', function() {
            expect(service.add).toBeDefined();
        });
        it('add an element to DOM', function() {
            var inspection,
                elm = data[0],
                // test by id
                selector = '#' + elm.id;

            // shouldn't exist yet
            inspection = document.querySelector( selector );
            expect(inspection).toBeNull();

            // add it!
            service.add( elm );

            // how should exist!
            inspection = document.querySelector( selector );

            expect(inspection).toBeDefined();
            expect(inspection.id).toBe(elm.id);
        });
    });

    describe('should have build method', function() {
        it('publically defined', function() {
            expect(service.build).toBeDefined();
        });
        it('add multiple elements to DOM', function() {
            var inspection,
                // test by id
                selector = '#' + data[0].id;

            // shouldn't exist yet
            inspection = document.querySelector( selector );
            console.log("inspection",inspection);
            expect(inspection).toBeNull();

            // add it!
            service.build( data );

            // how should exist!
            inspection = document.querySelector( selector );
            console.log("inspection",inspection);
            console.log("inspection.innerHTML",inspection.innerHTML);

            expect(inspection).toBeDefined();

            for (var i = data.length - 1; i >= 0; i--) {
                expect(inspection).toBeDefined();
            }
            // expect(inspection.id).toBe(elm.id);
        });
        // it('maintain active list', function() {

        // });
        // it('maintain active list', function() {
            
        // });
    });



    describe('should correctly configure elements', function() {
        // it('targets', function() {
        //     expect(service.build).toBeDefined();
        // });
    });
    // it('should should accept action and return result', function() {
    //     console.log("config.path", config.path);
    //     var result,
    //         // item,
    //         action;

    //     action = config.path;
    //     action.helpers = config.helpers;
    //     action.config = config.item;

    //     result = service.handleAction(action);
    //     console.log("RESULT =====>",result);
    //     expect(result).toBeDefined();
    //     // expect(result).not.toBeDefined();
    // });

    // define targets
    // define actions



    // it( 'should have defined paths', function() {
    //     var path;
    //     for ( path in config.paths ) {
    //         expect( config.paths[ path ].length ).toBeGreaterThan( 0 );
    //     }
    // });

    // it( 'should have items', function() {
    //     expect( config.items.length ).toBeGreaterThan( 0 );
    // });

});
