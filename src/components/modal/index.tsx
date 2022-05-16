import { useRecoilState } from 'recoil'
import styles from './modal.module.scss'
import { bookMarkList, modalOpen, searchMovieData } from 'utils/atoms/atom'
import cx from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { BookMarkModule, LocalStorageModule, ModalModule } from 'types/types.d'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { BOOKMARKLIST } from 'utils/constants/componentsData'

// TODO : esc 눌렀을때 모달 닫히도록 동작

const Modal = ({ title, year, imdbID, type, poster, bookMark }: ModalModule.IModalData) => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalOpen)
  const [searchMovieList, setSearchMovieList] = useRecoilState(searchMovieData)
  const [bookMarkData, setBookMarkData] = useRecoilState<BookMarkModule.IBookMarkModule[]>(bookMarkList)
  const backDropRef = useRef<HTMLElement>(null)

  useEffect(() => {
    localStorage.setItem(BOOKMARKLIST, JSON.stringify(bookMarkData))
  }, [bookMarkData])

  const handleModalData = (e: React.MouseEvent<HTMLElement>) => {
    if (backDropRef.current === e.target) setIsModalOpen(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const deleteBookMark = () => {
    if (window.confirm('즐겨찾기에서 제거 할까요')) {
      setBookMarkData((prev) => prev.filter((movie) => movie.imdbID !== imdbID))
      setSearchMovieList((prev) => prev.map((i) => (i.imdbID === imdbID ? { ...i, bookMark: false } : i)))

      alert('제거 되었습니다.')
    }
  }

  const addBookMark = () => {
    setBookMarkData((prev) => [...prev, { title, year, imdbID, type, poster }])
    setSearchMovieList((prev) => prev.map((i) => (i.imdbID === imdbID ? { ...i, bookMark: true } : i)))
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
          <div className={styles.iconContainer}>
            <span className={styles.type}>{type}</span>
            <FontAwesomeIcon
              icon={bookMark ? faStar : faEmptyStar}
              className={cx(styles.icon, { [styles.isBookMarked]: bookMark })}
              onClick={handleBookMark}
            />
          </div>

          <div className={styles.title}>
            <span>{title}</span>
          </div>
          <div className={styles.yearContainer}>
            {year.map((i, idx) => (
              <React.Fragment key={`year_${i}`}>
                <span className={styles.year}>{i}</span>
                <span>{year.length - 1 !== idx ? '-' : ''}</span>
              </React.Fragment>
            ))}
          </div>
          <div className={styles.imdbId}>{imdbID}</div>

          <div />
        </main>
      </section>
    </section>
  )
}

export default Modal
