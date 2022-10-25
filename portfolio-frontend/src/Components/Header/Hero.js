import React from 'react'
import './HeaderStyle/Hero.css'
import Typewriting from './Typewriting'

export default function Hero() {

    return (
        <div id='' className='hero'>
            <div className='text-white hero_left'>
                <h1>Hey, It's me <span className='hero_name'>Fazlul Karim</span></h1>
                <Typewriting />
                <a className='hero_cv' href="/Assets/Fazlul_Karim_NSU_EEE.pdf" download>Download CV</a>
            </div>
            <div className='hero_right img-fluid'>
                <img className='hero_me' src="/Assets/me.png" alt="" />
                <img className='hero_shape img-fluid' src="/Assets/shape.png" alt="" />

            </div>
        </div>
    )
}
