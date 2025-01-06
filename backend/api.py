import os
from flask import Flask, request, jsonify

app = Flask(__name__)

NOTES_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), 'notes'))  #Corrected path

@app.route('/notes', methods=['GET'])
def list_notes():
    files = [f for f in os.listdir(NOTES_DIR) if os.path.isfile(os.path.join(NOTES_DIR, f))]
    return jsonify(files)

@app.route('/notes/<filename>', methods=['GET'])
def get_note(filename):
    filepath = os.path.join(NOTES_DIR, filename)
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        return jsonify({'filename': filename, 'content': content})
    except FileNotFoundError:
        return jsonify({'error': 'File not found'}), 404

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

