import styles from './Search.module.scss'
import cx from 'classnames'
import SearchInput from '../../components/SearchInput'

function Search() {
  return (
    <div className={styles.searchSection}>
      <h2>검색</h2>
      <SearchInput />
    </div>
  )
}

export default Search
