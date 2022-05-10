import { atom } from 'recoil'
import { ApiResData } from '../../types/types'

export const themeMode = atom<string>({
  key: 'themeMode',
  default: 'light',
})

export const currentNav = atom<string>({
  key: 'currentNav',
  default: 'search_nav',
})

export const searchMovieData = atom<ApiResData.ISearchMovieData[]>({
  key: 'searchMovieData',
  default: [],
})
