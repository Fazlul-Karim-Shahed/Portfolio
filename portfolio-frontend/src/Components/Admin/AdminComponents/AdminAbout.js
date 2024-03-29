import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function AdminAbout(props) {

    const [about, setAbout] = useState(null)

    useEffect(() => {

        axios.get(process.env.REACT_APP_BACKEND_API + 'About.json')
            .then(data => {
                setAbout({ about: data.data.about })
            })
    }, [about])


    return (
        <div className='text-center py-5'>
            <h2 className='py-3'>Edit About</h2>
            <Formik

                initialValues={{
                    about: about === null ? '' : about.about
                }}



                onSubmit={val => {
                    axios.put(process.env.REACT_APP_BACKEND_API + 'About.json', val)
                        .then(res => {
                            axios.get(process.env.REACT_APP_BACKEND_API + 'About.json')
                                .then(data => {
                                    setAbout({ about: data.data.about })
                                })
                        })
                }}

            >

                {({ values, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit} action="">

                        <textarea
                            placeholder='Write something...'
                            name="about"
                            value={values.about}
                            onChange={handleChange}
                            id=""
                            rows='7'
                            className='form-control w-75 m-auto'
                        />

                        <button className=' btn btn-success my-3' type="submit">Update</button>

                    </form>
                )}

            </Formik>


            <div className='container py-5' style={{ textAlign: 'justify' }}>
                <strong>Current About:</strong> {about === null ? '' : about.about}
            </div>
        </div>
    )
}
