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

# Sample notifications data
notifications = [
    {
        'id': 1,
        'type': 'info',
        'title': 'New Assignment',
        'description': 'You have been assigned a new task: "Create a landing page"',
        'timestamp': '2 hours ago'
    },
    {
        'id': 2,
        'type': 'warning',
        'title': 'Upcoming Deadline',
        'description': 'Project proposal due in 2 days',
        'timestamp': '1 day ago'
    },
    {
        'id': 3,
        'type': 'success',
        'title': 'Task Completed',
        'description': 'Great job! You\'ve completed the "UI Design" task',
        'timestamp': '3 days ago'
    }
]

@app.route('/api/notifications', methods=['GET'])
def get_notifications():
    return jsonify(notifications)

if __name__ == '__main__':
    app.run(debug=True)


