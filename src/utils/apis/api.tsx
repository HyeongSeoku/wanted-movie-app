import axios from 'axios'

const BASE_URL = 'http://www.omdbapi.com/'

const api = axios.create({
  baseURL: `${BASE_URL}`,
})

export const moviesApi = {
  searchMovie: async (word: string, page: number) =>
    api.get(`?apikey=${process.env.REACT_APP_API_KEY}&s=${word}&page=${page}`),
}
