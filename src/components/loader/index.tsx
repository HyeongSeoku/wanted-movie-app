import styles from './loader.module.scss'

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <span className={styles.loaderText}>로더</span>
    </div>
  )
}

export default Loader
