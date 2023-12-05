import React from 'react';
import Nav from 'react-bootstrap/Nav';    // NavBar from react-bootstrap
import './NavBar.css';

function NavBar({ activeTab, handleTabChange }) {
  return (
    <div>
      <h2 className="header">DYNAMITE TRANSPORT SYSTEM (WELSHPOOL)</h2>
      <Nav variant="tabs" defaultActiveKey="/home" activeKey={activeTab} onSelect={handleTabChange}>
        <Nav.Item>
          <Nav.Link eventKey="register" className="nav-links">
            <strong>REGISTER NEW TRUCK</strong>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="list" className="nav-links">
          <strong>LIST OF TRUCKS AT WAREHOUSE/EDIT/DELETE</strong>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default NavBar;

