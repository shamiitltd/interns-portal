from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
from datetime import datetime, timedelta
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

            
             # login details

# Secret key for JWT - in production, use a more secure method to store this
app.config['SECRET_KEY'] = 'your_secret_key'

# Mock user database - replace this with your actual database logic
users = {
    'intern@example.com': {'password': generate_password_hash('password'), 'role': 'intern', 'name': 'Intern User'},
    'scrummaster@example.com': {'password': generate_password_hash('password'), 'role': 'scrummaster', 'name': 'Scrum Master'},
    'hr@example.com': {'password': generate_password_hash('password'), 'role': 'hr', 'name': 'HR Manager'},
    'teamlead@example.com': {'password': generate_password_hash('password'), 'role': 'teamlead', 'name': 'Team Lead'},
    'admin@example.com': {'password': generate_password_hash('password'), 'role': 'admin', 'name': 'Admin User'}
}


            # report submission details
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if email not in users or not check_password_hash(users[email]['password'], password):
        return jsonify({'message': 'Invalid credentials'}), 401

    user = users[email]
    token = jwt.encode({
        'email': email,
        'role': user['role'],
        'exp': datetime.utcnow() + timedelta(hours=1)
    }, app.config['SECRET_KEY'])

    return jsonify({
        'email': email,
        'name': user['name'],
        'role': user['role'],
        'token': token
    })

@app.route('/api/submit-report', methods=['POST'])
def submit_report():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        # Save other report details to database here
        return jsonify({'message': 'Report submitted successfully'}), 200
    return jsonify({'error': 'File type not allowed'}), 400

if __name__ == '__main__':
    app.run(debug=True)
