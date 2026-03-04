import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import './BodyStyles/About.css'
import { useSpring, animated } from 'react-spring'
import Reveal from '../Reveal'

export default function About() {
  const [about, setAbout] = useState('')
  const [open, setOpen] = useState(false)
  const contentRef = useRef(null)

  // Calculate content heights for animation
  const [contentHeight, setContentHeight] = useState('auto')
  const [collapsedHeight, setCollapsedHeight] = useState(250) // Default fallback height

  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_API + 'About.json')
      .then(data => setAbout(data.data.about))
      .catch(() => { })
  }, [])

  // Update heights for animation when content changes or window resizes
  useEffect(() => {
    if (contentRef.current) {
      // Get full height
      setContentHeight(contentRef.current.scrollHeight)

      // Calculate a reasonable collapsed height based on screen size
      // roughly 4-5 lines of text
      const isMobile = window.innerWidth < 768
      setCollapsedHeight(isMobile ? 200 : 150)
    }

    // Setup resize listener to recalculate heights
    const handleResize = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [about])

  const toggle = () => setOpen(!open)

  // Strip HTML tags to get plain text length for truncation check
  const plainText = about.replace(/<[^>]*>/g, '')
  const shouldTruncate = plainText.length > 300

  // Spring animation for smooth expansion/collapse
  const expandAnimation = useSpring({
    height: open ? contentHeight : (shouldTruncate ? collapsedHeight : contentHeight),
    opacity: 1,
    overflow: 'hidden',
    config: { tension: 250, friction: 25, clamp: true }
  })



  return (
    <div className='pb-5' id='about'>
      <Reveal effect="fade-up">
        <div className="container">
          <div className='text-center pt-2 pb-3'>
            <h1 className='fw-bold text-white'>About Me</h1>
            <div className='fw-bold text-white-50'>
              <p className='section-subtitle'>Who am I</p>
            </div>
          </div>

          <div className="row m-0 glass-card rounded-4 shadow-lg p-4">
            <div className="col-md-5 text-center mb-4 mb-md-0">
              <img className='img-fluid w-75 rounded-4 shadow' src="./Assets/me3.png" alt="me" />
            </div>
            <div className="col-md-7 d-flex flex-column justify-content-center text-white">
              <h3 className='fw-bold mb-3'>
                <span>A </span>
                <span className='text-primary'>Passionate </span>
                <span className='text-warning'>Developer</span>
              </h3>
              {about === '' ? (
                <p className='mt-5 text-danger'>Check internet connection!</p>
              ) : (
                <div className='mt-2 about-html-content d-flex flex-column position-relative'>
                  <animated.div style={expandAnimation} className="position-relative">
                    <div
                      ref={contentRef}
                      style={{ textAlign: 'justify' }}
                      dangerouslySetInnerHTML={{ __html: about }}
                    />

                  </animated.div>

                  {shouldTruncate && (
                    <div className="mt-2 text-center text-md-start">
                      <button
                        onClick={toggle}
                        className="btn btn-outline-warning btn-sm px-4 py-2 mt-2 rounded-pill fw-bold"
                        style={{
                          transition: 'all 0.3s ease',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        {open ? (
                          <><span>Show less</span> <i className="fa-solid fa-chevron-up"></i></>
                        ) : (
                          <><span>Read more</span> <i className="fa-solid fa-chevron-down"></i></>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

