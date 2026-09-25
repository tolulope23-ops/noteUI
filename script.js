const noteList = document.getElementById("noteList");
const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const saveBtn = document.getElementById("saveBtn");
const noteDate = document.getElementById("noteDate");
let currentNoteId = null;

// Base API URL
const API_URL = "http://localhost:3000/api/v1/notes";

// Fetch notes from API
async function fetchNotes() {
  try {
    const response = await fetch(API_URL);
    const notes = await response.json();
    const datanotes = notes.data;
    console.log(datanotes);
    renderNotes(datanotes);
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
}

// Render the list of notes in the sidebar
function renderNotes(notes) {
  noteList.innerHTML = '';
  notes.forEach(note => {
    const noteItem = document.createElement("li");
    noteItem.setAttribute("data-id", note._id);

    const noteTitle = document.createElement("h3");
    noteTitle.textContent = note.title;

    const noteContent = document.createElement("p");
    noteContent.textContent = note.content.substring(0, 30) + "...";

    const noteDate = document.createElement("small");
    noteDate.textContent = `Created: ${new Date(note.createdAt).toLocaleString()}`;

    const deleteBtn = document.createElement("i");
    deleteBtn.classList.add("fa-sharp", "fa-solid","fa-trash", "delete-btn");
    deleteBtn.onclick = async () => await deleteNote(note._id);
    

    noteItem.appendChild(noteTitle);
    noteItem.appendChild(noteContent);
    noteItem.appendChild(noteDate);
    noteItem.appendChild(deleteBtn);


    noteItem.onclick = () => showNote(note._id);
    noteList.appendChild(noteItem);
  });
}

// Show the selected note in the input fields for editing
async function showNote(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const note = await response.json();
    const datanotes = note.data;
    if (datanotes) {
      currentNoteId = id;
      noteTitle.value = datanotes.title;
      noteContent.value = datanotes.content;
      noteDate.textContent = `Last updated: ${new Date(
        datanotes.updatedAt
      ).toLocaleString()}`;
      saveBtn.style.display = "none"; // Initially hide save button

      // noteTitle.oninput = ()=> {
      //   if( noteContent.value !== note.content ||
      //     noteTitle.value !== note.title))
      // }

      // Show save button only when changes are made
      noteContent.oninput = () => {
        if (
          noteContent.value !== datanotes.content ||
          noteTitle.value !== datanotes.title
        ) {
          saveBtn.style.display = "block";
        }
      };
    }
  } catch (error) {
    console.error("Error fetching note:", error);
  }
}

// Save a new or updated note
async function saveNote() {
  const newNote = {
    title: noteTitle.value,
    content: noteContent.value,
  };

  if (currentNoteId) {
    // Update existing note.
    try {
      await fetch(`${API_URL}/${currentNoteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });
    } catch (error) {
      console.error("Error updating note:", error);
    }
  } else {
    // Create new note
    try {
      await fetch(`${API_URL}`/add, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });
    } catch (error) {
      console.error("Error creating note:", error);
    }
  }

  // Clear form and fetch notes again
  clearNoteForm();
  await fetchNotes();
}

// Delete a note
async function deleteNote(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    await fetchNotes();
  } catch (error) {
    console.error("Error deleting note:", error);
  }
}

// Clears the note form after saving or selecting a note
function clearNoteForm() {
  noteTitle.value = "";
  noteContent.value = "";
  noteDate.textContent = "";
  currentNoteId = null;

  saveBtn.style.display = "none";
}

// let button save appears when typing in the title
noteTitle.oninput = () =>{
  if(noteTitle.value.trim() || noteContent.value.trim()){
    saveBtn.style.display = "block";
  }
};

// let button appears when typing in a new note
noteContent.oninput = () => {
  if (noteContent.value.trim() || noteTitle.value.trim()) {
    saveBtn.style.display = "block";
  }
};

// Event listeners
saveBtn.onclick = saveNote;

// Load notes when the app is first launched
fetchNotes();