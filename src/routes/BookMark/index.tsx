import styles from './BookMark.module.scss'
import cx from 'classnames'
import BookMarkCard from '../../components/bookMarkCard'
import { DragDropContext } from 'react-beautiful-dnd'
import BookMarkListConatiner from '../../components/bookMarkListContainer'

const BookMark = () => {
  return (
    <div>
      <h2>내 즐겨찾기</h2>
      <main>
        <BookMarkListConatiner />
      </main>
    </div>
  )
}

export default BookMark
