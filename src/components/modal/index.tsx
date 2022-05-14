import { useRecoilState } from 'recoil'
import styles from './modal.module.scss'
import { bookMarkList, modalOpen, searchMovieData } from '../../utils/atoms/atom'
import cx from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { BookMarkModule, LocalStorageModule, ModalModule } from '../../types/types.d'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { BOOKMARKLIST } from '../../utils/constants/componentsData'
import SearchMethod from '../../routes/Search/searchMethod'

// TODO : esc 눌렀을때 모달 닫히도록 동작

const Modal = ({ title, year, imdbID, type, poster, bookmarked }: ModalModule.IModalData) => {
  const [movieList, setMovieList] = useRecoilState(searchMovieData)
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalOpen)
  const [bookMark, setBookMark] = useState<boolean>(bookmarked)
  const [bookMarkData, setBookMarkData] = useRecoilState<BookMarkModule.IBookMarkModule[]>(bookMarkList)
  const backDropRef = useRef<HTMLElement>(null)

  useEffect(() => {
    console.log('데이터 바꼈을때 상태', title, bookmarked, bookMark)
    setBookMark(bookmarked)
  }, [title, year, imdbID, type, poster, bookmarked])

  useEffect(() => {
    // 북마크 state가 false이고 로컬스토리지에 존재하지 않으면
    if (bookMark && !SearchMethod.existIdBookMarkList(imdbID)) {
      const data = localStorage.getItem(BOOKMARKLIST)
      const newArr = JSON.parse(data!)
      newArr.push({ title, year, imdbID, type, poster })
      localStorage.setItem(BOOKMARKLIST, JSON.stringify(newArr))
      setBookMarkData(newArr)
      setMovieList(movieList.map((movie) => (movie.imdbID === imdbID ? { ...movie, bookmarked: true } : movie)))
    }
  }, [bookMark])

  useEffect(() => {
    console.log(movieList)
  }, [movieList])

  const handleModalData = (e: React.MouseEvent<HTMLElement>) => {
    if (backDropRef.current === e.target) setIsModalOpen(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const deleteBookMark = () => {
    if (window.confirm('즐겨찾기에서 제거 할까요')) {
      // 로컬 스토리지 제거
      const newArr = bookMarkData.filter((item) => item.imdbID !== imdbID)
      localStorage.setItem(BOOKMARKLIST, JSON.stringify(newArr))
      setBookMarkData(newArr)
      setBookMark(false)
      alert('제거 되었습니다.')
    }
  }

  const addBookMark = () => {
    setBookMark(true)
  }

  const handleBookMark = () => {
    bookMark ? deleteBookMark() : addBookMark()
  }

  return (
    <section
      role='section'
      ref={backDropRef}
      className={cx(styles.modalWrapper, { [styles.open]: isModalOpen })}
      onClick={handleModalData}
    >
      <section className={styles.modalContent}>
        <header className={styles.modalHeader}>
          <button className={styles.closeBtn} type='button' onClick={closeModal}>
            <span className={styles.closeBtnText}>X</span>
          </button>
        </header>
        <main className={styles.contentMain}>
          <div className={styles.posterContainer}>
            <img className={styles.posterImg} src={poster} alt={`${title} 이미지`} />
          </div>
          <FontAwesomeIcon icon={bookmarked ? faStar : faEmptyStar} onClick={handleBookMark} />
          <div className={styles.title}>
            <span>{title}</span>
          </div>
          <div>
            <span>{year}</span>
          </div>
          <div>
            <span>{imdbID}</span>
          </div>
          <div>
            <span>{type}</span>
          </div>
        </main>
      </section>
    </section>
  )
}

export default Modal
