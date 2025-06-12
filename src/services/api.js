const API_BASE = 'http://localhost:3000';

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
  }
}

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
  }
};

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
  }
}

export const getItemsByCategory = async (catagory) => {
  try {
    const response = await fetch(`${API_BASE}/items/categories/${catagory}`, {
      method: 'GET'
    })

    if (!response.ok) {
      throw new Error(`Request failed: ${response.statusText}`)
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}