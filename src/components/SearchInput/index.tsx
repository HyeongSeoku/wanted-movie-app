import styles from './SearchInput.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'

function SearchInput() {
  const [searchWord, setSearchWord] = useState<string>('')

  useEffect(() => {
    console.log(searchWord)
  }, [searchWord])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setSearchWord(value)
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    // API 부분
    console.log('제출됐습니다.', searchWord)
    setSearchWord('')
  }

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit}>
        <FontAwesomeIcon className={styles.icon} icon={faSearch} />
        <input className={styles.input} placeholder='search' value={searchWord} onChange={handleChange} />
      </form>
    </div>
  )
}

export default SearchInput
