import axios from "axios";

// const instance = axios.create({
//     baseURL: "https://api.unsplash.com",
// })

// export const requestImages = async () => {
//     const { data } = await instance.get("/photos/?client_id=FVHLc2QFbVVLkf9JsQjfHpsnQcDmxTgEvRJr1m7vJBk")
//     return data
// }
// export const requestImagesByQuery = async (query = '', page = 1) => {
//     const { data } = await instance.get(`/search/photos/?client_id=FVHLc2QFbVVLkf9JsQjfHpsnQcDmxTgEvRJr1m7vJBk&query=${query}&page=${page}`)
//     return data
// }



axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const API_KEY = "b101889254ba0539f51aa4769f4bbe68";
const token =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTAxODg5MjU0YmEwNTM5ZjUxYWE0NzY5ZjRiYmU2OCIsInN1YiI6IjY2MTI4ZmVkNjdkY2M5MDE0OTliNjQyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3j5bx9VjOiJ_C4B8L53NieFOKRM7U3R4NzFijqxC9Rk";

axios.defaults.headers.common["Authorization"] = token;

export const fetchTrendingList = async () => {
  const response = await axios.get(`/trending/all/day?api_key=${API_KEY}`);
  const { results } = response.data;
  return results;
};

export const fetchMoviesBySearch = async (query) => {
  const response = await axios.get(
    `/search/movie?query=${query}&api_key=${API_KEY}`
  );
  const { results } = response.data;
  return results;
};

export const fetchMovieById = async (movieId) => {
  try {
    const response = await axios.get(`/movie/${movieId}?api_key=${API_KEY}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { error: "Oops! Movie not found" };
    } else {
      return { error: "Oops! Something went wrong! Please reload the page!" };
    }
  }
};

export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(
    `/movie/${movieId}/credits?api_key=${API_KEY}`
  );
  const { cast } = response.data;
  return cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(
    `/movie/${movieId}/reviews?api_key=${API_KEY}`
  );
  const { results } = response.data;
  return results;
};