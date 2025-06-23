const API_BASE = 'https://e-comm-project-production.up.railway.app';

/* Made a fetching function for reusability- url is the complete endpoint to 
  call while fallback is what gets returned in case of an error- this will be a
  null value or empty array
 */
const getFetch = async (url, fallback) => {
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
  getFetch(`${API_BASE}/items`, []);

// Searches items based on keywords
export const searchItems = (searchQuery) =>
  getFetch(`${API_BASE}/items/search/${encodeURIComponent(searchQuery)}`, []);

// Fetches all item categories
export const getAllCategories = () =>
  getFetch(`${API_BASE}/items/allcategories`, []);

// Fetches all items within an item category
export const getItemsByCategory = (category) =>
  getFetch(`${API_BASE}/items/categories/${encodeURIComponent(category)}`, []);

// Fetches one item by its ID
export const getItemById = (id) =>
  getFetch(`${API_BASE}/items/id/${encodeURIComponent(id)}`, null);