import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Toast } from 'reactstrap'

export default function AdminCertification() {

    const [certifications, setCertifications] = useState(null)

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_API + 'Certifications.json')
            .then(res => {
                setCertifications(res.data)
            })
    }, [])

    const del = i => {
        axios.delete(`${process.env.REACT_APP_BACKEND_API}Certifications/${i}.json`)
            .then(res => {
                axios.get(process.env.REACT_APP_BACKEND_API + 'Certifications.json')
                    .then(res => {
                        setCertifications(res.data)
                    })
            })
    }

    let certificationsArr = []
    if (certifications != null) {
        for (let i in certifications) {
            certificationsArr.push(
                <div className='col-md-3 my-3'>
                    <Toast className='p-3'>
                        <h3 className='pb-2'>{certifications[i].name}</h3>
                        <div className='py-1'>
                            <strong >pdfLink:</strong> {certifications[i].pdfLink}
                        </div>
                        <div className='py-1'>
                            <strong>organization:</strong> {certifications[i].organization}
                        </div>
                        <div className='py-1'>
                            <strong>organizationLogoLink:</strong> {certifications[i].organizationLogoLink}
                        </div>
                        <div className='py-1'>
                            <strong>description:</strong> {certifications[i].description}
                        </div>
                        <div className='py-1'>
                            <strong>thumbnailLink:</strong> {certifications[i].thumbnailLink}
                        </div>
                        <button onClick={e => del(i)} className='btn btn-danger small my-2'>Remove</button>
                    </Toast>
                </div>
            )
        }
    }

    return (
        <div className='container'>
            <h2 className='pt-5 text-center'>Certifications</h2>
            <Formik

                initialValues={{
                    name: '',
                    pdfLink: '',
                    organizationLogoLink: '',
                    description: '',
                    organization: '',
                    thumbnailLink: ''
                }}

                onSubmit={val => {

                    axios.post(process.env.REACT_APP_BACKEND_API + 'Certifications.json', val)
                        .then(res => {
                            axios.get(process.env.REACT_APP_BACKEND_API + 'Certifications.json')
                                .then(res => {
                                    setCertifications(res.data)
                                })
                        })
                }}
            >

                {({ values, handleChange, handleSubmit }) => (
                    <form className='p-3' onSubmit={handleSubmit} action="">
                        <input
                            type="text"
                            name='name'
                            value={values.name}
                            onChange={handleChange}
                            placeholder='Achievement name'
                            className='form-control my-3'

                        />
                        <input
                            type="text"
                            name='pdfLink'
                            value={values.pdfLink}
                            onChange={handleChange}
                            placeholder='PDF Link'
                            className='form-control my-3'

                        />
                        <input
                            type="text"
                            name='organizationLogoLink'
                            value={values.organizationLogoLink}
                            onChange={handleChange}
                            placeholder='Organization Logo Link'
                            className='form-control my-3'

                        />

                        <input
                            type="text"
                            name='organization'
                            value={values.organization}
                            onChange={handleChange}
                            placeholder='Organization'
                            className='form-control my-3'
                        />
                        <input
                            type="text"
                            name='thumbnailLink'
                            value={values.thumbnailLink}
                            onChange={handleChange}
                            placeholder='Thumbnail Link'
                            className='form-control my-3'
                        />
                        <textarea
                            name='description'
                            value={values.description}
                            onChange={handleChange}
                            placeholder='Description'
                            className='form-control my-3'
                        />
                        <button className='btn btn-success' type="submit">Submit</button>
                    </form>
                )}

            </Formik>

            <h3 className='py-3'>Certifications: </h3>
            <div className="row">
                {certificationsArr}
            </div>
        </div>
    )
}
