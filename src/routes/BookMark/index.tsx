import styles from './BookMark.module.scss'
import cx from 'classnames'
import { useRecoilState } from 'recoil'
import { bookMarkList } from '../../utils/atoms/atom'
import BookMarkCard from '../../components/bookMarkCard'

const BookMark = () => {
  const [bookMarkData, setBookMarkData] = useRecoilState(bookMarkList)
  return (
    <div>
      <h2>내 즐겨찾기</h2>
      {bookMarkData.map((data) => (
        <BookMarkCard
          key={`bookMark_${data.imdbID}`}
          title={data.title}
          year={data.year}
          imdbID={data.imdbID}
          type={data.type}
          poster={data.poster}
        />
      ))}
    </div>
  )
}

export default BookMark
