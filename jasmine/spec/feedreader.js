/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    // Test case of "RSS Feeds"
    describe('RSS Feeds', function () {
        // all feeds are not empty
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // its urls are not empty
        it('has a URL defined and that the URL is not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        // its names are not empty
        it('has name defined and they are not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* The test case of "The menu" */
    // test case of show/hide menu
    describe('The menu', function () {
        // the default state is hidden
        it('the menu element is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // check state of menu when click on the menu icon
        it('the menu changes visibility when the menu icon is clicked', function () {
            $('a.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('a.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    // Test case of Initial Entries
    describe('Initial Entries', function () {
        // at the beginning, we load data 
        beforeAll(function (done) {
            loadFeed(1, done);
        });

        // check the css attribute is correct
        it('when the loadFeed function is called and completes its work, there is at least a single', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* Test case of "New Feed Selection" */
    describe('New Feed Selection', function () {
        
        //value from the first time load data
        var firstFeed;
        //value from the second time load data
        var secondFeed;
        beforeAll(function () {
            loadFeed(1, function (done) {
                firstFeed = $('.feed').html();
                loadFeed(2, done);
            });
        });

        //make sure the first data is not equal the second
        it('a new feed is loaded y the loadFeed function that the content actually changes', function () {
            secondFeed = $('.feed').html();
            expect(secondFeed).not.toBe(firstFeed);
        });
    });
}());
