import React, { useState } from 'react'
import { Fade } from 'reactstrap'
import '../Body/BodyStyles/Accomplishment.css'
import Achievements from './Achievements'
import Certifications from './Certifications'
import Slide from 'react-reveal/Slide';
import Bounce from 'react-reveal/Bounce';


export default function Accomplishment() {

    const [content, setContent] = useState('achievements')
    const tab = (str, pos) => {
        setContent(str)
        let el = document.querySelectorAll('.accomplishment_tab_link')
        el.forEach((item, index) => {
            if (index === pos) {
                item.classList.add('h6', 'fw-bold', 'text-primary', 'border-bottom', 'border-primary')
            }
            else {
                item.classList.remove('h6', 'fw-bold', 'text-primary', 'border-bottom', 'border-primary')
            }
        })

    }

    let achievementsShow = <Slide right> <Achievements /> </Slide>
    let certificationsShow = <Slide left> <Certifications /> </Slide>

    return (
        <div className='bg-light' id='accomplishment'>
            <div className="container pt-3">
                <Bounce left>
                    <div className="">
                        <div className='text-center py-3'>
                            <h1 className='fw-bold'>Accomplishment</h1>
                            <div className=''>
                                <div className='fw-bold'>---------- <span className='text-danger'>What I Achieved</span> ----------</div>
                            </div>
                        </div>
                    </div>
                </Bounce>

                <Bounce right>
                    <div>
                        <div className='d-flex justify-content-center pt-5 accomplishment_tab'>
                            <div onClick={e => tab('achievements', 0)} className='mx-3 pb-1 mx-md-4 accomplishment_tab_link h6 fw-bold text-primary border-bottom border-primary' href="">Achievements</div>
                            <span className=''>|</span>
                            <div onClick={e => tab('certifications', 1)} className='mx-3 pb-1 mx-md-4 accomplishment_tab_link' href="">Certifications</div>
                        </div>
                    </div>
                </Bounce>

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
