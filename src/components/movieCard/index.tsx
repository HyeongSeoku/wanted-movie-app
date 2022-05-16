import styles from './movieCard.module.scss'
import { ModalModule, MovieListData } from 'types/types.d'
import cx from 'classnames'
import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { bookMarkList, modalCurrnetData, modalOpen } from 'utils/atoms/atom'
import { getLocalStorage, setLocalStorage } from 'service/store'
import { BOOKMARKLIST } from 'utils/constants/componentsData'
import { useEffect } from 'react'

interface IMovieCard {
  movie: MovieListData.IMovieList
}

const MovieCard = ({ movie }: IMovieCard): JSX.Element => {
  const { title, year, imdbID, type, poster } = movie
  const setModalData = useSetRecoilState<MovieListData.IMovieList>(modalCurrnetData)
  const localStorageData = getLocalStorage(BOOKMARKLIST) || []
  const bookMarkMovieList = useRecoilValue(bookMarkList)
  const setIsModalOpen = useSetRecoilState(modalOpen)

  useEffect(() => {
    setLocalStorage(BOOKMARKLIST, bookMarkMovieList)
  }, [bookMarkMovieList])

  const isBookMark = () => {
    return localStorageData.find((item: MovieListData.IMovieList) => item.imdbID === imdbID)
  }

  const handleClickMovieCard = () => {
    setModalData(movie)
    setIsModalOpen(true)
  }

  return (
    <article className={styles.cardContainer}>
      <div role='button' tabIndex={0} className={styles.cardContents} onClick={handleClickMovieCard}>
        <div className={styles.posterContainer}>
          <img className={styles.poster} src={poster} alt={`${title}_이미지`} />
        </div>

        <div className={styles.contentContainer}>
          <span className={styles.movieTitle}>
            <strong>{title}</strong>
          </span>
          <FontAwesomeIcon
            className={cx(styles.bookMarkIcon, { [styles.isBookMarked]: isBookMark() })}
            icon={isBookMark() ? faStar : faEmptyStar}
          />

          <div className={styles.yearContainer}>
            <span>{year}</span>
          </div>
          <div className={styles.imdbContainer}>
            <div className={styles.type}>{type}</div>
            <div className={styles.imdbId}>#{imdbID}</div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default MovieCard
