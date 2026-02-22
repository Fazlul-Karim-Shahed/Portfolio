import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Feedback from '../Body/Feedback';
import './HeaderStyle/Navbar.css'
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';

import { useTheme } from '../../contexts/ThemeContext';

export default function Navbar() {

    const [open, setOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const { isDark, toggleTheme } = useTheme()


    React.useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const navbar = document.getElementById('navbar');
                    if (navbar) {
                        if (document.documentElement.scrollTop > 75) {
                            navbar.classList.add('position-fixed', 'top-0', 'w-100');
                            navbar.style.zIndex = '100';
                            navbar.style.opacity = '0.96';
                            navbar.style.backdropFilter = 'blur(10px)';
                            // Smooth transition added to CSS class logic instead of inline if needed, but here inline is fine as it avoids full component re-render
                            if (isDark) {
                                navbar.classList.add('bg-dark');
                                navbar.style.backgroundColor = '';
                            } else {
                                navbar.classList.remove('bg-dark');
                                navbar.style.backgroundColor = 'var(--bg-primary)';
                            }
                        } else {
                            navbar.classList.remove('position-fixed', 'top-0', 'bg-dark');
                            navbar.style.opacity = '1';
                            navbar.style.backgroundColor = '';
                            navbar.style.backdropFilter = 'none';
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initialize on mount

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isDark]);

    const toggle = () => setOpen(!open)
    const modalToggle = () => setModalOpen(!modalOpen)



    return (
        <div id='navbar'>
            <div className='container'>
                <div className='py-3 d-flex justify-content-between'>
                    <a href='' className="logo d-flex align-items-center">
                        <img className='img-fluid logo' src={isDark ? "/Assets/logo.png" : "/Assets/logo3.png"} alt="" />
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

                    <button
                        onClick={toggleTheme}
                        className='theme-toggle-btn'
                        aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        <span className='toggle-icon sun-icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                        </span>
                        <span className='toggle-slider'></span>
                        <span className='toggle-icon moon-icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        </span>
                    </button>

                    <div onClick={toggle} id='navbar_threeDot' className="navbar_threeDot">
                        <div className='navbar_threeDotLine'></div>
                        <div className='navbar_threeDotLine'></div>
                        <div className='navbar_threeDotLine'></div>
                    </div>

                    <Offcanvas isOpen={open}
                        toggle={toggle}
                        style={{
                            background: isDark ? 'rgba(20, 20, 30, 0.6)' : 'var(--bg-primary)',
                            border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid var(--border-color)',
                            boxShadow: isDark ? '0 8px 32px 0 rgba(255, 255, 255, 0.1)' : 'var(--shadow)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            color: isDark ? 'white' : 'var(--text-primary)',
                            borderRadius: '0.75rem',
                            padding: '1rem',
                        }}>

                        <OffcanvasHeader close={<button className='btn-close me-2 m-auto' style={{ filter: isDark ? 'invert(1)' : 'none' }} onClick={toggle}></button>} toggle={toggle}></OffcanvasHeader>

                        <div>
                            <OffcanvasBody>

                                {window.location.pathname === '/all-projects' ?

                                    <a onClick={toggle} className='off_canvas_a text-decoration-none d-block py-3 text-center h5 ' href="/">Home</a> :
                                    <>

                                        <Link className='off_canvas_a text-decoration-none d-block py-3 text-center h5 text text-white' to="/all-projects">Projects</Link>
                                        <a onClick={toggle} className='off_canvas_a text-decoration-none d-block py-3 text-center h5 text text-white' href="#about">About</a>
                                        <a onClick={toggle} className='off_canvas_a text-decoration-none d-block py-3 text-center h5 text text-white' href="#qualification">Qualification</a>
                                        <a onClick={toggle} className='off_canvas_a text-decoration-none d-block py-3 text-center h5 text text-white' href="#skill">Skill</a>
                                        <a onClick={toggle} className='off_canvas_a text-decoration-none d-block py-3 text-center h5 text text-white' href="#accomplishment">Accomplishment</a>
                                        <a onClick={toggle} className='off_canvas_a text-decoration-none d-block py-3 text-center h5 text text-white' href="#services">Service</a>
                                        <a onClick={toggle} className='off_canvas_a text-decoration-none d-block py-3 text-center h5 text text-white' href="#testimonial">Testimonial</a>

                                    </>

                                }

                                <a onClick={toggle} className='off_canvas_a text-decoration-none d-block py-3 text-center h5 text text-white' href="#contact">Contact</a>
                                <div onClick={modalToggle} className='off_canvas_a text-decoration-none d-block py-3 text-center h5 text text-white' style={{ cursor: 'pointer' }}>Feedback</div>

                                <button
                                    onClick={toggleTheme}
                                    className='off_canvas_a text-decoration-none d-block py-3 text-center h5 text text-white w-100'
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1.2rem'
                                    }}
                                    title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                                >
                                    {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
                                </button>

                            </OffcanvasBody>
                        </div>

                    </Offcanvas>


                </div>
            </div>

            {modalOpen ? <Feedback open={modalOpen} toggle={modalToggle} /> : ''}

        </div>
    )
}
