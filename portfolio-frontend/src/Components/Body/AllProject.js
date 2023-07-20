import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap'
import './BodyStyles/AllProject.css'
import Contact from './Contact'
import Footer from '../Footer/Footer'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from '../Header/Navbar'

export default function AllProject() {

    const [project, setProject] = useState(null)
    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_API + 'Links.json')
            .then(res => {
                setProject(res.data)
            }).catch(err => {
                // alert(err.message)
            })
    }, [])


    let projectCard = (category, image, name, description, sourceCode, liveLink, readmore) => <div className='col-sm-12 col-md-4 py-2 mb-5'>
        <Card className='allProject_Card mx-2'>
            <img
                alt="Project Screenshot"
                src={image}
                className='img-fluid'
                style={{minHeight:'234px'}}
            />
            <CardBody>
                <CardTitle tag="h4">
                    {name}
                </CardTitle>

                <CardText className='mt-3 small'>
                    {description}
                </CardText>
                <div className='mt-4'>
                    <button disabled={sourceCode === ""} className='btn btn-outline-warning me-3 my-1'><a className='text-decoration-none text-dark' target='_blank' href={sourceCode}>Source code</a></button>

                    <button disabled={liveLink === ""} className='btn btn-outline-info me-3 my-1'><a className='text-decoration-none text-dark' target='_blank' href={'http://' + `${liveLink}`}>Live link</a></button>
                    {category != 'web' && category != 'ai' ? <button disabled={readmore === "" || readmore === undefined} className='btn btn-outline-info my-1'><a className='text-decoration-none text-dark' target='_blank' href={readmore}>Read more</a></button> : ''}
                </div>
            </CardBody>
        </Card>
    </div>



    let webProjectArr = []
    let pcbProjectArr = []
    let hardwareProjectArr = []
    let aiProjectArr = []
    let othersProjectArr = []

    if (project != null) {
        for (let i in project) {

            if (project[i].category === 'pcb') {
                pcbProjectArr.push(projectCard(project[i].category, project[i].image, project[i].name, project[i].description, project[i].sourceCode, project[i].liveLink, project[i].readmore))
            }
            if (project[i].category === 'ai') {
                aiProjectArr.push(projectCard(project[i].category, project[i].image, project[i].name, project[i].description, project[i].sourceCode, project[i].liveLink, project[i].readmore))
            }
            if (project[i].category === 'web') {
                webProjectArr.push(projectCard(project[i].category, project[i].image, project[i].name, project[i].description, project[i].sourceCode, project[i].liveLink, project[i].readmore))
            }
            if (project[i].category === 'hardware') {
                hardwareProjectArr.push(projectCard(project[i].category, project[i].image, project[i].name, project[i].description, project[i].sourceCode, project[i].liveLink, project[i].readmore))
            }
            if (project[i].category === '') {
                othersProjectArr.push(projectCard(project[i].category, project[i].image, project[i].name, project[i].description, project[i].sourceCode, project[i].liveLink, project[i].readmore))
            }


        }
    }






    return (
        <div className=''>

            <div className='bg-dark'>
                <Navbar />
            </div>

            {/* Project Part */}

            {/* <Alert color='danger'>This page is under maintenance. </Alert> */}


            <div className="container mt-5">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="webDevelopment-tab" data-bs-toggle="tab" data-bs-target="#webDevelopment" type="button" role="tab" aria-selected="true">Web Development</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="hardware-tab" data-bs-toggle="tab" data-bs-target="#hardware" type="button" role="tab" aria-selected="false">Hardware</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="pcb-tab" data-bs-toggle="tab" data-bs-target="#pcb" type="button" role="tab" aria-selected="false">PCB</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="ai-tab" data-bs-toggle="tab" data-bs-target="#ai" type="button" role="tab" aria-selected="false">AI</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="others-tab" data-bs-toggle="tab" data-bs-target="#others" type="button" role="tab" aria-selected="false">Others</button>
                    </li>
                </ul>



                {project === null ? <p className='my-5 text-danger text-center'>Check internet connection!</p> : 
                
                
                    <div className="tab-content my-5" id="myTabContent">
                        <div className="tab-pane fade show active" id="webDevelopment" role="tabpanel" aria-labelledby="webDevelopment-tab">
                            <p className='text-center text-danger mb-4'>Some website may take time to load because of free hosting.</p>
                            <div className="row">{webProjectArr.length == 0 ? <h5 className='text-center'>Will Be updated soon.</h5> : webProjectArr}</div>
                        </div>
                        <div className="tab-pane fade" id="hardware" role="tabpanel" aria-labelledby="hardware-tab">
                            <div className="row">{hardwareProjectArr.length == 0 ? <h5 className='text-center'>Will Be updated soon.</h5> : hardwareProjectArr}</div>

                        </div>
                        <div className="tab-pane fade" id="pcb" role="tabpanel" aria-labelledby="pcb-tab">
                            <div className="row">{pcbProjectArr.length == 0 ? <h5 className='text-center'>Will Be updated soon.</h5> : pcbProjectArr}</div>

                        </div>
                        <div className="tab-pane fade" id="ai" role="tabpanel" aria-labelledby="ai-tab">
                            <div className="row">{aiProjectArr.length == 0 ? <h5 className='text-center'>Will Be updated soon.</h5> : aiProjectArr}</div>

                        </div>
                        <div className="tab-pane fade" id="others" role="tabpanel" aria-labelledby="others-tab">
                            <div className="row">{othersProjectArr.length == 0 ? <h5 className='text-center'>Will Be updated soon</h5> : othersProjectArr}</div>

                        </div>
                    </div>

                }
            </div>

            <Contact />
            <Footer />
        </div>
    )
}
