import React, { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import './HeaderStyle/Navbar.css'

export default function Navbar() {

    const [open, setOpen] = useState(false)

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

    return (
        <div id='navbar' className=''>
            <div className='container'>
                <div className='p-4 d-flex justify-content-between'>
                    <div className="logo text-white h3">Portfol<span className='text-warning'>io</span></div>
                    <div className="navbar_links mt-2" >
                        <a className='text-decoration-none mx-4 a' href="#">Home</a>
                        <a className='text-decoration-none mx-4 a' href="#">About</a>
                        <a className='text-decoration-none mx-4 a' href="#">Service</a>
                        <a className='text-decoration-none mx-4 a' href="#">Skill</a>
                        <a className='text-decoration-none mx-4 a' href="#">Contact</a>
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
                            <a className='text-decoration-none d-block py-3 text-center h5' href="#">Home</a>
                            <a className='text-decoration-none d-block py-3 text-center h5' href="#">About</a>
                            <a className='text-decoration-none d-block py-3 text-center h5' href="#">Service</a>
                            <a className='text-decoration-none d-block py-3 text-center h5' href="#">Skill</a>
                            <a className='text-decoration-none d-block py-3 text-center h5' href="#">Contact</a>
                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
            </div>
        </div>
    )
}
