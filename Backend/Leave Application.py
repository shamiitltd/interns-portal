# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

leaves = []

@app.route('/leaves', methods=['GET'])
def get_leaves():
    return jsonify(leaves)

@app.route('/leaves', methods=['POST'])
def add_leave():
    leave = request.json
    leaves.append(leave)
    return jsonify(leave), 201

if __name__ == '__main__':
    app.run(debug=True)
