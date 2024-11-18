import React from 'react'
import Navbar from "../components/Navbar.jsx"
import Hero from "../components/Hero.jsx"
import Floors from "../components/Floors.jsx"
import Footer from "../components/Footer.jsx"

const Home = () => {
  return (
    <div data-theme="emerald">
        <Navbar/>
        <Hero/>
        <Floors/>
        <Footer/>
    </div>
  )
}

export default Home