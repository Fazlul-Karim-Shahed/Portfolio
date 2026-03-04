import React, { useState, useEffect } from 'react'
import '../Body/BodyStyles/Accomplishment.css'
import Achievements from './Achievements'
import Certifications from './Certifications'
import Reveal from '../Reveal'

export default function Accomplishment() {
  const [content, setContent] = useState('achievements')

  const tabItems = ['achievements', 'certifications']

  useEffect(() => {
    // Set first tab active on mount
    const elements = document.querySelectorAll('.accomplishment_tab_link')
    elements.forEach((el, index) => {
      if (index === 0) {
        el.classList.add('active-tab')
      }
    })
  }, [])

  const handleTabClick = (str, pos) => {
    setContent(str)
    const elements = document.querySelectorAll('.accomplishment_tab_link')
    elements.forEach((el, index) => {
      if (index === pos) {
        el.classList.add('active-tab')
      } else {
        el.classList.remove('active-tab')
      }
    })
  }

  return (
    <div className='py-5' id='accomplishment'>
      <div className="container">
        <Reveal effect="fade-up">
          <div className="text-center mb-5">
            <h1 className='fw-bold'>Accomplishment</h1>
            <div className='fw-bold'>
              <p className='section-subtitle'>What I Achieved</p>
            </div>
          </div>
        </Reveal>

        {/* Glossy Box Wrapper */}
        {/* Write correct name of glossy-box-wrapper to add box around */}
        <div className='glossy-box-wrappe'>

          <div className='d-flex justify-content-center mb-4 accomplishment_tab flex-wrap'>
            {tabItems.map((tabName, idx) => (
              <div
                key={tabName}
                className="mx-3 mx-md-4 pb-2 accomplishment_tab_link"
                role="button"
                tabIndex={0}
                onClick={() => handleTabClick(tabName, idx)}
              >
                {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
              </div>
            ))}
          </div>

          <div className='row pt-3'>
            {content === 'achievements' && (
              <Reveal effect="zoom">
                <Achievements />
              </Reveal>
            )}
            {content === 'certifications' && (
              <Reveal effect="zoom">
                <Certifications />
              </Reveal>
            )}
          </div>
        </div>
      </div>

      {/* Inline CSS matching Skill section tabs */}
      <style>{`
        .accomplishment_tab_link {
          font-size: 1rem;
          font-weight: 500;
          color: #f8f9fa;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.3s ease;
          user-select: none;
        }

        .accomplishment_tab_link:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .accomplishment_tab_link.active-tab {
          color: #0d6efd;
          font-weight: bold;
          border-bottom: 3px solid #0d6efd;
        }
      `}</style>
    </div>
  )
}
