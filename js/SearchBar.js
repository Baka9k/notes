
import DivEditor from 'DivEditor';

const tagRE = /\#[\w\dа-я]+/ig;

export default class SearchBar {
  
  constructor (domDiv, domSearchB, domClearB, onTagUpdate) {
    
    this.editable = domDiv;
    this.clearB = domClearB;
    this.tags = [];
    const that = this;
    
    this.editor = new DivEditor({
      domNode: domDiv,
      transformText: (text) => {
        that.tags = [];
        const tagsHTML = text.replace(tagRE, function (tag) {
          that.tags.push(tag);
          return '<span class="utag">'+tag+'</span>'
        });
        return tagsHTML;
      }
    });
  }
  
  addTag (tag) {
    this.tags.push(tag);
    if (this.editable.innerHTML.length) { this.editable.innerHTML += '&nbsp' }
    this.editable.innerHTML += '<span class="utag">'+tag+'</span>'
  }
}
