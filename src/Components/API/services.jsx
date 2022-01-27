import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";
const KEY = "24382871-0dfafbe4154b35f3845ecea69";

export const fetchImagesWithQuery = async (searchQuery, counter) => {
  const response = await axios.get(
    `?q=${searchQuery}&page=${counter}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits;
};
