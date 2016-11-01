function Notepad() {
	this.notes = [];
	this.counter = 0;
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
	var newTitle = addDOMNode("div", newNoteContainer, {"class": "newtitle", id: "newtitle", contenteditable: "true", placeholder: "Title"});
	var newNote = addDOMNode("div", newNoteContainer, {"class": "newnote", id: "newnote", contenteditable: "true", placeholder: "Take a note..."});
	newNote.focus();
	var newNoteButton = addDOMNode("input", newNoteContainer, {type: "button", "class": "btn-newnote", id: "newnoteButton", value: "Done"});
	var notes = addDOMNode("div", notepad, {id: "notes"});
	
	this.notes.forEach(this.renderNote);
	
};


Notepad.prototype.addListeners = function() {
	
	var that = this;
	
	//Notes
	var notes = domFind('.content');
	for (let i = 0; i < notes.length; i++) {
		notes[i].onclick = function() {
			that.startNoteChanging(notes[i]);
		}
	}
	
	//Note titles
	var titles = domFind('.title');
	for (let i = 0; i < titles.length; i++) {
		titles[i].onclick = function() {
			that.startTitleChanging(titles[i]);
			console.log(that);
		}
	}
	
	//Add note
	domFind("#newnoteButton")[0].onclick = function() {
		var date = Date.now();
		var title = domFind("#newtitle")[0].innerHTML;
		if (title == "") title = "Untitled";
		var content = domFind("#newnote")[0].innerHTML;
		if (content == "") return;
		var tags = that.findTags(content);
		var id = that.counter;
		that.counter++;
		that.addNote(title, date, content, tags, id);
		that.clearInputFields();
	};
	
};


Notepad.prototype.findTags = function(str) {
	
	function iterateRE(str, re, onmatch) {
		var result
		while((result = re.exec(str)) !== null) {
			if (onmatch) {
				onmatch(result[0], result);
			}
		}
	}
	
	var tagRE = /\#[\w\dа-я]+/ig;
	var arr = [];
	iterateRE(str, tagRE, (str) => { arr.push(str) });
	
	return arr;
	
};


Notepad.prototype.findNoteIndexByElement = function(element) {
	
	var id = element.getElementsByClassName("id")[0].innerHTML;
	for (let i = 0; i < this.notes.length; i++) {
		if (this.notes[i].id == id) return i;
	}
	return false;
	
};


Notepad.prototype.startNoteChanging = function(element) {
	
	var noteIndex = this.findNoteIndexByElement(element.parentElement.parentElement);
	
	element.setAttribute("contenteditable", "true");
	element.focus();
	
	var that = this;
	element.onblur = function() {
		that.notes[noteIndex].content = this.innerHTML;
		element.setAttribute("contenteditable", "false");
	}
	
};


Notepad.prototype.clearInputFields = function() {
	
	domFind('#newtitle')[0].innerHTML = "";
	domFind('#newnote')[0].innerHTML = "";
	
};


Notepad.prototype.deleteNote = function(element) {
	
	var noteElement = element.parentElement.parentElement;
	
	var noteIndex = this.findNoteIndexByElement(noteElement);
	this.notes.splice(noteIndex, 1);
	
	noteElement.parentNode.removeChild(noteElement);
	
};


Notepad.prototype.startTitleChanging = function(element) {
	
	var noteIndex = this.findNoteIndexByElement(element.parentElement.parentElement);
	
	element.setAttribute("contenteditable", "true");
	element.focus();
	
	var that = this;
	element.onblur = function() {
		that.notes[noteIndex].title = this.innerHTML;
		element.setAttribute("contenteditable", "false");
	}
	
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
	
	var that = this; //for event listeners
	
	var newNote = addDOMNode("div", domFind("#notes")[0], {"class": "note"});
	
		var titleContainer = addDOMNode("div", newNote, {"class": "title-container"});
			var id = addDOMNode("div", titleContainer, {"class": "id"});
			id.innerHTML = note.id;
			var title = addDOMNode("div", titleContainer, {"class": "title"});
			title.innerHTML = note.title;
			title.onclick = function() {
				that.startTitleChanging(title);
			}
			var close = addDOMNode("div", titleContainer, {"class": "close"});
			close.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
			close.onclick = function() {
				that.deleteNote(close);
			}
			
		var dateContainer = addDOMNode("div", titleContainer, {"class": "date-container"});
			var date = addDOMNode("div", dateContainer, {"class": "date"});
			date.innerHTML = note.date;
			
		var contentContainer = addDOMNode("div", newNote, {"class": "content-container"});
			var content = addDOMNode("div", contentContainer, {"class": "content"});
			content.innerHTML = note.content;
			content.onclick = function() {
				that.startNoteChanging(content);
			}
			
		var tagsContainer = addDOMNode("div", newNote, {"class": "tags-container"});
			var tags = addDOMNode("div", tagsContainer, {"class": "tags"});
			for (let i = 0; i < note.tags.length; i++) {
				var tag = addDOMNode("div", tags, {"class": "tag"});
				tag.innerHTML = note.tags[i];
			}
	
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








