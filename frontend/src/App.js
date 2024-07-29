import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import EventList from './components/EventList';
import CategoryList from './components/CategoryList';
import UserList from './components/UserList';
import EventForm from './components/EventForm';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Routes>
                <Route path="/login" element={!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} />
                <Route path="/register" element={!isLoggedIn ? <Register setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} />
                <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
                <Route path="/events" element={isLoggedIn ? <EventList /> : <Navigate to="/login" />} />
                <Route path="/categories" element={isLoggedIn ? <CategoryList /> : <Navigate to="/login" />} />
                <Route path="/users" element={isLoggedIn ? <UserList /> : <Navigate to="/login" />} />
                <Route path="/events/new" element={<EventForm />} />
                <Route path="/events/edit/:id" element={isLoggedIn ? <EventForm /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
