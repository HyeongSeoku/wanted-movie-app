import React, { useCallback, useEffect, useState } from 'react'
import _ from 'lodash'
import styles from './Search.module.scss'
import SearchInput from 'components/searchInput'
import { useRecoilState, useRecoilValue } from 'recoil'
import { loadingState, modalCurrnetData, modalOpen, movieListState, searchPageNumber } from 'utils/atoms/atom'
import MovieCard from 'components/movieCard'
import { moviesApi } from 'service/api'
import { useInView } from 'react-intersection-observer'
import { MovieListData } from 'types/types.d'
import Modal from 'components/modal'
import Loader from 'components/loader'
import { useSearchParams } from 'react-router-dom'
import { useMount, useUpdateEffect } from 'react-use'

const ERROR_MSG = {
  NO_RESULT: '검색 결과가 없습니다.',
  TOO_MANY_RESULT: '검색어가 너무 짧습니다.',
  CANNOT_KOREAN: '한글은 지원되지 않습니다.',
  NET_ERROR: '현재 검색이 불가능합니다.',
}

const Search = (): JSX.Element => {
  const [movieList, setMovieList] = useRecoilState(movieListState)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [searchParams] = useSearchParams()
  const currentSearchWord = searchParams.get('s')

  const modalData = useRecoilValue(modalCurrnetData)

  const [pageNumber, setPageNumber] = useRecoilState(searchPageNumber)
  const [isLoading, setIsLoading] = useRecoilState(loadingState)

  const [ref, inView] = useInView()

  const checkKorean = (word: string) => {
    const koreanReg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
    return koreanReg.test(word)
  }

  const getMovieList = useCallback(async () => {
    if (!currentSearchWord) return
    setErrorMessage(ERROR_MSG.NO_RESULT)
    setIsLoading(true)

    await moviesApi
      .searchMovielist({ s: currentSearchWord, page: pageNumber })
      .then((res) => {
        const { Response: response, Error: error, Search: search } = res.data

        if (response === 'False') {
          if (checkKorean(currentSearchWord)) {
            setErrorMessage(ERROR_MSG.CANNOT_KOREAN)
            ref(null)
            return
          }
          if (error === ERROR_MSG.TOO_MANY_RESULT) setErrorMessage(ERROR_MSG.TOO_MANY_RESULT)

          ref(null)
          return // early return pattern
        }
        let tmpList: MovieListData.IMovieList[] = []
        search.forEach((item) => {
          const { Title: title, Year: year, imdbID, Type: type, Poster: poster } = item
          tmpList.push({ title, year, imdbID, type, poster })
        })

        tmpList = _.uniqBy(tmpList, 'imdbID') // 중복제거
        setMovieList((prev) => [...prev, ...tmpList])
      })
      .catch(() => {
        setErrorMessage(ERROR_MSG.NET_ERROR)
      })
    setIsLoading(false)
  }, [currentSearchWord, pageNumber, ref, setIsLoading, setMovieList])

  useMount(() => {
    getMovieList()
  })

  useEffect(() => {
    if (inView) setPageNumber((prev) => prev + 1)
  }, [inView, setPageNumber])

  useUpdateEffect(() => {
    getMovieList()
  }, [getMovieList])

  return (
    <div className={styles.searchSection}>
      {modalOpen && <Modal movie={modalData} />}
      {isLoading && <Loader />}
      <main className={styles.searchMain}>
        <SearchInput />
        <section className={styles.movieSection}>
          {movieList.length === 0 && !isLoading && <span>{errorMessage}</span>}
          {movieList && (
            <ul className={styles.movieSection}>
              {movieList.map((movie) => (
                <li key={`search_list_${movie.imdbID}`} className={styles.movieItem}>
                  <MovieCard movie={movie} />
                </li>
              ))}
            </ul>
          )}
          {currentSearchWord && movieList.length !== 0 && <div ref={ref} />}
        </section>
      </main>
    </div>
  )
}

export default Search
