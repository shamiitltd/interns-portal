import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './NoticeBoard.css';

const notices = [
  {
    id: 1,
    title: "Welcome New Interns!",
    content: "We're excited to have you join our team. Orientation is on Monday at 9 AM.",
    date: "2023-06-01",
    category: "Announcement"
  },
  {
    id: 2,
    title: "Upcoming Workshop",
    content: "Don't miss our 'Intro to React' workshop this Friday at 2 PM in the main conference room.",
    date: "2023-06-05",
    category: "Event"
  },
  {
    id: 3,
    title: "Project Submissions Due",
    content: "Remember to submit your first project proposals by next Wednesday.",
    date: "2023-06-10",
    category: "Deadline"
  },
  {
    id: 4,
    title: "Mentor Meet-and-Greet",
    content: "Join us for a casual meet-and-greet with your mentors next Thursday at 3 PM.",
    date: "2023-06-15",
    category: "Event"
  }
];

function NoticeBoard() {
  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Intern Noticeboard</h1>
      <Row>
        {notices.map((notice) => (
          <Col key={notice.id} md={6} lg={4} className="mb-4">
            <Card className={`notice-card ${notice.category.toLowerCase()}`}>
              <Card.Body>
                <Card.Title>{notice.title}</Card.Title>
                <Card.Text>{notice.content}</Card.Text>
                <div className="notice-footer">
                  <span className="notice-date">{notice.date}</span>
                  <span className="notice-category">{notice.category}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
export default NoticeBoard