import axios from "axios";
export const getMovies = async (num: number) => {
  const res = await axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIDBKEY}&page=${num}&language=en-US`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
  return res;
};

export const getMovieById = async (id:number) => {
  const res = await axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.MOVIDBKEY}`
    )
    .then((response) => {
      
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
    
  return res;
};
