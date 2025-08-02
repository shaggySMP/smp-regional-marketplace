import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form } from 'react-bootstrap';

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStaff, setCurrentStaff] = useState({
    id: null,
    email: '',
    role: 'staff',
    permissions: {
      approveListings: false,
      suspendListings: false,
      viewActivity: false
    }
  });

  useEffect(() => {
    // In a real implementation, this would be an API call
    // For now, we'll use mock data
    setStaff([
      { id: 1, email: 'staff1@example.com', role: 'staff', permissions: { approveListings: true, suspendListings: false, viewActivity: true } },
      { id: 2, email: 'staff2@example.com', role: 'staff', permissions: { approveListings: false, suspendListings: true, viewActivity: true } },
      { id: 3, email: 'admin@example.com', role: 'admin', permissions: { approveListings: true, suspendListings: true, viewActivity: true } }
    ]);
  }, []);

  const handleCreateStaff = () => {
    setIsEditing(false);
    setCurrentStaff({
      id: null,
      email: '',
      role: 'staff',
      permissions: {
        approveListings: false,
        suspendListings: false,
        viewActivity: false
      }
    });
    setShowModal(true);
  };

  const handleEditStaff = (staffMember) => {
    setIsEditing(true);
    setCurrentStaff(staffMember);
    setShowModal(true);
  };

  const handleSaveStaff = () => {
    // In a real implementation, this would be an API call
    console.log('Save staff:', currentStaff);
    
    if (isEditing) {
      // Update existing staff
      setStaff(staff.map(s => s.id === currentStaff.id ? currentStaff : s));
    } else {
      // Create new staff
      const newStaff = { ...currentStaff, id: staff.length + 1 };
      setStaff([...staff, newStaff]);
    }
    
    setShowModal(false);
  };

  const handleDeleteStaff = (staffId) => {
    // In a real implementation, this would be an API call
    console.log('Delete staff:', staffId);
    setStaff(staff.filter(s => s.id !== staffId));
  };

  const handlePermissionChange = (permission) => {
    setCurrentStaff({
      ...currentStaff,
      permissions: {
        ...currentStaff.permissions,
        [permission]: !currentStaff.permissions[permission]
      }
    });
  };

  return (
    <Container fluid className="py-4">
      <Row>
        <Col>
          <h2>Staff Management</h2>
          <p>Manage staff accounts and permissions</p>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Button variant="primary" onClick={handleCreateStaff}>
            Create New Staff
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Row>
                <Col>
                  <h5>All Staff</h5>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Permissions</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((staffMember) => (
                    <tr key={staffMember.id}>
                      <td>{staffMember.id}</td>
                      <td>{staffMember.email}</td>
                      <td>{staffMember.role}</td>
                      <td>
                        <div>
                          Approve Listings: {staffMember.permissions.approveListings ? 'Yes' : 'No'}
                        </div>
                        <div>
                          Suspend Listings: {staffMember.permissions.suspendListings ? 'Yes' : 'No'}
                        </div>
                        <div>
                          View Activity: {staffMember.permissions.viewActivity ? 'Yes' : 'No'}
                        </div>
                      </td>
                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          className="btn-action"
                          onClick={() => handleEditStaff(staffMember)}
                        >
                          Edit
                        </Button>
                        {staffMember.role !== 'admin' && (
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="btn-action"
                            onClick={() => handleDeleteStaff(staffMember.id)}
                          >
                            Delete
                          </Button>
                        )}
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
          <Modal.Title>{isEditing ? 'Edit Staff' : 'Create New Staff'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={currentStaff.email}
                onChange={(e) => setCurrentStaff({ ...currentStaff, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={currentStaff.role}
                onChange={(e) => setCurrentStaff({ ...currentStaff, role: e.target.value })}
              >
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Permissions</Form.Label>
              <div>
                <Form.Check
                  type="checkbox"
                  label="Approve Listings"
                  checked={currentStaff.permissions.approveListings}
                  onChange={() => handlePermissionChange('approveListings')}
                />
              </div>
              <div>
                <Form.Check
                  type="checkbox"
                  label="Suspend Listings"
                  checked={currentStaff.permissions.suspendListings}
                  onChange={() => handlePermissionChange('suspendListings')}
                />
              </div>
              <div>
                <Form.Check
                  type="checkbox"
                  label="View Activity"
                  checked={currentStaff.permissions.viewActivity}
                  onChange={() => handlePermissionChange('viewActivity')}
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveStaff}>
            {isEditing ? 'Update Staff' : 'Create Staff'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Staff;
