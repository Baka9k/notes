# Notes
This application allows you to keep your notes organized.  
* Create, delete, edit and view notes with ease.  
* Use tags to organize your data.  
* Filter items by entering the tags into search bar.  

## Demo
[https://baka9k.github.io/notes/](https://baka9k.github.io/notes/)

## Development
The application uses only HTML5 DOM API and ES6 JavaScript.    
Notes are stored in HTML5 localStorage (if available).  
Javascript code and styles are preprocessed and compiled with Webpack.  
There is a set of end-to-end tests, mocha/chai and selenium-webdriver are used for testing.  

## How to run the application on local machine
Pre-built version is included in the repo, you can just clone the repo
```
git clone https://github.com/Baka9k/notes
```
Then, open `notes/index.html` in your browser, preferably chrome  

## How to build
```
git clone https://github.com/Baka9k/notes
cd notes
npm install 
npm run build
```

## How to run end-to-end tests
In notes directory, type this command and observe how chrome window opens and runs full test suite
```
npm test
```
