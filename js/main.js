
import 'todolist.scss';

import { $ } from 'Utilities';

import Notes from 'Notes';

import SearchBar from 'SearchBar';

import NoteCreator from 'NoteCreator';

import NoteView from 'NoteView';

var notes = new Notes();

var noteViews = {};

function updateVisibility(shownNoteItems) {
    var shownIds = new Set(shownNoteItems.map( item => item.id ));
    Object.keys(noteViews).forEach( (id) => {
        noteViews[id].setVisibility(shownIds.has(id));
    });
}

function createNoteView(item) {
    return new NoteView(
        item.text,
        item.tags,
        item.id,
        function onUpdateComplete(id, text, tags) {
            notes.update(id, text, tags);
        },
        function onDelete(id) {
            notes.remove(id);
            delete noteViews[id];
        },
        function onTagClick(id, tag) {
            searchBar.addTag(tag);
        }
    );
}

var searchBar = new SearchBar(
    $('#filter-edit')[0],
    $('#searchb')[0],
    $('#clearb')[0],
    function onTagUpdate(tags) {
        if (tags.length === 0) {
            notes.clearFilter();
        } else {
            notes.filter(tags);
        }
        updateVisibility(notes.get());
    }
);

new NoteCreator(
    $('.list-elem:nth-child(1) > .action-create')[0],
    $('.list-elem:nth-child(1) > .list-text')[0],
    $('.list-elem:nth-child(1) > .list-tags')[0],
    function onNewNote(noteText, noteTags) {
        var item = notes.add(noteText, noteTags);
        var note = createNoteView(item);
        note.renderToList(noteListDOM, $('.list-elem:nth-child(1)')[0]);    
        noteViews[item.id] = note;
    }
);

var noteListDOM = $('#todolist-root > .list')[0];

notes.get().forEach( (item) => {
    var note = createNoteView(item);
    note.renderToList(noteListDOM);
    noteViews[item.id] = note;
});

