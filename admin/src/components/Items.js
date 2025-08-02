import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form } from 'react-bootstrap';

const Items = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [action, setAction] = useState(''); // 'approve', 'reject', 'delete'

  useEffect(() => {
    // In a real implementation, this would be an API call
    // For now, we'll use mock data
    setItems([
      { id: 1, title: 'Vintage Camera', seller: 'user1@example.com', price: 150, category: 'Electronics', status: 'Approved', country: 'Latvia' },
      { id: 2, title: 'Wooden Chair', seller: 'user2@example.com', price: 75, category: 'Furniture', status: 'Pending', country: 'Estonia' },
      { id: 3, title: 'Winter Jacket', seller: 'user3@example.com', price: 60, category: 'Clothing', status: 'Approved', country: 'Lithuania' },
      { id: 4, title: 'Smartphone', seller: 'user4@example.com', price: 300, category: 'Electronics', status: 'Approved', country: 'Latvia' },
      { id: 5, title: 'Book Collection', seller: 'user5@example.com', price: 45, category: 'Books', status: 'Rejected', country: 'Estonia' }
    ]);
  }, []);

  const handleAction = (item, actionType) => {
    setSelectedItem(item);
    setAction(actionType);
    setShowModal(true);
  };

  const confirmAction = () => {
    // In a real implementation, this would be an API call
    console.log(`${action} item:`, selectedItem);
    
    // Update local state to reflect the change
    if (action === 'delete') {
      setItems(items.filter(item => item.id !== selectedItem.id));
    } else {
      setItems(items.map(item => 
        item.id === selectedItem.id 
          ? { ...item, status: action === 'approve' ? 'Approved' : action === 'reject' ? 'Rejected' : item.status } 
          : item
      ));
    }
    
    setShowModal(false);
  };

  return (
    <Container fluid className="py-4">
      <Row>
        <Col>
          <h2>Items Management</h2>
          <p>Manage all item listings</p>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Row>
                <Col>
                  <h5>All Items</h5>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Seller</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Country</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.seller}</td>
                      <td>€{item.price}</td>
                      <td>{item.category}</td>
                      <td>{item.country}</td>
                      <td>
                        <span className={`badge ${
                          item.status === 'Approved' ? 'bg-success' : 
                          item.status === 'Pending' ? 'bg-warning' : 
                          'bg-danger'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        {item.status === 'Pending' && (
                          <>
                            <Button
                              variant="success"
                              size="sm"
                              className="btn-action"
                              onClick={() => handleAction(item, 'approve')}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              className="btn-action"
                              onClick={() => handleAction(item, 'reject')}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="btn-action"
                          onClick={() => handleAction(item, 'delete')}
                        >
                          Delete
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {action === 'approve' && (
            <p>Are you sure you want to approve item <strong>{selectedItem?.title}</strong>?</p>
          )}
          {action === 'reject' && (
            <p>Are you sure you want to reject item <strong>{selectedItem?.title}</strong>?</p>
          )}
          {action === 'delete' && (
            <p>Are you sure you want to delete item <strong>{selectedItem?.title}</strong>? This action cannot be undone.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button 
            variant={action === 'approve' ? 'success' : action === 'reject' ? 'warning' : 'danger'} 
            onClick={confirmAction}
          >
            {action === 'approve' ? 'Approve Item' : action === 'reject' ? 'Reject Item' : 'Delete Item'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Items;
