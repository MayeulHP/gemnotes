import os
from flask import Flask, request, jsonify

app = Flask(__name__)

NOTES_DIR = '../notes'

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

if __name__ == '__main__':
    app.run(debug=True)
