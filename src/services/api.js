const API_BASE = 'https://e-comm-project-production.up.railway.app';

/* Made a fetching function for GET requests reusability- url is the complete 
  endpoint to call while fallback is what gets returned in case of an error- 
  this will be a null value or empty array
 */
const cleanGet = async (url, fallback) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`[Fetch error] ${url}`, error);
    return fallback;
  }
};

// Fetches all items in the database
export const getAllItems = () =>
  cleanGet(`${API_BASE}/items`, []);

// Searches items based on keywords
export const searchItems = (searchQuery) =>
  cleanGet(`${API_BASE}/items/search/${encodeURIComponent(searchQuery)}`, []);

// Fetches all item categories
export const getAllCategories = () =>
  cleanGet(`${API_BASE}/items/allcategories`, []);

// Fetches all items within an item category
export const getItemsByCategory = (category) =>
  cleanGet(`${API_BASE}/items/categories/${encodeURIComponent(category)}`, []);

// Fetches one item by its ID
export const getItemById = (id) =>
  cleanGet(`${API_BASE}/items/id/${encodeURIComponent(id)}`, null);

// For logging in
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email, password})
    });
    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`[Login error] ${API_BASE}/login`, error);
  }
}

//For logging out
export const logout = async () => {
  try {
    const response = await fetch(`${API_BASE}/logout`, {
      method: 'GET',
      credentials: 'include'
    });
    return await response.json();
  } catch (error) {
    console.error(`[Logout error] ${API_BASE}/logout`, error);
  }
};

// Checks if there's a current session
export const currentUser = async () => {
  try {
    const response = await fetch(`${API_BASE}/user`, {
      method: 'GET',
      credentials: 'include'
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error(`[Session error] ${API_BASE}/session`, error);
    return null;
  }
};

// For signing up
export const signup = async (userData) => {
  try {
    const response = await fetch(`${API_BASE}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error(`Signup failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`[Signup error] ${API_BASE}/signup`, error);
    return null;
  }
}

// Explicit named exports to satisfy bundlers picking up tree-shaken symbols
export {
  getAllItems,
  searchItems,
  getAllCategories,
  getItemsByCategory,
  getItemById,
  login,
  logout,
  currentUser,
  signup
};