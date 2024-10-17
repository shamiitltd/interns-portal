import React, { useState } from 'react';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("basicInfo");
  const [internshipStartDate, setInternshipStartDate] = useState('');
  const [internshipEndDate, setInternshipEndDate] = useState('');

  const handleStartDateChange = (e) => {
    setInternshipStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setInternshipEndDate(e.target.value);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "basicInfo":
        return (
          <div className="section">
            <h2>Basic Information</h2>
            <div className="info-group">
              <label>Name:</label>
              <input type="text" placeholder="Enter Full Name" />
            </div>
            <div className="info-group">
              <label>Job Title:</label>
              <input type="text" placeholder="Enter Job Title" />
            </div>
            <div className="info-group">
              <label>Email:</label>
              <input type="email" placeholder="Enter Email" />
            </div>
            <div className="info-group">
              <label>Mobile:</label>
              <input type="tel" placeholder="Enter Mobile" />
            </div>
            <div className="info-group">
              <label>Address:</label>
              <input type="text" placeholder="Enter Address" />
            </div>
          </div>
        );

      case "education":
        return (
          <div className="section">
            <h2>Education</h2>
            <div className="info-group">
              <label>Degree:</label>
              <input type="text" placeholder="Enter Degree (e.g., B.Sc. in Computer Science)" />
            </div>
            <div className="info-group">
              <label>Institution:</label>
              <input type="text" placeholder="Enter Institution Name" />
            </div>
            <div className="info-group">
              <label>Field of Study:</label>
              <input type="text" placeholder="Enter Field of Study" />
            </div>
            <div className="info-group">
              <label>Start Date:</label>
              <input type="date" />
            </div>
            <div className="info-group">
              <label>End Date:</label>
              <input type="date" />
            </div>
            <div className="info-group">
              <label>GPA/Percentage:</label>
              <input type="text" placeholder="Enter GPA/Percentage (Optional)" />
            </div>
            <div className="info-group">
              <label>Notable Achievements:</label>
              <textarea placeholder="Mention awards, scholarships, etc."></textarea>
            </div>

            <h2>Experience</h2>
            <div className="info-group">
              <label>Job Title:</label>
              <input type="text" placeholder="Enter Job Title (e.g., Software Engineer)" />
            </div>
            <div className="info-group">
              <label>Company Name:</label>
              <input type="text" placeholder="Enter Company Name" />
            </div>
            <div className="info-group">
              <label>Start Date:</label>
              <input type="date" />
            </div>
            <div className="info-group">
              <label>End Date:</label>
              <input type="date" />
            </div>
            <div className="info-group">
              <label>Responsibilities:</label>
              <textarea placeholder="Enter key responsibilities"></textarea>
            </div>
            <div className="info-group">
              <label>Technologies Used:</label>
              <textarea placeholder="List technologies you worked with"></textarea>
            </div>
            <div className="info-group">
              <label>Notable Achievements:</label>
              <textarea placeholder="Enter achievements or contributions"></textarea>
            </div>
          </div>
        );
    
      default:
        return null;
    }
  };

  return (
    <div className="profile-container">
      <div className="left-container">
        <div className="photo-upload">
          <div className="empty-photo-circle"></div>
          <input type="file" id="file-upload" />
          <label htmlFor="file-upload" className="upload-button">Upload Photo</label>
        </div>
      </div>

      <div className="right-container">
        <div className="tabs">
          <button
            className={activeTab === "basicInfo" ? "active" : ""}
            onClick={() => setActiveTab("basicInfo")}
          >
            Basic Info
          </button>
          <button
            className={activeTab === "education" ? "active" : ""}
            onClick={() => setActiveTab("education")}
          >
            Education & Experience
          </button>
        </div>

        {/* Render content based on active tab */}
        <div className="tab-content">
          {renderTabContent()}
        </div>

        {/* Save Button below all content */}
        <div className="save-btn-container">
          <button type="submit">Save</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;