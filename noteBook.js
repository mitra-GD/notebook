const noteList = document.querySelector("#note-list");


eventListeners()

function eventListeners() {
    document.getElementById('form').addEventListener('submit', newNote)
    document.querySelector('#note-list').addEventListener('click', removeNote)
    document.addEventListener('DOMContentLoaded', localStorageOnload)
}



function newNote(e) {
    e.preventDefault();
    const note = document.querySelector('#note').value
    document.querySelector('#note').value = ' '


    const removeBtn = document.createElement('a');
    removeBtn.textContent = '✘';
    removeBtn.classList = "remove-note";


    const li = document.createElement("li");
    li.appendChild(document.createTextNode(note));
    li.appendChild(removeBtn);
    noteList.appendChild(li);


    addNoteToLocalStorage(note)

    alert('یادداشت با موفقیت ذخیره شد!')
}




function removeNote(e) {

    if (e.target.classList.contains('remove-note')) {
        e.target.parentElement.remove()
    }


    removeNoteLocalStorage(e.target.parentElement.textContent)
}



function addNoteToLocalStorage(note) {
    const notes = getNotesFromLocalStorage()
    notes.push(note)

    localStorage.setItem('notes', JSON.stringify(notes))

}

function getNotesFromLocalStorage() {
    let notes;
    let getFromLS = localStorage.getItem('notes');
    if (getFromLS === null) {
        notes = []
    } else {
        notes = JSON.parse(getFromLS)
    }
    return notes
}

function localStorageOnload() {
    const notes = getNotesFromLocalStorage();


    notes.forEach(function (note) {

        const removeBtn = document.createElement('a')
        removeBtn.textContent = '✘'
        removeBtn.classList = 'remove-note'

        const li = document.createElement("li");
        li.appendChild(document.createTextNode(note));
        li.appendChild(removeBtn);
        noteList.appendChild(li);

    });
}

function removeNoteLocalStorage(noteContent) {
    const noteDelete = noteContent.substring(0, noteContent.length - 1)

    const notesFromLS = getNotesFromLocalStorage()

    notesFromLS.forEach(function (note, index) {
        if (note === noteDelete) {
            notesFromLS.splice(index, 1)
        }
    });

    localStorage.setItem('notes', JSON.stringify(notesFromLS))

}