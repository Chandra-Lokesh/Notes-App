const container_el = document.querySelector(".container");
const button_el = document.querySelector(".add");

getNotes().forEach((note)=>{
    const note_el = createNote(note.id,note.content);
    container_el.insertBefore(note_el,button_el);
});

function createNote(id,content){
    const note_el = document.createElement("textarea");
    note_el.classList.add("note");
    note_el.placeholder = "Empty Note";
    note_el.value = content;
    note_el.addEventListener("dblclick",()=>{
        const warning = confirm("Do you want to Delete the note?");
        if(warning){
            deleteNote(id,note_el);
        }
    });
    note_el.addEventListener("input",()=>{
        updateNote(id,note_el.value);
    });
    return note_el;
}
function deleteNote(id,note_el){
    const notes = getNotes().filter((note)=>note.id!=id);
    container_el.removeChild(note_el);
    saveNote(notes);
}
function updateNote(id,content){
    const notes = getNotes();
    const target = notes.filter((note)=>note.id == id)[0];
    target.content = content;
    saveNote(notes);
}
function getNotes(){
    return JSON.parse(localStorage.getItem("note-app") || "[]");
}
function addNote(){
    const noteObj = {
        id: Math.floor(Math.random()*100000),
        content: ""
    };
    const note_el = createNote(noteObj.id,noteObj.content);
    container_el.insertBefore(note_el,button_el);
    const notes = getNotes();
    notes.push(noteObj);
    saveNote(notes);
}
function saveNote(notes){
    localStorage.setItem("note-app",JSON.stringify(notes));
}

button_el.addEventListener("click", addNote);