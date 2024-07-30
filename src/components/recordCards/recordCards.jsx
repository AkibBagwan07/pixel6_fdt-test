import React from 'react'
import styles from "./recordCards.module.css"

const Cards = ({ id, imgSrc, firstName, lastName, gender, age, position, middleName, state }) => {
    // console.log(typeof gender)
    return (
      <div>
          <div className={styles.heading_container}>
                <p className={styles.id}>{id < 10 && "0"}{ id}</p>
              <img src={ imgSrc} alt='img'/>
              <p>{firstName} {middleName} { lastName}</p>
                <p>{gender ==="male"?"M":"F"}/{ age}</p>
              <p>{ position}</p>
                <p>{state}/USA</p>
          </div>
          <hr />
    </div>
  )
}

export default Cards