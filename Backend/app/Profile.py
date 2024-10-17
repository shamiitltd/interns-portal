# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 


profile = {
    "username": "pranchal Sharma",
    "email": "pranchalsharma9335@gmail.com",
    "bio": "Fullstack-Developer at Offcampuscareer"
}

@app.route('/profile', methods=['GET'])
def get_profile():
    return jsonify(profile)

@app.route('/profile', methods=['PUT'])
def update_profile():
    data = request.json
    profile.update(data)
    return jsonify(profile)

if __name__ == '__main__':
    app.run(debug=True)