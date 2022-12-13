import axios from "axios";
export const getMovies = async (num: number) => {
  const res=await axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIDBKEY}&page=${num}&language=en-US`
    )
    .then((response) => {
        
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
    return res
};
