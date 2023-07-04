import React from 'react';
import './App.css';
import MatchCarousel from './components/MatchCarousel';

function App() {
  return (
    <div className="App">
      <h2>Match Carousel Example Max 15</h2>
      <MatchCarousel max={15} />
      <h2 style={{ marginTop: 20 }}>Match Carousel Example Sport Id 2</h2>
      <MatchCarousel sportId={2} />
    </div>
  );
}

export default App;
