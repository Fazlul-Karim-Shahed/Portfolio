import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Fade, Toast } from 'reactstrap'
import './BodyStyles/Skill.css'


export default function Skill() {

    const [content, setContent] = useState('frontend')
    const frontEnd = ['html.png', 'css.png', 'bootstrap.png', 'reactstrap.png', 'mui.png', 'react.png']
    const backEnd = ['nodejs.png', 'expressjs.png', 'mongodb.png', 'mongoose.png', 'atlas.jpg']
    const others = ['ml.png', 'arduino.png', 'matlab.png', 'multisim.png']
    const [project, setProject] = useState(null)

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_API + 'Links.json')
            .then(res => {
                setProject(res.data)
            })
    }, [])

    const tab = (str, pos) => {
        setContent(str)
        let el = document.querySelectorAll('.skill_tab_link')
        el.forEach((item, index) => {
            console.log(index === pos);
            if (index === pos) {
                item.classList.add('h5', 'text-primary')

            }
            else {
                item.classList.remove('h5', 'text-primary')
            }
        })

    }


    let frondEndSkills = frontEnd.map(item => {
        return (
            <Fade className="col-6 col-md-3 text-center pb-3 p-3 skills_content">
                <img className='img-fluid w-50' src={'Assets/Frontend/' + item} alt="" />
            </Fade>
        )
    })

    let backEndSkills = backEnd.map(item => {
        return (
            <Fade className="col-6 col-md-3 text-center pb-3 p-3 skills_content">
                <img className='img-fluid w-75' src={'Assets/Backend/' + item} alt="" />
            </Fade>
        )
    })

    let otherSkills = others.map(item => {
        return (
            <Fade className="col-6 col-md-3 text-center pb-3 p-3 skills_content">
                <img className='img-fluid w-50' src={'Assets/Others/' + item} alt="" />
            </Fade>
        )
    })


    let linkArr = []
    if (project != null) {
        for (let i in project) {
            console.log(project[i].liveLink);
            linkArr.push(
                <div className='col-6 col-md-3 py-2'>
                    <Toast className='p-3'>
                        <h4>{project[i].name}</h4> <br />
                        <button disabled={project[i].sourceCode === ""} className='btn btn-warning me-2 btn-sm my-1'><a className='text-decoration-none text-dark' target='_blank' href={project[i].sourceCode}>Source code</a></button>
                        <button disabled={project[i].liveLink === ""} className='btn btn-info me-2 btn-sm'><a className='text-decoration-none text-dark' target='_blank' href={'http://' + `${project[i].liveLink}`}>Live link</a></button> <br />
                    </Toast>
                </div>
            )
        }
    }


    return (
        <div className=''>
            <div className="container py-5">
                <div className="" id='skill'>
                    <div className='text-center py-3'>
                        <h1 className='fw-bold'>My Skills</h1>
                        <div className=''>
                            <div className='fw-bold'>------- <span className='text-danger'>What i know</span> -------</div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='d-flex justify-content-center pt-5 skill_tab'>
                        <div onClick={e => tab('frontend', 0)} className='mx-3 mx-md-4 skill_tab_link h5 text-primary' href="">Frontend</div>
                        <div onClick={e => tab('backend', 1)} className='mx-3 mx-md-4 skill_tab_link' href="">Backend</div>
                        <div onClick={e => tab('others', 2)} className='mx-3 mx-md-4 skill_tab_link' href="">Others</div>
                        <div onClick={e => tab('links', 3)} className='mx-3 mx-md-4 skill_tab_link' href="">Links</div>
                    </div>
                </div>

                <div className='m-auto w-75'>
                    <div className='row py-5'>
                        {content === 'frontend' ? frondEndSkills : ''}
                        {content === 'backend' ? backEndSkills : ''}
                        {content === 'others' ? otherSkills : ''}
                        {content === 'links' ? linkArr : ''}

                    </div>
                </div>


            </div>
        </div>
    )
}
