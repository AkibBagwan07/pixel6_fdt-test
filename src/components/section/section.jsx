/* eslint-disable react-hooks/exhaustive-deps */
import { useState,useEffect } from "react"
import React from 'react'
import axios from "axios"
import styles from "./section.module.css"
import { FaFilter } from "react-icons/fa";
import Cards from "../recordCards/recordCards";
import { FaArrowUpLong } from "react-icons/fa6";
import { FaLongArrowAltDown } from "react-icons/fa";

const Section = () => {
    const api = "https://dummyjson.com/users?limit=208"
    const [allData,setAllData] = useState([])
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [gender, setGender] = useState(null)
    // console.log(gender)
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    
    // console.log(indexOfFirstRecord)
    // console.log(indexOfLastRecord)
   
    // filtering based on country not possible person's country and company's country is same (i.e-united states) for all person's data
    // const set = new Set()
    // data.map((ele) => set.add(ele.company.address.country))
    // console.log(set)
    
    useEffect(() => {
        (async function () {
            try {
                const res = await axios.get(`${api}`)
              //  console.log(res.data.users)
                setAllData(res.data.users)
                setData(res.data.users)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    
    const currentRecords = data.slice(0, indexOfLastRecord);
    const nPages = Math.ceil(data.length / recordsPerPage);

    // useEffect(() => {
    //     (async function () {
    //         try {
    //             const length = data.length
    //             console.log(length)
    //             const res = await axios.get(`${api}?limit=${noOfRecordsToFetch}&skip=${length+10}`)
    //             setData([...data, res.data.users])
    //             console.log(data)  
 
    //             console.log(skipRecord)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     })()
    // }, [scrolled])
     
    // const handleScrollPagination = () => { 
    //         setScrolled(!scrolled)         
    // }
    
  const paginate = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

    // for storing the selected gender and reverting data array to whole data for sorting and displaying according to gender
    const handleGenderFilter = (e) => { 
        setGender(e.target.value)
        setData(allData)
    }

    // for displaying data onChange of gender filter
    useEffect(() => { 
        const newData = []
        data.map((ele) => { 
            if (gender.toString() === ele.gender.toString())
                newData.push(ele)
        })
        setData(newData)
    },[gender])

    return (
        <div>
      <div className={ styles.container}>
          <h1>Employees</h1>
            <div className={ styles.filter_container}>
              <FaFilter className={styles.filterIcon} />
              <select name="country" id="">
                    <option style={{display:"none"}} value="" >Country</option>
                    <option value="">USA</option>
              </select>
              <select onChange={handleGenderFilter} name="gender" id="">
                    <option style={{display:"none"}} value="" >Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
              </select>
                </div>    
            </div>
            <div onWheel={paginate} className={styles.content_table}>
                <div className={styles.heading_container}>
                    <p className={styles.id}>ID</p><FaArrowUpLong className={ styles.idUpArrow} /><FaLongArrowAltDown className={ styles.idDownArrow} />
                    <p className={ styles.image}>Image</p>
                    <p>Fullname</p><FaArrowUpLong className={ styles.fullnameUpArrow} /><FaLongArrowAltDown className={ styles.fullnameDownArrow} />
              <p>Demography</p>
              <p>Designation</p>
              <p>Location</p>
                </div>
                <hr style={{width:"100%"}}/>
            {currentRecords?.map((ele) => { 
                return (
                    <Cards key={ele.id}
                        id={ele.id}
                        imgSrc={ele.image}
                        firstName={ele.firstName}
                        lastName={ele.lastName}
                        gender={ele.gender}
                        age={ele.age}
                        position={ele.company?.title}
                        middleName={ele?.maidenName}
                        state={ele.address?.state} />
                )
            })}
            </div>
        </div>
        
  )
}

export default Section