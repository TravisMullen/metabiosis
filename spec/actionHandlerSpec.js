/* globals figgy, mBss, mockument */
'use strict';
describe('Metabiosis // mBss :: >', function() {
    var service,
        mockService,
        mockData,
        temp,
        config;

    beforeEach(function() {
        // console.log( 'mBss', mBss );
        // console.log( 'scope', window.scope );
        config = figgy; // from global



        // create fake DOM to parse
        mockService = mockument;
        mockData = {};
        mockData.items = [{
            name: 'Chicharrones kitsch',
            size: 'small',
            style: 'box',
            color: 'red'
        }, {
            name: 'Mumblecore',
            size: 'small',
            style: 'square',
            color: 'green'
        }, {
            name: 'Mustache',
            size: 'small',
            style: 'square',
            color: 'green'
        }, {
            name: 'Venmo meh craft',
            size: 'extra-medium',
            style: 'square',
            color: 'blue'
        }, {
            name: 'Blog squid wolf',
            size: 'small',
            style: 'square',
            color: 'green'
        }, {
            name: 'Braid taxidermy',
            size: 'large',
            style: 'square',
            color: 'blue'
        }, {
            name: 'Distillery vegan',
            size: 'extra-medium',
            style: 'square',
            color: 'purple'
        }, {
            name: 'Cardigan leggings',
            size: 'small',
            style: 'square',
            color: 'purple'
        }, {
            name: 'Retro pinterestextra-medium',
            size: 'large',
            style: 'square',
            color: 'green'
        }];
        mockData.build = [
            { type: 'article', id: 'items-to-test' },
            { type: 'h1', targetId: 'items-to-test', text: 'These are some cool items.' },
            { type: 'ul', targetId: 'items-to-test', classes: ['product-list'] },

        ];
        for (var i = mockData.items.length - 1; i >= 0; i--) {

            temp = {
                target: '.product-list',
                type: 'li',
                text: mockData.items[i].name + ' ' + mockData.items[i].name,
                classes: ['background-' + mockData.items[i].color, 'item-for-sale']

            };
            mockData.build.push(temp);
        }
        mockService.build( mockData.build );
        // ,{
        //     type: 'h1',
        //     id: 'headerJawn',
        //     target: '.foo.bar',
        //     text: 'lipsum',
        //     classes: ['red','white','blue']
        // }
        // update based on returned fake elms


        config.item = {
            name: 'Hello World',
            key: 'lipsum',
            pathType: 'spec'
        };

        config.path = [{
            // filtered,
            target: '.item-for-sale',
            action: function(target) {
                console.log('action target.length', target.length);
                console.log("this._bios",this._bios);
                var augmented = [],
                    // fkey = this._bios.filterKey( 'Sold Out' ),
                    content = target,
                    fres; // check for ns

                augmented = ['hello'];
                // for ( var i = content.length - 1; i >= 0; i-- ) {
                //     fres = this._bios.filterKey( content[ i ].innerHTML );
                //     if ( fres.indexOf( fkey ) === -1 ) {
                //         console.log( 'fres', fres );
                //         augmented.unshift( target[ i ] );
                //     }
                // }

                // // if ( augmented.length ) {

                // // }
                // console.log( 'filterKey(\'Sold Out\') // augmented.length', augmented.length );
                return augmented; // if length 0 return false
            }
        }];
        // testing!
        // config.spec = true;

        service = mBss;
        // config = ;
    });

    it('should have handleAction', function() {
        // console.log("service", service);
        expect(service.handleAction).toBeDefined();

    });

    it('should should accept action and return result', function() {
        // console.log("config.path", config.path);
        var result,
            // item,
            action;

        action = config.path[0];
        action.helpers = config.helpers;
        action.config = config.item;

        // console.log("document.querySelector('body').innerHTML",document.querySelector('body').innerHTML);
        result = service.handleAction(action);
        console.log("RESULT =====>", result);
        expect(result).toBeDefined();
        // expect(result).not.toBeDefined();
    });

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
