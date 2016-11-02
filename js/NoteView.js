
import { $ } from 'Utilities';

import DivEditor from 'DivEditor';


function noteTemplate(text, tags) {
    return `<div class="list-icon action-remove"><i class="material-icons">&#xE92B;</i></div>
            <div class="list-icon action-edit"><i class="material-icons">&#xE254;</i></div>
            <div class="list-text">${ text }</div>
            <div class="list-tags">${ tags }</div>`;
}

const tagRE = /\#[\w\dа-я]+/ig;

function renderTags(tags) {
    return tags.map((t) => '<span class="utag">'+t+'</span>').join(' ');
}

function iterateRE(str, re, onmatch) {
	var result;
	while((result = re.exec(str)) !== null) {
		if (onmatch) {
			onmatch(result[0], result);
		}
	}
}

export default class NoteView {
    constructor (text, tags, id, onUpdateComplete, onDelete, onTagClick) {
        this.text = text;
        this.tags = tags;
        this.id = id;
        this.onUpdateComplete = onUpdateComplete;
        this.onDelete = onDelete;
        this.onTagClick = onTagClick;
    }

    renderToList(domList, insertAfterDOM) {
        
        var domNode = document.createElement('div');
        this.domNode = domNode;
        this.domList = domList;

        domNode.className = 'list-elem';
        domNode.innerHTML = noteTemplate(
            this.text.replace(tagRE, (tag) => '<span class="utag">'+tag+'</span>'),
            renderTags(this.tags)
        );

        this.domText = $(domNode, '.list-text')[0];

        this.domTags = $(domNode, '.list-tags')[0];

        const that = this;

        $(domNode, '.action-remove')[0].onclick = () => {
            that.domNode && that.domList.removeChild(that.domNode);
        };

        $(domNode, '.action-edit')[0].onclick = () => {
            that.editor = new DivEditor({
                domNode: that.domText,
                transformText: (text) => {
                    that.tags = [];
                    const tagsHTML = text.replace(tagRE, function (tag) {
                        that.tags.push(tag);
                        return '<span class="utag">'+tag+'</span>'
                    });
                    if (that.tags.length) { that.domTags.innerHTML = renderTags(that.tags) }
                    return tagsHTML;
                },
                detachOnBlur: (domNode, text) => {
                    const tags = [];
                    iterateRE(text, tagRE, (tag) => { tags.push(tag) });
                    that.onUpdateComplete && that.onUpdateComplete(that.id, text, tags);
                }
            });
        };

        $(domNode, '.list-tags')[0].onclick = (event) => {
            if (event.target && event.target.className === 'utag') {
                that.onTagClick && that.onTagClick(that.id, event.target.innerHTML);
            }
        }

        // Insert our element into DOM
        if (insertAfterDOM) {
            domList.insertBefore(domNode, insertAfterDOM.nextSibling);
        } else {
            domList.appendChild(domNode);
        }
        
    }

    setVisibility(bool) {
        this.domNode && (this.domNode.style.display = bool ? 'block' : 'none');
    }
    
}

