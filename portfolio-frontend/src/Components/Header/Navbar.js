import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Feedback from '../Body/Feedback';
import './HeaderStyle/Navbar.css'
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import { Fade } from 'react-reveal';

export default function Navbar() {

    const [open, setOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)


    window.onscroll = () => {

        if (true) {
            if (document.documentElement.scrollTop > 75) {
                document.getElementById('navbar').classList.add('position-fixed', 'top-0', 'bg-dark', 'w-100')
                document.getElementById('navbar').style.zIndex = '100'
                document.getElementById('navbar').style.opacity = '.9'
            }
            else {
                document.getElementById('navbar').classList.remove('position-fixed', 'top-0', 'bg-dark')
                document.getElementById('navbar').style.opacity = '1'

            }
        }
    }

    const toggle = () => setOpen(!open)
    const modalToggle = () => setModalOpen(!modalOpen)



    return (
        <div id='navbar'>
            <div className='container'>
                <div className='py-2 d-flex justify-content-between'>
                    <a href='' className="logo d-flex align-items-center">
                        <img className='img-fluid logo' src="/Assets/logo.png" alt="" />
                    </a>


                    <div className="navbar_links my-3" >
                        {window.location.pathname === '/all-projects' ?
                            <>
                                <a className='text-decoration-none mx-2 nav_a' href="/">Home</a>
                            </> :


                            <>
                                <Link className='text-decoration-none mx-2 a nav_a' to="/all-projects">Projects</Link>
                                <a className='text-decoration-none mx-2 nav_a' href="#about">About</a>
                                <a className='text-decoration-none mx-2 nav_a' href="#qualification">Qualification</a>
                                <a className='text-decoration-none mx-2 nav_a' href="#skill">Skill</a>
                                <a className='text-decoration-none mx-2 nav_a' href="#accomplishment">Accomplishment</a>
                                <a className='text-decoration-none mx-2 nav_a' href="#services">Service</a>
                                <a className='text-decoration-none mx-2 nav_a' href="#testimonial">Testimonial</a>
                            </>}


                        <a className='text-decoration-none mx-2 nav_a' href="#contact">Contact</a>
                        <Link onClick={modalToggle} className='text-decoration-none mx-2 a nav_a' to="">Feedback</Link>
                    </div>


                    <div onClick={toggle} id='navbar_threeDot' className="navbar_threeDot">
                        <div className='navbar_threeDotLine'></div>
                        <div className='navbar_threeDotLine'></div>
                        <div className='navbar_threeDotLine'></div>
                    </div>

                    <Offcanvas isOpen={open} toggle={toggle}>

                        <OffcanvasHeader toggle={toggle}></OffcanvasHeader>

                        <Fade left cascade>
                            <OffcanvasBody>

                                {window.location.pathname === '/all-projects' ?

                                    <a onClick={toggle} className='off_canvas_a text-decoration-none d-block py-3 text-center h5 ' href="/">Home</a> :
                                    <>

                                        <Link className='off_canvas_a text-decoration-none d-block py-3 text-center h5 ' to="/all-projects">Projects</Link>
                                        <a onClick={toggle} className='off_canvas_a text-decoration-none d-block py-3 text-center h5 ' href="#about">About</a>
                                        <a onClick={toggle} className='off_canvas_a text-decoration-none d-block py-3 text-center h5 ' href="#qualification">Qualification</a>
                                        <a onClick={toggle} className='off_canvas_a text-decoration-none d-block py-3 text-center h5 ' href="#skill">Skill</a>
                                        <a onClick={toggle} className='off_canvas_a text-decoration-none d-block py-3 text-center h5 ' href="#accomplishment">Accomplishment</a>
                                        <a onClick={toggle} className='off_canvas_a text-decoration-none d-block py-3 text-center h5 ' href="#services">Service</a>
                                        <a onClick={toggle} className='off_canvas_a text-decoration-none d-block py-3 text-center h5 ' href="#testimonial">Testimonial</a>

                                    </>

                                }

                                <a onClick={toggle} className='off_canvas_a text-decoration-none d-block py-3 text-center h5 ' href="#contact">Contact</a>
                                <div onClick={modalToggle} className='off_canvas_a text-decoration-none d-block py-3 text-center h5 ' style={{ cursor: 'pointer' }}>Feedback</div>

                            </OffcanvasBody>
                        </Fade>

                    </Offcanvas>


                </div>
            </div>

            {modalOpen ? <Feedback open={modalOpen} toggle={modalToggle} /> : ''}

        </div>
    )
}
