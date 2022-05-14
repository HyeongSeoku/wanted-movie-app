import * as _ from 'lodash'
import styles from './searchInput.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import {
  apiAdditionalData,
  recentSearchWord,
  loadingState,
  searchMovieData,
  searchPageNumber,
  bookMarkList,
} from '../../utils/atoms/atom'
import { moviesApi } from '../../utils/apis/api'
import { DATA_COUNT, FIRST_PAGE } from '../../utils/constants/standard'
import { ApiResData, SearchInputModule, SearchModule } from '../../types/types.d'
import SearchMethod from '../../routes/Search/searchMethod'
import { MESSAGE } from '../../utils/constants/componentsData'

// TODO : search validation 추가

const SearchInput = ({ searchWord, setSearchWord }: SearchInputModule.ISearchInput) => {
  const [recentWord, setRecentWord] = useRecoilState(recentSearchWord)
  const [pageNumber, setPageNumber] = useRecoilState(searchPageNumber)
  const [additionalData, setAdditionalData] = useRecoilState(apiAdditionalData)
  const [isLoading, setIsLoading] = useRecoilState(loadingState)

  const setSearchList = useSetRecoilState(searchMovieData)

  const bookMarkData = useRecoilValue(bookMarkList)

  const resetSeachList = useResetRecoilState(searchMovieData)
  const resetPageNumber = useResetRecoilState(searchPageNumber)

  useEffect(() => {
    if (pageNumber === FIRST_PAGE) {
      callApi(searchWord.trim(), pageNumber)
    }
  }, [pageNumber])

  function callApi(word: string, page: number) {
    setIsLoading(true)
    moviesApi.searchMovielist(word, page).then((res) => {
      const success = res.data.Response.toLowerCase()
      /*
        예외 처리
        - too many results
      */
      const message = res.data.Error

      if (success !== 'false') {
        const totalResultCnt = Number(res.data.totalResults)
        const lastPage = Math.ceil(totalResultCnt / DATA_COUNT)
        const tempList: SearchModule.ISearchMovieList[] = []

        res.data.Search.map((i: ApiResData.ISearchMovieData) => {
          let tmpYear = i.Year.split('–').map((item) => Number(item))
          tmpYear = tmpYear.filter((yearI) => yearI !== 0)

          tempList.push({
            title: i.Title,
            year: tmpYear,
            imdbID: i.imdbID,
            type: i.Type,
            poster: i.Poster,
            bookMark: SearchMethod.existIdBookMarkList(bookMarkData, i.imdbID),
          })
        })
        // 중복제거
        const newData = _.uniqBy(tempList, 'imdbID')

        setTimeout(() => {
          setIsLoading(false)
          setSearchList(newData)
          setAdditionalData({ totalResults: totalResultCnt, lastPageNumber: lastPage })
        }, 1000)
      } else {
        if (message === MESSAGE.NOTFOUND) {
          alert('검색 결과가 없습니다.')
        } else if (message === MESSAGE.TOOMANY) {
          alert('검색어가 너무 짧습니다.')
        }
        resetSeachList()
        console.log(res.data)

        setIsLoading(false)
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
    setRecentWord(searchWord)

    // 검색시 항상 첫번째 페이지 결과를 받아 와야하므로
    setPageNumber(FIRST_PAGE)
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
