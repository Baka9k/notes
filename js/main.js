
import 'todolist.scss';

import { $ } from 'Utilities';

document.body.className = '';

var notes = new Notes(window.localStorage);

var noteViews = {};

window.notes = notes;

function updateVisibility(shownNoteItems) {
  var shownIds = new Set(shownNoteItems.map( item => item.id ));
  pr('shownIds', shownIds);
  Object.keys(noteViews).forEach( (id) => {
    pr(id, shownIds.has(id));
    noteViews[id].setVisibility(shownIds.has(id));
  });
}

function createNoteView(item) {
  return new NoteView(
    item.text, item.tags, item.id,
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
    if (Object.keys(tags).length === 0) {
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
    pr('New note created:', noteText, noteTags);
    
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

