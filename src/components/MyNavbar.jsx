import React, { useState } from 'react';
import { Navbar, Nav, Form, Button, FormControl, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function MyNavbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/movie-details/${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="xl" className="container-fluid">
      <Navbar.Brand as={Link} to="/" onClick={() => navigate('/')}>
        <img src={ '/assets/netflix_logo.png'} alt="logo" width="150px"/>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" onClick={() => navigate('/')}>Home</Nav.Link>
          <Nav.Link as={Link} to="/tv-shows" onClick={() => navigate('/tv-shows')}>Tv Shows</Nav.Link>
          {/* Altri link della navbar */}
        </Nav>
        <Form className="d-flex ms-auto" onSubmit={handleSearch}>
          <FormControl
            type="text"
            placeholder="Cerca serie tv"
            className="me-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-light" type="submit">Cerca</Button>
        </Form>
        
        <Nav>
          <Nav.Link href="#">KIDS</Nav.Link>
          <Nav.Link href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              fill="currentColor"
              className="bi bi-bell-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
            </svg>
          </Nav.Link>
          <NavDropdown
            title={
              <img src={ '/assets/kids_icon.png'} alt="Profile" className="rounded-circle" width="30" />
            }
            id="collasible-nav-dropdown"
            menuVariant="dark"
            className="custom-dropdown me-2"
            drop="start"
          >
            <NavDropdown.Item as={Link} to="/edit-profile" onClick={() => navigate('/edit-profile')}>Edit</NavDropdown.Item>
            <NavDropdown.Item href="#">Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;
