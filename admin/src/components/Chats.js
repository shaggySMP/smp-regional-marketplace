import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form } from 'react-bootstrap';

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // In a real implementation, this would be an API call
    // For now, we'll use mock data
    setChats([
      { id: 1, itemTitle: 'Vintage Camera', user1: 'buyer1@example.com', user2: 'seller1@example.com', lastMessage: 'Hello, is this still available?', timestamp: '2023-05-15 14:30' },
      { id: 2, itemTitle: 'Wooden Chair', user1: 'buyer2@example.com', user2: 'seller2@example.com', lastMessage: 'I can pick it up tomorrow', timestamp: '2023-05-14 09:15' },
      { id: 3, itemTitle: 'Winter Jacket', user1: 'buyer3@example.com', user2: 'seller3@example.com', lastMessage: 'Offer accepted!', timestamp: '2023-05-13 16:45' }
    ]);
  }, []);

  const viewMessages = (chat) => {
    setSelectedChat(chat);
    
    // In a real implementation, this would be an API call
    // For now, we'll use mock data
    setMessages([
      { id: 1, sender: 'buyer1@example.com', text: 'Hello! Is this still available?', timestamp: '14:30' },
      { id: 2, sender: 'seller1@example.com', text: 'Yes, it is! What would you like to know?', timestamp: '14:32' },
      { id: 3, sender: 'buyer1@example.com', text: 'I can pick it up tomorrow if that works for you.', timestamp: '14:35' }
    ]);
    
    setShowModal(true);
  };

  return (
    <Container fluid className="py-4">
      <Row>
        <Col>
          <h2>Chats Management</h2>
          <p>View all chat conversations (read-only)</p>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Row>
                <Col>
                  <h5>All Chats</h5>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Item</th>
                    <th>User 1</th>
                    <th>User 2</th>
                    <th>Last Message</th>
                    <th>Timestamp</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {chats.map((chat) => (
                    <tr key={chat.id}>
                      <td>{chat.id}</td>
                      <td>{chat.itemTitle}</td>
                      <td>{chat.user1}</td>
                      <td>{chat.user2}</td>
                      <td>{chat.lastMessage}</td>
                      <td>{chat.timestamp}</td>
                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => viewMessages(chat)}
                        >
                          View Messages
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chat Messages - {selectedChat?.itemTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {messages.map((message) => (
              <div 
                key={message.id} 
                style={{ 
                  marginBottom: '10px', 
                  padding: '10px', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '5px' 
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                  {message.sender} <span style={{ float: 'right', fontSize: '0.8em', color: '#6c757d' }}>{message.timestamp}</span>
                </div>
                <div>{message.text}</div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Chats;
