import React from 'react'
import Logo from "../../assests/pixel6.jpeg"
import { IoIosMenu } from "react-icons/io";
import styles from "./navbar.module.css"

const Navbar = () => {
  return (
      <div className={styles.container}>
          <img className={styles.logo} src={Logo} alt="" />
          <IoIosMenu className={styles.menuBar} />
      </div>
  )
}

export default Navbar