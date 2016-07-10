/* globals mockument */
'use strict';
describe('Mockument', function() {
    var service,

        count = 0, // global because the service never resets in memory
        prefix,

        data;

    // dynamic update of ID for validation
    function mockAdd(model) {
        var addition = model.id || prefix + (++count);
        // console.log("mockAdd",addition);
        return addition;
    }

    // function cleanElm(element) {
    //     var body,
    //         temp;

    //     temp = document.getElementById(element.id) ||
    //         document.getElementById((prefix + (++count)));
    //     // console.log("pre temp",temp);
    //     if (temp) {
    //         body = document.querySelector('body');
    //         body.removeChild(temp);
    //     }
    //     // console.log("cleanElm temp",temp);
    // }


    beforeEach(function() {

        service = mockument;
        prefix = service.prefix;

        data = [{
            type: 'div',
            // id: 'mockument',
            // id: 'turd',
            classes: ['foo-class', 'bar-class', 'spec-testing']
        }, {
            type: 'p',
            text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'
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
            id: 'gochJawn',
            target: '.mock-list-for-testing'
        }, {
            type: 'h1',
            id: 'headerJawn',
            target: '.foo-class.bar-class',
            targetId: 'gochJawn',
            text: 'This is a list to test against!',
            classes: ['red', 'white', 'blue', 'spec-testing']
        }];

    });

    afterEach(function() {
        service.removeAll();
    });


    it('should be defined', function() {
        expect(service).toBeDefined();
    });

    describe('should be able to ADD elements', function() {

        it('using defined `.add` method', function() {
            expect(service.add).toBeDefined();
        });

        it('to DOM and return a valid ID', function() {
            var inspection,
                seq = 0,
                elm = data[seq],
                validation = mockAdd(elm),
                returnedId,
                // test by id
                selector = '#' + validation;

            // 1. make sure the element doesnt already exist in the DOM
            inspection = document.querySelector(selector);
            expect(inspection).toBeNull();

            // 2. add the element
            returnedId = service.add(elm);

            // 3. confirn the returned ID matched the element requested
            expect(returnedId).toBe(validation);

            // 4. get updated DOM to validate 
            inspection = document.querySelector(selector);

            // 4. validate element by ID
            expect(inspection.id).toBe(validation);
        });

    });

    describe('should be able to REMOVE elements', function() {
        it('using defined `.remove` method', function() {
            expect(service.remove).toBeDefined();
        });
        it('from DOM after with a valid returned ID', function() {
            var inspection,
                seq = 0,
                elm = data[seq],
                validation = mockAdd(elm),
                returnedId,
                // test by id
                selector = '#' + validation;

            // 1. make sure the element doesnt already exist in the DOM
            inspection = document.querySelector(selector);
            expect(inspection).toBeNull();

            // 2. add the element
            returnedId = service.add(elm);

            // 3. get updated DOM to validate 
            inspection = document.querySelector(selector);

            // 4. confirm element is on page prior to test 
            expect(inspection.id).toBe(validation);

            // 5. remove element
            returnedId = service.remove(returnedId);

            // 6. confirm element is removed from page
            inspection = document.querySelector(selector);
            expect(inspection).toBeNull();


        });
    });

    describe('should be able to ADD MULTIPLE elements', function() {
        it('using defined `.build` method', function() {
            expect(service.build).toBeDefined();
        });
        it('to the DOM', function() {
            var inspection,
                validations = [],
                selector = 'body';

            // 1. build test data
            for (var i = 0; i < data.length; i++) {
                validations.push(mockAdd(data[i]));
            }

            // 2. add elements to page
            service.build(data);

            // 3. confirm elements were added
            inspection = document.querySelector(selector);
            for (var j = 0; j < validations.length; j++) {
                expect(inspection.innerHTML.indexOf(validations[j])).toBeGreaterThan(-1);
            }

        });
    });


    describe('should have removeAll method', function() {
        it('publically defined', function() {
            expect(service.removeAll).toBeDefined();
        });
        it('add multiple elements to DOM', function() {
            var inspection,
                validations = [],
                selector = 'body';

            // 1. build test data
            for (var i = 0; i < data.length; i++) {
                validations.push(mockAdd(data[i]));
            }

            // 2. shouldn't exist yet
            inspection = document.querySelector(selector);
            for (var j = 0; j < validations.length; j++) {
                expect(inspection.innerHTML.indexOf(validations[j])).toBe(-1);
            }

            // 3. add elements to page
            service.build(data);

            // how should exist!
            inspection = document.querySelector(selector);
            for (var k = 0; k < validations.length; k++) {
                expect(inspection.innerHTML.indexOf(validations[k])).toBeGreaterThan(-1);
            }


            // remove that ish
            service.removeAll();

            inspection = document.querySelector(selector);
            for (var l = 0; l < validations.length; l++) {
                expect(inspection.innerHTML.indexOf(validations[l])).toBe(-1);
            }
        });
    });

    describe('should maintain active elements', function() {

        it('publically defined `.active` object hash', function() {
            expect(service.active).toBeDefined();
        });

        it('and always return active elements', function() {
            var inspection,
                activeElements,
                validations = [],
                selector = 'body';

            // 1. build test data
            for (var i = 0; i < data.length; i++) {
                validations.push(mockAdd(data[i]));
            }

            // 2. shouldn't exist yet
            inspection = document.querySelector(selector);
            for (var j = 0; j < validations.length; j++) {
                expect(inspection.innerHTML.indexOf(validations[j])).toBe(-1);
            }

            // 3. add elements to page
            service.build(data);

            // how should exist!
            inspection = document.querySelector(selector);
            for (var k = 0; k < validations.length; k++) {
                expect(inspection.innerHTML.indexOf(validations[k])).toBeGreaterThan(-1);
            }


            // validate against service
            activeElements = Object.keys(service.active);
            expect(activeElements.length).toBe(data.length);
            for (var l = 0; l < activeElements.length; l++) {
                expect(inspection.innerHTML.indexOf(activeElements[l])).toBeGreaterThan(-1);
            }


            // remove that ish
            service.removeAll();

            inspection = document.querySelector(selector);
            for (var m = 0; m < validations.length; m++) {
                expect(inspection.innerHTML.indexOf(validations[m])).toBe(-1);
            }

            // validate against service
            activeElements = Object.keys(service.active);
            expect(activeElements.length).toBe(0);

        });
    });

    describe('should have configuration attributes', function() {

        var inspection,
            validations,
            element,
            returnedId;
        beforeEach(function() {
            validations = [];
            element = data[data.length-1];
            // 1. build test data
            // for (var i = 0; i < data.length; i++) {
            //     validations.push(mockAdd(data[i]));
            // }

            // 2. shouldn't exist yet
            // inspection = document.querySelector(selector);
            // for (var j = 0; j < validations.length; j++) {
            //     expect(inspection.innerHTML.indexOf(validations[j])).toBe(-1);
            // }

            // 3. add elements to page
            returnedId = service.add(element);
            // how should exist!
            inspection = document.querySelector('#'+returnedId);
            
            // inspection.innerHTML
        });

        it('should have id', function() {
            expect(inspection.id).toBeDefined();
        });
    });
    // describe('should have configuration attributes', function() {

    //     var inspection,
    //         validations,
    //         selector;
    //     beforeEach(function() {
    //         validations = [];
    //         selector = 'body';

    //         // 1. build test data
    //         for (var i = 0; i < data.length; i++) {
    //             validations.push(mockAdd(data[i]));
    //         }

    //         // 2. shouldn't exist yet
    //         inspection = document.querySelector(selector);
    //         for (var j = 0; j < validations.length; j++) {
    //             expect(inspection.innerHTML.indexOf(validations[j])).toBe(-1);
    //         }

    //         // 3. add elements to page
    //         service.build(data);

    //         // how should exist!
    //         inspection = document.querySelector(selector);
            
    //         // inspection.innerHTML
    //     });

    //     it('for element type', function() {
    //         console.log("inspection.innerHTML",inspection.innerHTML);
    //         expect(inspection.innerHTML).toBeDefined();
    //     });
    // });

    //  type: 'h1',
    // id: 'headerJawn',
    // target: '.foo-class.bar-class',
    // targetId: 'gochJawn',
    // text: 'This is a list to test against!',
    // classes:

});
