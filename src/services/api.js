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
    const response = await fetch(API_BASE/login, {
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