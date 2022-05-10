import styles from './Search.module.scss'
import cx from 'classnames'
import SearchInput from '../../components/SearchInput'
import { useRecoilValue } from 'recoil'
import { searchMovieData } from '../../utils/atoms/atom'
import MovieCard from '../../components/MovieCard'

function Search() {
  const searchMovieList = useRecoilValue(searchMovieData)

  return (
    <div className={styles.searchSection}>
      <main className={styles.searchMain}>
        <SearchInput />
        <section className={styles.movieSection}>
          {searchMovieList !== undefined &&
            searchMovieList.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                Title={movie.Title}
                Year={movie.Year}
                imdbID={movie.imdbID}
                Type={movie.Type}
                Poster={movie.Poster}
              />
            ))}
        </section>
      </main>
    </div>
  )
}

export default Search
