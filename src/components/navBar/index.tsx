import React from 'react'
import cx from 'classnames'
import { NAV_DATA } from '../../utils/constants/componentsData'
import styles from './navBar.module.scss'
import { NavLink, useLocation } from 'react-router-dom'

const NavBar = (): JSX.Element => {
  const location = useLocation()

  return (
    <footer className={styles.footer}>
      <nav className={styles.navContainer}>
        <ul className={styles.navList}>
          {NAV_DATA.map((i) => (
            <li key={i.id} className={cx(styles.navItem, { [styles.clicked]: location.pathname === i.path })}>
              <NavLink to={i.path}>
                <button className={styles.navButton} type='button' data-nav={i.id}>
                  {i.icon}
                </button>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  )
}

export default NavBar
