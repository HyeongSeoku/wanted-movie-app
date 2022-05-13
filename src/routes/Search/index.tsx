import React, { useEffect } from 'react'
import * as _ from 'lodash'
import styles from './Search.module.scss'
import cx from 'classnames'
import SearchInput from '../../components/searchInput'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  currentSearchWord,
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

// searchMovieList.length === 0 이면 검색결과가 없습니다 노출
const Search = (): JSX.Element => {
  const [searchMovieList, setSearchMovieList] = useRecoilState(searchMovieData)
  const currentWord = useRecoilValue(currentSearchWord)
  const [pageNumber, setPageNumber] = useRecoilState(searchPageNumber)
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalOpen)
  const modalData = useRecoilValue(modalCurrnetData)

  const [ref, inView] = useInView()

  // useEffect 페이지 증가 감지 => api  실행
  useEffect(() => {
    if (pageNumber !== FIRST_PAGE) {
      callMoreApiData(pageNumber)
    }
  }, [pageNumber])

  useEffect(() => {
    if (inView) setPageNumber((prev) => prev + 1)
  }, [inView])

  // setPageNumber((prev) => prev + 1)

  function callMoreApiData(page: number) {
    moviesApi.searchMovielist(currentWord, page).then((res) => {
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
          })
        })

        tmpList = searchMovieList.concat(tmpList)
        tmpList = _.uniqBy(tmpList, 'imdbID')
        setSearchMovieList(tmpList)
      }
    })
  }

  return (
    <div className={styles.searchSection}>
      <Modal
        title={modalData.title}
        year={modalData.year}
        imdbID={modalData.imdbID}
        type={modalData.type}
        poster={modalData.poster}
      />
      <main className={styles.searchMain}>
        <SearchInput />
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
                    />
                  </div>
                ) : (
                  <MovieCard
                    title={movie.title}
                    year={movie.year}
                    imdbID={movie.imdbID}
                    type={movie.type}
                    poster={movie.poster}
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
