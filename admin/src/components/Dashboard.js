import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalItems: 0,
    totalChats: 0,
    pendingItems: 0
  });

  const [recentUsers, setRecentUsers] = useState([]);
  const [recentItems, setRecentItems] = useState([]);

  useEffect(() => {
    // In a real implementation, this would be API calls
    // For now, we'll use mock data
    setStats({
      totalUsers: 1245,
      totalItems: 876,
      totalChats: 243,
      pendingItems: 23
    });

    setRecentUsers([
      { id: 1, email: 'user1@example.com', country: 'Latvia', status: 'Active' },
      { id: 2, email: 'user2@example.com', country: 'Estonia', status: 'Active' },
      { id: 3, email: 'user3@example.com', country: 'Lithuania', status: 'Suspended' },
      { id: 4, email: 'user4@example.com', country: 'Latvia', status: 'Active' },
      { id: 5, email: 'user5@example.com', country: 'Estonia', status: 'Banned' }
    ]);

    setRecentItems([
      { id: 1, title: 'Vintage Camera', seller: 'user1@example.com', price: 150, status: 'Approved' },
      { id: 2, title: 'Wooden Chair', seller: 'user2@example.com', price: 75, status: 'Pending' },
      { id: 3, title: 'Winter Jacket', seller: 'user3@example.com', price: 60, status: 'Approved' },
      { id: 4, title: 'Smartphone', seller: 'user4@example.com', price: 300, status: 'Approved' },
      { id: 5, title: 'Book Collection', seller: 'user5@example.com', price: 45, status: 'Rejected' }
    ]);
  }, []);

  return (
    <Container fluid className="py-4">
      <h2>Dashboard</h2>
      <p>Welcome to the smp.com Admin Panel</p>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-number">{stats.totalUsers}</div>
              <div className="stat-label">Total Users</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-number">{stats.totalItems}</div>
              <div className="stat-label">Total Items</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-number">{stats.totalChats}</div>
              <div className="stat-label">Total Chats</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-number">{stats.pendingItems}</div>
              <div className="stat-label">Pending Items</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>Recent Users</Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Country</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.email}</td>
                      <td>{user.country}</td>
                      <td>{user.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Recent Items</Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Seller</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.seller}</td>
                      <td>€{item.price}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
