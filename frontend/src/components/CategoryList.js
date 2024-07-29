import React, { useState, useEffect } from 'react';
import { getCategories, createCategory, deleteCategory } from '../services/categoryService';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await getCategories();
                setCategories(result);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleCreate = async () => {
        try {
            await createCategory({ name });
            setName('');
            const updatedCategories = await getCategories();
            setCategories(updatedCategories);
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteCategory(id);
            const updatedCategories = await getCategories();
            setCategories(updatedCategories);
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Category List</h2>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                <button onClick={handleCreate} className="btn btn-primary mt-2">Add Category</button>
            </div>
            <div className="list-group mt-4">
                {categories.map(category => (
                    <div key={category._id} className="list-group-item d-flex justify-content-between align-items-center">
                        {category.name}
                        <button onClick={() => handleDelete(category._id)} className="btn btn-danger">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
