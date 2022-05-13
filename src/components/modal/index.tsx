import { useRecoilState } from 'recoil'
import styles from './modal.module.scss'
import { modalOpen } from '../../utils/atoms/atom'
import cx from 'classnames'
import React, { useRef } from 'react'
import { ModalModule } from '../../types/types.d'

// TODO : esc 눌렀을때 모달 닫히도록 동작

const Modal = ({ title, year, imdbID, type, poster }: ModalModule.IModalData) => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalOpen)
  const backDropRef = useRef<HTMLElement>(null)

  const testClick = (e: React.MouseEvent<HTMLElement>) => {
    if (backDropRef.current === e.target) setIsModalOpen(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <section
      role='section'
      ref={backDropRef}
      className={cx(styles.modalWrapper, { [styles.open]: isModalOpen })}
      onClick={testClick}
    >
      <section className={styles.modalContent}>
        <header className={styles.modalHeader}>
          <button className={styles.closeBtn} type='button' onClick={closeModal}>
            <span className={styles.closeBtnText}>X</span>
          </button>
        </header>
        <main>
          <img src={poster} alt={`${title} 이미지`} />
          <div>{title}</div>
          <div>{year}</div>
          <div>{imdbID}</div>
          <div>{type}</div>
        </main>
      </section>
    </section>
  )
}

export default Modal
