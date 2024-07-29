const Event = require('../models/eventModel');
const Category = require('../models/categoryModel');
const mongoose = require('mongoose');

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error });
  }
};

exports.createEvent = async (req, res) => {
  const { title, description, category, date, time, location } = req.body;
  const eventDateTime = new Date(`${date}T${time}`);

  if (!mongoose.Types.ObjectId.isValid(category)) {
    return res.status(400).json({ message: 'Invalid category ID' });
  }

  try {
    const existingEvent = await Event.findOne({ title, category });
    if (existingEvent) {
      return res.status(400).json({ message: 'An event with the same title already exists in this category.' });
    }

    if (eventDateTime <= new Date()) {
      return res.status(400).json({ message: 'Event date and time must be in the future.' });
    }

    const event = new Event({ title, description, category, date, time, location });
    await event.save();
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    console.error('Failed to create event:', error);
    res.status(500).json({ message: 'Failed to create event', error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  const { title, description, category, date, time, location } = req.body;

  try {
    const event = await Event.findByIdAndUpdate(req.params.id, { title, description, category, date, time, location }, { new: true });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event updated successfully', event });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update event', error });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete event', error });
  }
};
