import React, { useState, createContext, useCallback, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import UserProfile from './pages/UserProfile';
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage';
import ItemPage from './pages/ItemPage';
import CheckoutPage from './pages/CheckoutPage';
import PurchasePage from './pages/PurchasePage'
import UserPurchasesPage from './pages/UserPurchasesPage';
import WriteReviewPage from './pages/WriteReviewPage';
import UserReviewsPage from './pages/UserReviewsPage';

import daintreelogo from './assets/daintreelogo.png';
import homeIcon from './assets/home.png';
import cartIcon from './assets/cart.png';
import hamburgerIcon from './assets/hamburger.png';
import searchIcon from './assets/search.png';
import loadingIcon from './assets/loading.png';
import { logout, currentUser, getCart, updateCart } from './services/api';

export const FunctionContext = createContext();

function App() {
  const [searchQuery, setSearchQuery] = useState(''); // For handling search query
  const [menuOpen, setMenuOpen] = useState(false); // For controlling user-menu
  const [loading, setLoading] = useState(false); // For showing loading icon
  const [user, setUser] = useState(null); // For controlling user-menu and login state
  const [cart, setCart] = useState([]); // For storing the cart
  const navigate = useNavigate(); // For navigating to outher pages/routes

  // Memoizes the function so it is not called on every render of other pages/componets
  // May change to setLoading(!loading) later but needs to be this way for now
  const handleLoading = useCallback((trueOrFalse) => {
    setLoading(trueOrFalse);
  }, []);

  // Handles async functions that use handleLoading
  const withLoading = useCallback(async (callback) => {
    try {
      handleLoading(true);
      await callback();
    } catch (error) {
      console.error(error);
    } finally {
      handleLoading(false);
    }
  }, [handleLoading]);

  useEffect(() => {
    const fetchUserAndCart = async () => {
      await withLoading(async () => {
        try {
          const currentUserData = await currentUser();
          
          if (currentUserData) {
            setUser(currentUserData);
            try {
              const serverCart = await getCart();
              if (serverCart && serverCart.items) {
                setCart(serverCart.items);
              } else {
                console.log('No items in cart, setting empty array');
                setCart([]);
              }
            } catch (cartError) {
              console.error('Cart fetch error details:', cartError); // Detailed cart error
              setCart([]);
            }
          } else {
            console.log('No user data returned from currentUser()');
            setUser(null);
            setCart([]);
          }
        } catch (error) {
          console.error('Main fetch error:', error);
          setUser(null);
          setCart([]);
        }
      });
    };

    fetchUserAndCart();
  }, [user?.email, withLoading]);

  useEffect(() => {
    /* Handles cart changes. If not logged in, persists cart to localStorage.
     If logged in, syncs cart to server (upserts on conflict). */
    (async () => {
      if (!user && cart.length > 0) {
        localStorage.setItem("cartItems", JSON.stringify(cart));
      } else if (user && cart.length > 0) {
        await updateCart(cart);
      }
    })();
  }, [cart, user]);

  // Handles search query changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Logs the user out
  const handleLogout = async () => {
    await logout();
    setUser(null);
    setCart([]);
    navigate('/');
  };

  // For quickly adding an item to a cart
  const addToCart = async (itemId, quantity) => {
    await withLoading(async () => {
      // Check if item already exists in cart
      const existingItem = cart.find(item => item.itemId === itemId);
      
      let updatedCart;
      if (existingItem) {
        // If item exists, update its quantity
        updatedCart = cart.map(item => 
          item.itemId === itemId 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // If item doesn't exist, add it
        updatedCart = [...cart, { itemId, quantity }];
      }
      
      await updateCart(updatedCart);
      setCart(updatedCart);
    });
  };

  // Updates number of items already in cart, or removes them
  const updateCartItem = async (itemId, quantity) => {
    await withLoading(async () => {
      let updatedCart;
      
      if (quantity > 0) {
        updatedCart = cart.map(item => 
          item.itemId === itemId ? { ...item, quantity } : item
        );
      } else {
        updatedCart = cart.filter(item => item.itemId !== itemId);
      }
      
      await updateCart(updatedCart);
      setCart(updatedCart);
    });
  };

  // Clears the cart
  const clearCart = () => setCart([]);

  // Opens up a user menu for logged-in user. Activated by hamburger menu
  const showOrHideMenu = () => {
    if (menuOpen) { 
      return (
        <ul onClick={() => setMenuOpen(false)}>
          <li><Link className="menu-item" to="/profile">My Profile</Link></li>
          <li><Link className="menu-item" to="/mypurchases">My Purchases</Link></li>
          <li><Link className="menu-item" to="/myreviews">My Reviews</Link></li>
          <li><span className="menu-item" onClick={handleLogout}>Logout</span></li>
        </ul>
      )
    } else {
      return null;
    }
  };

  return (
    <div className="App">
      {/* Header flexbox section containing logo, search bar, and navigation 
      buttons, in three sections below */}
      <header className="app-header">
        {/*Displays logo*/}
        <img className="daintree-logo" alt="Daintree Logo" src={daintreelogo} />
        
        {/*Displays the search controls */}
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
        
        {/* Displays home, cart, and hamburger menu buttons. If not logged in 
        then login link will show instead*/}
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
          {user ? (
            <div>
              <img 
                className="hamburger" 
                src={hamburgerIcon} alt="User Menu" 
                onClick={() => setMenuOpen(!menuOpen)}
              />
              {showOrHideMenu() /* Toggles hamburger menu */}
            </div>
          ) : (
            /*Displays login link instead of hamburger if not logged in */
            <Link className="login-link" to="/login">Log in</Link>
          )}
        </nav>

      </header>

      {/* Shows when loading state is true */}
      <img id="loadingIcon" src={loadingIcon} hidden={!loading} alt="Loading..." />

      {/* Main container for the App and its routes. */}
      <div className='app-container'>
        <FunctionContext.Provider
          value={{
            withLoading,
            cart,
            addToCart,
            updateCartItem,
            clearCart,
            user,
            setUser,
            handleLogout
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/search/:searchQuery" element={<SearchPage />} />
            <Route path="/item/:id" element={<ItemPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/mypurchases" element={<UserPurchasesPage />} />
            <Route path="/purchases" element={<PurchasePage />} />
            <Route path="/writereview/:id" element={<WriteReviewPage />} />
            <Route path="/myreviews" element={<UserReviewsPage />} />
          </Routes>
        </FunctionContext.Provider>
        <div id="footer">2025 S.N.W</div>
      </div>
    </div>
  );
}

export default App;
