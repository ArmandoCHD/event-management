import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../services/userService';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const result = await getUsers();
            setUsers(result);
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            const updatedUsers = await getUsers();
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>User List</h2>
            <div className="list-group">
                {users.map(user => (
                    <div key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
                        {user.username} - {user.email} - {user.role}
                        <button onClick={() => handleDelete(user._id)} className="btn btn-danger">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;
