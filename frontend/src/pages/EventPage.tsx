// pages/EventPage.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../redux/eventSlice";
import { AppDispatch } from "../redux/store";
import EventForm from "../components/EventForm"; // Import EventForm component

export interface Event {
  _id: string;
  name: string;
  category: string;
  date: string;
  description?: string;
  images?: string;
}

const EventPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { events, totalPages, currentPage, loading, error } = useSelector(
    (state: any) => state.events
  );

  const [sortBy, setSortBy] = useState<string>("name");
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const limit = 3;

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

      {/* Include the Create Event Form */}
      <EventForm />

      <div>
        <label htmlFor="sortBy">Sort By:</label>
        <select id="sortBy" onChange={handleSortChange} value={sortBy}>
          <option value="name">Name</option>
          <option value="category">Category</option>
          <option value="date">Date</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div>
        <ul>
          {events.map((event: Event) => (
            <li key={event._id}>
              {event.images && event.images.length > 0 && (
                <img
                  src={event.images[0]}
                  alt={event.name}
                  style={{ width: "300px", height: "auto" }}
                />
              )}
              <h2>{event.name}</h2>
              <p>{event.description}</p>
              <div className="event-details">
                <span>type : {event.category}</span>
              </div>
            </li>
          ))}
        </ul>

        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
