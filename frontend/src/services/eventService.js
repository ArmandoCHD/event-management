import axiosInstance from '../axiosConfig';

export const getEvents = async () => {
  try {
    const response = await axiosInstance.get('/events');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEventById = async (eventId) => {
  try {
    const response = await axiosInstance.get(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    console.log(eventData)
    const response = await axiosInstance.post('/events', eventData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await axiosInstance.put(`/events/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const response = await axiosInstance.delete(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
