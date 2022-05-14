import { BookMarkModule } from '../../types/types.d'
import { BOOKMARKLIST } from '../../utils/constants/componentsData'

const SearchMethod = {
  existIdBookMarkList: (imdbID: string) => {
    const data = localStorage.getItem(BOOKMARKLIST)
    let index
    if (data !== null) {
      const arr = JSON.parse(data)
      index = arr.findIndex((item: BookMarkModule.IBookMarkModule) => item.imdbID === imdbID)
    }
    if (index !== -1) return true
    return false
  },
}

export default SearchMethod
