import styles from './Route.module.scss'
import cx from 'classnames'
import { Route, Routes } from 'react-router-dom'
import Search from './Search'
import BookMark from './BookMark'
import NavBar from '../components/navBar'

const App = () => {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Routes>
            <Route path='/' element={<Search />} />
            <Route path='/bookMark' element={<BookMark />} />
          </Routes>
        </div>
        <NavBar />
      </div>
    </div>
  )
}

export default App
