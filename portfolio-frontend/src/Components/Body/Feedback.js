import axios from 'axios'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'

export default function Feedback(props) {

    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    return (

        <div>
            <Modal size='xl' isOpen={props.open} toggle={props.toggle}>

                <Formik

                    initialValues={{
                        name: '',
                        designation: '',
                        description: ''
                    }}

                    onSubmit={val => {
                        setLoading(true)
                        axios.post(process.env.REACT_APP_BACKEND_API + 'feedback.json', val)
                            .then(data => {
                                setLoading(false)

                            })
                    }}

                >

                    {({ values, handleChange, handleSubmit }) => (

                        <form onSubmit={handleSubmit} action="">

                            <ModalHeader className='bg-light' toggle={props.toggle}>Feedback form</ModalHeader>

                            <ModalBody className=''>

                                <input
                                    required
                                    name='name'
                                    value={values.name}
                                    onChange={handleChange}
                                    placeholder='Enter your name'
                                    className='form-control my-4'
                                    type="text" />
                                <textarea
                                    required
                                    name='designation'
                                    value={values.designation}
                                    onChange={handleChange}
                                    placeholder='Enter your designation'
                                    className='form-control my-4'
                                    type="text" />
                                <textarea
                                    required
                                    name='description'
                                    value={values.description}
                                    onChange={handleChange}
                                    placeholder='Description'
                                    className='form-control'
                                    minLength='50'
                                    maxLength='150'
                                    type="text" />

                            </ModalBody>

                            <ModalFooter className='border-0'>

                                <div onClick={props.toggle} className="btn btn-danger">Cancel</div>

                                {!loading ?
                                    <button className='btn btn-success' type="submit">Submit</button> :
                                    <Button
                                        color="success"
                                        disabled
                                        className='w-100'
                                    >
                                        <Spinner size="sm">
                                            Loading...
                                        </Spinner>
                                        <span>
                                            {' '}Submitting...
                                        </span>
                                    </Button>}


                            </ModalFooter>

                        </form>

                    )}


                </Formik>
            </Modal>
        </div>

    )
}
