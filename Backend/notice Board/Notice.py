from flask import Flask, jsonify, request, abort

app = Flask(__name__)


notices = []
next_id = 1

@app.route('/notices', methods=['GET'])
def get_notices():
    """Retrieve all notices"""
    return jsonify(notices)

@app.route('/notices/<int:notice_id>', methods=['GET'])
def get_notice(notice_id):
    """Retrieve a single notice by ID"""
    notice = next((n for n in notices if n['id'] == notice_id), None)
    if notice is None:
        abort(404)
    return jsonify(notice)

@app.route('/notices', methods=['POST'])
def create_notice():
    """Create a new notice"""
    global next_id
    if not request.json or 'message' not in request.json:
        abort(400)
    notice = {
        'id': next_id,
        'message': request.json['message']
    }
    notices.append(notice)
    next_id += 1
    return jsonify(notice), 201

@app.route('/notices/<int:notice_id>', methods=['PUT'])
def update_notice(notice_id):
    """Update an existing notice"""
    notice = next((n for n in notices if n['id'] == notice_id), None)
    if notice is None:
        abort(404)
    if not request.json or 'message' not in request.json:
        abort(400)
    notice['message'] = request.json['message']
    return jsonify(notice)

@app.route('/notices/<int:notice_id>', methods=['DELETE'])
def delete_notice(notice_id):
    """Delete a notice by ID"""
    global notices
    notices = [n for n in notices if n['id'] != notice_id]
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
