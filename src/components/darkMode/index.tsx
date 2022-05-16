import React from 'react'
import styles from './darkMode.module.scss'
import { useSetRecoilState } from 'recoil'
import { themeMode } from 'utils/atoms/atom'

const DarkModeSwitch = () => {
  const setIsDarkMode = useSetRecoilState(themeMode)

  const handleDarkMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget
    if (checked) setIsDarkMode('dark')
    else setIsDarkMode('light')
  }

  return (
    <div className={styles.darkModeContainer}>
      <input className={styles.checkBox} type='checkbox' id='switch' onChange={handleDarkMode} />
      <label className={styles.checkBoxLabel} htmlFor='switch' />
    </div>
  )
}

export default DarkModeSwitch
