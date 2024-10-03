import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './RegistrationForm.css';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
  domain: Yup.string().required('Domain is required'),
  internshipDuration: Yup.string().required('Please select an internship duration'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const getPasswordStrength = (password) => {
  if (!password) return '';
  if (password.length < 6) return 'weak';
  if (password.length < 10) return 'medium';
  return 'strong';
};

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resumePreview, setResumePreview] = useState(null);
  const [initialValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    internshipDuration: '',
    resume: null,
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      setInitialValues(JSON.parse(savedFormData));
    }
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    const formDataToSend = new FormData();
    for (const key in values) {
      if (key !== 'confirmPassword') {
        formDataToSend.append(key, values[key]);
      }
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage({ type: 'success', content: 'Registration successful!' });
      localStorage.removeItem('formData');
      navigate('/login');
    } catch (error) {
      setMessage({ 
        type: 'error', 
        content: error.response?.data?.error || 'An error occurred. Please try again.'
      });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue('resume', file);
    const fileURL = URL.createObjectURL(file);
    setResumePreview(fileURL);
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <div className="form-content">
          {message && (
            <div className={`message ${message.type}`}>
              {message.content}
              <button onClick={() => setMessage(null)}>×</button>
            </div>
          )}

          <div className="progress-bar">
            <div className="progress" style={{ width: step === 1 ? '50%' : '100%' }}></div>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, errors, touched, setFieldValue, isSubmitting }) => (
              <Form onChange={() => localStorage.setItem('formData', JSON.stringify(values))}>
                {step === 1 && (
                  <>
                    <h2>Personal Information</h2>
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <Field type="text" id="firstName" name="firstName" />
                      <ErrorMessage name="firstName" component="div" className="error" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <Field type="text" id="lastName" name="lastName" />
                      <ErrorMessage name="lastName" component="div" className="error" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Field type="email" id="email" name="email" />
                      <ErrorMessage name="email" component="div" className="error" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <Field type="tel" id="phone" name="phone" />
                      <ErrorMessage name="phone" component="div" className="error" />
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setStep(2)}
                      disabled={Object.keys(errors).some(key => ['firstName', 'lastName', 'email', 'phone'].includes(key) && touched[key])}
                    >
                      Next →
                    </button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2>Additional Information</h2>
                    <div className="form-group">
                      <label htmlFor="domain">Domain</label>
                      <Field type="text" id="domain" name="domain" />
                      <ErrorMessage name="domain" component="div" className="error" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="internshipDuration">Internship Duration</label>
                      <Field as="select" id="internshipDuration" name="internshipDuration">
                        <option value="">Select duration</option>
                        <option value="3 months">3 months</option>
                        <option value="6 months">6 months</option>
                      </Field>
                      <ErrorMessage name="internshipDuration" component="div" className="error" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="resume">Upload Resume</label>
                      <input
                        type="file"
                        id="resume"
                        onChange={(e) => handleFileChange(e, setFieldValue)}
                      />
                      {resumePreview && (
                        <div className="resume-preview">
                          <a href={resumePreview} target="_blank" rel="noopener noreferrer">View Uploaded Resume</a>
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <Field type="password" id="password" name="password" />
                      <ErrorMessage name="password" component="div" className="error" />
                      {values.password && (
                        <div className={`password-strength ${getPasswordStrength(values.password)}`}>
                          Password strength: {getPasswordStrength(values.password)}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <Field type="password" id="confirmPassword" name="confirmPassword" />
                      <ErrorMessage name="confirmPassword" component="div" className="error" />
                    </div>
                    <button type="button" onClick={() => setStep(1)}>← Back</button>
                    <button type="submit" disabled={isSubmitting || Object.keys(errors).length > 0}>
                      {loading ? 'Registering...' : 'Register →'}
                    </button>
                  </>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;