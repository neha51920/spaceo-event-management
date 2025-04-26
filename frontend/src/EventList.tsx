import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const EventList: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(2);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [hasMore, setHasMore] = useState<boolean>(true);

  const navigate = useNavigate();

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/events/?page=${page}&limit=${limit}&sortBy=${sortBy}`
      );
      const data = await res.json();

      if (Array.isArray(data.events)) {
        setEvents(data.events);
        setHasMore(data.events.length === limit);
      } else if (Array.isArray(data)) {
        setEvents(data);
        setHasMore(data.length === limit);
      } else {
        setEvents([]);
        setHasMore(false);
      }
    } catch (err) {
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [page, sortBy]);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setPage(1); // Reset to first page when sorting changes
  };

  const handleView = (id: string) => {
    navigate(`/events/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Event List</h2>
      <button
          onClick={() => navigate('/create')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Create New Event
        </button>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '8px' }}>Sort By:</label>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="createdAt">Created At</option>
          <option value="startDate">Start Date</option>
          <option value="name">Name</option>
        </select>
      </div>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((event) => (
          <div
            key={event._id}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              marginBottom: '10px',
              borderRadius: '8px',
            }}
          >
            <h3>{event.name}</h3>
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
                style={{ width: '100%', maxWidth: '400px', marginTop: '10px', borderRadius: '5px' }}
              />
            )}

            <div style={{ marginTop: '10px' }}>
              <button
                onClick={() => handleView(event._id)}
                style={{ marginRight: '10px', padding: '6px 12px', cursor: 'pointer' }}
              >
                View
              </button>
              <button
                onClick={() => handleEdit(event._id)}
                style={{ padding: '6px 12px', cursor: 'pointer' }}
              >
                Edit
              </button>
            </div>
          </div>
        ))
      )}

      {/* Pagination Controls */}
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handlePrev}
          disabled={page === 1}
          style={{
            marginRight: '10px',
            padding: '6px 12px',
            backgroundColor: page === 1 ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: page === 1 ? 'not-allowed' : 'pointer'
          }}
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={!hasMore}
          style={{
            padding: '6px 12px',
            backgroundColor: !hasMore ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: !hasMore ? 'not-allowed' : 'pointer'
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EventList;
