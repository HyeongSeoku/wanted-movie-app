import { faSearch, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { componentsData } from '../../types/types'

export const NAV_DATA: componentsData.INavProps[] = [
  { id: 'search_nav', title: '검색', icon: <FontAwesomeIcon icon={faSearch} />, path: '/' },
  { id: 'bookmark_nav', title: '즐겨찾기', icon: <FontAwesomeIcon icon={faBookmark} />, path: '/bookmark' },
]

export const MASSAGE = {}
