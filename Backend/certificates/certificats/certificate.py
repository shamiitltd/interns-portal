from flask import Flask, request, send_file
from reportlab.lib.pagesizes import letter 
from reportlab.pdfgen import canvas  
from io import BytesIO

app = Flask(__name__)

@app.route('/generate_certificate', methods=['POST'])
def generate_certificate():
  
    data = request.json
    name = data.get('name')
    course = data.get('course')
    
    if not name or not course:
        return {'error': 'Name and course are required'}, 400
    
   # Create a byte stream buffer for the PDF
    buffer = BytesIO()
    
     # Create a PDF with ReportLab
    c = canvas.Canvas(buffer, pagesize=letter)
    
    
    c.drawString(100, 750, f'Certificate of Completion')
    c.drawString(100, 700, f'This is to certify that')
    c.drawString(100, 650, f'{name}')
    c.drawString(100, 600, f'has completed the Internship')
    c.drawString(100, 550, f'{course}')
    
     # Save the PDF
    c.save()
    
    # Move to the beginning of the BytesIO buffer
    buffer.seek(0)
    
    # Return the PDF as a response
    return send_file(buffer, as_attachment=True, download_name='certificate.pdf', mimetype='application/pdf')

if __name__ == '__main__':
    app.run(debug=True)
