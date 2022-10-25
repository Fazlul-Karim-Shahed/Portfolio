import React, { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import Feedback from '../Body/Feedback';
import './HeaderStyle/Navbar.css'

export default function Navbar() {

    const [open, setOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)


    window.onscroll = () => {
        if (document.documentElement.scrollTop > 75) {
            document.getElementById('navbar').classList.add('position-fixed', 'top-0', 'bg-dark', 'w-100')
            document.getElementById('navbar').style.zIndex = '100'
        }
        else {
            document.getElementById('navbar').classList.remove('position-fixed', 'top-0', 'bg-dark')
        }
    }

    const toggle = () => setOpen(!open)
    const modalToggle = () => setModalOpen(!modalOpen)
    const anotherModalToggle = () => {
        setModalOpen(!modalOpen);
        toggle()
    }

    return (
        <div id='navbar' className=''>
            <div className='container'>
                <div className='p-4 d-flex justify-content-between'>
                    <a href='' className="logo text-white text-decoration-none h3">Portfol<span className='text-warning'>io</span></a>
                    <div className="navbar_links mt-2" >
                        <a className='text-decoration-none mx-2 a' href="#about">About</a>
                        <a className='text-decoration-none mx-2 a' href="#qualification">Qualification</a>
                        <a className='text-decoration-none mx-2 a' href="#skill">Skill</a>
                        <a className='text-decoration-none mx-2 a' href="#testimonial">Testimonial</a>
                        <a className='text-decoration-none mx-2 a' href="#services">Service</a>
                        <a className='text-decoration-none mx-2 a' href="#contact">Contact</a>
                        <Link onClick={modalToggle} className='text-decoration-none mx-2 a' to="">Feedback</Link>
                    </div>
                    <div onClick={toggle} id='navbar_threeDot' className="navbar_threeDot">
                        <div className='navbar_threeDotLine'></div>
                        <div className='navbar_threeDotLine'></div>
                        <div className='navbar_threeDotLine'></div>
                    </div>

                    <Offcanvas show={open} onHide={toggle}>
                        <Offcanvas.Header className='m-3' closeButton>
                            <Offcanvas.Title></Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className='navbar_offcanvas_link'>
                            <a className='text-decoration-none d-block py-3 text-center h5' href="#about">About</a>
                            <a className='text-decoration-none d-block py-3 text-center h5' href="#qualification">Qualification</a>
                            <a className='text-decoration-none d-block py-3 text-center h5' href="#skill">Skill</a>
                            <a className='text-decoration-none d-block py-3 text-center h5' href="#testimonial">Testimonial</a>
                            <a className='text-decoration-none d-block py-3 text-center h5' href="#services">Service</a>
                            <a className='text-decoration-none d-block py-3 text-center h5' href="#contact">Contact</a>
                            <div onClick={anotherModalToggle} className='text-decoration-none d-block py-3 text-center h5' style={{ cursor: 'pointer' }}>Feedback</div>
                        </Offcanvas.Body>

                    </Offcanvas>
                </div>
            </div>

            {modalOpen ? <Feedback open={modalOpen} toggle={modalToggle} /> : ''}

        </div>
    )
}
