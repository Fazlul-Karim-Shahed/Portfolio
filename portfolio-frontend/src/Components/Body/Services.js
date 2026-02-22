import React from 'react'
import { Card, CardBody } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faBrain, faBolt } from '@fortawesome/free-solid-svg-icons'
import Reveal from '../Reveal'

export default function Services() {
  return (
    <div className="glossy-bg py-5" id="services">
      <div className="container">
        <Reveal effect="fade-up">
          <div className="text-center py-3">
            <h1 name="services" className="fw-bold text-white">
              My Services
            </h1>
            <p className="section-subtitle">What I Provide</p>
          </div>
        </Reveal>

        <div className="row py-5">

          <Reveal effect="zoom" className="col-md-4 px-3 my-2 my-md-0">
            <Card className="service-glossy-box h-100 d-flex flex-column w-100">
              <CardBody className="text-center flex-grow-1 d-flex flex-column justify-content-center">
                {/* Custom VLSI/Circuit Icon */}
                <div className="vlsi-icon mb-3 mx-auto">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fdc937"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                    <path d="M9 9h6v6H9z" />
                    <path d="M3 9h1" />
                    <path d="M3 15h1" />
                    <path d="M20 9h1" />
                    <path d="M20 15h1" />
                    <path d="M9 3v1" />
                    <path d="M15 3v1" />
                    <path d="M9 20v1" />
                    <path d="M15 20v1" />
                  </svg>
                </div>

                <h3 className="py-2">Design Verification (VLSI)</h3>
                <h6 className="p-2 text-white-50">
                  I know Verilog, SystemVerilog & UVM. APB, SPI, AXI4 protocols. Moreover, capable in test plans, coverage and assertions
                </h6>
                </CardBody>
              </Card>
          </Reveal>


          <Reveal effect="zoom" className="col-md-4 px-3 my-2 my-md-0">
              <Card className="service-glossy-box h-100 d-flex flex-column w-100">
                <CardBody className="text-center flex-grow-1 d-flex flex-column justify-content-center">
                  {/* Custom Web Development Icon */}
                  <div className="webdev-icon mb-3 mx-auto">
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fdc937"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="14" rx="2" ry="2" />
                      <path d="M8 20h8" />
                      <path d="M12 4v16" />
                      <path d="M10 8l-2 2 2 2" />
                      <path d="M14 8l2 2-2 2" />
                    </svg>
                  </div>

                  <h3 className="py-2">Full Stack Development</h3>
                  <h6 className="p-2 text-white-50">
                    I will develop your website using CSS, Bootstrap-5, ReactJs, Tailwind CSS, NodeJs, ExpressJs, MongoDB and Mongoose. I can also develop RESTful APIs.
                  </h6>
                </CardBody>
              </Card>
          </Reveal>


          <Reveal effect="zoom" className="col-md-4 px-3 my-2 my-md-0">
              <Card className="service-glossy-box h-100 d-flex flex-column w-100">
                <CardBody className="text-center flex-grow-1 d-flex flex-column justify-content-center">
                  {/* Custom Graphics Design Icon */}
                  <div className="graphics-icon mb-3 mx-auto">
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fdc937"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="2.5" />
                      <circle cx="7" cy="7" r="1.5" />
                      <path d="M2 12h20" />
                      <path d="M12 2v20" />
                      <path d="M16 8l3 3-3 3" />
                      <path d="M8 16l-3 3 3-3z" />
                    </svg>
                  </div>

                  <h3 className="py-2">Poster Design</h3>
                  <h6 className="p-2 text-white-50">
                    I can design posters, banners, flyers, and other graphics using Canva. I can also create eye-catching social media posts.
                  </h6>
                </CardBody>
              </Card>
          </Reveal>

        </div>
      </div>

      <style>{`
        .service-glossy-box {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 1rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
          color: #fff;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }
        
        html[data-theme="light"] .service-glossy-box {
          background: rgba(248, 251, 255, 0.95) !important;
          border: 1px solid rgba(100, 120, 200, 0.5) !important;
          box-shadow: 0 4px 20px rgba(100, 120, 200, 0.12) !important;
          color: #0d1b2a;
        }
        
        .service-glossy-box:hover {
          transform: translateY(-10px);
          box-shadow: 0 0 30px rgba(253, 201, 55, 0.7);
        }
        
        html[data-theme="light"] .service-glossy-box:hover {
          box-shadow: 0 0 30px rgba(100, 150, 255, 0.5) !important;
          background: rgba(240, 245, 255, 0.98) !important;
        }
        
        .service-glossy-box:hover h3 {
          color: #fdc937;
          transition: color 0.3s ease;
        }
        
        html[data-theme="light"] .service-glossy-box:hover h3 {
          color: #0052cc !important;
        }
        
        .service-glossy-box:hover h6 {
          color: #fff;
          transition: color 0.3s ease;
        }
        
        html[data-theme="light"] .service-glossy-box:hover h6 {
          color: #5a6b7d !important;
        }
        
        .service-glossy-box:hover .fa-icon {
          color: #fdc937;
          transition: color 0.3s ease;
        }
        
        html[data-theme="light"] .service-glossy-box:hover svg {
          stroke: #0052cc !important;
        }
      `}</style>
    </div>
  )
}
