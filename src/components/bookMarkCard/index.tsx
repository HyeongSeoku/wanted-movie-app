import styles from './bookMarkCard.module.scss'
import { BookMarkModule } from 'types/types.d'
import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil'
import { bookMarkList, movieListState } from 'utils/atoms/atom'
import { BOOKMARKLIST } from 'utils/constants/componentsData'
import { setLocalStorage } from 'service/store'

const BookMarkCard = ({ title, year, imdbID, type, poster }: BookMarkModule.IBookMarkCardData) => {
  const [bookMarkData, setBookMarkData] = useRecoilState<BookMarkModule.IBookMarkModule[]>(bookMarkList)
  const [searchMovieList, setSearchMovieList] = useRecoilState(movieListState)

  useEffect(() => {
    setLocalStorage(BOOKMARKLIST, bookMarkData)
  }, [bookMarkData])

  const deleteBookMark = () => {
    if (window.confirm('즐겨찾기에서 제거 할까요')) {
      setBookMarkData((prev) => prev.filter((movie) => movie.imdbID !== imdbID))
      setSearchMovieList((prev) => prev.map((i) => (i.imdbID === imdbID ? { ...i, bookMark: false } : i)))
      alert('제거 되었습니다.')
    }
  }

  return (
    <article className={styles.bookMarkCardContainer}>
      <div className={styles.bookMarkCardContents}>
        <div className={styles.posterContainer}>
          <img className={styles.poster} src={poster} alt={`${title}`} />
        </div>
        <div className={styles.contentContainer}>
          <span className={styles.movieTitle}>
            <strong>{title}</strong>
          </span>
          <FontAwesomeIcon className={styles.bookMarkIcon} icon={faTrash} onClick={deleteBookMark} />
          <ul className={styles.yearContainer}>
            <span className={styles.year}>{year}</span>
          </ul>
          <div className={styles.imdbContainer}>
            <div className={styles.type}>{type}</div>
            <div className={styles.imdbId}>#{imdbID}</div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default BookMarkCard
