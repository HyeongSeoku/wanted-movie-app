import { useRecoilState } from 'recoil'
import styles from './modal.module.scss'
import { bookMarkList, modalOpen } from 'utils/atoms/atom'
import cx from 'classnames'
import React, { useEffect, useRef } from 'react'
import { ModalModule, MovieListData } from 'types/types.d'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { BOOKMARKLIST } from 'utils/constants/componentsData'
import { setLocalStorage } from 'service/store'
import reactDom from 'react-dom'

interface IModal {
  movie: MovieListData.IMovieList
}
interface IPortal {
  children?: React.ReactNode
}
// TODO : esc 눌렀을때 모달 닫히도록 동작

const Modal = ({ movie }: IModal) => {
  const ModalPortal = ({ children }: IPortal) => {
    const el = document.getElementById('modal')
    return reactDom.createPortal(children, el!)
  }

  const { title, year, imdbID, type, poster } = movie
  const [bookMarkMovieList, setBookMarkMovieList] = useRecoilState(bookMarkList)
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalOpen)
  const backDropRef = useRef<HTMLElement>(null)

  useEffect(() => {}, [bookMarkMovieList])

  const isBookMark = () => {
    return bookMarkMovieList.find((item: MovieListData.IMovieList) => item.imdbID === imdbID)
  }

  const handleModalData = (e: React.MouseEvent<HTMLElement>) => {
    if (backDropRef.current === e.target) setIsModalOpen(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const deleteBookMark = () => {
    if (window.confirm('즐겨찾기에서 제거 할까요')) {
      const newBookMarkList = bookMarkMovieList.filter((data) => data.imdbID !== imdbID)
      setBookMarkMovieList(newBookMarkList)
      setLocalStorage(BOOKMARKLIST, newBookMarkList)
      alert('제거 되었습니다.')
    }
  }

  const addBookMark = () => {
    const newBookMarkList = [...bookMarkMovieList, { title, year, imdbID, type, poster }]
    setBookMarkMovieList(newBookMarkList)
    setLocalStorage(BOOKMARKLIST, newBookMarkList)
  }

  const handleBookMark = () => {
    isBookMark() ? deleteBookMark() : addBookMark()
  }

  return (
    <ModalPortal>
      <section
        role='button'
        tabIndex={0}
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
                icon={isBookMark() ? faStar : faEmptyStar}
                className={cx(styles.icon, { [styles.isBookMarked]: isBookMark() })}
                onClick={handleBookMark}
              />
            </div>

            <div className={styles.title}>
              <span>{title}</span>
            </div>
            <div className={styles.yearContainer}>
              <span>{year}</span>
            </div>
            <div className={styles.imdbId}>{imdbID}</div>

            <div />
          </main>
        </section>
      </section>
    </ModalPortal>
  )
}

export default Modal
