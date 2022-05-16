import styles from './bookMarkListContainer.module.scss'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { useRecoilState } from 'recoil'
import { BookMarkModule } from 'types/types.d'
import _ from 'lodash'
import { bookMarkList } from 'utils/atoms/atom'
import BookMarkCard from 'components/bookMarkCard'

const BookMarkListConatiner = () => {
  const [bookMarkData, setBookMarkData] = useRecoilState(bookMarkList)

  const handleDragEnd = (r: DropResult) => {
    const tempBookMark = _.cloneDeep(bookMarkData)
    const bookMarkArrSrc = tempBookMark.splice(r.source.index, 1)[0]

    tempBookMark.splice(r.destination?.index ?? 0, 0, bookMarkArrSrc)
    setBookMarkData(tempBookMark)
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId='bookMarkData'>
          {(droppableProv) => (
            <ul {...droppableProv.droppableProps} ref={droppableProv.innerRef}>
              {bookMarkData.map((item: BookMarkModule.IBookMarkCardData, idx: number) => (
                <Draggable key={`book_mark${item.imdbID}`} draggableId={`book_mark${item.imdbID}`} index={idx}>
                  {(draggableProv) => (
                    <li
                      className={styles.bookMarkCard}
                      ref={draggableProv.innerRef}
                      {...draggableProv.dragHandleProps}
                      {...draggableProv.draggableProps}
                    >
                      <BookMarkCard
                        title={item.title}
                        year={item.year}
                        imdbID={item.imdbID}
                        type={item.type}
                        poster={item.poster}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default BookMarkListConatiner
