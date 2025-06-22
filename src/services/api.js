const API_BASE = 'https://e-comm-project-production.up.railway.app';

// Fetches all items in database
export const getAllItems = async () => {
  try {
    const response = await fetch(`${API_BASE}/items`, {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Searches items based on keywords
export const searchItems = async (searchQuery) => {
  try {
    const response = await fetch(`${API_BASE}/items/search/${encodeURIComponent(searchQuery)}`, {
      method: 'GET'
    })

    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Fetches all item categories
export const getAllCategories = async () => {
  try {
    const response = await fetch(`${API_BASE}/items/allcategories`, {
      method: 'GET'
    })

    if (!response.ok) {
      throw new Error(`Request failed: ${response.statusText}`)
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Fetches all items within an item category
export const getItemsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_BASE}/items/categories/${encodeURIComponent(category)}`, {
      method: 'GET'
    })

    if (!response.ok) {
      throw new Error(`Request failed: ${response.statusText}`)
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Fetches one item according to its ID
export const getItemById = async (id) => {
  try {
  const response = await fetch(`${API_BASE}/items/id/${encodeURIComponent(id)}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}