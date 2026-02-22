import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './BodyStyles/About.css'
import { Collapse } from 'reactstrap'
import Reveal from '../Reveal'

export default function About() {
  const [about, setAbout] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_API + 'About.json')
      .then(data => setAbout(data.data.about))
      .catch(() => { })
  }, [])

  const toggle = () => setOpen(!open)

  // Strip HTML tags to get plain text length for truncation
  const plainText = about.replace(/<[^>]*>/g, '')
  const shouldTruncate = plainText.length > 300

  // For truncation, find a good cutoff point in the HTML
  const getTruncatedHtml = (html, maxChars) => {
    let charCount = 0
    let inTag = false
    let cutIndex = html.length

    for (let i = 0; i < html.length; i++) {
      if (html[i] === '<') { inTag = true; continue }
      if (html[i] === '>') { inTag = false; continue }
      if (!inTag) {
        charCount++
        if (charCount >= maxChars) {
          // Find the end of the current tag or word
          const nextClose = html.indexOf('>', i)
          cutIndex = nextClose !== -1 ? nextClose + 1 : i
          break
        }
      }
    }
    return html.substring(0, cutIndex)
  }

  const truncatedHtml = shouldTruncate ? getTruncatedHtml(about, 300) : about

  return (
    <div className='glossy-bg py-5' id='about'>
      <Reveal effect="fade-up">
        <div className="container">
          <div className='text-center py-3'>
            <h1 className='fw-bold text-white'>About Me</h1>
            <div className='fw-bold text-white-50'>
              <p className='section-subtitle'>Who am I</p>
            </div>
          </div>

          <div className="row m-0 pt-4 glass-card rounded-4 shadow-lg p-4">
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
                <div className='mt-2 about-html-content'>
                  <div
                    style={{ textAlign: 'justify' }}
                    dangerouslySetInnerHTML={{ __html: open || !shouldTruncate ? about : truncatedHtml + '...' }}
                  />
                  {shouldTruncate && (
                    <Collapse isOpen={open}>
                      {/* Content is already shown via dangerouslySetInnerHTML above */}
                    </Collapse>
                  )}
                  {shouldTruncate && (
                    <div
                      onClick={toggle}
                      className="pt-2 mt-2 fw-bold"
                      style={{ cursor: 'pointer', color: '#ffc107' }}
                    >
                      Show {open ? 'less' : 'more...'}
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

