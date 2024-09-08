import React, { useState } from 'react'
import './reports.css'

export default function ReportSubmission() {
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/submit-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, type, content }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit report')
      }

      const data = await response.json()
      alert('Report submitted successfully')

      // Reset form
      setTitle('')
      setType('')
      setContent('')
    } catch (error) {
      alert('Failed to submit report. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="report-submission">
      <div className="report-submission__card">
        <h1 className="report-submission__title">Submit New Report</h1>
        <form onSubmit={handleSubmit} className="report-submission__form">
          <div className="form-group">
            <label htmlFor="title" className="form-group__label">Report Title</label>
            <input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Enter report title"
              required
              className="form-group__input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="type" className="form-group__label">Report Type</label>
            <select 
              id="type"
              value={type} 
              onChange={(e) => setType(e.target.value)}
              required
              className="form-group__select"
            >
              <option value="">Select report type</option>
              <option value="financial">Financial Report</option>
              <option value="progress">Progress Report</option>
              <option value="compliance">Compliance Report</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="content" className="form-group__label">Report Content</label>
            <textarea 
              id="content" 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              placeholder="Enter report content"
              rows={6}
              required
              className="form-group__textarea"
            />
          </div>
          <button type="submit" className="report-submission__submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  )
}