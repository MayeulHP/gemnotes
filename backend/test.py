import os
import pytest
import requests
import json

API_URL = "http://127.0.0.1:5000"
NOTES_DIR = "../notes"

@pytest.fixture
def notes_dir():
    return NOTES_DIR

def test_list_notes(notes_dir):
    response = requests.get(f"{API_URL}/notes")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == len([f for f in os.listdir(notes_dir) if os.path.isfile(os.path.join(notes_dir, f))])


def test_get_note(notes_dir):
    note_files = [f for f in os.listdir(notes_dir) if os.path.isfile(os.path.join(notes_dir, f))]
    if note_files:
        note_filename = note_files[0]
    response = requests.get(f"{API_URL}/notes/{note_filename}")
    assert response.status_code == 200
    data = response.json()
    assert data["filename"] == note_filename
    with open(os.path.join(notes_dir, note_filename), 'r') as f:
        assert data["content"] == f.read()

def test_get_note_not_found():
    response = requests.get(f"{API_URL}/notes/nonexistent.txt")
    assert response.status_code == 404
    data = response.json()
    assert data["error"] == "File not found"


def test_edit_note(notes_dir):
    note_files = [f for f in os.listdir(notes_dir) if os.path.isfile(os.path.join(notes_dir, f))]
    if note_files:
        note_filename = note_files[0]
    new_content = "This note has been updated."
    response = requests.put(f"{API_URL}/notes/{note_filename}", json={"content": new_content})
    assert response.status_code == 200

    response = requests.get(f"{API_URL}/notes/{note_filename}")
    assert response.status_code == 200
    data = response.json()
    assert data["content"] == new_content


def test_edit_note_not_found():
    response = requests.put(f"{API_URL}/notes/nonexistent.txt", json={"content": "test"})
    assert response.status_code == 404
    data = response.json()
    assert data["error"] == "File not found"


def test_edit_note_bad_request():
    note_files = [f for f in os.listdir(notes_dir) if os.path.isfile(os.path.join(notes_dir, f))]
    if note_files:
        note_filename = note_files[0]
    response = requests.put(f"{API_URL}/notes/{note_filename}", data="not json")
    assert response.status_code == 400

### Run the tests
pytest.main(["-v", "test.py"])