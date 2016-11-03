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
    
    it('Appends item without tags', function (done) {
		driver.findElement(By.css('div.list > div:nth-child(1) > .list-text'))
		.sendKeys('lorem ipsum');
		
		driver.findElement(By.css('div.list > div:nth-child(1) > .action-create'))
		.click();
		
		driver.findElements(By.css('.list-elem')).then( (elems) => {
			expect(elems.length).to.equal(2);
		});
		
		driver.findElement(By.css('div.list > div:nth-child(2) > .list-text')).getText().then( (text) => {
		    expect(text).to.equal('lorem ipsum');
			done();
		});
    });
    
    it('Deletes item without tags', function (done) {
		driver.findElement(By.css('div.list > div:nth-child(2) > .action-remove'))
		.click();
		
		driver.findElements(By.css('.list-elem')).then( (elems) => {
			expect(elems.length).to.equal(1);
			done();
		});
    });
    
    it('Appends item with tags', function (done) {
		driver.findElement(By.css('div.list > div:nth-child(1) > .list-text'))
		.sendKeys('lorem #test ipsum #javascript');
		
		driver.sleep(250);
		
		driver.findElement(By.css('div.list > div:nth-child(1) > .list-tags'))
		.getText()
		.then( (text) => {
		    expect(text).to.equal('#test #javascript');
		});
		
		driver.findElement(By.css('div.list > div:nth-child(1) > .action-create'))
		.click();
		
		driver.findElements(By.css('.list-elem')).then( (elems) => {
			expect(elems.length).to.equal(2);
		});
		
		driver.findElement(By.css('div.list > div:nth-child(2) > .list-text')).getText().then( (text) => {
		    expect(text).to.equal('lorem #test ipsum #javascript');
		});
		
		driver.findElement(By.css('div.list > div:nth-child(2) > .list-tags')).getText().then( (text) => {
		    expect(text).to.equal('#test #javascript');
			done();
		});
    });
    
    it('Deletes item with tags', function (done) {
		driver.findElement(By.css('div.list > div:nth-child(2) > .action-remove'))
		.click();
		
		driver.findElements(By.css('.list-elem')).then( (elems) => {
			expect(elems.length).to.equal(1);
			done();
		});
    });
    
    it('Appends several items with tags', function (done) {
		driver.findElement(By.css('div.list > div:nth-child(1) > .list-text'))
		.sendKeys('lorem #test ipsum #javascript');
		
		driver.sleep(250);
		
		driver.findElement(By.css('div.list > div:nth-child(1) > .list-tags'))
		.getText()
		.then( (text) => {
		    expect(text).to.equal('#test #javascript');
		});
		
		driver.findElement(By.css('div.list > div:nth-child(1) > .action-create'))
		.click();
		
		driver.sleep(100);
		
		driver.findElement(By.css('div.list > div:nth-child(1) > .list-text'))
		.sendKeys('delorem #java #test rel');
		
		driver.sleep(250);
		
		driver.findElement(By.css('div.list > div:nth-child(1) > .list-tags'))
		.getText()
		.then( (text) => {
		    expect(text).to.equal('#java #test');
		});
		
		driver.findElement(By.css('div.list > div:nth-child(1) > .action-create'))
		.click();
		
		driver.findElements(By.css('.list-elem')).then( (elems) => {
			expect(elems.length).to.equal(3);
			done();
		});
		
    });
    
    it('Filters items with tags', function (done) {
		driver.findElement(By.css('#filter-edit'))
		.sendKeys('#test');
		
		driver.sleep(250);
		
		driver.findElements(By.css('.list-elem')).then( (elems) => {
			expect(elems.length).to.equal(3);
		});
		
		driver.findElement(By.css('#filter-edit'))
		.sendKeys(' #java');
		
		driver.sleep(250);
		
		driver.findElement(By.css('div.list > div:nth-child(2)'))
		.getAttribute('style').then( (css) => {
			expect(css).to.equal('display: block;');
		});
		
		driver.findElement(By.css('div.list > div:nth-child(2) > .list-tags'))
		.getText()
		.then( (text) => {
		    expect(text).to.equal('#java #test');
		});
		
		driver.findElement(By.css('div.list > div:nth-child(3)'))
		.getAttribute('style').then( (css) => {
			expect(css).to.equal('display: none;');
		});
		
		driver.findElement(By.css('#clearb'))
		.click();
		
		driver.sleep(250);
		
		driver.findElement(By.css('div.list > div:nth-child(3)'))
		.getAttribute('style').then( (css) => {
			expect(css).to.equal('display: block;');
		});
		
		driver.findElement(By.css('div.list > div:nth-child(2)'))
		.getAttribute('style').then( (css) => {
			expect(css).to.equal('display: block;');
			done();
		});
    });
	
});
