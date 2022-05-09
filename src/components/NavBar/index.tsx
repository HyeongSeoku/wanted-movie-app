import { navData } from '../../utils/constants/componentsData'
import styles from './NavBar.module.scss'

function NavBar() {
  return (
    <footer className={styles.footer}>
      <nav>
        <ul className={styles.navList}>
          {navData.map((i) => (
            <li key={i.id} className={styles.navItem}>
              {i.title}
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  )
}

export default NavBar
