import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import FAQSection from '../components/FAQSection'


const Home = () => {             //rafce (boiler code)
  return (
    <div>
     <Header />  
     <SpecialityMenu />   
     <TopDoctors />
     <Banner /> 
     <FAQSection />
    </div>
  )
}

export default Home