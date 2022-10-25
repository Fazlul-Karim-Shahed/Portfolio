import axios from 'axios'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalHeader, Spinner } from 'reactstrap'

export default function Feedback(props) {

    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    return (
        <div >

            <Modal size='xl' isOpen={props.open} toggle={props.toggle}>
                <ModalHeader toggle={props.toggle}>Feedback form</ModalHeader>
                <ModalBody className=''>
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
                                    console.log(data.data)
                                })
                        }}

                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <form onSubmit={handleSubmit} action="">
                                <input
                                    name='name'
                                    value={values.name}
                                    onChange={handleChange}
                                    placeholder='Enter your name'
                                    className='form-control my-4'
                                    type="text" />
                                <textarea
                                    name='designation'
                                    value={values.designation}
                                    onChange={handleChange}
                                    placeholder='Enter your designation'
                                    className='form-control my-4'
                                    type="text" />
                                <textarea
                                    name='description'
                                    value={values.description}
                                    onChange={handleChange}
                                    placeholder='Description'
                                    className='form-control my-4'
                                    type="text" />

                                {!loading ?
                                    <button className='btn btn-success w-100' type="submit">Submit</button> :
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
                            </form>
                        )}
                    </Formik>
                </ModalBody>
            </Modal>

        </div>
    )
}
