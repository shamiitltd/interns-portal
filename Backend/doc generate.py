from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfkit

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/generate', methods=['POST'])
def generate_document():
    data = request.json
    title = data['title']
    content = data['content']
    
    # Generate HTML content
    html_content = f"<h1>{title}</h1><p>{content}</p>"
    pdf = pdfkit.from_string(html_content, False)  # Generate PDF

    # Return the PDF as a response
    response = jsonify({"message": "Document generated"})
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'attachment; filename=document.pdf'
    response.set_data(pdf)

    return response

if __name__ == '__main__':
    app.run(debug=True)
