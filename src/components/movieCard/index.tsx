import styles from './movieCard.module.scss'
import { ApiResData, SearchModule } from '../../types/types.d'
import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MovieCard = ({ title, year, imdbID, type, poster }: SearchModule.ISearchMovieList): JSX.Element => {
  return (
    <article className={styles.cardContainer}>
      <img className={styles.poster} src={poster} alt={`${title}_이미지`} />
      <div className={styles.contentContainer}>
        <span className={styles.movieTitle}>
          <strong>{title}</strong>
        </span>
        <FontAwesomeIcon className={styles.bookMarkIcon} icon={faEmptyStar} />
        <span>{year}</span>
      </div>
    </article>
  )
}

export default MovieCard
