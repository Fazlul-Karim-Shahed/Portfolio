import React, { useState } from 'react'
import { Fade } from 'reactstrap'
import './BodyStyles/Qualification.css'
import Education from './Education'
import Experience from './Experience'


export default function Qualification() {

    const [content, setContent] = useState('education')
    const tab = (str, pos) => {
        setContent(str)
        let el = document.querySelectorAll('.qualification_tab_link')
        el.forEach((item, index) => {
            if (index === pos) {
                item.classList.add('h5', 'text-primary', 'border-bottom', 'border-primary')
            }
            else {
                item.classList.remove('h5', 'text-primary', 'border-bottom', 'border-primary')
            }
        })

    }

    let educationShow = <Fade> <Education /> </Fade>
    let experienceShow = <Fade> <Experience /> </Fade>

    return (
        <div className='bg-light' id='qualification'>
            <div className="container pt-3">
                <div className="">
                    <div className='text-center py-3'>
                        <h1 className='fw-bold'>Qualification</h1>
                        <div className=''>
                            <div className='fw-bold'>---------- <span className='text-danger'>What i have</span> ----------</div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='d-flex justify-content-center pt-4 qualification_tab'>
                        <div onClick={e => tab('education', 0)} className='mx-3 mx-md-4 qualification_tab_link h5 text-primary border-bottom border-primary' href="">Education</div>
                        <div onClick={e => tab('experience', 1)} className='mx-3 mx-md-4 qualification_tab_link' href="">Experience</div>
                    </div>
                </div>

                <div className='px-3'>
                    <div className='row pt-5'>
                        {content === 'education' ? educationShow : ''}
                        {content === 'experience' ? experienceShow : ''}
                    </div>
                </div>


            </div>
        </div>
    )
}
