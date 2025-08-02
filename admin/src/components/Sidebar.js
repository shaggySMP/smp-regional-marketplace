import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="col-md-3 col-lg-2 d-md-block sidebar collapse">
      <div className="position-sticky pt-3">
        <Nav className="flex-column">
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/dashboard"
              className={isActive('/dashboard') ? 'active' : ''}
            >
              Dashboard
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/users"
              className={isActive('/users') ? 'active' : ''}
            >
              Users
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/items"
              className={isActive('/items') ? 'active' : ''}
            >
              Items
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/chats"
              className={isActive('/chats') ? 'active' : ''}
            >
              Chats
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/staff"
              className={isActive('/staff') ? 'active' : ''}
            >
              Staff Management
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </nav>
  );
};

export default Sidebar;
