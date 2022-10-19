import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faLinkedin, faInstagram} from '@fortawesome/free-brands-svg-icons'
import { faPhone, faLocationDot, faMailBulk, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Formik } from 'formik'

export default function Contact() {
    return (
        <div className='bg-light'>
            <div className='container px-5'>
                <div className="py-5">
                    <div className='text-center py-3'>
                        <h1 className='fw-bold'>Contact</h1>
                        <div className=''>
                            <div className='fw-bold'>---------- <span className='text-danger'>Who with me</span> ----------</div>
                        </div>
                    </div>
                </div>

                <div className="row my-2 my-md-5 m-0">
                    <div className="col-md-6 py-0 py-md-5">
                        <div className=' d-flex'>
                            <FontAwesomeIcon className='pe-3 h5' icon={faLocationDot} />
                            <p>24/3 Ka, Khilkhet, Dhaka, Bangladesh</p>
                        </div>
                        <div className=' d-flex'>
                            <FontAwesomeIcon className='pe-3 h5' icon={faPhone} />
                            <p>+880 1521537962</p>
                        </div>
                        <div className=' d-flex'>
                            <FontAwesomeIcon className='pe-3 h5' icon={faEnvelope} />
                            <p>fazlul.shahed2000@gmail.com</p>
                        </div>
                        <div className='py-3'>
                            <h4 className='pb-3'>Follow me</h4>
                            <a href="#"><FontAwesomeIcon className='h3 me-3' icon={faFacebook} /></a>
                            <a href="#"><FontAwesomeIcon className='h3 me-3' icon={faLinkedin} /></a>
                            <a href="#"><FontAwesomeIcon className='h3 me-3' icon={faTwitter} /></a>
                            <a href="#"><FontAwesomeIcon className='h3 me-3' icon={faInstagram} /></a>
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
                                console.log(val)
                            }}

                        >

                            {({ values, handleChange, handleSubmit }) => (
                                <form onSubmit={handleSubmit} action="">
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

                                    <button className='btn btn-warning' type="submit">Send Message</button>
                                </form>
                            )}

                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}
