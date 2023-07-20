import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Toast } from 'reactstrap'

export default function AdminAchievement() {

    const [achievements, setAchievements] = useState(null)

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_API + 'Achievements.json')
            .then(res => {
                setAchievements(res.data)
            })
    }, [])

    const del = i => {
        axios.delete(`${process.env.REACT_APP_BACKEND_API}Achievements/${i}.json`)
            .then(res => {
                axios.get(process.env.REACT_APP_BACKEND_API + 'Achievements.json')
                    .then(res => {
                        setAchievements(res.data)
                    })
            })
    }

    let achievementsArr = []
    if (achievements != null) {
        for (let i in achievements) {
            achievementsArr.push(
                <div className='col-md-3 my-3'>
                    <Toast className='p-3'>
                        <h3 className='pb-2'>{achievements[i].name}</h3>
                        <div className='py-1'>
                            <strong >pdfLink:</strong> {achievements[i].pdfLink}
                        </div>
                        <div className='py-1'>
                            <strong>organization:</strong> {achievements[i].organization}
                        </div>
                        <div className='py-1'>
                            <strong>organizationLogoLink:</strong> {achievements[i].organizationLogoLink}
                        </div>
                        <div className='py-1'>
                            <strong>description:</strong> {achievements[i].description}
                        </div>
                        <div className='py-1'>
                            <strong>thumbnailLink:</strong> {achievements[i].thumbnailLink}
                        </div>
                        <button onClick={e => del(i)} className='btn btn-danger small my-2'>Remove</button>
                    </Toast>
                </div>
            )
        }
    }

    return (
        <div className='container'>
            <h2 className='pt-5 text-center'>Achievement</h2>
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

                    axios.post(process.env.REACT_APP_BACKEND_API + 'Achievements.json', val)
                        .then(res => {
                            axios.get(process.env.REACT_APP_BACKEND_API + 'Achievements.json')
                                .then(res => {
                                    setAchievements(res.data)
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

            <h3 className='py-3'>Achievements: </h3>
            <div className="row">
                {achievementsArr}
            </div>
        </div>
    )
}
