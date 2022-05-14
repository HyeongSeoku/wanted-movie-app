import { atom } from 'recoil'
import { ApiResData, BookMarkModule, ModalModule, SearchModule } from '../../types/types.d'

export const themeMode = atom<string>({
  key: '#themeMode',
  default: 'light',
})

export const currentNav = atom<string>({
  key: '#currentNav',
  default: 'search_nav',
})

export const recentSearchWord = atom<string>({
  key: '#recentSearchWord',
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

export const modalOpen = atom<boolean>({
  key: '#modalOpen',
  default: false,
})

export const modalCurrnetData = atom<ModalModule.IModalData>({
  key: '#modalCurrnetData',
  default: { title: '', year: [], imdbID: '', type: '', poster: '', bookmarked: false },
})

export const loadingState = atom<boolean>({
  key: '#loadingState',
  default: false,
})

// bookmark
export const bookMarkList = atom<BookMarkModule.IBookMarkModule[]>({
  key: '#BookMarkList',
  default: [],
})
