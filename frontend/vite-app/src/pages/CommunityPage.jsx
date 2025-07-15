import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AIChatBot from '../components/AIChatBot';

export default function CommunityPage() {
  return (
    <Container className="my-4">
      <Row>
        <Col md={8} className="mx-auto">
          <h2 className="text-center mb-4">Community AI Assistant</h2>
          <AIChatBot />
        </Col>
      </Row>
    </Container>
  );
}