import React, { useEffect, useState } from 'react'
import styles from './movieCard.module.scss'
import { SearchModule } from '../../types/types.d'
import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSetRecoilState } from 'recoil'
import { modalCurrnetData, modalOpen } from '../../utils/atoms/atom'

const MovieCard = ({ title, year, imdbID, type, poster }: SearchModule.ISearchMovieList): JSX.Element => {
  const [cardData] = useState<SearchModule.ISearchMovieList>({ title, year, imdbID, type, poster })
  const setIsModalOpen = useSetRecoilState(modalOpen)
  const setCurrentModalData = useSetRecoilState(modalCurrnetData)

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
          <FontAwesomeIcon className={styles.bookMarkIcon} icon={faEmptyStar} />
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
