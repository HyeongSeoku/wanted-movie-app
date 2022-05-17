import styles from './Route.module.scss'
import { Route, Routes } from 'react-router-dom'
import Search from './Search'
import BookMark from './BookMark'
import NavBar from '../components/navBar'
import NotFoundPage from './NotFound404'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { bookMarkList } from 'utils/atoms/atom'
import { BOOKMARKLIST } from 'utils/constants/componentsData'
import { useMount } from 'react-use'
import { getLocalStorage, setLocalStorage } from 'service/store'

const App = () => {
  const setBookMarkData = useSetRecoilState(bookMarkList)

  useMount(() => {
    if (getLocalStorage(BOOKMARKLIST) === null) setLocalStorage(BOOKMARKLIST, [])
    else setBookMarkData(getLocalStorage(BOOKMARKLIST))
  })

  useEffect(() => {
    if (getLocalStorage(BOOKMARKLIST) !== null) setBookMarkData(getLocalStorage(BOOKMARKLIST))
  }, [setBookMarkData])

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Routes>
            <Route path='/' element={<Search />} />
            <Route path='bookMark' element={<BookMark />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>
        <NavBar />
      </div>
    </div>
  )
}

export default App
