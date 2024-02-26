import axios from 'axios';

const API_KEY = '42510436-747a3ee758966b4b69f3c3ec4';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (value, currentPage) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: value,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: currentPage,
        per_page: 15,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error in fetchImages:', error);
    throw error;
  }
};