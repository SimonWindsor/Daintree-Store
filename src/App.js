import React, { useState, createContext, useCallback } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import UserProfile from './pages/UserProfile';
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage';
import ItemPage from './pages/ItemPage';
import CheckoutPage from './pages/CheckoutPage';
import PurchasePage from './pages/PurchasePage'
import UserPurchasesPage from './pages/UserPurchasesPage';
import ReviewPage from './pages/ReviewPage';
import ItemReviewsPage from './pages/ItemReviewsPage';
import UserReviewsPage from './pages/UserReviewsPage';

import daintreelogo from './assets/daintreelogo.png';
import homeIcon from './assets/home.png';
import cartIcon from './assets/cart.png';
import hamburgerIcon from './assets/hamburger.png';
import searchIcon from './assets/search.png';
import loadingIcon from './assets/loading.png';

export const FunctionContext = createContext();

function App() {
  const [searchQuery, setSearchQuery] = useState(''); // For handling search query
  const [menuOpen, setMenuOpen] = useState(false); // For controlling user-menu
  const [loading, setLoading] = useState(false); // For showing loading icon
  // Below is where the cart will be implemented
  // const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Below to be implemented in next iteration
  // const addToCart = (itemId, quantity) => {
  //   const updateCart = [...cart];
  //   updateCart.push({itemId: itemId, quantity: quantity})
  // };

  // Opens up a user menu for logged-in user. Activated by hamburger menu
  const showOrHideMenu = () => {
    if (menuOpen) { 
      return (
        <ul>
          <li><Link className="menu-item" to="/profile">My Profile</Link></li>
          <li><Link className="menu-item" to="/mypurchases">My Purchases</Link></li>
          <li><Link className="menu-item" to="/myreviews">My Reviews</Link></li>
        </ul>
      )
    } else {
      return null;
    }
  };

  const handleLoading = useCallback((trueOrFalse) => {
    setLoading(trueOrFalse);
  });

  return (
    <div className="App">
      <header className="app-header">
        <img className="daintree-logo" alt="Daintree Logo" src={daintreelogo} />
          {/*Displays the search controls*/}
          <form 
            className="search"
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/search/${encodeURIComponent(searchQuery)}`);
            }}
          >
            <input
              id="search"
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit" className="search-btn">
              <img src={searchIcon} alt="Search" />
            </button>
          </form>
          
          {/* Displays home, cart, and hamburger menu buttons */}
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

      {/* Shows when loading state is true */}
      <img id="loadingIcon" src={loadingIcon} hidden={!loading} alt="Loading..." />

      {/* Main container for the App and its routes. */}
      <div className='app-container'>
        <FunctionContext.Provider value={{ /* Implemented in next iteration for cart */ }}>
          <Routes>
            <Route path="/" element={<HomePage handleLoading={handleLoading} />} />
            <Route path="/profile" element={<UserProfile/>} />
            <Route path="/search/:searchQuery" element={<SearchPage handleLoading={handleLoading} />} />
            <Route path="/item/:id" element={<ItemPage handleLoading={handleLoading} />} />
            <Route path="/cart" element={<CartPage handleLoading={handleLoading}/>}  />
            <Route path="/checkout" element={<CheckoutPage/>} />
            <Route path="/mypurchases" element={<UserPurchasesPage/>} />
            <Route path="/purchases/:id" element={<PurchasePage/>} />
            <Route path="/reviews/:id" element={<ReviewPage/>} />
            <Route path="/reviews/:itemId/:id" element={<ItemReviewsPage/>} />
            <Route path="/myreviews" element={<UserReviewsPage/>} />
          </Routes>
        </FunctionContext.Provider>
        <div id="footer">2025 S.N.W</div>
      </div>
    </div>
  );
}

export default App;
