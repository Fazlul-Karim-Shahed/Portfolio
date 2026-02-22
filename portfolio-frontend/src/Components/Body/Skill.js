import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faPaperclip } from '@fortawesome/free-solid-svg-icons'
import Reveal from '../Reveal'

export default function Skill() {
  const [content, setContent] = useState('links')
  const [project, setProject] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalPhoto, setModalPhoto] = useState(null)

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

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_API + 'Links.json')
      .then(res => setProject(res.data))
      .catch(() => { })
  }, [])

  const toggle = (item, str) => {
    setModalPhoto({ ...item, str })
    setModalOpen(!modalOpen)
  }

  const tab = (str, pos) => {
    setContent(str)
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
      <Reveal effect="zoom" key={item.name} className="col-6 col-md-3 d-flex align-items-center justify-content-center p-3 skill-logo">
        <div
          onClick={() => toggle(item, folder)}
          role="button"
          tabIndex={0}
        >
          <img
            className="img-fluid w-50"
            src={`/Assets/${folder}/${item.name}`}
            alt={item.name.split('.')[0]}
            title={item.name.split('.')[0]}
          />
        </div>
      </Reveal>
    ))

  let projectArr = []
  if (project != null) {
    let count = 0
    for (let i in project) {
      if (++count > 3) break
      projectArr.push(
        <Reveal effect="zoom" key={project[i].name} className="col-lg-4 col-sm-12 col-md-6 py-3">
          <Card className="my-2 h-100 project-card w-100">
            <img
              alt="Project"
              src={project[i].image}
              className="img-fluid border-bottom p-1 rounded"
              style={{ height: '234px' }}
            />
            <CardBody>
              <CardTitle className='text-white' tag="h5">{project[i].name}</CardTitle>
              <CardText className="mt-3 small text-white text-opacity-50">{project[i].description}</CardText>
              <div className="mt-4">
                <button disabled={!project[i].sourceCode} className="btn btn-sm btn-outline-warning me-3">
                  <a
                    className="text-decoration-none text-light"
                    target="_blank"
                    href={project[i].sourceCode}
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faCode} className="me-1" /> Code
                  </a>
                </button>
                <button disabled={!project[i].liveLink} className="btn btn-outline-info btn-sm">
                  <a
                    className="text-decoration-none text-light"
                    target="_blank"
                    href={'http://' + `${project[i].liveLink}`}
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faPaperclip} className="me-1" /> Visit
                  </a>
                </button>
                {project[i].category !== 'web' && project[i].category !== 'ai' ? (
                  <button disabled={!project[i].readmore} className="btn btn-outline-info my-1">
                    <a
                      className="text-decoration-none text-light"
                      target="_blank"
                      href={project[i].readmore}
                      rel="noreferrer"
                    >
                      Read more
                    </a>
                  </button>
                ) : null}
              </div>
            </CardBody>
          </Card>
        </Reveal>
      )
    }
  }

  return (
    <div className="glossy-bg py-5">
      <Reveal effect="fade-up">
        <div className="container">
          <div id="skill" className="text-center mb-5">
            <h1 className="fw-bold">My Skills</h1>
            <p className="section-subtitle">What I Know</p>
          </div>

          {/* Glossy Box Wrapper */}
          <div className="glossy-box-container rounded-4">
            {/* Tabs */}
            <div className="d-flex justify-content-center skill_tab flex-wrap">
              {['links', 'frontend', 'backend', 'others'].map((tabName, idx) => (
                <div
                  key={tabName}
                  className={`mx-3 mx-md-4 pb-2 skill_tab_link ${idx === 0 ? 'active-tab' : ''}`}
                  onClick={() => tab(tabName, idx)}
                  role="button"
                  tabIndex={0}
                >
                  {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
                </div>
              ))}
            </div>

            {/* Skill/Project Cards */}
            <div className="row pt-3">
              {content === 'frontend' && renderSkills(frontEnd, 'Frontend')}
              {content === 'backend' && renderSkills(backEnd, 'Backend')}
              {content === 'others' && renderSkills(others, 'Others')}
              {content === 'links' && (
                <>
                  {project === null ? (
                    <p className="text-danger text-center">Check internet connection!</p>
                  ) : (
                    <>
                      {projectArr}
                      <div className="text-center mt-4">
                        <Link to="/all-projects">
                          <Button color="warning" outline>
                            Show more...
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
        background: #0f2027;
        color: #fff;
      }
      
      // Remove this line for Adding box around the skill section
      .glossy-box-container {
        background: rgba(255, 255, 255, 0.05);
        border: 2px solid rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(14px);
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.05);
      }

      .skill_tab_link {
        font-size: 1rem;
        font-weight: 500;
        color: #f8f9fa;
        cursor: pointer;
        padding: 8px 12px;
        border-radius: 8px;
        transition: all 0.3s ease;
      }

      .skill_tab_link:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .active-tab {
        color: #0d6efd;
        font-weight: bold;
        border-bottom: 3px solid #0d6efd;
      }

      .project-card,
      .skill-card {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(18px);
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.15);
        border-radius: 1rem;
        padding: 1.2rem;
        color: #000;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .project-card:hover,
      .skill-card:hover {
        transform: scale(1.03);
        box-shadow: 0 0 30px rgba(13, 110, 253, 0.3);
      }

      .skill-logo img {
        width: 100%;
        height: auto;
        transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;
      }

      .skill-logo:hover img {
        transform: scale(1.15);
        filter: drop-shadow(0 0 8px #0d6efd);
      }
    `}</style>
    </div>
  );


}
