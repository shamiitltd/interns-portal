import React, { useState } from "react";
import { AlertCircle, Upload } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import "./ReportSubmission.css";
import axios from 'axios';

const ReportSubmission = () => {
  const { user } = useAuth();
  const [reportType, setReportType] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('reportTitle', event.target.reportTitle.value);
    formData.append('reportType', reportType);
    formData.append('reportSummary', event.target.reportSummary.value);

    try {
      const response = await axios.post('http://localhost:5000/api/submit-report', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      // Handle successful submission (e.g., show success message, redirect)
    } catch (error) {
      console.error('Error submitting report:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="report-submission-container">
      <h2 className="page-title">Submit Your Report</h2>

      <div className="report-card">
        <div className="card-header">
          <h3 className="card-title">Report Details</h3>
        </div>
        <div className="card-content">
          <form onSubmit={handleSubmit} className="report-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="reportTitle">Report Title</label>
                <input
                  id="reportTitle"
                  type="text"
                  placeholder="Enter report title"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="reportType">Report Type</label>
                <select
                  id="reportType"
                  onChange={(e) => setReportType(e.target.value)}
                  required
                >
                  <option value="">Select report type</option>
                  <option value="weekly">Weekly Report</option>
                  <option value="monthly">Monthly Report</option>
                  <option value="project">Project Report</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reportSummary">Report Summary</label>
              <textarea
                id="reportSummary"
                placeholder="Provide a brief summary of your report"
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="fileUpload">Upload Report File</label>
              <div className="file-upload">
                <input
                  id="fileUpload"
                  type="file"
                  className="hidden-input"
                  onChange={handleFileChange}
                />
                <label htmlFor="fileUpload" className="file-upload-label">
                  <Upload className="upload-icon" size={18} />
                  Choose File
                </label>
                {file && <span className="file-name">{file.name}</span>}
              </div>
            </div>

            {reportType === "project" && (
              <div className="alert">
                <AlertCircle className="alert-icon" size={24} />
                <div className="alert-content">
                  <h4>Reminder</h4>
                  <p>
                    Don't forget to include your project milestones and any challenges faced.
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
        <div className="card-footer">
          <button type="button" className="btn btn-secondary">
            Save Draft
          </button>
          <button type="submit" className="btn btn-primary">
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportSubmission;
