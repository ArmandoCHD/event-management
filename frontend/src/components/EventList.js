import React, { useState, useEffect } from 'react';
import { getEvents } from '../services/eventService';
import { getCategoryById } from '../services/categoryService';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState({});

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const result = await getEvents();
                const categoryIds = [...new Set(result.map(event => event.category))];
                
                const categoriesPromises = categoryIds.map(id => getCategoryById(id));
                const categoriesResult = await Promise.all(categoriesPromises);
                
                const categoriesMap = categoriesResult.reduce((acc, category) => {
                    acc[category._id] = category;
                    return acc;
                }, {});
                
                setCategories(categoriesMap);
                setEvents(result);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Event List</h2>
            <div className="list-group">
                {events.map(event => (
                    <div key={event._id} className="list-group-item">
                        <h5>{event.title}</h5>
                        <p>{event.description}</p>
                        <p>{new Date(event.date).toLocaleDateString()} {event.time}</p>
                        <p>{event.location}</p>
                        <p>Category: {categories[event.category] ? categories[event.category].name : 'Unknown'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventList;
