import styles from './loader.module.scss'

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}>
        <span className={styles.spinnerInner1} />
        <span className={styles.spinnerInner2} />
        <span className={styles.spinnerInner3} />
      </div>
    </div>
  )
}

export default Loader
