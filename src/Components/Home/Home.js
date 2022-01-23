import React from 'react'
import Nav1 from '../Navbar/Navbar'
import Slider from './Slider'
import Footer from './Footer'
import ListProducts from './ListProducts'

function Home() {
    return (
        <div>
            <Nav1/>
            <Slider/>
            <ListProducts/>
            <Footer/>
        </div>
    )
}

export default Home
