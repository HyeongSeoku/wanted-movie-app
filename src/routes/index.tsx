import styles from './Route.module.scss'
import cx from 'classnames'
import { Route, Routes } from 'react-router-dom'
import Search from './Search'
import BookMark from './BookMark'
import NavBar from '../components/navBar'
import NotFoundPage from './NotFound404'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { bookMarkList } from '../utils/atoms/atom'
import { BOOKMARKLIST } from '../utils/constants/componentsData'

const App = () => {
  const [localStorageData] = useState<string | null>(localStorage.getItem(BOOKMARKLIST))
  const setBookMarkData = useSetRecoilState(bookMarkList)
  const test = useRecoilValue(bookMarkList)

  useEffect(() => {
    if (localStorageData === null) localStorage.setItem(BOOKMARKLIST, JSON.stringify([]))
    else setBookMarkData(JSON.parse(localStorageData))
  }, [])

  useEffect(() => {
    if (localStorageData === null) localStorage.setItem(BOOKMARKLIST, JSON.stringify([]))
    else setBookMarkData(JSON.parse(localStorageData))
  }, [localStorageData])

  useEffect(() => {
    console.log('arr', test)
  }, [test])

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Routes>
            <Route path='/' element={<Search />} />
            <Route path='/bookMark' element={<BookMark />} />
            <Route path='/*' element={<NotFoundPage />} />
          </Routes>
        </div>
        <NavBar />
      </div>
    </div>
  )
}

export default App
