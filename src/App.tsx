import React from 'react';
import './App.css';

// React Router Dom Imports
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes/Routes';
import { StickyFooter } from './components/dashboard/StickyFooter';


function App() {
  return (
    <div className="App">
      <Router>
        <AppRoutes />
      </Router>
      <StickyFooter />
    </div>
  );
}

export default App;
