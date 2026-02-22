import axios from 'axios'
import { Formik } from 'formik'
import React, { useState, useEffect } from 'react'
import { Button, Spinner } from 'reactstrap'
import Navbar from '../Header/Navbar'
import Footer from '../Footer/Footer'
import Reveal from '../Reveal'
import { useLocation } from 'react-router-dom'
import '../Body/BodyStyles/About.css' // Reuse glossy styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export default function Feedback() {
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return (
        <div className="glossy-bg min-vh-100 d-flex flex-column">
            <Navbar />

            <div className="container flex-grow-1 d-flex flex-column justify-content-center py-5 mt-5">
                <Reveal effect="fade-up">
                    <div className="text-center mb-5">
                        <h1 className="fw-bold text-white mb-3" style={{ letterSpacing: '0.5px' }}>Get in Touch</h1>
                        <p className="text-white-50" style={{ fontSize: '1.1rem', fontWeight: '400' }}>
                            We'd love to hear your thoughts. Leave your valuable feedback below.
                        </p>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-8">
                            <div className="glass-card p-4 p-md-5 rounded-4 shadow-lg position-relative overflow-hidden" style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
                                {/* Soft glowing accent */}
                                <div className="position-absolute top-0 start-0 w-100 h-1" style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-secondary))', height: '4px', opacity: '0.8' }}></div>
                                
                                {submitted ? (
                                    <Reveal effect="zoom">
                                        <div className="text-center py-5 my-4">
                                            <div className="mb-4 text-success" style={{ fontSize: '4rem', textShadow: '0 0 20px rgba(25, 135, 84, 0.4)' }}>
                                                <i className="bi bi-check-circle-fill"></i>
                                            </div>
                                            <h2 className="text-white mb-3 fw-bold">Thank You!</h2>
                                            <p className="text-white-50 mb-4" style={{ fontSize: '1.1rem' }}>
                                                Your feedback has been successfully submitted and is highly appreciated.
                                            </p>
                                            <button className="btn btn-outline-warning px-5 py-2 rounded-pill mt-2" onClick={() => setSubmitted(false)}>
                                                Submit Another
                                            </button>
                                        </div>
                                    </Reveal>
                                ) : (
                                    <Formik
                                        initialValues={{
                                            name: '',
                                            designation: '',
                                            description: ''
                                        }}
                                        onSubmit={(val, { resetForm }) => {
                                            setLoading(true)
                                            
                                            // Add approved flag and timestamp
                                            const payload = {
                                                ...val,
                                                approved: false,
                                                createdAt: new Date().toISOString()
                                            }

                                            axios.post(process.env.REACT_APP_BACKEND_API + 'feedback.json', payload)
                                                .then(() => {
                                                    setLoading(false)
                                                    setSubmitted(true)
                                                    resetForm()
                                                })
                                                .catch(err => {
                                                    setLoading(false)
                                                    alert("Failed to submit feedback. Please try again.")
                                                })
                                        }}
                                    >
                                        {({ values, handleChange, handleSubmit }) => (
                                            <form onSubmit={handleSubmit} className="px-md-3">
                                                
                                                <div className="row mb-4">
                                                    <div className="col-md-6 mb-4 mb-md-0">
                                                        <label className="form-label text-white-50" style={{ fontWeight: '500', fontSize: '0.95rem' }}>Full Name</label>
                                                        <input
                                                            required
                                                            name='name'
                                                            value={values.name}
                                                            onChange={handleChange}
                                                            placeholder='e.g. John Doe'
                                                            className='form-control form-control-lg'
                                                            style={{ fontSize: '1rem', padding: '0.8rem 1rem' }}
                                                            type="text" 
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label className="form-label text-white-50" style={{ fontWeight: '500', fontSize: '0.95rem' }}>Designation / Role</label>
                                                        <input
                                                            required
                                                            name='designation'
                                                            value={values.designation}
                                                            onChange={handleChange}
                                                            placeholder='e.g. Software Engineer'
                                                            className='form-control form-control-lg'
                                                            style={{ fontSize: '1rem', padding: '0.8rem 1rem' }}
                                                            type="text" 
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mb-5">
                                                    <label className="form-label text-white-50" style={{ fontWeight: '500', fontSize: '0.95rem' }}>Your Feedback</label>
                                                    <textarea
                                                        required
                                                        name='description'
                                                        value={values.description}
                                                        onChange={handleChange}
                                                        placeholder='What did you think about the portfolio? What can be improved?'
                                                        className='form-control form-control-lg'
                                                        style={{ minHeight: '160px', fontSize: '1rem', padding: '1rem' }}
                                                        minLength='50'
                                                        maxLength='500'
                                                    />
                                                    <div className="d-flex justify-content-between mt-2 px-1">
                                                        <small className="text-white-50" style={{ opacity: 0.7 }}>Minimum 50 characters</small>
                                                        <small className={`fw-medium ${values.description.length < 50 ? 'text-warning' : 'text-success'}`}>
                                                            {values.description.length} / 500
                                                        </small>
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-center mt-4">
                                                    {!loading ? (
                                                        <button 
                                                            className='btn btn-outline-warning btn-lg px-5 py-2 rounded-pill d-flex align-items-center' 
                                                            type="submit"
                                                            style={{ transition: 'all 0.3s ease' }}
                                                        >
                                                            <FontAwesomeIcon icon={faPaperPlane} className="me-3" />
                                                            Send Feedback
                                                        </button>
                                                    ) : (
                                                        <button
                                                            disabled
                                                            className='btn btn-outline-warning btn-lg px-5 py-2 rounded-pill d-flex align-items-center'
                                                        >
                                                            <Spinner size="sm" className="me-3" />
                                                            Sending...
                                                        </button>
                                                    )}
                                                </div>
                                            </form>
                                        )}
                                    </Formik>
                                )}
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
            
            <Footer />
        </div>
    )
}
