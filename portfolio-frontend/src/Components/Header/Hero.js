import React from 'react'
import './HeaderStyle/Hero.css'
import Typewriting from './Typewriting'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowDown, faDownload } from '@fortawesome/free-solid-svg-icons'
import Slide from 'react-reveal/Slide';

export default function Hero() {

    return (
        <div className='hero'>
            <Slide left>
                <div className='text-white hero_left'>
                    <h1>Hey, It's me <span className='hero_name text-warning'>Fazlul Karim</span></h1>
                    <Typewriting />
                    <a className='hero_cv btn btn-outline-warning mt-3' href="/Assets/Fazlul_Karim_EEE_NSU.pdf" download> <FontAwesomeIcon icon={faCloudArrowDown} className='me-2' />Resume</a>
                </div>
            </Slide>
            <Slide right>
                <div className='hero_right'>
                    <img className='hero_me' src="/Assets/me.png" alt="" />
                </div>
            </Slide>
        </div>


    )
}
