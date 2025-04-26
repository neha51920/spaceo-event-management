import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface EventType {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  totalGuests: number;
  category: string;
  images?: string[];
}

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/events/${id}`);
        const data = await res.json();

        if (data && data._id) {
          setEvent(data);
        } else if (data.event && data.event._id) {
          setEvent(data.event);
        } else {
          setError('Event not found.');
        }
      } catch (err) {
        setError('Failed to fetch event.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  if (loading) return <p>Loading event...</p>;
  if (error) return <p>{error}</p>;
  if (!event) return <p>No event found.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Start:</strong> {new Date(event.startDate).toLocaleString()}</p>
      <p><strong>End:</strong> {new Date(event.endDate).toLocaleString()}</p>
      <p><strong>Total Guests:</strong> {event.totalGuests}</p>

      {event.images && event.images.length > 0 && (
        <img
          src={event.images[0]}
          alt={event.name}
          style={{ width: '100%', maxWidth: '600px', marginTop: '20px', borderRadius: '8px' }}
        />
      )}
    </div>
  );
};

export default EventDetail;
