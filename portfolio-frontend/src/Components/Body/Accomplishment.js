import React, { useState } from 'react'
import { Fade } from 'reactstrap'
import '../Body/BodyStyles/Accomplishment.css'
import Achievements from './Achievements'
import Certifications from './Certifications'


export default function Accomplishment() {

    const [content, setContent] = useState('achievements')
    const tab = (str, pos) => {
        setContent(str)
        let el = document.querySelectorAll('.accomplishment_tab_link')
        el.forEach((item, index) => {
            if (index === pos) {
                item.classList.add('h5', 'text-primary', 'border-bottom', 'border-primary')
            }
            else {
                item.classList.remove('h5', 'text-primary', 'border-bottom', 'border-primary')
            }
        })

    }

    let achievementsShow = <Fade> <Achievements /> </Fade>
    let certificationsShow = <Fade> <Certifications /> </Fade>

    return (
        <div className='bg-light' id='accomplishment'>
            <div className="container pt-3">
                <div className="">
                    <div className='text-center py-3'>
                        <h1 className='fw-bold'>Accomplishment</h1>
                        <div className=''>
                            <div className='fw-bold'>---------- <span className='text-danger'>What I Achieved</span> ----------</div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='d-flex justify-content-center pt-4 accomplishment_tab'>
                        <div onClick={e => tab('achievements', 0)} className='mx-3 mx-md-4 accomplishment_tab_link h5 text-primary border-bottom border-primary' href="">Achievements</div>
                        <div onClick={e => tab('certifications', 1)} className='mx-3 mx-md-4 accomplishment_tab_link' href="">Certifications</div>
                    </div>
                </div>

                <div className='px-3'>
                    <div className='row pt-5'>
                        {content === 'achievements' ? achievementsShow : ''}
                        {content === 'certifications' ? certificationsShow : ''}
                    </div>
                </div>


            </div>
        </div>
    )
}
