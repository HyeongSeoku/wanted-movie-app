import React, { useEffect, useState } from 'react'
import styles from './movieCard.module.scss'
import { BookMarkModule, SearchModule } from '../../types/types.d'
import cx from 'classnames'
import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { bookMarkList, modalCurrnetData, modalOpen } from '../../utils/atoms/atom'
import { BOOKMARKLIST } from '../../utils/constants/componentsData'
import SearchMethod from '../../routes/Search/searchMethod'

const MovieCard = ({ title, year, imdbID, type, poster, bookMark }: SearchModule.ISearchMovieList): JSX.Element => {
  const [cardData, setCardData] = useState<SearchModule.ISearchMovieCard>({
    title,
    year,
    imdbID,
    type,
    poster,
    bookMark,
  })
  const [bookMarkData, setBookMarkData] = useRecoilState(bookMarkList)
  const [isBookMark, setIsBookMark] = useState<boolean>(SearchMethod.existIdBookMarkList(bookMarkData, imdbID))

  const setIsModalOpen = useSetRecoilState(modalOpen)
  const setCurrentModalData = useSetRecoilState(modalCurrnetData)

  useEffect(() => {
    setCardData({ title, year, imdbID, type, poster, bookMark })
  }, [title, year, imdbID, type, poster, bookMark])

  useEffect(() => {
    setCurrentModalData(cardData)
  }, [cardData])

  useEffect(() => {
    setIsBookMark(SearchMethod.existIdBookMarkList(bookMarkData, imdbID))
  }, [bookMarkData])

  useEffect(() => {
    setCurrentModalData({ title, year, imdbID, type, poster, bookMark })
  }, [])

  const handleClickMovieCard = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsModalOpen(true)
    setCurrentModalData(cardData)
  }

  return (
    <article className={styles.cardContainer}>
      <div role='button' tabIndex={0} className={styles.cardContents} onClick={handleClickMovieCard}>
        <img className={styles.poster} src={poster} alt={`${title}_이미지`} />
        <div className={styles.contentContainer}>
          <div className={styles.iconContainer}>
            <div className={styles.type}>{type}</div>
            <FontAwesomeIcon
              className={cx(styles.bookMarkIcon, { [styles.isBookMarked]: bookMark })}
              icon={bookMark ? faStar : faEmptyStar}
            />
          </div>

          <span className={styles.movieTitle}>
            <strong>{title}</strong>
          </span>
          <div className={styles.yearContainer}>
            {year.map((i, idx) => (
              <React.Fragment key={`year_${i}`}>
                <span className={styles.year}>{i}</span>
                <span>{year.length - 1 !== idx ? '-' : ''}</span>
              </React.Fragment>
            ))}
          </div>
          <div className={styles.imdbId}>{imdbID}</div>
        </div>
      </div>
    </article>
  )
}

export default MovieCard
