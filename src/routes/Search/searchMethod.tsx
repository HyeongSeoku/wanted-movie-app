import { BookMarkModule } from 'types/types.d'

const SearchMethod = {
  existIdBookMarkList: (arr: BookMarkModule.IBookMarkModule[], imdbID: string) => {
    const index = arr.findIndex((item) => item.imdbID === imdbID)
    if (index !== -1) return true

    return false
  },
}

export default SearchMethod
