
import DivEditor from 'DivEditor';

const tagRE = /\#[\w\dа-я]+/ig;

export default class SearchBar {
  
  constructor (domDiv, domSearchB, domClearB, onTagUpdate) {
    
    this.editable = domDiv;
    this.clearB = domClearB;
    this.tags = {};
    this.onTagUpdate = onTagUpdate;
    
    const that = this;
    
    this.editor = new DivEditor({
      domNode: domDiv,
      transformText: (text) => {
        that.tags = {};
        const tagsHTML = text.replace(tagRE, function (tag) {
          that.tags[tag] = true;
          return '<span class="utag">'+tag+'</span>'
        });
        that.onTagUpdate && that.onTagUpdate(that.tags);
        return tagsHTML;
      }
    });
    
    // Clear all filters
    domClearB.onclick = () => {
      this.tags = {};
      this.editable.innerHTML = '';
      this.onTagUpdate && this.onTagUpdate(this.tags);
    }
    
    // Clicking on tag triggers removal of tag and onTagUpdate()
    this.editable.onclick = function (event) {
      if (event.target && event.target.className === 'utag') {
        that.editable.removeChild(event.target);
        that.editor.triggerTransform();
        that.onTagUpdate && that.onTagUpdate(this.tags);
      }
    }
    
  }
  
  addTag (tag) {
    if (!this.tags[tag]) {
      this.tags[tag] = true;
      if (this.editable.innerHTML.length) { this.editable.innerHTML += '&nbsp' }
      this.editable.innerHTML += '<span class="utag">'+tag+'</span>'
      this.onTagUpdate && this.onTagUpdate(this.tags);
    }
  }
}
