function Notepad() {
	this.notes = [];
}


function Note(title, date, content, tags, id) {
	this.title = title;
	this.date= date;
	this.content = content;
	this.tags = tags;
	this.id = id;
}


Notepad.prototype.addInDOM = function(container, id) {

	//This method adds notepad (list of notes + "Create new note" field) to page
	//container must be element to which you want to insert notepad
	//id is id of new notepad element
	
	var notepad = addDOMNode("div", container, {"class": "notepad", id: id});
	var newNoteContainer = addDOMNode("div", notepad, {id: "newnotecontainer"});
	var newNote = addDOMNode("div", newNoteContainer, {"class": "newnote", id: "newnote"});
	var notes = addDOMNode("div", notepad, {id: "notes"});
	
	this.notes.forEach(this.renderNote);
	
};


Notepad.prototype.addListeners = function() {
	
	var that = this;
	
	var notes = domFind('.content');
	for (let i = 0; i < notes.length; i++) {
		notes[i].onclick = function() {
			that.startNoteChanging(notes[i]);
		}
	}
	
};


Notepad.prototype.findNoteIndexByElement = function(element) {
	
	var id = element.getElementsByClassName("id")[0].innerHTML;
	for (let i = 0; i < this.notes.length; i++) {
		if (this.notes[i].id == id) return i;
	}
	return false;
	
};


Notepad.prototype.startNoteChanging = function(element) {
	
	var noteIndex = this.findNoteIndexByElement(element.parentElement);
	
	element.setAttribute("contenteditable", "true");
	
};


Notepad.prototype.addNote = function(title, date, content, tags, id) {

	var note = new Note(title, date, content, tags, id);
	this.notes.push(note);
	this.renderNote(note);
	
};


Notepad.prototype.renderNote = function(note) {
	
	if (!domFind("#notes")[0]) {
		console.log("Notepad.prototype.renderNote error: No #notes element found! You can add notes just after you added notepad in DOM");
		return;
	}
	
	var newNote = addDOMNode("div", domFind("#notes")[0], {"class": "note"});
	var id = addDOMNode("div", newNote, {"class": "id"});
	id.innerHTML = note.id;
	var title = addDOMNode("div", newNote, {"class": "title"});
	title.innerHTML = note.title;
	var date = addDOMNode("div", newNote, {"class": "date"});
	date.innerHTML = note.date;
	var content = addDOMNode("div", newNote, {"class": "content"});
	content.innerHTML = note.content;
	var tags = addDOMNode("div", newNote, {"class": "tags"});
	tags.innerHTML = note.tags;
	
};




function addDOMNode(type, parent, attributes) {

	//Creates new DOM node, sets its attributes and appends it to given parent
	//attributes (optional) must be an object, that looks like: {id: "myDiv", contenteditable: "true"}
	
	var newNode = document.createElement(type);
	
	if (attributes) {
		for (let prop in attributes) {
			if (attributes.hasOwnProperty(prop)) {
				newNode.setAttribute(prop, attributes[prop]);
			}
		}
	}
	
	parent.appendChild(newNode);
	
	return newNode;
	
};


function domFind() {
	
    if (arguments[0] && typeof arguments[0] !== 'string' &&
        typeof arguments[1] === 'string') {
        
        var args = Array.prototype.slice.call(arguments);
        var node = args.shift();
        return node.querySelectorAll.apply(node, args);
        
    } else {
    
        return document.querySelectorAll.apply(document, arguments);
        
    }
    
}



function init() {
	
	var newNotepad = new Notepad();
	
	newNotepad.addInDOM(document.getElementById("appContainer"), "newNotepad");
	
	newNotepad.addNote("TitleNya", "2856487126", "Nya-Nya", ["#neko"], 0);
	newNotepad.addNote("TitleNya", "2856487133776", "Nya-Nya-Nya", ["#neko"], 1);
	
	newNotepad.addListeners();
	
}


window.onload = function() {

	init();
	
};








