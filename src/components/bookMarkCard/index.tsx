import styles from './bookMarkCard.module.scss'
import { BookMarkModule } from 'types/types.d'
import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil'
import { bookMarkList, searchMovieData } from 'utils/atoms/atom'
import { BOOKMARKLIST } from 'utils/constants/componentsData'

const BookMarkCard = ({ title, year, imdbID, type, poster }: BookMarkModule.IBookMarkCardData) => {
  const [bookMarkData, setBookMarkData] = useRecoilState<BookMarkModule.IBookMarkModule[]>(bookMarkList)
  const [searchMovieList, setSearchMovieList] = useRecoilState(searchMovieData)

  useEffect(() => {
    localStorage.setItem(BOOKMARKLIST, JSON.stringify(bookMarkData))
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
      <div role='button' tabIndex={0} className={styles.bookMarkCardContents}>
        <img className={styles.poster} src={poster} alt={`${title}_이미지`} />
        <div className={styles.contentContainer}>
          <div className={styles.iconContainer}>
            <FontAwesomeIcon icon={faTrash} onClick={deleteBookMark} />
          </div>
          <span className={styles.movieTitle}>
            <strong>{title}</strong>
          </span>
          <div className={styles.yearContainer}>
            {year.map((i, idx) => (
              <React.Fragment key={`year_${i}`}>
                <span>{i}</span>
                <span>{year.length - 1 !== idx ? '-' : ''}</span>
              </React.Fragment>
            ))}
          </div>
          <div>{type}</div>
          <div>{imdbID}</div>
        </div>
      </div>
    </article>
  )
}

export default BookMarkCard
