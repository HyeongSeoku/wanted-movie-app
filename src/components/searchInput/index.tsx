import styles from './searchInput.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { useResetRecoilState } from 'recoil'
import { searchPageNumber, movieListState } from 'utils/atoms/atom'
import { useSearchParams } from 'react-router-dom'

// TODO : search validation 추가

const SearchInput = () => {
  const [searchWord, setSearchWord] = useState<string>('')
  const [searchParams, setSearchParams] = useSearchParams()

  const resetMovieList = useResetRecoilState(movieListState)
  const resetPageNumber = useResetRecoilState(searchPageNumber)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setSearchWord(value)
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchWord(searchWord)

    const currentSearchWord = searchParams.get('s')
    if (currentSearchWord === searchWord) return

    resetMovieList()
    resetPageNumber()
    setSearchParams({ s: searchWord })
  }

  return (
    <div className={styles.searchBackDrop}>
      <div className={styles.searchContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <FontAwesomeIcon className={styles.icon} icon={faSearch} />
          <input className={styles.input} placeholder='search' value={searchWord} onChange={handleChange} />
        </form>
      </div>
    </div>
  )
}

export default SearchInput
