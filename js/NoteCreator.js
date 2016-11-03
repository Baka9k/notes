
import DivEditor from 'DivEditor';

const tagRE = /\#[\w\dа-я]+/ig;

function renderTags(tags) {
  return Object.keys(tags).map((t) => '<span class="utag">'+t+'</span>').join(' ');
}

export default class NoteCreator {
  constructor (domCreateB, domText, domTags, onNewNote) {
    
    this.tags = {};
    this.domTags = domTags;
    this.onNewNote = onNewNote;
    const that = this;
    
    this.editor = new DivEditor({
      domNode: domText,
      transformText: (text) => {
        that.tags = {};
        const tagsHTML = text.replace(tagRE, function (tag) {
          that.tags[tag] = true;
          return '<span class="utag">'+tag+'</span>'
        });
        that.domTags.innerHTML = renderTags(that.tags);
        return tagsHTML;
      }
    });
    
    domCreateB.onclick = () => {
      const text = that.editor.getText().trim();
      if(text) {
        that.editor.clearText();
        that.domTags.innerHTML = '';
        that.onNewNote && that.onNewNote(text, that.tags);
      }
    };
  }
  
}
