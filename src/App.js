import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import UserProfile from './pages/UserProfile'
import CartPage from './pages/CartPage';
import ItemPage from './pages/ItemPage';
import CheckoutPage from './pages/CheckoutPage';
import PurchasePage from './pages/PurchasePage'
import UserPurchasesPage from './pages/UserPurchasesPage';
import ReviewPage from './pages/ReviewPage';
import ItemReviewsPage from './pages/ItemReviewsPage';
import UserReviewsPage from './pages/UserReviewsPage';


function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]); // hang on, hang on

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const addToCart = (itemId, quantity) => { // hang on, hang on
    const updateCart = [...cart];
    updateCart.push({itemId: itemId, quantity: quantity})
  };

  return (
    <div className="App">
      <header className="App-header">
        <img className="daintree-logo" alt="Daintree Logo" />
        <div className="right-header">
          <div className="search">
            <input
              id="search"
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/cart">Cart</Link>
            <img className="hambuger" alt="User Menu" />
            <ul>
              <li><Link to="/profile">My Profile</Link></li>
              <li><Link to="/mypurchases">My Purchases</Link></li>
              <li><Link to="/myreviews">My Reviews</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/profile" element={<UserProfile/>} />
        <Route path="/item/:id" element={<ItemPage/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/checkout" element={<CheckoutPage/>} />
        <Route path="/mypurchases" element={<UserPurchasesPage/>} />
        <Route path="/purchases/:id" element={<PurchasePage/>} />
        <Route path="/reviews/:id" element={<ReviewPage/>} />
        <Route path="/reviews/:itemId/:id" element={<ItemReviewsPage/>} />
        <Route path="/myreviews" element={<UserReviewsPage/>} />
      </Routes>
    </div>
  );
}

export default App;
