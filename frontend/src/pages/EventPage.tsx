import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../redux/eventSlice';
import { AppDispatch } from '../redux/store';  // Import AppDispatch type

// Define the Event type here
export interface Event {
    _id: string;
    name: string;
    category: string;
    date: string;
    description?: string;  // optional
    image?: string;        // optional
  }
  

const EventPage = () => {
  const dispatch = useDispatch<AppDispatch>();  // Use the correct dispatch type
  const { events, totalPages, currentPage, loading, error } = useSelector((state: any) => state.events);

  const [sortBy, setSortBy] = useState<string>('name');  // State for sorting
  const [category, setCategory] = useState<string>('');  // State for category filter
  const [page, setPage] = useState<number>(1);  // State for pagination
  const limit = 3;

  // Fetch events based on selected page, sort, and category
  useEffect(() => {
    dispatch(fetchEvents({ page, limit, sortBy, category }));
  }, [dispatch, page, limit, sortBy, category]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <h1>Events</h1>

      <div>
        <label htmlFor="sortBy">Sort By:</label>
        <select id="sortBy" onChange={handleSortChange} value={sortBy}>
          <option value="name">Name</option>
          <option value="category">Category</option>
          <option value="date">Date</option>
        </select>
      </div>

      {/* Display Loading/Error */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Display Event List */}
      <div>
        <ul>
          {events.map((event: Event) => (
           <li key={event._id}>
           {event.image && <img src={event.image} alt={event.name} />}
           <h2>{event.name}</h2>
           <p>{event.description}</p>
           <div className="event-details">
             <span>type : {event.category}</span>
           </div>
         </li>
          ))}
        </ul>

        {/* Pagination Controls */}
        <div>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
            Previous
          </button>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
