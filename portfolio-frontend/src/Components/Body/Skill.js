import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardText, CardTitle, Fade, Modal, ModalHeader, ModalBody } from 'reactstrap'
import './BodyStyles/Skill.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faEye, faPaperclip } from '@fortawesome/free-solid-svg-icons'
import Rotate from 'react-reveal/Rotate';
import Slide from 'react-reveal/Slide';
import Zoom from 'react-reveal/Zoom';


export default function Skill() {

    const [content, setContent] = useState('links')

    const frontEnd = [{ name: 'html.png', url: 'https://en.wikipedia.org/wiki/HTML' }, { name: 'css.png', url: 'https://en.wikipedia.org/wiki/CSS' }, { name: 'bootstrap.jpg', url: 'https://en.wikipedia.org/wiki/Bootstrap_(front-end_framework)' }, { name: 'tailwind.png', url: 'https://en.wikipedia.org/wiki/Tailwind_CSS' }, { name: 'reactstrap.png', url: 'https://reactstrap.github.io/?path=/story/home-installation--page' }, { name: 'mui.png', url: 'https://mui.com/' }, { name: 'react.png', url: 'https://en.wikipedia.org/wiki/React_(software)' }]

    const backEnd = [{ name: 'node.png', url: 'https://en.wikipedia.org/wiki/Node.js' }, { name: 'express.png', url: 'https://en.wikipedia.org/wiki/Express.js' }, { name: 'mongodb.png', url: 'https://en.wikipedia.org/wiki/MongoDB' }, { name: 'mongoose.png', url: 'https://en.wikipedia.org/wiki/Mongoose_(MongoDB)' }, { name: 'atlas.png', url: 'https://www.mongodb.com/docs/atlas/#:~:text=MongoDB%20Atlas%20is%20a%20multi,cloud%20providers%20of%20your%20choice.' }]

    const others = [{ name: 'ml.png', url: 'https://en.wikipedia.org/wiki/Machine_learning' }, { name: 'arduino.png', url: 'https://en.wikipedia.org/wiki/Arduino' }, { name: 'matlab.jpg', url: 'https://en.wikipedia.org/wiki/MATLAB' }, { name: 'multisim.jpg', url: 'https://en.wikipedia.org/wiki/NI_Multisim' }]

    const [project, setProject] = useState(null)

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_API + 'Links.json')
            .then(res => {
                setProject(res.data)
            }).catch(err => {
                // alert(err.message)
            })
    }, [])




    const [modalOpen, setModalOpen] = useState(false)
    const [modalPhoto, setModalPhoto] = useState(null)


    const toggle = (item, str) => {
        setModalPhoto({
            ...item,
            str: str
        })
        setModalOpen(!modalOpen)

    }

    const tab = (str, pos) => {
        setContent(str)
        let el = document.querySelectorAll('.skill_tab_link')
        el.forEach((item, index) => {
            if (index === pos) {
                item.classList.add('h6', 'fw-bold', 'border-bottom', 'text-primary', 'border-primary')

            }
            else {
                item.classList.remove('h6', 'fw-bold', 'border-bottom', 'text-primary', 'border-primary')
            }
        })

    }


    let frondEndSkills = frontEnd.map(item => {

        return (
            <Fade onClick={() => toggle(item, 'Frontend')} key={String(Math.random())} className="col-6 col-md-3 pb-3 p-3 skills_content d-flex align-items-center justify-content-center">
                <Rotate><img className='img-fluid w-50' src={'Assets/Frontend/' + item.name} alt="" /></Rotate>
            </Fade>
        )
    })

    let backEndSkills = backEnd.map(item => {
        return (
            <Fade onClick={() => toggle(item, 'Backend')} key={String(Math.random())} className="col-6 col-md-3 pb-3 p-3 skills_content  d-flex align-items-center justify-content-center">
                <Rotate top left>
                    <img className='img-fluid w-75' src={'Assets/Backend/' + item.name} alt="" />
                </Rotate>
            </Fade>
        )
    })

    let otherSkills = others.map(item => {
        return (
            <Fade key={String(Math.random())} className="col-6 col-md-3 pb-3 p-3 skills_content  d-flex align-items-center justify-content-center">
                <Rotate top right>
                    <img onClick={() => toggle(item, 'Others')} className='img-fluid w-50' src={'Assets/Others/' + item.name} alt="" />
                </Rotate>
            </Fade>
        )
    })


    let projectArr = []



    if (project != null) {
        let projectCount = 0
        for (let i in project) {
            projectCount = projectCount + 1
            if (projectCount > 3) break
            else {
                projectArr.push(
                    <Zoom>
                        <div className='col-lg-4 col-sm-12 col-md-6 py-2'>

                            <Card className='skill_Card my-2 h-100'>
                                <img
                                    alt="Project Screenshot"
                                    src={project[i].image}
                                    className='img-fluid border-bottom p-1 rounded rounded-3'
                                    style={{ height: '234px' }}
                                />
                                <CardBody>
                                    <CardTitle className='' tag="h4">
                                        {project[i].name}
                                    </CardTitle>

                                    <CardText className='mt-3 small fst-italic'>
                                        {project[i].description}
                                    </CardText>
                                    <div className='mt-4'>
                                        <button disabled={project[i].sourceCode === ""} className='btn btn-outline-warning me-3'><a className='text-decoration-none text-dark' target='_blank' href={project[i].sourceCode}><FontAwesomeIcon icon={faCode} className='me-1' /> Code</a></button>

                                        <button disabled={project[i].liveLink === ""} className='btn btn-outline-info'><a className='text-decoration-none text-dark' target='_blank' href={'http://' + `${project[i].liveLink}`}> <FontAwesomeIcon icon={faPaperclip} className='me-1' /> Visit</a></button>
                                        {project[i].category != 'web' && project[i].category != 'ai' ? <button disabled={project[i].readmore === "" || project[i].readmore === undefined} className='btn btn-outline-info my-1'><a className='text-decoration-none text-dark' target='_blank' href={project[i].readmore}>Read more</a></button> : ''}
                                    </div>
                                </CardBody>
                            </Card>


                        </div>
                    </Zoom>
                )
            }
        }
    }


    return (
        <div className=''>
            <div className="container py-4">
                <Rotate bottom left>
                    <div className="" id='skill'>
                        <div className='text-center py-3'>
                            <h1 className='fw-bold'>My Skills</h1>
                            <div className=''>
                                <div className='fw-bold'>------- <span className='text-danger'>What i know</span> -------</div>
                            </div>
                        </div>
                    </div>
                </Rotate>

                <Slide right>
                    <div >
                        <div className='d-flex justify-content-center pt-5 skill_tab'>
                            <div onClick={e => tab('links', 0)} className='mx-3 pb-1 mx-md-4 skill_tab_link h6 fw-bold text-primary border-bottom border-primary'>Projects</div>
                            <span className=''>|</span>
                            <div onClick={e => tab('frontend', 1)} className='mx-3 pb-1 mx-md-4 skill_tab_link'>Frontend</div>
                            <span className=''>|</span>
                            <div onClick={e => tab('backend', 2)} className='mx-3 pb-1 mx-md-4 skill_tab_link'>Backend</div>
                            <span className=''>|</span>
                            <div onClick={e => tab('others', 3)} className='mx-3 pb-1 mx-md-4 skill_tab_link'>Others</div>


                        </div>
                    </div>
                </Slide>

                <Slide left>
                    <div className='px-1' >
                        <div className='row pt-5 pb-4 w-100 m-auto'>
                            {content === 'frontend' ? frondEndSkills : ''}
                            {content === 'backend' ? backEndSkills : ''}
                            {content === 'others' ? otherSkills : ''}
                            {content === 'links' ?

                                <>
                                    {project === null ? <p className='text-danger text-center'>Check internet connection!</p> :

                                        <>
                                            {projectArr}
                                            <div className='text-center'>
                                                <Link to='/all-projects'>
                                                    <button className="btn btn-outline-primary mt-5 w-0 m-auto">Show more...</button>
                                                </Link>
                                            </div>

                                        </>

                                    }


                                </> : ''}

                        </div>
                    </div>
                </Slide>


            </div>

            <Modal isOpen={modalOpen} size='xl' toggle={toggle}>

                {modalPhoto === null ? '' :

                    <div>
                        <ModalHeader className='text-capitalize' toggle={toggle}>
                            {modalPhoto.str === undefined ? '' : modalPhoto.name.split('.')[0]}

                        </ModalHeader>
                        <ModalBody>
                            <div className="row">
                                <div className="col-md-3 p-3 d-flex align-items-center">
                                    <img className='img-fluid mt-4 w-100' src={'/Assets/' + modalPhoto.str + '/' + modalPhoto.name} />
                                </div>
                                <div className="col-md-9 bg-secondary border rounded-3">
                                    <div className=''>
                                        <iframe height='500px' width='100%' className='mt-2  border rounded-3' src={modalPhoto.url} title="description"></iframe>
                                    </div>
                                </div>
                            </div>

                        </ModalBody>
                    </div>

                }

            </Modal>

        </div>
    )
}
