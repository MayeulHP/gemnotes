import os
from flask import Flask, request, jsonify, abort

app = Flask(__name__)

NOTES_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), 'notes'))  #Corrected path

def get_directory_structure(rootdir):
    """Recursively get the directory structure."""
    structure = {}
    rootdir = rootdir.rstrip(os.sep)
    start = rootdir.rfind(os.sep) + 1
    for path, dirs, files in os.walk(rootdir):
        folders = path[start:].split(os.sep)
        subdir = {folder: {} for folder in folders}
        parent = structure
        for folder in folders:
            parent = parent.setdefault(folder, {})
        parent.update({'files': files})
    return structure

@app.route('/notes', methods=['GET'])
def list_notes():
    structure = get_directory_structure(NOTES_DIR)
    return jsonify(structure)

@app.route('/notes/<path:filepath>', methods=['GET'])
def get_note(filepath):
    full_path = os.path.join(NOTES_DIR, filepath)
    if not os.path.isfile(full_path):
        abort(404, description="File not found")
    with open(full_path, 'r') as file:
        content = file.read()
    return jsonify({'content': content})

@app.route('/notes/<filename>', methods=['PUT'])
def edit_note(filename):
    filepath = os.path.join(NOTES_DIR, filename)
    try:
        content = request.json.get('content')
        with open(filepath, 'w') as f:
            f.write(content)
        return jsonify({'message': 'File updated successfully'})
    except FileNotFoundError:
        return jsonify({'error': 'File not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/notes', methods=['POST'])
def create_note():
    filename = request.json.get('filename')
    content = request.json.get('content')
    filepath = os.path.join(app.config['NOTES_DIR'], filename)
    try:
        with open(filepath, 'w') as f:
            f.write(content)
        return jsonify({'message': 'Note created successfully'})
    except FileNotFoundError:
        return jsonify({'error': 'File not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/notes/<filename>', methods=['DELETE'])
def delete_note(filename):
    filepath = os.path.join(app.config['NOTES_DIR'], filename)
    try:
        os.remove(filepath)
        return jsonify({'message': 'Note deleted successfully'})
    except FileNotFoundError:
        return jsonify({'error': 'File not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True) #correct way

