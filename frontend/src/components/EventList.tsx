// EventList.tsx
import React from 'react';

interface Event {
    _id: string;
    name: string;
    category: string;
    date: string; 
  }
  
  interface EventListProps {
    events: Event[];  
  }

  const EventList: React.FC<EventListProps>= ({ events }) => {
  return (
    <div>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            {event.name} - {event.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
