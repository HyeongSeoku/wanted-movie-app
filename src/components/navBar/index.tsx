import React from 'react'
import { useRecoilState } from 'recoil'
import cx from 'classnames'
import { currentNav } from '../../utils/atoms/atom'
import { NAV_DATA } from '../../utils/constants/componentsData'
import styles from './.navBar.module.scss'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {
  const [clickedtNav, setClickedNav] = useRecoilState<string>(currentNav)
  const navigate = useNavigate()

  const handleCurrentNav = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { nav } = e.currentTarget.dataset
    if (nav !== undefined) setClickedNav(nav)
    //  if (nav  === 'search_nav') navigate('/')
    // else navigate('/bookmark')
  }

  return (
    <footer className={styles.footer}>
      <nav>
        <ul className={styles.navList}>
          {NAV_DATA.map((i) => (
            <li key={i.id} className={cx(styles.navItem, { [styles.clicked]: clickedtNav === i.id })}>
              <Link to={i.path}>
                <button className={styles.navButton} type='button' data-nav={i.id} onClick={handleCurrentNav}>
                  {i.icon}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  )
}

export default NavBar
