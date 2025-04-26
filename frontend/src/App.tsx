import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import EventPage from './pages/EventPage';
import './App.css'

const App = () => {
  return (
    <Provider store={store}>
      <EventPage />
    </Provider>
  );
};

export default App;
