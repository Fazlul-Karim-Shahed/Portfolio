import React from 'react'
import Navbar from './Navbar'
import './HeaderStyle/Header.css'
import Hero from './Hero'

export default function Header() {
    return (
        <div className='header'>
            <Navbar />
            <Hero />
        </div>
    )
}
