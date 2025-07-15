import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { COMMUNITY_AI_QUERY } from '../hooks/useCommunityAI.js';
import { Card, ListGroup, Form, Button } from 'react-bootstrap';

export default function AIChatBot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [executeQuery] = useMutation(COMMUNITY_AI_QUERY);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    
    const { data } = await executeQuery({ variables: { input } });
    const aiResponse = data.communityAIQuery;

    setMessages(prev => [
      ...prev,
      { text: aiResponse.text, isUser: false },
      ...aiResponse.suggestedQuestions.map(q => ({ text: q, isSuggestion: true }))
    ]);
    
    setInput('');
  };

  return (
    <Card className="chat-container">
      <Card.Body>
        <ListGroup variant="flush">
          {messages.map((msg, i) => (
            <ListGroup.Item key={i} className={msg.isUser ? 'user-message' : 'ai-message'}>
              {msg.isSuggestion ? (
                <Button variant="outline-primary" onClick={() => setInput(msg.text)}>
                  {msg.text}
                </Button>
              ) : msg.text}
            </ListGroup.Item>
          ))}
        </ListGroup>
        
        <Form onSubmit={handleSubmit}>
          <Form.Control
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about community discussions..."
          />
          <Button type="submit" className="mt-2">Send</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}