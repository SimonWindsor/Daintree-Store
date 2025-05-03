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

import homeIcon from './assets/home.png';
import cartIcon from './assets/cart.png';
import hamburgerIcon from './assets/hamburger.png';


function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState([]); // hang on, hang on

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const addToCart = (itemId, quantity) => { // hang on, hang on
    const updateCart = [...cart];
    updateCart.push({itemId: itemId, quantity: quantity})
  };

  const showOrHideMenu = () => {
    if (menuOpen) { 
      return (
        <ul>
          <li><Link to="/profile">My Profile</Link></li>
          <li><Link to="/mypurchases">My Purchases</Link></li>
          <li><Link to="/myreviews">My Reviews</Link></li>
        </ul>
      )
    } else {
      return null;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img className="daintree-logo" alt="Daintree Logo" />
    
          <div className="search">
            <input
              id="search"
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button></button>
          </div>
          
          <nav>
            <Link to="/">
              <img 
                className="home"
                src={homeIcon}
                alt="Home"
              />
            </Link>
            <Link to="/cart">
              <img className="cart" src={cartIcon} alt="Cart"/>
            </Link>
            <img 
              className="hamburger" 
              src={hamburgerIcon} alt="User Menu" 
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {showOrHideMenu() /* Toggles hamburger menu */}
          </nav>

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
