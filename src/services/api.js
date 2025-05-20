const API_BASE = 'http://localhost:3000';

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