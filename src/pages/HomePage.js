import { useState, useEffect } from 'react';
import { searchItems } from '../services/api.js';

import './HomePage.css';

function HomePage() {
  return (
    <div className="HomePage">
      <h1>Welcome to Daintree Store</h1>
    </div>
  )
}

export default HomePage;