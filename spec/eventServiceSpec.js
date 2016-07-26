/* globals figgy, mBss, mockument, jasmine, spyOn */
// jscs:disable maximumLineLength
'use strict';
describe('Metabiosis Events', function() {
    var serviceSpy,

        service,
        mockService,
        mockData,
        temp,
        testGlobal,
        config;

    function filterKey(name) {
        var key = '';
        if (name !== undefined) {
            key = name;
            key = key.replace(/[^a-zA-Z]/g, ''); // remove all non-alphas
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


        // action items
        config.items = [{
            name: 'Squid Wolf',
            key: 'squid wolf',
            style: 'triangle',
            size: 'extra-medium',
            pathType: 'testItems'
        }, {
            name: 'Cardigan',
            key: 'Cardigan',
            pathType: 'testItems'
        }, {
            name: 'Random Shit',
            key: 'farts',
            pathType: 'anotherTest'
        }, {
            name: 'Vegan',
            key: 'vegan',
            pathType: 'testItems'
        }, ];

        // action paths
        config.paths = {};
        config.paths.testItems = [{
            // filtered,
            target: '.item-for-sale',
            action: function(target) {
                var augmented = [],
                    fkey = this.$tools.filterKey('Sold Out'),
                    content = target,
                    fres; // check for ns

                // console.log("removing 'Sold Out' items", target);
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

                // console.log("selecting only '" + fkey + "' items");
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

                // console.log("selecting only '" + fkey + "' items");
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

                // console.log("selecting only '" + fkey + "' items");
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
                // console.log("click!", t);
                this.$tools.clickSyth(t);
            }
        }];

        config.paths.anotherTest = [{
            // filtered,
            target: '.item-for-sale',
            action: function(target, augmentedParent) {
                var augmented = [],
                    fkey = this.$tools.filterKey(this.$config.key),
                    content = target,
                    fres; // check for ns

                for (var i = augmentedParent.length - 1; i >= 0; i--) {
                    fres = this.$tools.filterKey(augmentedParent[i].innerHTML);
                    if (fres.indexOf(fkey) >= 0) {
                        augmented.unshift(augmentedParent[i]);
                    }
                }

                return augmented;
            }
        }, {
            // filtered,
            // target: '.item-for-sale h1',
            // target: true,
            action: function(target, augmentedParent) {
                var t = augmentedParent[0];
                // console.log("do some to !", t);
                t.classList.add("found-it");
                // this.$tools.clickSyth(t);
            }
        }];
        // testing!
        // config.spec = true;

        service = mBss;

        // serviceSpy = jasmine.createSpyObj("service", [
        //     'handleAction',
        //     'removeAction',
        //     'build',
        //     'heart',
        //     'init'
        // ]);

    });

    beforeEach(function() {
        // timerHandleAction = jasmine.createSpy("service.handleAction");
        jasmine.clock().install();
    });

    afterEach(function() {
        mockService.removeAll();
        service.reset();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });




    it('should fill event queue when build is called', function() {
        var total = 0,
            results;

        expect(service.build).toBeDefined();

        for (var i = config.items.length - 1; i >= 0; i--) {
            total += config.paths[config.items[i].pathType].length;
        }

        results = service.build(config.items, config.paths, config.helpers);
        expect(results.length).toEqual(total);
        console.log("service.eventQueue",service.eventQueue);
        expect(service.getQueue().length).toEqual(total);
    });

    it('should give each action a item config', function() {
        var total = 0,
            results;

        expect(service.build).toBeDefined();

        for (var i = config.items.length - 1; i >= 0; i--) {
            total += config.paths[config.items[i].pathType].length;
        }

        results = service.build(config.items, config.paths, config.helpers);

        expect(results.length).toEqual(total);
        expect(service.getQueue().length).toEqual(total);

        // console.log("results",results);
        for (var j = results.length - 1; j >= 0; j--) {
            // console.log("results[j]",results[j]);
            // console.log("results[j].$config", results[j].$config);
        }

    });

    it('should return agumented from first action once built', function() {
        var total = 0,
            rate = service.heart().rate,
            results;

        for (var i = config.items.length - 1; i >= 0; i--) {
            total += config.paths[config.items[i].pathType].length;
        }

        spyOn(service,'handleAction');

        expect(service.init).toBeDefined();

        expect(service.handleAction).not.toHaveBeenCalled();

        results = service.init(config.items, config.paths, config.helpers);
        expect(service.getQueue().length).toEqual(total);

        jasmine.clock().tick(rate + rate*0.01);

        expect(service.handleAction).toHaveBeenCalled();

    });

    it('should contain all actions required for each item', function() {
        var total = 0,
            rate = service.heart().rate,
            results;
        expect(service.init).toBeDefined();
        for (var i = config.items.length - 1; i >= 0; i--) {
            total += config.paths[config.items[i].pathType].length;
        }
        results = service.init(config.items, config.paths, config.helpers);
        jasmine.clock().tick(rate + rate*0.01);
        // a susseful first action removes it from the length
        expect(results.length).toEqual(total-1); 
        expect(service.getQueue().length).toEqual(total-1);

    });


    it("expect heartbeat to be true after init", function() {
        var results;

        expect(service.heart().beat).toBeFalsy();

        results = service.init(config.items, config.paths, config.helpers);


        // expect(service.getQueue().length).toBeGreaterThan(0);
        expect(service.heart().beat).toBeTruthy();
        expect(service.heart().rate).toBeGreaterThan(0);
        expect(service.heart().count).toBeDefined();
    });


    it("expect heartbeat to be able to be killed (stopped) and maintain queue", function() {
        var results,
            queue;

        expect(service.heart().beat).toBeFalsy();

        results = service.init(config.items, config.paths, config.helpers);
        
        queue = service.getQueue().length;

        expect(service.heart().beat).toBeTruthy();

        service.kill();
        
        expect(service.heart().beat).toBeFalsy();
        expect(service.getQueue().length).toEqual(queue);
    });

    it("expect heartbeat reset to stop and clear queue", function() {
        var results;

        expect(service.heart().beat).toBeFalsy();

        results = service.init(config.items, config.paths, config.helpers);


        // expect(service.getQueue().length).toBeGreaterThan(0);
        expect(service.heart().beat).toBeTruthy();

        service.reset();
        
        expect(service.heart().beat).toBeFalsy();
        expect(service.getQueue().length).toEqual(0);
    });

    it("expect heartbeat to drive actions and heart beat", function() {
        var results,
            total = 0,
            rate = service.heart().rate;

        for (var i = config.items.length - 1; i >= 0; i--) {
            total += config.paths[config.items[i].pathType].length;
        }

        results = service.init(config.items, config.paths, config.helpers);

        for (var j = 0; j <= total; j++) {
            jasmine.clock().tick(rate + rate*0.01);

            expect(service.heart().count).not.toBeLessThan( j );
        }

    });



    // it("expect heartbeat to progess the event queue", function() {
    //     var results,
    //         total = 0,
    //         rate = service.heart().rate;

    //     spyOn(service,'removeAction');

    //     for (var i = config.items.length - 1; i >= 0; i--) {
    //         total += config.paths[config.items[i].pathType].length;
    //     }

    //     expect(service.removeAction).not.toHaveBeenCalled();
    //     results = service.init(config.items, config.paths, config.helpers);
    //     console.log("service.getQueue().length",service.getQueue().length);
    //         jasmine.clock().tick(rate + rate*0.01);

    //         expect(service.removeAction).toHaveBeenCalled();

    //         console.log("service.getQueue().length",service.getQueue().length);
    //     // }

    // });

    it("should call remove action on valid returned augmented", function() {
        var results,
            rate = service.heart().rate;

        spyOn(service,'removeAction');

        expect(service.getQueue().length).toBe(0);
        expect(service.removeAction).not.toHaveBeenCalled();
        
        results = service.init(config.items, config.paths, config.helpers);

        jasmine.clock().tick(rate + rate*0.01);


        expect(service.getAugmented().length).toBeGreaterThan(0);
        expect(service.removeAction).toHaveBeenCalled();

    });

    it("should call remove action on returned augmented is zero", function() {
        var results,
            rate = service.heart().rate;

        spyOn(service,'removeAction');

        // assigning bad target to first action
        config.paths.testItems[0] = {
            // filtered,
            target: '.item-for-sale',
            action: function(target) {
                return 0;
            }
        };
        config.paths.testItems[2] = {
            // filtered,
            // target: '.item-for-sale',
            action: function(target) {
                return [];
            }
        };
        expect(service.getQueue().length).toBe(0);
        
        expect(service.removeAction).not.toHaveBeenCalled();

        console.log("service.getAugmented().length",service.getAugmented().length);
        console.log("service.heart().count",service.heart().count);
        // 


        results = service.init(config.items, config.paths, config.helpers);
        jasmine.clock().tick(rate + rate*0.01);

        console.log("service.augmented",service.augmented);
        expect(service.getAugmented().length).toBe(0);

        console.log("service.getQueue().length !!!!!!!",service.getQueue().length);
        expect(service.removeAction).toHaveBeenCalled();


        jasmine.clock().tick(rate + rate*0.01);
        console.log("service.getQueue().length !!!!!!!",service.getQueue().length);

    });

 it("should call remove action on bad action", function() {
        var results,
            count,
            rate = service.heart().rate;

        spyOn(service,'removeAction').and.callThrough();
        // spyOn(service,'removeAction').and.callFake(function() {
        //   ++count;
        //   // return service.removeAction();
        // });

        // assigning bad target to first action
        config.paths.testItems[0].action = 'not a function';
        config.paths.testItems[2].action = undefined;
        // console.log("service.getAugmented().length",service.getAugmented().length);
        expect(service.getQueue().length).toBe(0);
        
        expect(service.removeAction).not.toHaveBeenCalled();

        results = service.init(config.items, config.paths, config.helpers);
        count = service.getQueue().length;

        jasmine.clock().tick(rate + rate*0.01);

        expect(service.removeAction).toHaveBeenCalled();

        jasmine.clock().tick(rate + rate*0.01);

        expect(service.getQueue().length).toBe(count - 2);

    });

    it("should return last agumented if returned augmented is zero", function() {
        var results,
            aug,
            // queue,
            rate = service.heart().rate;

        spyOn(service,'removeAction');

        // assigning bad target to second action
        config.paths.testItems[1].action = {
            // filtered,
            // target: '.item-for-sale',
            action: function(target) {
                var augmented = [],
                    fkey = this.$tools.filterKey('will never be found'),
                    content = target,
                    fres; // check for ns

                // console.log("removing 'Sold Out' items", target);
                for (var i = content.length - 1; i >= 0; i--) {
                    fres = this.$tools.filterKey(content[i].innerHTML);
                    if (fres.indexOf(fkey) === -1) {
                        // console.log( 'remaing item - ', fres );
                        augmented.unshift(target[i]);
                    }
                }

                return augmented; // if length 0 return false
            }
        };

        config.paths.testItems[2].action = {
            // filtered,
            // target: '.item-for-sale',
            action: function(target) {
                var augmented = [],
                    fkey = this.$tools.filterKey('will never be found'),
                    content = target,
                    fres; // check for ns

                // console.log("removing 'Sold Out' items", target);
                for (var i = content.length - 1; i >= 0; i--) {
                    fres = this.$tools.filterKey(content[i].innerHTML);
                    if (fres.indexOf(fkey) === -1) {
                        // console.log( 'remaing item - ', fres );
                        augmented.unshift(target[i]);
                    }
                }

                return augmented; // if length 0 return false
            }
        };
        // expect(service.getQueue().length).toBe(0);
        
        // expect(service.handleAction).not.toHaveBeenCalled();

        results = service.init(config.items, config.paths, config.helpers);

        jasmine.clock().tick(rate + rate*0.01);
        aug = service.getAugmented().length;

        // expect(service.handleAction).toHaveBeenCalled();

        jasmine.clock().tick(rate + rate*0.01);
        expect(service.getAugmented().length).toBe(aug);


        jasmine.clock().tick(rate + rate*0.01);
        expect(service.getAugmented().length).toBe(aug);
    });

    // it("should remove action from event queue on remove action", function() {
    //     var results,
    //         queue;

    //     expect(service.getQueue().length).toBe(0);

    //     results = service.init(config.items, config.paths, config.helpers);

    //     expect(service.getAugmented().length).toBeGreaterThan(0);

    //     queue = service.getQueue().length;

    //     service.removeAction();

    //     expect( service.getQueue().length ).toBe(queue-1);

    // });
    // it('should call remove if target is found but action does not return augmented', function() {
    //       var results,
    //         total = 0,
    //         queue;
    //               for (var i = config.items.length - 1; i >= 0; i--) {
    //         total += config.paths[config.items[i].pathType].length;
    //     }

    //     config.paths.testItems[0].action = {
    //         // filtered,
    //         target: '.item-for-sale',
    //         action: function(target) {
    //             var augmented = [],
    //                 fkey = this.$tools.filterKey('will never be found'),
    //                 content = target,
    //                 fres; // check for ns

    //             // console.log("removing 'Sold Out' items", target);
    //             for (var i = content.length - 1; i >= 0; i--) {
    //                 fres = this.$tools.filterKey(content[i].innerHTML);
    //                 if (fres.indexOf(fkey) === -1) {
    //                     // console.log( 'remaing item - ', fres );
    //                     augmented.unshift(target[i]);
    //                 }
    //             }

    //             return augmented; // if length 0 return false
    //         }
    //     };

    //     // var results,
    //     //     rate = service.heart().rate;

    //     spyOn(service,'removeAction');

    //     // expect(service.getQueue().length).toBe(0);
        
    //     // results = service.init(config.items, config.paths, config.helpers);

    //     // expect(service.getAugmented().length).toBeGreaterThan(0);
    //     // expect(service.removeAction).not.toHaveBeenCalled();


    // });

    // it('should fail action if function is bad', function() {
    //     var results;

    //     config.paths.testItems[0].action = {
    //         // filtered,
    //         target: '.item-for-sale',
    //         action: function(target) {
    //             var augmented = [],
    //                 fkey = this.$tools.filterKey('Sold Out'),
    //                 content = target,
    //                 fres; // check for ns

    //             // console.log("removing 'Sold Out' items", target);
    //             for (var i = content.length - 1; i >= 0; i--) {
    //                 fres = this.$tools.filterKey(content[i].innerHTML);
    //                 if (fres.indexOf(fkey) === -1) {
    //                     // console.log( 'remaing item - ', fres );
    //                     augmented.unshift(target[i]);
    //                 }
    //             }

    //             return augmented; // if length 0 return false
    //         }
    //     };

    //     results = service.init(config.items, config.paths, config.helpers);
    //     // console.log("service", service);
    //     expect(service.removeAction).toBeDefined();

    // });


    // it('should remove action if has failed the max amount of times', function() {
    //     // console.log("service", service);
    //     expect(service.removeAction).toBeDefined();

    // });

    // it('should run() after last action in path (queueNext)', function() {
    //     // console.log("service", service);
    //     expect(service.removeAction).toBeDefined();

    // });


    // it('should have handleAction', function() {
    //     // console.log("service", service);
    //     expect(service.removeAction).toBeDefined();

    // });


});
