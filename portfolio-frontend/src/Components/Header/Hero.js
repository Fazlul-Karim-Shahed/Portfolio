import React, { useEffect, useState } from 'react'
import './HeaderStyle/Hero.css'
import Typewriting from './Typewriting'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons'
import Reveal from '../Reveal';
import axios from 'axios';

export default function Hero() {

    const [resumeUrl, setResumeUrl] = useState('/Assets/Fazlul_Karim_EEE_NSU.pdf');

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_API + 'Resume.json')
            .then(res => {
                if (res.data && res.data.url) {
                    setResumeUrl(res.data.url);
                }
            })
            .catch(() => { });
    }, []);

    return (
        <div className='hero'>
            <Reveal effect="fade-left">
                <div className='text-white hero_left'>
                    <h1>Hey, It's me <span className='hero_name text-warning'>Fazlul Karim</span></h1>
                    <Typewriting />
                    <a
                        className='hero_cv btn btn-outline-warning mt-3'
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon icon={faCloudArrowDown} className='me-2' />Resume
                    </a>
                </div>
            </Reveal>
            <Reveal effect="fade-right">
                <div className='hero_right'>
                    <img className='hero_me' src="/Assets/me.png" alt="" />
                </div>
            </Reveal>
        </div>


    )
}

