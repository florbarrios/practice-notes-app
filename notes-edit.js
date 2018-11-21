const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find(note => note.id === noteId)
if (!note) {
    location.assign('/index.html')
}

const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const updatedAtElement = document.querySelector('#last-updated')

titleElement.value = note.title
bodyElement.value = note.body
updatedAtElement.textContent = generateLastEdited(note.updatedAt)

document.querySelector('#note-title').addEventListener('input', e => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    updatedAtElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

document.querySelector('#note-body').addEventListener('input', e => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    updatedAtElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

document.querySelector('#remove-note').addEventListener('click', e => {
    removeNote(noteId)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage', e => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        note = notes.find(note => note.id === noteId)
        if (!note) {
            location.assign('/index.html')
        }
        titleElement.value = note.title
        bodyElementx.value = note.body
        updatedAtElement.textContent = generateLastEdited(note.updatedAt)
    }
})