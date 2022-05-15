import styles from './BookMark.module.scss'
import cx from 'classnames'
import BookMarkCard from '../../components/bookMarkCard'
import { DragDropContext } from 'react-beautiful-dnd'
import BookMarkListConatiner from '../../components/bookMarkListContainer'

const BookMark = () => {
  return (
    <section className={styles.bookMarkSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>내 즐겨찾기</h2>
      </div>
      <main className={styles.main}>
        <BookMarkListConatiner />
      </main>
    </section>
  )
}

export default BookMark
