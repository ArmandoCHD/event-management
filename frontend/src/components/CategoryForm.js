import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createCategory, getCategoryById, updateCategory } from '../services/categoryService';

const CategoryForm = () => {
    const [category, setCategory] = useState({ name: '', coverImage: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchCategory = async () => {
                try {
                    const categoryData = await getCategoryById(id);
                    setCategory(categoryData);
                } catch (error) {
                    console.error('Error fetching category', error);
                }
            };

            fetchCategory();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateCategory(id, category);
            } else {
                await createCategory(category);
            }
            navigate('/categories');
        } catch (error) {
            console.error('Error saving category', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>{id ? 'Edit Category' : 'Create Category'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name="name" value={category.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Cover Image</label>
                    <input type="text" className="form-control" name="coverImage" value={category.coverImage} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
}

export default CategoryForm;
