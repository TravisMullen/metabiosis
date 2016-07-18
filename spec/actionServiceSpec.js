/* globals figgy, mBss, mockument */
// jscs:disable maximumLineLength
    'use strict';
describe('Metabiosis Actions', function() {
    var service,
        mockService,
        mockData,
        temp,
        testGlobal,
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
            name: 'Blog squid wolf',
            size: 'extra-medium',
            style: 'square',
            color: 'yellow'
        }, {
            name: 'Blog squid wolf',
            size: 'small',
            style: 'square',
            color: 'blue'
        }, {
            name: 'Blog squid wolf',
            size: 'extra-medium',
            style: 'square',
            color: 'red'
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

        // sell some out
        mockData.items[3].name = mockData.items[3].name + ' SOLD OUT';
        mockData.items[6].name = mockData.items[6].name + ' SOLD OUT';
        mockData.items[8].name = mockData.items[8].name + ' SOLD OUT';

        mockData.build = [
            { type: 'article', id: 'items-to-test' },
            { type: 'h1', targetId: 'items-to-test', text: 'These are some cool items.' },
            { type: 'ul', targetId: 'items-to-test', classes: ['product-list'] },

        ];

        for (var i = mockData.items.length - 1; i >= 0; i--) {

            // add list elms
            temp = {
                target: '.product-list',
                type: 'li',
                id: filterKey(mockData.items[i].name + mockData.items[i].color),
                // text: mockData.items[i].name + ' ' + mockData.items[i].name,
                classes: ['background-' + mockData.items[i].color, 'item-for-sale']

            };
            mockData.build.push(temp);

            // give them headers
            temp = {
                type: 'h1',
                targetId: filterKey(mockData.items[i].name + mockData.items[i].color),
                text: mockData.items[i].name

            };
            mockData.build.push(temp);

            // give them content
            temp = {
                type: 'p',
                targetId: filterKey(mockData.items[i].name + mockData.items[i].color),
                text: 'Size: ' + mockData.items[i].size + ', Style: ' + mockData.items[i].style + ', Color: ' + mockData.items[i].color
            };
            mockData.build.push(temp);

            // give them links
            temp = {
                type: 'a',
                href: 'javascript:var validateTest = true;alert(\'Hello ' + mockData.items[i].name + '. `validateTest` is set to: \'+validateTest);',
                targetId: filterKey(mockData.items[i].name + mockData.items[i].color),
                classes: ['call-to-action'],
                text: 'Get it now!'

            };
            mockData.build.push(temp);

        }

        // add that ish to the page
        mockService.build(mockData.build);


        config.item = {
            name: 'Squid Wolf',
            key: 'squid wolf',
            style: 'triangle',
            size: 'extra-medium',
            pathType: 'items'
        };

        config.path = [{
            // filtered,
            target: '.item-for-sale',
            action: function(target) {
                var augmented = [],
                    fkey = this.$tools.filterKey('Sold Out'),
                    // tools = this.$tools,
                    content = target,
                    fres; // check for ns

                console.log("removing 'Sold Out' items");
                // return content.map(function( item ) {
                //         fres = tools.filterKey(content[i].innerHTML);
                //         return fres.indexOf(fkey) === -1;
                // });
                for (var i = content.length - 1; i >= 0; i--) {
                    fres = this.$tools.filterKey(content[i].innerHTML);
                    if (fres.indexOf(fkey) === -1) {
                        // console.log( 'remaing item - ', fres );
                        augmented.unshift(target[i]);
                    }
                }

                return augmented; // if length 0 return false
            }
        }, {
            // filtered,
            // target: '.item-for-sale h1',
            // target: true,
            action: function(target, augmentedParent) {
                var augmented = [],
                    fkey = this.$tools.filterKey(this.$config.key),
                    content = target,
                    fres; // check for ns

                console.log("selecting only '" + fkey + "' items");
                for (var i = augmentedParent.length - 1; i >= 0; i--) {
                    fres = this.$tools.filterKey(augmentedParent[i].innerHTML);
                    if (fres.indexOf(fkey) >= 0) {
                        augmented.unshift(augmentedParent[i]);
                    }
                }

                // if (augmented.length) {
                return augmented;
                // } else {
                //     return augmentedParent;
                // }
            }
        }, {
            // filtered,
            // target: true,
            action: function(target, augmentedParent) {
                var augmented = [],
                    fkey = this.$tools.filterKey(this.$config.size),
                    content = target,
                    fres; // check for ns

                console.log("selecting only '" + fkey + "' items");
                for (var i = augmentedParent.length - 1; i >= 0; i--) {
                    fres = this.$tools.filterKey(augmentedParent[i].innerHTML);
                    // console.log("augmentedParent[i].innerHTML",augmentedParent[i].innerHTML);
                    // console.log("fkey",fkey);
                    // console.log("fres.indexOf(fkey)",fres.indexOf(fkey));
                    if (fres.indexOf(fkey) >= 0) {
                        // console.log("augmentedParent[i]",augmentedParent[i]);
                        augmented.unshift(augmentedParent[i]);
                    }
                }

                // if (augmented.length) {
                return augmented;
                // } else {
                //     return augmentedParent;
                // }
            }
        }, {
            // filtered,
            // target: true,
            action: function(target, augmentedParent) {
                var augmented = [],
                    fkey = this.$tools.filterKey(this.$config.style),
                    content = target,
                    fres; // check for ns

                console.log("selecting only '" + fkey + "' items");
                for (var i = augmentedParent.length - 1; i >= 0; i--) {
                    fres = this.$tools.filterKey(augmentedParent[i].innerHTML);
                    // console.log("augmentedParent[i].innerHTML",augmentedParent[i].innerHTML);
                    // console.log("fkey",fkey);
                    // console.log("fres.indexOf(fkey)",fres.indexOf(fkey));
                    if (fres.indexOf(fkey) >= 0) {
                        // console.log("augmentedParent[i]",augmentedParent[i]);
                        augmented.unshift(augmentedParent[i]);
                    }
                }

                // if (augmented.length) {
                return augmented;
                // } else {
                //     return augmentedParent;
                // }
            }
        }, {
            // filtered,
            // submit: true,
            // target: true,
            action: function(target, augmentedParent) {
                var t = augmentedParent[0].querySelector('[href]');
                console.log("click!",t);
                this.$tools.clickSyth(t);
            }
        }];
        // testing!
        // config.spec = true;

        service = mBss;
        // config = ;
    });

    afterEach(function() {
        mockService.removeAll();
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

        console.log("mockData.items.length", mockData.items.length);

        // for ( var i = 0; i < config.path.length; i++ ) {
        //     action = service.handleAction( config.path[ i ] );
        //     console.log( i+' RESULT =====>', result );
        //     expect( result ).toBeDefined();
        // }

        result = service.handleAction(action);
        console.log("1 RESULT =====>", result);
        expect(result).toBeDefined();

        console.log("service.active", service.active);
        // expect(service.active.length).toBe( mockData.items-3 );


        // expect(validateTest).not.toBeDefined();

        action = config.path[1];
        action.helpers = config.helpers;
        action.config = config.item;
        result = service.handleAction(action);
        console.log("2 RESULT =====>", result);

        expect(result).toBeDefined();

        action = config.path[2];
        action.helpers = config.helpers;
        action.config = config.item;
        result = service.handleAction(action);
        console.log("3 RESULT =====>", result);

        expect(result).toBeDefined();

        action = config.path[3];
        action.helpers = config.helpers;
        action.config = config.item;
        result = service.handleAction(action);
        console.log("4 RESULT =====>", result);

        expect(result).toBeDefined();


        action = config.path[4];
        action.helpers = config.helpers;
        action.config = config.item;
        result = service.handleAction(action);
        console.log("5 RESULT =====>", result);

        expect(result).toBeDefined();

        mockService.removeAll();

        testGlobal = validateTest || false;
        console.log("document.querySelector('body').innerHTML", document.querySelector('body').innerHTML);
        expect(testGlobal).toBe(true);
        // console.log("validateTest", testGlobal);
        // expect(service.active.length).toBe( 3 );
    });

});
