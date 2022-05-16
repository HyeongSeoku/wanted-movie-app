import React, { useEffect, useState } from 'react'
import * as _ from 'lodash'
import styles from './Search.module.scss'
import SearchInput from 'components/searchInput'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import {
  apiAdditionalData,
  recentSearchWord,
  loadingState,
  modalCurrnetData,
  searchMovieData,
  searchPageNumber,
  bookMarkList,
} from 'utils/atoms/atom'
import MovieCard from 'components/movieCard'
import { moviesApi } from 'utils/apis/api'
import { useInView } from 'react-intersection-observer'
import { ApiResData, SearchModule } from 'types/types.d'
import Modal from 'components/modal'
import Loader from 'components/loader'
import SearchMethod from './searchMethod'

const Search = (): JSX.Element => {
  const [nowSearchValue, setNowSearchValue] = useState<string>('')
  const [searchMovieList, setSearchMovieList] = useRecoilState(searchMovieData)
  const [additionalData, setAdditionalData] = useRecoilState(apiAdditionalData)

  const recentWord = useRecoilValue(recentSearchWord)
  const modalData = useRecoilValue(modalCurrnetData)
  const bookMarkData = useRecoilValue(bookMarkList)

  const [pageNumber, setPageNumber] = useRecoilState(searchPageNumber)
  const [isLoading, setIsLoading] = useRecoilState(loadingState)

  const resetSeachList = useResetRecoilState(searchMovieData)
  const resetPageNumber = useResetRecoilState(searchPageNumber)
  const resetAdditionalData = useResetRecoilState(apiAdditionalData)

  const [ref, inView] = useInView()

  // useEffect 페이지 증가 감지 => api  실행
  useEffect(() => {
    if (additionalData.lastPageNumber > 1) {
      if (pageNumber !== 1 && pageNumber !== 0) callMoreApiData(pageNumber)
    }
  }, [pageNumber])

  useEffect(() => {
    if (inView) {
      if (pageNumber < additionalData.lastPageNumber && nowSearchValue.trim() === recentWord.trim())
        setPageNumber((prev) => prev + 1)
    }
  }, [inView])

  function callMoreApiData(page: number) {
    setIsLoading(true)
    moviesApi.searchMovielist(recentWord, page).then((res) => {
      const dataList = res.data.Search

      let tmpList: SearchModule.ISearchMovieList[] = []
      if (dataList !== undefined) {
        dataList.map((data: ApiResData.ISearchMovieData) => {
          const { Title: title, Year: year, imdbID, Type: type, Poster: poster } = data
          let tmpYear = data.Year.split('–').map((item) => Number(item))
          tmpYear = tmpYear.filter((yearI) => yearI !== 0)

          // 데이터 처리
          tmpList.push({
            title: i.Title,
            year: tmpYear,
            imdbID: i.imdbID,
            type: i.Type,
            poster: i.Poster,
            bookMark: SearchMethod.existIdBookMarkList(bookMarkData, i.imdbID),
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
        bookMark={modalData.bookMark}
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
                      bookMark={movie.bookMark}
                    />
                  </div>
                ) : (
                  <MovieCard
                    title={movie.title}
                    year={movie.year}
                    imdbID={movie.imdbID}
                    type={movie.type}
                    poster={movie.poster}
                    bookMark={movie.bookMark}
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
