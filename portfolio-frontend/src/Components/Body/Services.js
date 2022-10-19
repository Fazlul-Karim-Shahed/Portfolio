import React from 'react'
import { Card, CardBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import './BodyStyles/Services.css'

export default function Services() {


    const cardHover = () => {

    }

    return (
        <div className='bg-dark'>
            <div className="container py-5">
                <div className='text-center py-3'>
                    <h1 className='fw-bold text-white'>My Services</h1>
                    <div className=''>
                        <div className='fw-bold'><span className='text-white'>----------</span> <span className='text-danger'>What i provide</span> <span className='text-white'>----------</span></div>
                    </div>
                </div>

                <div className="row py-5">
                    <div className="col-md-4 px-3 my-2 my-md-0">
                        <Card className='py-5 px-4 services_card'>
                            <CardBody className='text-center services_card_body'>
                                <FontAwesomeIcon className='h1' icon={faCode} />
                                <h3 className='py-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. </h3>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-md-4 px-3 my-2 my-md-0">
                        <Card className='py-5 px-4 services_card'>
                            <CardBody className='text-center services_card_body'>
                                <FontAwesomeIcon className='h1' icon={faCode} />
                                <h3 className='py-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. </h3>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-md-4 px-3 my-2 my-md-0">
                        <Card className='py-5 px-4 services_card'>
                            <CardBody className='text-center services_card_body'>
                                <FontAwesomeIcon className='h1' icon={faCode} />
                                <h3 className='py-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. </h3>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
