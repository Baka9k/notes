
import { hasProps } from 'Utilities';


export default class Notes {
    
    constructor (fromJSON, storageObj) {
        this.storage = storageObj;
        this.items = [];
        this.id = 0;
    }

    add(text, tags=[]) {
        var nextId = this.id++;
        var item = {text: text, tags: tags, id: nextId};
        this.items.unshift(item);
        return item;
    }

    update(id, text, tags) {
        var item = this.findById(id);
        item.text = text;
        item.tags = tags;
    }

    remove(id) {
        this.items = this.items.filter(function (item) { return item.id !== id });
    }

    findById(id) {
        for ( var i=0; i<this.items.length; i++ ) {
            if (this.items[i].id === id) return this.items[i];
        }
    }

    findByTags(tags) {
        return this.items.filter( (item) => hasProps(item.tags, tags) );
    }

    filter(tags) {
        this.filtered = this.findByTags(tags);
    }

    clearFilter() {
        this.filtered = false;
    }

    get() {
        if (this.filtered) return this.filtered
        else return this.items;
    }
    
}

