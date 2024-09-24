from flask import Flask, jsonify, request
from flask_cors import CORS
from notifications import add_notification, get_notifications

app = Flask(__name__)
CORS(app)

@app.route('/notifications', methods=['GET'])
def fetch_notifications():
    return jsonify(get_notifications())

@app.route('/notifications', methods=['POST'])
def create_notification():
    data = request.json
    message = data.get('message')
    add_notification(message)
    return jsonify({"message": "Notification added"}), 201

if __name__ == '__main__':
    app.run(debug=True)
