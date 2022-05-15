import styles from './NotFound404.module.scss'
import notFoundImg from '../../images/notfound.png'

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.title}>경로를 찾을수 없습니다.</h1>
      <img className={styles.image} src={notFoundImg} alt='not found' />
    </div>
  )
}

export default NotFoundPage
