import { atom } from 'recoil'
import { ApiResData, SearchModule } from '../../types/types.d'

export const themeMode = atom<string>({
  key: '#themeMode',
  default: 'light',
})

export const currentNav = atom<string>({
  key: '#currentNav',
  default: 'search_nav',
})

export const currentSearchWord = atom<string>({
  key: '#currentSearchWord',
  default: '',
})

export const searchMovieData = atom<SearchModule.ISearchMovieList[]>({
  key: '#searchMovieData',
  default: [],
})

export const searchPageNumber = atom<number>({
  key: '#searchPageNumber',
  default: 0,
})

export const apiAdditionalData = atom<ApiResData.IAdditionalData>({
  key: '#apiAdditionalData',
  default: { totalResults: 0, lastPageNumber: 0 },
})
