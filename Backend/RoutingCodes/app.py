from flask import Flask,render_template

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello this is the Home page"

@app.route("/dashboard")
def dashboard():
    return "Hello this is the dashboard"

@app.route("/noticeboard")
def notice_board():
    return "Hello this is the noticeboard"

@app.route("/meetings")
def meetings():
    return "Hello this is the meeting page"

@app.route("/perfornmance")
def perfornmance():
    return "Hello this is the perfornmance page"

@app.route("/report")
def report():
    return "Hello this is the report page"

@app.route("/daily mails")
def daily_mails():
    return "Hello this is the mail page"

@app.route("/settings")
def settings():
    return "Hello this is the setting page"

@app.route("/")
def logout():
    return "go to the Home page"

@app.route("/interndashboard")
def intern_dashboard():
    return "Hello this is the Intern Dash board page"

@app.route("/scrumdashboard")
def scrum_dashboard():
    return "Hello this is the Scrum Dashboard page"

@app.route("/admindashboard")
def admin_dashboard():
    return "Hello this is the Admin Dashboard page"

if __name__ == '__main__':
    app.run(debug=True)