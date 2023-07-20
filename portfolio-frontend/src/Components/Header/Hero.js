import React from 'react'
import './HeaderStyle/Hero.css'
import Typewriting from './Typewriting'

export default function Hero() {

    return (
        <div className='hero'>
            <div className='text-white hero_left'>
                <h1>Hey, It's me <span className='hero_name text-warning'>Fazlul Karim</span></h1>
                <Typewriting />
                <a className='hero_cv btn btn-warning' href="/Assets/Fazlul_Karim_NSU_EEE.pdf" download>Download CV</a>
            </div>
            <div className='hero_right'>
                <img className='hero_me' src="/Assets/me.png" alt="" />
            </div>
        </div>


    )
}
