/* globals figgy, mBss, mockument */
// jscs:disable maximumLineLength
    'use strict';
describe('Metabiosis Events', function() {
    var service,
        // mockService,
        // mockData,
        // temp,
        // testGlobal,
        config;

    function filterKey(name) {
        var key = '';
        if (name !== undefined) {
            key = name;
            key = key.replace(/[^a-zA-Z0-9]/g, ''); // remove all non-alphas and non-number
            key = key.toLowerCase();
        }
        return key;
    }



    beforeEach(function() {
     

        service = mBss;
        // config = ;
    });

    afterEach(function() {
        // mockService.removeAll();
    });

    it('should have handleAction', function() {
        // console.log("service", service);
        expect(service.handleAction).toBeDefined();

    });

    // it('should should accept action and return result', function() {
    //     // console.log("config.path", config.path);
    //     var result,
    //         // item,
    //         action;

    //     action = config.path[0];
    //     action.helpers = config.helpers;
    //     action.config = config.item;

    //     console.log("mockData.items.length", mockData.items.length);

    //     // for ( var i = 0; i < config.path.length; i++ ) {
    //     //     action = service.handleAction( config.path[ i ] );
    //     //     console.log( i+' RESULT =====>', result );
    //     //     expect( result ).toBeDefined();
    //     // }

    //     result = service.handleAction(action);
    //     console.log("1 RESULT =====>", result);
    //     expect(result).toBeDefined();

    //     console.log("service.active", service.active);
    //     // expect(service.active.length).toBe( mockData.items-3 );


    //     // expect(validateTest).not.toBeDefined();

    //     action = config.path[1];
    //     action.helpers = config.helpers;
    //     action.config = config.item;
    //     result = service.handleAction(action);
    //     console.log("2 RESULT =====>", result);

    //     expect(result).toBeDefined();

    //     action = config.path[2];
    //     action.helpers = config.helpers;
    //     action.config = config.item;
    //     result = service.handleAction(action);
    //     console.log("3 RESULT =====>", result);

    //     expect(result).toBeDefined();

    //     action = config.path[3];
    //     action.helpers = config.helpers;
    //     action.config = config.item;
    //     result = service.handleAction(action);
    //     console.log("4 RESULT =====>", result);

    //     expect(result).toBeDefined();


    //     action = config.path[4];
    //     action.helpers = config.helpers;
    //     action.config = config.item;
    //     result = service.handleAction(action);
    //     console.log("5 RESULT =====>", result);

    //     expect(result).toBeDefined();

    //     mockService.removeAll();

    //     testGlobal = validateTest || false;
    //     console.log("document.querySelector('body').innerHTML", document.querySelector('body').innerHTML);
    //     expect(testGlobal).toBe(true);
    //     // console.log("validateTest", testGlobal);
    //     // expect(service.active.length).toBe( 3 );
    // });

});
