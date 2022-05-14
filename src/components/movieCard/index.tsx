import React, { useEffect, useState } from 'react'
import styles from './movieCard.module.scss'
import { BookMarkModule, SearchModule } from '../../types/types.d'
import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { bookMarkList, modalCurrnetData, modalOpen } from '../../utils/atoms/atom'
import { BOOKMARKLIST } from '../../utils/constants/componentsData'
import SearchMethod from '../../routes/Search/searchMethod'

const MovieCard = ({ title, year, imdbID, type, poster, bookmarked }: SearchModule.ISearchMovieList): JSX.Element => {
  const [cardData, setCardData] = useState<SearchModule.ISearchMovieCard>({
    title,
    year,
    imdbID,
    type,
    poster,
    bookmarked,
  })
  const [localStorageData] = useState<string | null>(localStorage.getItem(BOOKMARKLIST))
  const [bookMarkData, setBookMarkData] = useRecoilState(bookMarkList)

  const setIsModalOpen = useSetRecoilState(modalOpen)
  const setCurrentModalData = useSetRecoilState(modalCurrnetData)

  useEffect(() => {
    setBookMarkData(JSON.parse(localStorageData!))
  }, [localStorageData])

  useEffect(() => {
    console.log('movieCard', title, bookmarked)
    setCurrentModalData({ title, year, imdbID, type, poster, bookmarked })
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
          <span className={styles.movieTitle}>
            <strong>{title}</strong>
          </span>
          <FontAwesomeIcon className={styles.bookMarkIcon} icon={bookmarked ? faStar : faEmptyStar} />
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

export default MovieCard
