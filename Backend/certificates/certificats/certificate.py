from flask import Flask, request, send_file # type: ignore
from reportlab.lib.pagesizes import letter  # type: ignore
from reportlab.pdfgen import canvas  # type: ignore
from io import BytesIO

app = Flask(__name__)

@app.route('/generate_certificate', methods=['POST'])
def generate_certificate():
  
    data = request.json
    name = data.get('name')
    course = data.get('course')
    
    if not name or not course:
        return {'error': 'Name and course are required'}, 400
    
   
    buffer = BytesIO()
    
    
    c = canvas.Canvas(buffer, pagesize=letter)
    
    
    c.drawString(100, 750, f'Certificate of Completion')
    c.drawString(100, 700, f'This is to certify that')
    c.drawString(100, 650, f'{name}')
    c.drawString(100, 600, f'has completed the Internship')
    c.drawString(100, 550, f'{course}')
    
   
    c.save()
    

    buffer.seek(0)
    
    
    return send_file(buffer, as_attachment=True, download_name='certificate.pdf', mimetype='application/pdf')

if __name__ == '__main__':
    app.run(debug=True)
