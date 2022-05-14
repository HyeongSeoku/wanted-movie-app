import styles from './bookMarkCard.module.scss'
import { BookMarkModule } from '../../types/types.d'
import React from 'react'

const BookMarkCard = ({ title, year, imdbID, type, poster }: BookMarkModule.IBookMarkModule) => {
  return (
    <article className={styles.bookMarkCardContainer}>
      <div role='button' tabIndex={0} className={styles.bookMarkCardContents}>
        <img className={styles.poster} src={poster} alt={`${title}_이미지`} />
        <div className={styles.contentContainer}>
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
