import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store'; 

const EventForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState<any[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));  // Convert FileList to an array
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('location', location);
    Array.from(images).forEach((image) => formData.append('images', image));

    try {
      await axios.post('http://localhost:5000/events', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Event created successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to create event');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Event Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
      <input type="file" multiple onChange={handleImageChange} />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;
