
import DivEditor from 'DivEditor';

const tagRE = /\#[\w\dа-я]+/ig;

export default class NoteCreator {
  constructor (domCreateB, domText, domTags, onNewNote) {
    
    this.tags = [];
    this.domTags = domTags;
    this.onNewNote = onNewNote;
    const that = this;
    
    this.editor = new DivEditor({
      domNode: domText,
      transformText: (text) => {
        that.tags = [];
        const tagsHTML = text.replace(tagRE, function (tag) {
          that.tags.push(tag);
          return '<span class="utag">'+tag+'</span>'
        });
        if (that.tags.length) {
            that.domTags.innerHTML = that.tags.map(
                (t) => '<span class="utag">'+t+'</span>')
            .join(' ');
        }
        return tagsHTML;
      }
    });
    
    domCreateB.onclick = () => {
      const text = that.editor.getText().trim();
      if(text) {
        that.editor.clearText();
        that.onNewNote && that.onNewNote(text, that.tags);
      }
    };
  }
  
}
