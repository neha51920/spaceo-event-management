import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface EventType {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  totalGuests: number;
  category: string;
  images?: string[];
}

const EventForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState<EventType>({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    totalGuests: 0,
    category: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null); // For image preview

  useEffect(() => {
    if (isEdit) {
      const fetchEvent = async () => {
        try {
          const res = await fetch(`http://localhost:5000/events/${id}`);
          const data = await res.json();

          setFormData({
            name: data.name,
            description: data.description,
            startDate: data.startDate.slice(0, 16),
            endDate: data.endDate.slice(0, 16),
            location: data.location,
            totalGuests: data.totalGuests,
            category: data.category,
          });

          if (data.images && data.images.length > 0) {
            setPreviewImage(data.images[0]);
          }
        } catch (err) {
          setError('Failed to fetch event details.');
        }
      };

      fetchEvent();
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'totalGuests' ? parseInt(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Set preview
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('description', formData.description);
    submitData.append('startDate', formData.startDate);
    submitData.append('endDate', formData.endDate);
    submitData.append('location', formData.location);
    submitData.append('totalGuests', formData.totalGuests.toString());
    submitData.append('category', formData.category);

    if (imageFile) {
      submitData.append('images', imageFile);
    }

    const token = localStorage.getItem('token');

    try {
      setLoading(true);
      const res = await fetch(
        isEdit ? `http://localhost:5000/events/${id}` : 'http://localhost:5000/events/',
        {
          method: isEdit ? 'PUT' : 'POST',
          headers: {
            Authorization: `Bearer ${token || ''}`,
          },
          body: submitData,
        }
      );

      if (res.ok) {
        navigate('/events');
      } else {
        const errData = await res.json();
        throw new Error(errData.message || 'Something went wrong.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{isEdit ? 'Edit Event' : 'Create Event'}</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px' }}>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="totalGuests"
          placeholder="Total Guests"
          value={formData.totalGuests}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            style={{ width: '100%', maxWidth: '400px', marginTop: '10px', borderRadius: '8px' }}
          />
        )}

        <button type="submit" disabled={loading} style={{ padding: '10px', fontWeight: 'bold' }}>
          {loading ? 'Submitting...' : isEdit ? 'Update Event' : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
