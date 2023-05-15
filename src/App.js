import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DressRegistration from './pages/DressRegistration';
import SelectDress from './pages/Alldresses';
import ExistingDresses from './pages/ExistingDresses';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<DressRegistration />} />
        <Route path="/select-dress" element={<SelectDress />} />
        <Route path="/view-dress" element={<ExistingDresses />} />

      </Routes>
    </Router>
  );
}

export default App;
