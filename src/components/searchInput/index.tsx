import styles from './searchInput.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { searchMovieData, searchPageNumber } from '../../utils/atoms/atom'
import { moviesApi } from '../../utils/apis/api'

// TODO : search validation 추가

const SearchInput = () => {
  const [searchWord, setSearchWord] = useState<string>('')

  const [pageNumber, setPageNumber] = useRecoilState(searchPageNumber)
  const setSearchList = useSetRecoilState(searchMovieData)

  const resetSeachList = useResetRecoilState(searchMovieData)
  const resetPageNumber = useResetRecoilState(searchPageNumber)

  useEffect(() => {
    if (pageNumber !== 0) {
      callApi(searchWord, pageNumber)
    }
  }, [pageNumber])

  function callApi(word: string, page: number) {
    moviesApi.searchMovielist(word, page).then((res) => {
      const success = res.data.Response.toLowerCase()
      const message = res.data.Error

      if (success !== 'false') {
        setSearchList(res.data.Search)
      } else {
        resetSeachList()
        console.log(message)
      }
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setSearchWord(value)

    // 검색어가 변화 했을경우 페이지 넘버를 초기화
    if (pageNumber !== 0) resetPageNumber()
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    // 검색시 항상 첫번째 페이지 결과를 받아 와야하므로
    setPageNumber(1)
  }

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
