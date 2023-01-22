export { fetchArticles };
import axios from 'axios';

const KEY = '32999305-dd322609f910976659da09787'
const BASE_URL = 'https://pixabay.com/api/';

async function fetchArticles(searchQuery, page = 1) {
  const response = await axios.get(
    `${BASE_URL}?key=${KEY}&q=${searchQuery}&image_type=photo&orientation =horizontal&safesearch =true&per_page=40&page=${page}`
  );
  return response.data;
}