import styles from './searchInput.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { searchMovieData } from '../../utils/atoms/atom'
import { moviesApi } from '../../utils/apis/api'

const SearchInput = () => {
  const [searchWord, setSearchWord] = useState<string>('')
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [searchMovie, setSearchMovie] = useRecoilState(searchMovieData)

  useEffect(() => {
    console.log(searchMovie)
  }, [searchMovie])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setSearchWord(value)
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    // API 부분
    moviesApi.searchMovie(searchWord, pageNumber).then((res) => {
      const success = res.data.Response.toLowerCase()
      if (success !== 'false' && res.data.Search !== undefined) {
        setSearchMovie(res.data.Search)
      }
    })
  }

  // 최하단 스크롤시 페이지 넘버 증가시키는 함수 추가
  // setSearchMovie((prev) => [...prev, ...res.data.Search])

  return (
    <div className={styles.searchContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <FontAwesomeIcon className={styles.icon} icon={faSearch} />
        <input className={styles.input} placeholder='search' value={searchWord} onChange={handleChange} />
      </form>
    </div>
  )
}

export default SearchInput
