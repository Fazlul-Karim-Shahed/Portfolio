import React, { useState } from 'react'
import './BodyStyles/Qualification.css'
import Education from './Education'
import Experience from './Experience'
import Roll from 'react-reveal/Roll';
import Fade from 'react-reveal/Roll';


export default function Qualification() {

    const [content, setContent] = useState('experience')
    const tab = (str, pos) => {
        setContent(str)
        let el = document.querySelectorAll('.qualification_tab_link')
        el.forEach((item, index) => {
            if (index === pos) {
                item.classList.add('h6', 'fw-bold', 'text-primary', 'border-bottom', 'border-primary')
            }
            else {
                item.classList.remove('h6', 'fw-bold', 'text-primary', 'border-bottom', 'border-primary')
            }
        })

    }

    let educationShow = <Fade bottom right> <Education /> </Fade>
    let experienceShow = <Fade bottom right> <Experience /> </Fade>

    return (
        <div className='bg-light' id='qualification'>
            <div className="container pt-3">
                <Roll left>
                    <div className="">
                        <div className='text-center py-3'>
                            <h1 className='fw-bold'>Qualification</h1>
                            <div className=''>
                                <div className='fw-bold'>---------- <span className='text-danger'>What i have</span> ----------</div>
                            </div>
                        </div>
                    </div>
                </Roll>

                <Roll right>
                    <div>
                        <div className='d-flex justify-content-center pt-5 qualification_tab'>
                            <div onClick={e => tab('experience', 0)} className='mx-3 mx-md-4 pb-1 qualification_tab_link h6 fw-bold text-primary border-bottom border-primary' href="">Experience</div>
                            <span className=''>|</span>
                            <div onClick={e => tab('education', 1)} className='mx-3 mx-md-4 pb-1 qualification_tab_link' href="">Education</div>
                        </div>
                    </div>
                </Roll>

                <div className='px-3'>
                    <div className='row pt-5  pb-4'>
                        {content === 'experience' ? experienceShow : ''}
                        {content === 'education' ? educationShow : ''}
                    </div>
                </div>


            </div>
        </div>
    )
}
