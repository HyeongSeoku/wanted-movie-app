import axios from 'axios'
import { ApiResData } from 'types/types'

const BASE_URL = 'http://www.omdbapi.com/'

interface Params {
  s: string
  page: number
}

export const moviesApi = {
  searchMovielist: (params: Params) => {
    console.log(params)
    return axios.get<ApiResData.IMovieApiRes>(`${BASE_URL}?apikey=${process.env.REACT_APP_API_KEY}`, {
      params: {
        ...params,
      },
    })
  },
}

// api.get(`?apikey=${process.env.REACT_APP_API_KEY}&s=${word}&page=${page}`),
