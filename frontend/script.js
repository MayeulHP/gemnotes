const noteList = document.getElementById('noteList');
const filenameInput = document.getElementById('filename');
const noteContent = document.getElementById('noteContent');
const newFilenameInput = document.getElementById('newFilename');
const createNoteModal = document.getElementById('createNoteModal');
const newFilenameModal = document.getElementById('newFilenameModal');
const newNoteContentModal = document.getElementById('newNoteContentModal');
const loadingSpinner = document.getElementById('loadingSpinner');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

function showCreateNoteModal() {
  createNoteModal.style.display = 'block';
}

function closeCreateNoteModal() {
  createNoteModal.style.display = 'none';
  newFilenameModal.value = '';
  newNoteContentModal.value = '';
}

async function listNotes() {
    loadingSpinner.style.display = 'block';
    try {
      const response = await fetch('http://localhost:5000/notes');
      const data = await response.json();
      noteList.innerHTML = '';
      renderNotes(data, noteList);
    } catch (error) {
      showNotification('Error fetching notes.');
      console.error('Error fetching notes:', error);
    } finally {
      loadingSpinner.style.display = 'none';
    }
  }
  
  function renderNotes(data, parentElement, currentPath = '') {
    for (const key in data) {
      if (key === 'files') {
        // Render files
        data[key].forEach(filename => {
          const li = document.createElement('li');
          li.textContent = filename;
          li.setAttribute('data-type', 'file');
          li.onclick = () => {
            filenameInput.value = `${currentPath}/${filename}`; // Set full path
            loadNote();
          };
          parentElement.appendChild(li);
        });
      } else {
        // Render folders
        const li = document.createElement('li');
        li.textContent = key;
        li.setAttribute('data-type', 'folder');
        const ul = document.createElement('ul');
        li.appendChild(ul);
        parentElement.appendChild(li);
        renderNotes(data[key], ul, `${currentPath}/${key}`); // Recursively render nested folders and files
      }
    }
  }

  async function loadNote() {
    let filepath = filenameInput.value; // This now contains the full path
    // Remove the leading slash
    filepath = filepath.replace(/^\//, '');
    // Remove the folder before the first slash to get the path relative to the root folder
    console.log(filepath);
    filepath = filepath.substring(filepath.indexOf('/') + 1);
    console.log(filepath);

    loadingSpinner.style.display = 'block';
    try {
      const response = await fetch(`http://localhost:5000/notes/${filepath}`);
      if (response.ok) {
        const data = await response.json();
        noteContent.value = data.content;
      } else {
        throw new Error(await response.text());
      }
    } catch (error) {
      showNotification('Error loading note.');
      console.error('Error loading note:', error);
    } finally {
      loadingSpinner.style.display = 'none';
    }
  }

async function saveNote() {
  const filename = filenameInput.value;
  const content = noteContent.value;
  loadingSpinner.style.display = 'block';
  try {
    const response = await fetch(`http://localhost:5000/notes/${filename}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
    if (response.ok) {
      showNotification('Note saved successfully!');
      listNotes();
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    showNotification('Error saving note.');
    console.error('Error saving note:', error);
  } finally {
    loadingSpinner.style.display = 'none';
  }
}

async function createNote() {
  const filename = newFilenameModal.value;
  const content = newNoteContentModal.value;
  if (!filename) {
    showNotification('Filename is required.');
    return;
  }
  loadingSpinner.style.display = 'block';
  try {
    const response = await fetch(`http://localhost:5000/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename,
        content
      })
    });
    if (response.ok) {
      showNotification('Note created successfully!');
      closeCreateNoteModal();
      listNotes();
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    showNotification('Error creating note.');
    console.error('Error creating note:', error);
  } finally {
    loadingSpinner.style.display = 'none';
  }
}

function showNotification(message) {
  toast.style.display = 'block';
  toastMessage.textContent = message;
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
}

function togglePreview() {
    const editor = document.getElementById('noteContent');
    const preview = document.getElementById('preview');
  
    if (preview.style.display === 'block') {
      // Switch back to editor
      preview.style.display = 'none';
      editor.style.display = 'block';
    } else {
      // Generate and display preview
      preview.innerHTML = marked.parse(editor.value);
      preview.style.display = 'block';
      editor.style.display = 'none';
    }
}



listNotes();