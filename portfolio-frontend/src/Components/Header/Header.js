import React from 'react'
import Navbar from './Navbar'
import './HeaderStyle/Header.css'
import Hero from './Hero'

export default function Header() {
    return (

        <div>
            <div class="area">
                <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>



                <div className='header'>
                    <Navbar />
                    <Hero />
                </div>
            </div>


        </div>
    )
}
