import styles from './MovieCard.module.scss'
import { ApiResData } from '../../types/types'
import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function MovieCard({ Title, Year, imdbID, Type, Poster }: ApiResData.ISearchMovieData) {
  return (
    <article className={styles.cardContainer}>
      <img className={styles.poster} src={Poster} alt={`${Title}_이미지`} />
      <div className={styles.contentContainer}>
        <span className={styles.movieTitle}>
          <strong>{Title}</strong>
        </span>
        <FontAwesomeIcon className={styles.bookMarkIcon} icon={faEmptyStar} />
        <span>{Year}</span>
      </div>
    </article>
  )
}

export default MovieCard
