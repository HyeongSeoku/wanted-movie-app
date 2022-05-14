import React, { useEffect, useState } from 'react'
import * as _ from 'lodash'
import styles from './Search.module.scss'
import cx from 'classnames'
import SearchInput from '../../components/searchInput'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import {
  apiAdditionalData,
  recentSearchWord,
  loadingState,
  modalCurrnetData,
  modalOpen,
  searchMovieData,
  searchPageNumber,
} from '../../utils/atoms/atom'
import MovieCard from '../../components/movieCard'
import { moviesApi } from '../../utils/apis/api'
import { FIRST_PAGE } from '../../utils/constants/standard'
import { useInView } from 'react-intersection-observer'
import { ApiResData, SearchModule } from '../../types/types.d'
import Modal from '../../components/modal'
import Loader from '../../components/loader'
import { BOOKMARKLIST } from '../../utils/constants/componentsData'
import SearchMethod from './searchMethod'

const Search = (): JSX.Element => {
  const [localStorageData] = useState<string | null>(localStorage.getItem(BOOKMARKLIST))
  const [nowSearchValue, setNowSearchValue] = useState<string>('')
  const [searchMovieList, setSearchMovieList] = useRecoilState(searchMovieData)
  const [additionalData, setAdditionalData] = useRecoilState(apiAdditionalData)

  const recentWord = useRecoilValue(recentSearchWord)
  const modalData = useRecoilValue(modalCurrnetData)
  const [pageNumber, setPageNumber] = useRecoilState(searchPageNumber)
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalOpen)
  const [isLoading, setIsLoading] = useRecoilState(loadingState)

  const resetSeachList = useResetRecoilState(searchMovieData)
  const resetPageNumber = useResetRecoilState(searchPageNumber)
  const resetAdditionalData = useResetRecoilState(apiAdditionalData)

  const [ref, inView] = useInView()

  // useEffect 페이지 증가 감지 => api  실행
  useEffect(() => {
    if (additionalData.lastPageNumber > 1) {
      if (pageNumber !== FIRST_PAGE && pageNumber !== 0) callMoreApiData(pageNumber)
    }
  }, [pageNumber])

  useEffect(() => {
    if (inView) {
      if (pageNumber < additionalData.lastPageNumber && nowSearchValue.trim() === recentWord.trim())
        setPageNumber((prev) => prev + 1)
    } else if (nowSearchValue.trim() !== recentWord.trim()) {
      alert('검색어 변경이 감지되었습니다.')
      resetAllData()
    }
  }, [inView])

  function callMoreApiData(page: number) {
    setIsLoading(true)
    moviesApi.searchMovielist(recentWord, page).then((res) => {
      const dataList = res.data.Search

      let tmpList: SearchModule.ISearchMovieList[] = []
      if (dataList !== undefined) {
        dataList.map((i: ApiResData.ISearchMovieData) => {
          let tmpYear = i.Year.split('–').map((item) => Number(item))
          tmpYear = tmpYear.filter((yearI) => yearI !== 0)

          // 데이터 처리
          tmpList.push({
            title: i.Title,
            year: tmpYear,
            imdbID: i.imdbID,
            type: i.Type,
            poster: i.Poster,
            bookmarked: SearchMethod.existIdBookMarkList(i.imdbID),
          })
        })

        tmpList = searchMovieList.concat(tmpList)
        tmpList = _.uniqBy(tmpList, 'imdbID')

        setIsLoading(false)
        setSearchMovieList(tmpList)
      }
    })
  }

  function resetAllData() {
    resetSeachList()
    resetPageNumber()
    resetAdditionalData()
  }

  return (
    <div className={styles.searchSection}>
      <Modal
        title={modalData.title}
        year={modalData.year}
        imdbID={modalData.imdbID}
        type={modalData.type}
        poster={modalData.poster}
        bookmarked={modalData.bookmarked}
      />
      {isLoading && <Loader />}
      <main className={styles.searchMain}>
        <SearchInput searchWord={nowSearchValue} setSearchWord={setNowSearchValue} />
        <section className={styles.movieSection}>
          {searchMovieList.length !== 0 ? (
            searchMovieList.map((movie, idx) => (
              <React.Fragment key={`movie_${movie.imdbID}`}>
                {searchMovieList.length - 1 === idx ? (
                  <div ref={ref}>
                    <MovieCard
                      title={movie.title}
                      year={movie.year}
                      imdbID={movie.imdbID}
                      type={movie.type}
                      poster={movie.poster}
                      bookmarked={movie.bookmarked}
                    />
                  </div>
                ) : (
                  <MovieCard
                    title={movie.title}
                    year={movie.year}
                    imdbID={movie.imdbID}
                    type={movie.type}
                    poster={movie.poster}
                    bookmarked={movie.bookmarked}
                  />
                )}
              </React.Fragment>
            ))
          ) : (
            <div>검색 결과가 없습니다. </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default Search
