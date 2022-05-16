import store from 'storejs'
import { MovieListData } from 'types/types'

export const setLocalStorage = (key: string, value: MovieListData.IMovieList[]) => {
  store.set(key, value)
}

export const getLocalStorage = (key: string) => {
  return store.get(key)
}
