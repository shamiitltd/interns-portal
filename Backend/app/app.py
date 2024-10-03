from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
from datetime import datetime, timedelta
import pytz
import os
import re
import logging

app = Flask(__name__)

# Enable CORS for specific origins
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5175"}})

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Secret key for JWT (You should secure this key in environment variables in a real application)
SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key')

# Dummy user data (replace this with a database in a real application)
USERS = {
    'intern@example.com': {'password': 'intern123', 'role': 'intern'},
    'scrummaster@example.com': {'password': 'scrum123', 'role': 'scrummaster'},
    'hr@example.com': {'password': 'hr123', 'role': 'hr'},
    'teamlead@example.com': {'password': 'lead123', 'role': 'teamlead'},
    'admin@example.com': {'password': 'admin123', 'role': 'admin'},
}

registered_users = list(USERS.keys())  # Simulating a registered users list


@app.route('/api/register', methods=['POST'])
def register():
    data = request.form
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    phone = data.get('phone')
    domain = data.get('domain')
    internship_duration = data.get('internshipDuration')
    password = data.get('password')
    resume = request.files.get('resume')

    app.logger.info(f"Registration attempt for email: {email}")

    # Validation checks
    if not first_name or not last_name or not email or not phone or not domain or not internship_duration or not password or not resume:
        return jsonify({'error': 'All fields are required'}), 400

    # Email format validation
    if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', email):
        return jsonify({'error': 'Invalid email format'}), 400

    # Phone number validation
    if not re.match(r'^[0-9]{10}$', phone):
        return jsonify({'error': 'Phone number must be 10 digits'}), 400

    # Password validation
    if len(password) < 8:
        return jsonify({'error': 'Password must be at least 8 characters long'}), 400

    # Check if email is already registered
    if email in registered_users:
        return jsonify({'error': 'Email is already registered'}), 409

    # Simulate saving the user (you would save it in a database in a real app)
    USERS[email] = {
        'first_name': first_name,
        'last_name': last_name,
        'phone': phone,
        'domain': domain,
        'internship_duration': internship_duration,
        'password': password,  # In production, hash the password
        'resume': resume.filename
    }

    # Save the resume file (you can adjust the file path as needed)
    resume.save(os.path.join('uploads', resume.filename))

    app.logger.info(f"User {email} successfully registered")
    
    return jsonify({'success': 'User registered successfully'}), 201


@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    app.logger.info(f"Login attempt for email: {email}")

    if not email or not password:
        app.logger.warning("Missing email or password in request")
        return jsonify({'error': 'Email and password are required'}), 400

    if email not in USERS or USERS[email]['password'] != password:
        app.logger.warning(f"Invalid login attempt for email: {email}")
        return jsonify({'error': 'Invalid email or password'}), 401

    # Create a JWT token using Indian Standard Time
    ist = pytz.timezone('Asia/Kolkata')
    token = jwt.encode({
        'user': email,
        'role': USERS[email]['role'],
        'exp': datetime.now(ist) + timedelta(hours=1)
    }, SECRET_KEY, algorithm='HS256')

    response_data = {
        'token': token,
        'user': email,
        'role': USERS[email]['role']
    }
    app.logger.info(f"Successful login for email: {email}")
    app.logger.debug(f"Response data: {response_data}")

    return jsonify(response_data), 200


@app.route('/api/reset-password', methods=['POST'])
def reset_password():
    try:
        data = request.get_json()
        email = data.get('email')

        app.logger.info(f"Password reset attempt for email: {email}")

        if not email:
            app.logger.warning("Email not provided for password reset")
            return jsonify({'error': 'Email is required'}), 400

        # Validate email format
        if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', email):
            app.logger.warning(f"Invalid email format: {email}")
            return jsonify({'error': 'Please enter a valid email'}), 400

        # Simulate checking if email exists in the registered users
        if email in registered_users:
            app.logger.info(f"Password reset link sent to email: {email}")
            return jsonify({'success': 'A reset link has been sent to your email.'}), 200
        else:
            app.logger.warning(f"Password reset attempted for non-existent email: {email}")
            return jsonify({'error': 'Email not found. Please try again.'}), 404

    except Exception as e:
        app.logger.error(f"Internal server error: {e}")
        return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    # Ensure the uploads directory exists
    os.makedirs('uploads', exist_ok=True)
    app.run(debug=True)
