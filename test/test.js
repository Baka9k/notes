const path = require('path');

// Require chai.js expect module for assertions
const expect = require('chai').expect;

// Run selenium-webdriver process with chromedriver
require('chromedriver');

// Application location
const appUri = 'file://'+path.resolve('/'+__dirname+'/../index.html');

// Official selenium webdriver testing setup
const webdriver = require('selenium-webdriver');

// Shortcut to commonly used webdriver feature
const By = webdriver.By;

// Selenium talks to running browser instance via this object
var driver;

describe('Todolist web application functional test', function () {
	
    before(function(done){
        // Chrome can be slow to start
		this.timeout(60000);
        // Run Chrome instance
        driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.chrome())
		.build()
        console.log('  [Selenium Webdriver]: Chrome Started');
		
		driver.get(appUri).then(done);
    });

    after(function(done){
        // Done; Close Chrome Instance to exit cleanly
		driver.quit().then(function () {
            console.log('  [Selenium Webdriver]: Chrome Closed');
		    done();
		});
    });
	
	it('Should be on correct page', function (done) {
        driver.getTitle().then(function(title) {
            expect(title).to.equal('Notes');
            done();
        });
    });
	
});
