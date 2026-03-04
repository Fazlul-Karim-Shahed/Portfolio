import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import Reveal from '../Reveal'

export default function Skill() {
  const [content, setContent] = useState('links')
  const [project, setProject] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalPhoto, setModalPhoto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAllLinks, setShowAllLinks] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const frontEnd = [
    { name: 'html.png', url: 'https://en.wikipedia.org/wiki/HTML' },
    { name: 'css.png', url: 'https://en.wikipedia.org/wiki/CSS' },
    { name: 'javascript.png', url: 'https://en.wikipedia.org/wiki/CSS' },
    { name: 'bootstrap.jpg', url: 'https://en.wikipedia.org/wiki/Bootstrap_(front-end_framework)' },
    { name: 'tailwind.png', url: 'https://en.wikipedia.org/wiki/Tailwind_CSS' },
    { name: 'reactstrap.png', url: 'https://reactstrap.github.io/?path=/story/home-installation--page' },
    { name: 'mui.png', url: 'https://mui.com/' },
    { name: 'react.png', url: 'https://en.wikipedia.org/wiki/React_(software)' },
  ]

  const backEnd = [
    { name: 'node.png', url: 'https://en.wikipedia.org/wiki/Node.js' },
    { name: 'express.png', url: 'https://en.wikipedia.org/wiki/Express.js' },
    { name: 'mongodb.png', url: 'https://en.wikipedia.org/wiki/MongoDB' },
    { name: 'mongoose.png', url: 'https://en.wikipedia.org/wiki/Mongoose_(MongoDB)' },
    {
      name: 'atlas.png',
      url: 'https://www.mongodb.com/docs/atlas/',
    },
  ]

  const others = [
    { name: 'ml.png', url: 'https://en.wikipedia.org/wiki/Machine_learning' },
    { name: 'arduino.png', url: 'https://en.wikipedia.org/wiki/Arduino' },
    { name: 'matlab.jpg', url: 'https://en.wikipedia.org/wiki/MATLAB' },
    { name: 'multisim.jpg', url: 'https://en.wikipedia.org/wiki/NI_Multisim' },
  ]

  const vlsiSkills = [
    'SystemVerilog', 'Verilog', 'UVM', 'VHDL',
    'AXI Protocol', 'APB Protocol', 'AHB Protocol', 'SPI Interface',
    'ASIC Design', 'FPGA Design', 'RTL Design', 'Design Verification',
    'Xilinx Vivado', 'ModelSim', 'QuestaSim', 'Synopsys VCS',
    'Digital Logic Design', 'Timing Analysis', 'Gate-Level Simulation',
    'Testbench Development', 'Functional Coverage', 'Code Coverage',
  ]

  useEffect(() => {
    // Only fetch if we haven't already
    if (project === null) {
      setLoading(true)
      axios
        .get(process.env.REACT_APP_BACKEND_API + 'Links.json')
        .then(res => {
          setProject(res.data)
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }, [project])

  const toggle = (item, str) => {
    setModalPhoto({ ...item, str })
    setModalOpen(!modalOpen)
  }

  const tab = (str, pos) => {
    if (content === str) return; // Ignore clicks on already active tab
    setContent(str)

    // The links tab requires network loading
    if (str === 'links' && project === null) {
      setLoading(true)
    } else {
      // The other tabs are hardcoded and load instantly
      setLoading(false)
    }

    const el = document.querySelectorAll('.skill_tab_link')
    el.forEach((item, index) => {
      if (index === pos) {
        item.classList.add('active-tab')
      } else {
        item.classList.remove('active-tab')
      }
    })
  }

  const renderSkills = (skills, folder) =>
    skills.map(item => (
      <div key={item.name} className="col-6 col-md-3 d-flex align-items-center justify-content-center p-3 skill-logo">
        <div
          className="d-flex align-items-center justify-content-center w-100 h-100"
          onClick={() => toggle(item, folder)}
          role="button"
          tabIndex={0}
        >
          <img
            className="img-fluid"
            style={{ maxWidth: '60%', maxHeight: '100px', objectFit: 'contain' }}
            src={`/Assets/${folder}/${item.name}`}
            alt={item.name.split('.')[0]}
            title={item.name.split('.')[0]}
          />
        </div>
      </div>
    ))

  const renderSkeleton = () => (
    Array.from({ length: 4 }).map((_, i) => (
      <div className="col-6 col-md-3 d-flex align-items-center justify-content-center p-3" key={i}>
        <div className="skeleton-glossy w-100" style={{ height: '120px', borderRadius: '15px' }}></div>
      </div>
    ))
  )

  let projectArr = []
  if (project != null) {
    for (let i in project) {
      projectArr.push(
        <div key={project[i].name} className="col-lg-4 col-sm-12 col-md-6 py-3">
          <div className="links-card h-100">
            {/* Image with hover overlay */}
            <div className="links-card-img-wrapper">
              <img
                alt="Project"
                src={project[i].image}
                className="links-card-img"
              />
              {project[i].liveLink && (
                <a
                  href={'http://' + project[i].liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="links-card-overlay"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span className="links-card-overlay-text">Preview</span>
                </a>
              )}
            </div>
            {/* Card content */}
            <div className="links-card-body">
              <h5 className="links-card-title">{project[i].name}</h5>
              <p className="links-card-desc">{project[i].description}</p>
              <div className="links-card-actions">
                {project[i].sourceCode && (
                  <a
                    className="links-card-btn"
                    target="_blank"
                    href={project[i].sourceCode}
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faCode} className="me-1" /> Code
                  </a>
                )}
                {project[i].category !== 'web' && project[i].category !== 'ai' && project[i].readmore && (
                  <a
                    className="links-card-btn links-card-btn-secondary"
                    target="_blank"
                    href={project[i].readmore}
                    rel="noreferrer"
                  >
                    Read more
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="pb-5">
      <Reveal effect="fade-up">
        <div className="container">
          <div id="skill" className="text-center mb-5">
            <h1 className="fw-bold">My Skills</h1>
            <p className="section-subtitle">What I Know</p>
          </div>

          {/* Glossy Box Wrapper */}
          <div className="glossy-box-container rounded-4">
            {/* Tabs */}
            <div className="d-flex justify-content-center skill_tab flex-nowrap overflow-auto px-2">
              {['links', 'vlsi', 'frontend', 'backend', 'others'].map((tabName, idx) => (
                <div
                  key={tabName}
                  className={`mx-1 mx-md-3 pb-2 skill_tab_link text-center ${idx === 0 ? 'active-tab' : ''}`}
                  onClick={() => tab(tabName, idx)}
                  role="button"
                  tabIndex={0}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {tabName === 'vlsi' ? 'VLSI / RTL' : tabName.charAt(0).toUpperCase() + tabName.slice(1)}
                </div>
              ))}
            </div>

            {/* Skill/Project Cards */}
            <div key={content} className="row pt-3 justify-content-center glossy-fade-in">
              {content === 'vlsi' && (
                <div className="col-12 px-3 py-2">
                  <div className="vlsi-skills-grid">
                    {vlsiSkills.map((skill, i) => (
                      <span key={i} className="vlsi-skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
              {content === 'frontend' && renderSkills(frontEnd, 'Frontend')}
              {content === 'backend' && renderSkills(backEnd, 'Backend')}
              {content === 'others' && renderSkills(others, 'Others')}
              {content === 'links' && (
                <>
                  {project === null ? (
                    renderSkeleton()
                  ) : (
                    <>
                      {projectArr.slice(0, isSmallScreen ? 2 : 3)}
                      <div className="text-center mt-4">
                        <Link to="/all-projects">
                          <Button color="warning" outline>
                            All Projects
                          </Button>
                        </Link>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Reveal>

      <Modal isOpen={modalOpen} size="xl" toggle={() => setModalOpen(false)} centered>
        {modalPhoto && (
          <>
            <ModalHeader toggle={() => setModalOpen(false)} className="text-capitalize">
              {modalPhoto.name.split('.')[0]}
            </ModalHeader>
            <ModalBody>
              <div className="row gx-3">
                <div className="col-md-4 d-flex align-items-center justify-content-center p-3">
                  <img
                    className="img-fluid rounded-4 shadow-sm"
                    src={`/Assets/${modalPhoto.str}/${modalPhoto.name}`}
                    alt={modalPhoto.name}
                    style={{ maxHeight: '350px', objectFit: 'contain' }}
                  />
                </div>
                <div className="col-md-8">
                  <iframe
                    src={modalPhoto.url}
                    title={modalPhoto.name}
                    style={{
                      width: '100%',
                      height: '450px',
                      borderRadius: '12px',
                      border: '1px solid #ddd',
                    }}
                    frameBorder="0"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </Modal>

      {/* INLINE CSS */}
      <style>{`
      .glossy-bg {
        background: transparent;
        color: var(--text-primary);
      }
      
      @keyframes glossyFadeIn {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .glossy-fade-in {
        animation: glossyFadeIn 0.4s ease-out forwards;
      }

      .skeleton-glossy {
        background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.03) 75%);
        background-size: 200% 100%;
        animation: skeletonLoading 1.5s infinite;
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255,255,255,0.05);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      }

      @keyframes skeletonLoading {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }
      
      // Remove this line for Adding box around the skill section
      .glossy-box-container {
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        backdrop-filter: blur(14px);
        box-shadow: var(--shadow);
      }

      .skill_tab_link {
        font-size: 1rem;
        font-weight: 500;
        color: var(--text-secondary);
        cursor: pointer;
        padding: 8px 12px;
        border-radius: 8px;
        transition: all 0.3s ease;
      }

      @media (max-width: 768px) {
        .skill_tab_link {
          font-size: 0.85rem;
          padding: 6px 8px;
        }
        
        .skill_tab {
          /* Allows horizontal scrolling on very narrow devices if it still can't fit */
          padding-bottom: 5px;
        }
        
        /* Hide scrollbar for cleaner look */
        .skill_tab::-webkit-scrollbar {
          display: none;
        }
        .skill_tab {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Scale down the framework/tool logos on mobile devices */
        .skill-logo img {
          max-width: 45% !important;
          max-height: 70px !important;
        }
      }

      .skill_tab_link:hover {
        background-color: var(--accent-glow);
      }

      .active-tab {
        color: var(--accent) !important;
        font-weight: bold;
        border-bottom: 3px solid var(--accent);
      }

      /* VLSI skill tags */
      .vlsi-skills-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
        justify-content: center;
        padding: 1rem 0;
      }

      .vlsi-skill-tag {
        display: inline-block;
        padding: 0.5rem 1.2rem;
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--accent);
        background: rgba(0, 229, 255, 0.06);
        border: 1px solid rgba(0, 229, 255, 0.15);
        border-radius: 25px;
        transition: all 0.3s ease;
        cursor: default;
      }

      .vlsi-skill-tag:hover {
        background: rgba(0, 229, 255, 0.12);
        border-color: var(--accent);
        transform: translateY(-3px);
        box-shadow: 0 4px 15px rgba(0, 229, 255, 0.15);
      }

      .project-card,
      .skill-card {
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        backdrop-filter: blur(18px);
        box-shadow: var(--shadow);
        border-radius: 1rem;
        padding: 1.2rem;
        color: var(--text-primary);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .project-card:hover,
      .skill-card:hover {
        transform: scale(1.03);
        box-shadow: 0 0 30px var(--accent-glow);
      }

      .skill-logo img {
        width: 100%;
        height: auto;
        transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;
      }

      .skill-logo:hover img {
        transform: scale(1.15);
        filter: drop-shadow(0 0 8px var(--accent));
      }

      /* ─── Links Card ─── */
      .links-card {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 1rem;
        overflow: hidden;
        transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        display: flex;
        flex-direction: column;
      }

      .links-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 12px 40px rgba(13, 110, 253, 0.2), 0 0 0 1px rgba(13, 110, 253, 0.15);
        border-color: rgba(13, 110, 253, 0.3);
      }

      .links-card-img-wrapper {
        position: relative;
        overflow: hidden;
        aspect-ratio: 16 / 10;
        background: rgba(0, 0, 0, 0.2);
      }

      .links-card-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease, filter 0.4s ease;
      }

      .links-card-img-wrapper:hover .links-card-img {
        transform: scale(1.08);
        filter: brightness(0.4);
      }

      .links-card-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        color: white;
        opacity: 0;
        transition: opacity 0.35s ease;
        text-decoration: none;
        background: rgba(13, 110, 253, 0.15);
        backdrop-filter: blur(2px);
      }

      .links-card-img-wrapper:hover .links-card-overlay {
        opacity: 1;
      }

      .links-card-overlay svg {
        filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4));
        transition: transform 0.3s ease;
      }

      .links-card-img-wrapper:hover .links-card-overlay svg {
        transform: scale(1.15);
      }

      .links-card-overlay-text {
        font-size: 0.8rem;
        font-weight: 600;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
      }

      .links-card-body {
        padding: 1.2rem 1.3rem;
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .links-card-title {
        color: #fff;
        font-weight: 700;
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
      }

      .links-card-desc {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.85rem;
        line-height: 1.5;
        flex: 1;
      }

      .links-card-actions {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-top: 0.8rem;
      }

      .links-card-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 6px 16px;
        font-size: 0.82rem;
        font-weight: 600;
        color: #fbbf24;
        border: 1px solid rgba(251, 191, 36, 0.4);
        border-radius: 8px;
        text-decoration: none;
        transition: all 0.3s ease;
        background: transparent;
      }

      .links-card-btn:hover {
        background: rgba(251, 191, 36, 0.12);
        border-color: #fbbf24;
        color: #fbbf24;
        box-shadow: 0 0 12px rgba(251, 191, 36, 0.15);
      }

      .links-card-btn-secondary {
        color: rgba(255, 255, 255, 0.6);
        border-color: rgba(255, 255, 255, 0.2);
      }

      .links-card-btn-secondary:hover {
        color: #fff;
        border-color: rgba(255, 255, 255, 0.5);
        background: rgba(255, 255, 255, 0.08);
        box-shadow: none;
      }

      /* Light mode */
      html[data-theme="light"] .links-card {
        background: rgba(248, 251, 255, 0.95);
        border-color: rgba(100, 120, 200, 0.3);
      }

      html[data-theme="light"] .links-card:hover {
        box-shadow: 0 12px 40px rgba(13, 110, 253, 0.1);
        border-color: rgba(13, 110, 253, 0.4);
      }

      html[data-theme="light"] .links-card-title {
        color: #1a1a2e;
      }

      html[data-theme="light"] .links-card-desc {
        color: #555;
      }

      html[data-theme="light"] .links-card-btn {
        color: #b45309;
        border-color: rgba(180, 83, 9, 0.4);
      }

      html[data-theme="light"] .links-card-btn:hover {
        background: rgba(180, 83, 9, 0.08);
        border-color: #b45309;
      }

      html[data-theme="light"] .links-card-btn-secondary {
        color: #555;
        border-color: rgba(0, 0, 0, 0.2);
      }

      html[data-theme="light"] .links-card-btn-secondary:hover {
        color: #1a1a2e;
        border-color: rgba(0, 0, 0, 0.4);
        background: rgba(0, 0, 0, 0.04);
      }
    `}</style>
    </div>
  );


}
