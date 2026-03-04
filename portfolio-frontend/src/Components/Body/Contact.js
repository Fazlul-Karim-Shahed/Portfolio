import { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faPhone, faLocationDot, faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Formik } from 'formik'
import { Alert, Button, Spinner } from 'reactstrap'
import Reveal from '../Reveal'

export default function Contact() {
  const form = useRef()
  const [message, setMessage] = useState({ data: '', weight: '' })
  const [messageOpen, setMessageOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const toggle = () => setMessageOpen(!messageOpen)

  return (
    <div className="pb-5" id="contact">
      <div className="container">
        <Reveal effect="fade-up">
          <div className="text-center py-4">
            <h1 className="fw-bold text-white">Contact</h1>
            <p className="section-subtitle">Get in Touch</p>
          </div>
        </Reveal>

        <Reveal effect="zoom">
          <div className="glossy-card text-white p-4 p-md-5">
            <div className="row mb-4">
              <div className="col-md-6 align-content-center">
                <div className="mb-3 d-flex">
                  <FontAwesomeIcon icon={faLocationDot} className="text-warning me-3 mt-1" />
                  <p className="mb-0">24/3 Ka, Khilkhet, Dhaka, Bangladesh</p>
                </div>
                <div className="mb-3 d-flex">
                  <FontAwesomeIcon icon={faPhone} className="text-warning me-3 mt-1" />
                  <p className="mb-0">+880 1521537962</p>
                </div>
                <div className="mb-3 d-flex">
                  <FontAwesomeIcon icon={faEnvelope} className="text-warning me-3 mt-1" />
                  <p className="mb-0">fazlul.shahed2000@gmail.com</p>
                </div>
                <div className="mt-4 mt-md-5">
                  <h4 className="text-warning">Follow Me</h4>
                  <div className="mt-3">
                    <a target="_blank" rel="noreferrer" className="text-decoration-none me-3 text-facebook" href="https://www.facebook.com/profile.php?id=100051561011802"><FontAwesomeIcon icon={faFacebook} size="lg" /></a>
                    <a target="_blank" rel="noreferrer" className="text-decoration-none me-3 text-linkedin" href="https://www.linkedin.com/in/fazlul-karim-a2650b1a9/"><FontAwesomeIcon icon={faLinkedin} size="lg" /></a>
                    <a target="_blank" rel="noreferrer" className="text-decoration-none me-3 text-twitter" href="https://twitter.com/Fazlul2001"><FontAwesomeIcon icon={faTwitter} size="lg" /></a>
                    <a target="_blank" rel="noreferrer" className="text-decoration-none me-3 text-github" href="https://github.com/Fazlul-Karim-Shahed"><FontAwesomeIcon icon={faGithub} size="lg" /></a>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mt-4 mt-md-0">
                <h4 className=" mb-4 text-warning">Message Me</h4>
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                  }}
                  onSubmit={async () => {
                    setLoading(true)
                    try {
                      const formData = new FormData(form.current)
                      formData.append('service_id', 'service_yfd5eq5')
                      formData.append('template_id', 'template_s5c0axt')
                      formData.append('user_id', 'bzWngWpH_-HlzsJvf')

                      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send-form', {
                        method: 'POST',
                        body: formData,
                      })

                      if (response.ok) {
                        setMessageOpen(true)
                        setMessage({ data: 'Message sent successfully', weight: 'success' })
                      } else {
                        const errorText = await response.text()
                        setMessageOpen(true)
                        setMessage({ data: 'Something went wrong: ' + errorText, weight: 'fail' })
                      }
                    } catch (error) {
                      setMessageOpen(true)
                      setMessage({ data: 'Something went wrong', weight: 'fail' })
                    } finally {
                      setLoading(false)
                    }
                  }}
                >
                  {({ values, handleChange, handleSubmit }) => (
                    <form ref={form} onSubmit={handleSubmit}>
                      <div className="row mb-3">
                        <div className="col-6">
                          <input className="form-control glossy-input" required name="name" placeholder="Name" onChange={handleChange} value={values.name} />
                        </div>
                        <div className="col-6">
                          <input className="form-control glossy-input" required name="email" placeholder="Email" onChange={handleChange} value={values.email} />
                        </div>
                      </div>
                      <input className="form-control mb-3 glossy-input" required name="subject" placeholder="Subject" onChange={handleChange} value={values.subject} />
                      <textarea className="form-control mb-3 glossy-input" rows="5" required name="message" placeholder="Message..." onChange={handleChange} value={values.message}></textarea>

                      {!loading ? (
                        <button className="btn btn-outline-warning" type="submit">
                          <FontAwesomeIcon icon={faPaperPlane} className="me-2" />Send Message
                        </button>
                      ) : (
                        <Button color="warning" disabled>
                          <Spinner size="sm" /> <span> Sending</span>
                        </Button>
                      )}
                      <Alert className="mt-3" isOpen={messageOpen} toggle={toggle} color={message.weight === 'fail' ? "danger" : 'success'}>
                        {message.data}
                      </Alert>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .glossy-bg {
            background: transparent;
        }

        .glossy-card {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 1.5rem;
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.08);
            transition: background 0.4s ease, border-color 0.4s ease;
        }

        html[data-theme="light"] .glossy-card {
            background: rgba(248, 251, 255, 0.95) !important;
            border: 1px solid rgba(100, 120, 200, 0.5) !important;
            box-shadow: 0 0 20px rgba(100, 120, 200, 0.12) !important;
            color: #0d1b2a !important;
        }

        .glossy-input {
            background-color: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            transition: all 0.3s ease;
        }

        html[data-theme="light"] .glossy-input {
            background-color: #ffffff !important;
            border: 1.5px solid rgba(100, 120, 200, 0.6) !important;
            color: #0d1b2a !important;
        }

        .glossy-input::placeholder {
            color: rgba(255, 255, 255, 0.6);
        }

        html[data-theme="light"] .glossy-input::placeholder {
            color: rgba(70, 100, 140, 0.7) !important;
        }

        .glossy-input:focus {
            background-color: rgba(255, 255, 255, 0.12);
            border-color: rgba(255, 255, 255, 0.4);
            color: white;
            outline: none;
            box-shadow: 0 0 0 0.15rem rgba(255, 255, 255, 0.2);
        }

        html[data-theme="light"] .glossy-input:focus {
            background-color: #ffffff !important;
            border-color: rgba(0, 82, 204, 0.8) !important;
            color: #0d1b2a !important;
            outline: none;
            box-shadow: 0 0 0 0.15rem rgba(100, 150, 255, 0.2) !important;
        }

        .text-facebook { color: #1877F2; }     /* Official Facebook Blue */
        .text-linkedin { color: #0A66C2; }     /* Official LinkedIn Blue */
        .text-twitter { color: #1DA1F2; }      /* Official Twitter Blue (now X, but still commonly used) */
        .text-github { color: #f0f0f0; }       /* Official GitHub Logo Black */

        html[data-theme="light"] .text-github {
            color: #333333 !important;
        }

        .text-facebook:hover,
        .text-linkedin:hover,
        .text-twitter:hover,
        .text-github:hover {
        opacity: 0.85;
        text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
        }

        html[data-theme="light"] .text-facebook:hover,
        html[data-theme="light"] .text-linkedin:hover,
        html[data-theme="light"] .text-twitter:hover,
        html[data-theme="light"] .text-github:hover {
        opacity: 0.85;
        text-shadow: none;
        }

        .btn-warning {
            color: #000;
            font-weight: bold;
        }
        `}</style>

    </div>
  )
}
