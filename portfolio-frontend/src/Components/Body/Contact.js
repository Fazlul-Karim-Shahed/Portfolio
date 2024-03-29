import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faPhone, faLocationDot, faMailBulk, faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Formik } from 'formik'
import emailjs from '@emailjs/browser'
import { Alert, Button, Spinner } from 'reactstrap'
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';

export default function Contact() {


    const form = useRef()
    const [message, setMessage] = useState({ data: '', weight: '' })
    const [messageOpen, setMessageOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const toggle = () => setMessageOpen(!messageOpen)

    return (
        <div className='bg-light' id='contact'>
            <div className='container px-md-5'>
                <Fade right>
                    <div className="py-5">
                        <div className='text-center py-3'>
                            <h1 className='fw-bold'>Contact</h1>
                            <div className=''>
                                <div className='fw-bold'>----- <span className='text-danger'>Get in touch</span> -----</div>
                            </div>
                        </div>
                    </div>
                </Fade>

                <Zoom>
                    <div className="row mt-2 mt-md-4 pb-5 m-0">
                        <div className="col-md-6 py-0 py-md-5">
                            <div className=' d-flex'>
                                <FontAwesomeIcon className='pe-3 h5 mt-1' icon={faLocationDot} />
                                <p>24/3 Ka, Khilkhet, Dhaka, Bangladesh</p>
                            </div>
                            <div className=' d-flex'>
                                <FontAwesomeIcon className='pe-3 h5 mt-1' icon={faPhone} />
                                <p>+880 1521537962</p>
                            </div>
                            <div className=' d-flex'>
                                <FontAwesomeIcon className='pe-3 h5 mt-1' icon={faEnvelope} />
                                <p>fazlul.shahed2000@gmail.com</p>
                            </div>
                            <div className='py-3'>
                                <h4 className='pb-3'>Follow me</h4>
                                <a style={{ color: '#1978F5' }} target='blank' href="https://www.facebook.com/profile.php?id=100051561011802"><FontAwesomeIcon className='h3 me-3' icon={faFacebook} /></a>
                                <a style={{ color: '#1A75BB' }} target='blank' href="https://www.linkedin.com/in/fazlul-karim-a2650b1a9/"><FontAwesomeIcon className='h3 me-3' icon={faLinkedin} /></a>
                                <a style={{ color: '#1CA1F1' }} target='blank' href="https://twitter.com/Fazlul2001"><FontAwesomeIcon className='h3 me-3' icon={faTwitter} /></a>
                                <a style={{ color: '#24292F' }} target='blank' href="https://github.com/Fazlul-Karim-Shahed"><FontAwesomeIcon className='h3 me-3' icon={faGithub} /></a>
                            </div>
                        </div>
                        <div className="col-md-6">

                            <h4 className='fw-bold my-4 my-md-0'>Message me</h4>
                            <Formik

                                initialValues={{
                                    name: '',
                                    email: '',
                                    subject: '',
                                    message: ''
                                }}

                                onSubmit={val => {
                                    setLoading(true)
                                    emailjs.sendForm('service_yfd5eq5', 'template_s5c0axt', form.current, 'm5YmCocmFVzqfZ7dk')
                                        .then((result) => {
                                            setLoading(false)
                                            toggle()
                                            if (result.text === 'OK') {
                                                setMessage({ data: 'Message sent successfully', weight: 'success' })
                                            }
                                            else {
                                                setMessage({ data: 'Something went wrong', weight: 'fail' })
                                            }
                                        }, (error) => {
                                            toggle()
                                            setLoading(false)
                                            setMessage({ data: 'Something went wrong', weight: 'fail' })
                                        });
                                }}

                            >

                                {({ values, handleChange, handleSubmit }) => (
                                    <form ref={form} onSubmit={handleSubmit} action="">
                                        <div className="row my-3">
                                            <div className="col-6">
                                                <input
                                                    required
                                                    className='form-control p-3'
                                                    name='name'
                                                    placeholder='Name'
                                                    onChange={handleChange}
                                                    value={values.name}
                                                    type="text" />
                                            </div>
                                            <div className="col-6">
                                                <input
                                                    required
                                                    className='form-control p-3'
                                                    name='email'
                                                    placeholder='Email'
                                                    onChange={handleChange}
                                                    value={values.email}
                                                    type="text" />
                                            </div>
                                        </div>

                                        <input
                                            required
                                            className='form-control my-3 p-3'
                                            name='subject'
                                            placeholder='Subject'
                                            onChange={handleChange}
                                            value={values.subject}
                                            type="text" />

                                        <textarea
                                            required
                                            className='form-control my-3 p-3'
                                            name='message'
                                            placeholder='Message...'
                                            onChange={handleChange}
                                            value={values.message}
                                            type="text" />


                                        {!loading ?
                                            <button className='btn btn-primary' type="submit"> <FontAwesomeIcon icon={faPaperPlane} className='me-1' /> Send Message</button> :
                                            <Button
                                                color="warning"
                                                disabled
                                            >
                                                <Spinner size="sm">
                                                    Loading...
                                                </Spinner>
                                                <span>
                                                    {' '}Sending
                                                </span>
                                            </Button>}


                                        <Alert className='my-3' isOpen={messageOpen} toggle={toggle} color={message.weight === 'fail' ? "danger" : 'success'}>{message.data}</Alert>
                                    </form>
                                )}

                            </Formik>
                        </div>
                    </div>
                </Zoom>
            </div>
        </div>
    )
}
