const API_BASE = 'https://e-comm-project-production.up.railway.app';

/* Made a req endpoint to call. Url is the complete endpoint to call. Method is
 the method of the request. Body is the body of the request. Fallback is what 
 gets returned in case of an error- this will be a null value or empty array.
 */
const cleanRequest = async (url, method, body, fallback) => {
  try {
    const options = {
      method: method,
      credentials: 'include',
    }

    if (body !== null) {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`[Fetch error] ${url}`, error);
    return fallback;
  }
};

// Uses of cleanRequest for each method
const cleanGet = (url, fallback) => cleanRequest(url, 'GET', null, fallback);
const cleanPost = (url, body, fallback) => cleanRequest(url, 'POST', body, fallback);
const cleanPut = (url, body, fallback) => cleanRequest(url, 'PUT', body, fallback);
const cleanDel = (url) => cleanRequest(url, 'DELETE', null, null);

// Fetches all items in the database
const getAllItems = () =>
  cleanGet(`${API_BASE}/items`, []);

// Searches items based on keywords
const searchItems = (searchQuery) =>
  cleanGet(`${API_BASE}/items/search/${encodeURIComponent(searchQuery)}`, []);

// Fetches all item categories
const getAllCategories = () =>
  cleanGet(`${API_BASE}/items/allcategories`, []);

// Fetches all items within an item category
const getItemsByCategory = (category) =>
  cleanGet(`${API_BASE}/items/categories/${encodeURIComponent(category)}`, []);

// Fetches one item by its ID
const getItemById = (id) =>
  cleanGet(`${API_BASE}/items/id/${encodeURIComponent(id)}`, null);

const getCart = async () => {
  try {
    // First verify the user is authenticated
    const user = await currentUser();
    if (!user) {
      console.log('No authenticated user found');
      return { items: [] };
    }

    const response = await fetch(`${API_BASE}/cart`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    // Log the raw response for debugging
    console.log('Cart response status:', response.status);
    const responseData = await response.json();
    console.log('Cart response data:', responseData);

    if (!response.ok) {
      // Return empty cart for any error
      console.error('Cart fetch error:', responseData);
      return { items: [] };
    }

    // If we have valid cart data, return it
    if (responseData && responseData.items) {
      return { items: responseData.items || [] };
    }

    // Default to empty cart
    return { items: [] };

  } catch (error) {
    console.error('Cart fetch error:', error);
    return { items: [] };
  }
};

// Update updateCart to better handle errors
const updateCart = async (items) => {
  try {
    const response = await fetch(`${API_BASE}/cart`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ items })
    });

    if (!response.ok) {
      throw new Error('Failed to update cart');
    }

    return await response.json();
  } catch (error) {
    console.error('Update cart error:', error);
    return { items: [] };
  }
};

// For getting reviews by item id
const getReviewsByItemId = (id) =>
  cleanGet(`${API_BASE}/reviews/items/${encodeURIComponent(id)}`, []);

// For gettting all the user's reviews
const getUserReviews = () => 
  cleanGet(`${API_BASE}/reviews`, []);

// For posting a review
const postReview = (itemID, rating, comment) =>
  cleanPost(`${API_BASE}/reviews`, { itemID, rating, comment }, null);

// For updating a review
const updateReview = (reviewID, rating, comment) =>
  cleanPut(`${API_BASE}/reviews/${encodeURIComponent(reviewID)}`, { rating, comment }, null);

// For deleting a review
const deleteReview = (reviewID) =>
  cleanDel(`${API_BASE}/reviews/${encodeURIComponent(reviewID)}`);

// For logging in
const login = (email, password) =>
  cleanPost(`${API_BASE}/login`, { email, password }, null);

//For logging out
const logout = async () => 
  cleanPost(`${API_BASE}/logout`, null, null);

// Checks if there's a current session
const currentUser = async () => 
  cleanGet(`${API_BASE}/user`, null);

// For signing up
const signup = async (userData) => 
  cleanPost(`${API_BASE}/signup`, userData, null);

// For 

export {
  getAllItems,
  searchItems,
  getAllCategories,
  getItemsByCategory,
  getItemById,
  getCart,
  updateCart,
  getReviewsByItemId,
  getUserReviews,
  postReview,
  updateReview,
  deleteReview,
  login,
  logout,
  currentUser,
  signup
};