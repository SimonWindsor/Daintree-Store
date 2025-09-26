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
//const cleanPut = (url, body, fallback) => cleanRequest(url, 'PUT', body, fallback);
//const cleanDel = (url) => cleanRequest(url, 'DELETE', null, null);

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

// Fetches user's cart
const getCart = (email) =>
  cleanGet(`${API_BASE}/cart/${encodeURIComponent(email)}`, []);

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

export {
  getAllItems,
  searchItems,
  getAllCategories,
  getItemsByCategory,
  getItemById,
  getCart
  login,
  logout,
  currentUser,
  signup
};