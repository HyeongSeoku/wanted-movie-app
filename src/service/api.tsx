import axios from 'axios'
import { ApiResData } from 'types/types'

const BASE_URL = 'http://www.omdbapi.com/'

interface Params {
  s: string
  page: number
}

export const moviesApi = {
  searchMovielist: (params: Params) => {
    return axios.get<ApiResData.IMovieApiRes>(`${BASE_URL}?apikey=${process.env.REACT_APP_API_KEY}`, {
      params: {
        ...params,
      },
    })
  },
}
