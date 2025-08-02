import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form } from 'react-bootstrap';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [action, setAction] = useState(''); // 'ban', 'suspend', 'delete'

  useEffect(() => {
    // In a real implementation, this would be an API call
    // For now, we'll use mock data
    setUsers([
      { id: 1, email: 'user1@example.com', country: 'Latvia', status: 'Active', role: 'user' },
      { id: 2, email: 'user2@example.com', country: 'Estonia', status: 'Active', role: 'user' },
      { id: 3, email: 'user3@example.com', country: 'Lithuania', status: 'Suspended', role: 'user' },
      { id: 4, email: 'user4@example.com', country: 'Latvia', status: 'Active', role: 'user' },
      { id: 5, email: 'admin@example.com', country: 'Latvia', status: 'Active', role: 'admin' },
      { id: 6, email: 'staff1@example.com', country: 'Estonia', status: 'Active', role: 'staff' }
    ]);
  }, []);

  const handleAction = (user, actionType) => {
    setSelectedUser(user);
    setAction(actionType);
    setShowModal(true);
  };

  const confirmAction = () => {
    // In a real implementation, this would be an API call
    console.log(`${action} user:`, selectedUser);
    
    // Update local state to reflect the change
    if (action === 'delete') {
      setUsers(users.filter(user => user.id !== selectedUser.id));
    } else {
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, status: action === 'ban' ? 'Banned' : 'Suspended' } 
          : user
      ));
    }
    
    setShowModal(false);
  };

  return (
    <Container fluid className="py-4">
      <Row>
        <Col>
          <h2>Users Management</h2>
          <p>Manage all registered users</p>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Row>
                <Col>
                  <h5>All Users</h5>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Country</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.email}</td>
                      <td>{user.country}</td>
                      <td>{user.role}</td>
                      <td>{user.status}</td>
                      <td>
                        {user.status !== 'Banned' && (
                          <Button
                            variant="danger"
                            size="sm"
                            className="btn-action"
                            onClick={() => handleAction(user, 'ban')}
                          >
                            Ban
                          </Button>
                        )}
                        {user.status !== 'Suspended' && (
                          <Button
                            variant="warning"
                            size="sm"
                            className="btn-action"
                            onClick={() => handleAction(user, 'suspend')}
                          >
                            Suspend
                          </Button>
                        )}
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="btn-action"
                          onClick={() => handleAction(user, 'delete')}
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
          {action === 'ban' && (
            <p>Are you sure you want to ban user <strong>{selectedUser?.email}</strong>?</p>
          )}
          {action === 'suspend' && (
            <p>Are you sure you want to suspend user <strong>{selectedUser?.email}</strong>?</p>
          )}
          {action === 'delete' && (
            <p>Are you sure you want to delete user <strong>{selectedUser?.email}</strong>? This action cannot be undone.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmAction}>
            {action === 'ban' ? 'Ban User' : action === 'suspend' ? 'Suspend User' : 'Delete User'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Users;
