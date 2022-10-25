import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Toast } from 'reactstrap'

export default function AdminLinks() {

    const [project, setProject] = useState(null)

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_API + 'Links.json')
            .then(res => {
                setProject(res.data)
            })
    }, [])

    const del = i => {
        axios.delete(`${process.env.REACT_APP_BACKEND_API}Links/${i}.json`)
            .then(res => {
                axios.get(process.env.REACT_APP_BACKEND_API + 'Links.json')
                    .then(res => {
                        setProject(res.data)
                    })
            })
    }

    let arr = []
    if (project != null) {
        for (let i in project) {
            arr.push(
                <div className='col-md-3'>
                    <Toast className='p-3'>
                        <h3>{project[i].name}</h3>
                        Code: {project[i].sourceCode} <br />
                        live: {project[i].liveLink} <br />
                        <button onClick={e => del(i)} className='btn btn-danger small my-2'>Remove</button>
                    </Toast>
                </div>
            )
        }
    }

    return (
        <div className='container'>
            <h2 className='pt-5 text-center'>Links</h2>
            <Formik

                initialValues={{
                    name: '',
                    sourceCode: '',
                    liveLink: ''
                }}

                onSubmit={val => {
                    console.log(val)
                    axios.post(process.env.REACT_APP_BACKEND_API + 'Links.json', val)
                        .then(res => {
                            axios.get(process.env.REACT_APP_BACKEND_API + 'Links.json')
                                .then(res => {
                                    setProject(res.data)
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
                            placeholder='Project name'
                            className='form-control my-3'

                        />
                        <input
                            type="text"
                            name='sourceCode'
                            value={values.sourceCode}
                            onChange={handleChange}
                            placeholder='Source code'
                            className='form-control my-3'

                        />
                        <input
                            type="text"
                            name='liveLink'
                            value={values.liveLink}
                            onChange={handleChange}
                            placeholder='Live link'
                            className='form-control my-3'
                        />

                        <button className='btn btn-success' type="submit">Submit</button>
                    </form>
                )}

            </Formik>

            <h3 className='py-3'>Projects </h3>
            <div className="row">
                {arr}
            </div>
        </div>
    )
}
