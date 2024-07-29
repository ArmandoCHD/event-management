import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavigationBar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={Link} to="/">Event Management</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {isLoggedIn ? (
                        <>
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/events">Events</Nav.Link>
                            <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
                            <Nav.Link as={Link} to="/users">Users</Nav.Link>
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;
