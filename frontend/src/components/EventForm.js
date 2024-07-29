import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEvent, updateEvent, getEventById } from '../services/eventService';
import { getCategories } from '../services/categoryService';

const EventForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [banner, setBanner] = useState('');
    const [logo, setLogo] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await getCategories();
                setCategories(result);
                // Set the first category as the default value
                if (result.length > 0) {
                    setCategory(result[0]._id);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchEvent = async () => {
            if (id) {
                try {
                    const event = await getEventById(id);
                    setTitle(event.title);
                    setDescription(event.description);
                    setBanner(event.banner);
                    setLogo(event.logo);
                    setDate(event.date.split('T')[0]);
                    setTime(event.time);
                    setLocation(event.location);
                    setCategory(event.category._id);
                } catch (error) {
                    console.error('Error fetching event:', error);
                }
            }
        };

        fetchCategories();
        fetchEvent();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const eventData = { title, description, banner, logo, date, time, location, category };
        try {
            if (id) {
                await updateEvent(id, eventData);
            } else {
                await createEvent(eventData);
            }
            navigate('/events');
        } catch (error) {
            console.error('Error saving event:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>{id ? 'Edit Event' : 'Create Event'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                    <label>Banner</label>
                    <input type="text" className="form-control" value={banner} onChange={(e) => setBanner(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Logo</label>
                    <input type="text" className="form-control" value={logo} onChange={(e) => setLogo(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Time</label>
                    <input type="time" className="form-control" value={time} onChange={(e) => setTime(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Save Event</button>
            </form>
        </div>
    );
};

export default EventForm;
