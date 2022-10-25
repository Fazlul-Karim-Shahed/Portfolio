import axios from 'axios'
import { Formik } from 'formik'
import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

export default function Feedback(props) {
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
                            console.log(val)
                            axios.post(process.env.REACT_APP_BACKEND_API + 'feedback.json', val)
                                .then(data => {
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
                                <button className='btn btn-outline-success w-100' type="submit">Submit</button>
                            </form>
                        )}
                    </Formik>
                </ModalBody>
            </Modal>

        </div>
    )
}
