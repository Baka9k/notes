
import { hasProps } from 'Utilities';

export default class Notes {
  constructor (storageObj, storageKey='__todolist_data') {
    this.storage = storageObj;
    this.storageKey = storageKey;
    this.items = [];
    this.id = 0;
    
    if (this.storage) {
      var _json = this.storage.getItem(this.storageKey);
      var data;
      try {
        data = JSON.parse(_json);
      } catch (e) {
        console.log('Data loading error:',e);
      }
      if (data && data.hasOwnProperty('id') && data.items) {
        Object.assign(this, data);
        console.log('Loaded',data.items.length,'notes from storage');
      } else {
        console.log('No data in storage');
      }
    }
  }
  
  save() {
    if (this.storage) {
      var data = {id: this.id, items: this.items};
      this.storage.setItem(this.storageKey, JSON.stringify(data));
      console.log('Saved',data.items.length,'notes to storage');
    }
  }
  
  add(text, tags={}) {
      var nextId = (this.id++).toString();
      var item = {text: text, tags: tags, id: nextId};
      this.items.unshift(item);
      console.log('Notes:', this.items);
      this.save();
      return item;
  }
  
  update(id, text, tags) {
    var item = this.findById(id);
    console.log('Update item id:',id,'with text:',text,'tags:',tags,'item found:',item);
    if (item) {
      item.text = text;
      item.tags = tags;
      this.save();
    }
  }

  remove(id) {
    var filterFn = function (item) { return item.id !== id };
    this.items = this.items.filter(filterFn);
    this.save();
  }

  findById(id) {
      for ( var i=0; i<this.items.length; i++ ) {
          if (this.items[i].id === id) return this.items[i];
      }
  }

  findByTags(tags) {
      return this.items.filter( (item) => hasProps(tags, item.tags) );
  }

  filter(tags) {
      this.filtered = this.findByTags(tags);
      console.log('Filtering by',tags,'result:', this.filtered);
  }

  clearFilter() {
      this.filtered = false;
  }

  get() {
      if (this.filtered) return this.filtered
      else return this.items;
  }
}
