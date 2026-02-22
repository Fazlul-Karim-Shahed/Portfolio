import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import Reveal from '../Reveal';

export default function Achievements() {

    const [achievements, setAchievements] = useState(null)
    const [showMore, setShowMore] = useState(false)

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_API + 'Achievements.json')
            .then(res => {
                setAchievements(res.data)
            })
    }, [])

    const toggle = () => setShowMore(!showMore)

    let achievementsArr = []
    if (achievements != null) {
        for (let i in achievements) {
            achievementsArr.push(
                <Reveal effect="zoom" key={achievements[i].name} className='col-lg-3 col-sm-12 col-md-6 px-3 mb-4'>
                    <Card className='achievement-glossy-box h-100 d-flex flex-column w-100'>
                        <CardBody>
                            <CardTitle className='' tag='h6'>{achievements[i].name}</CardTitle>
                            <CardSubtitle className="mt-2 text-white-50 small" tag="h6">
                                {achievements[i].organization}
                            </CardSubtitle>
                        </CardBody>
                        <img
                            alt="Organization Logo"
                            width='100%'
                            height='200px'
                            src={achievements[i].organizationLogoLink}
                            style={{ objectFit: 'cover' }}
                        />
                        <CardBody className="flex-grow-1 d-flex flex-column">
                            <CardText className="mb-3 small">
                                {achievements[i].description}
                            </CardText>
                            <a
                                className='btn btn-outline-info mt-auto w-100 text-center'
                                target='_blank'
                                rel="noopener noreferrer"
                                href={achievements[i].pdfLink}
                            >
                                View details
                            </a>
                        </CardBody>
                    </Card>
                </Reveal>
            )
        }
    }

    return (
        <div>
            <div className='row'>
                {!showMore ? (
                    <>
                        {achievementsArr[0]}
                        {achievementsArr[1]}
                        {achievementsArr[2]}
                        {achievementsArr[3]}
                    </>
                ) : (
                    achievementsArr
                )}
            </div>
            <div className='text-center'>
                <button onClick={toggle} className="btn btn-primary mt-5">
                    {showMore ? 'Show less' : 'Show more'}
                </button>
            </div>

            {/* Inline CSS for glossy hover effect */}
            <style>{`
                .achievement-glossy-box {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 20px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                     backdrop-filter: blur(14px);
                    -webkit- backdrop-filter: blur(14px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    padding: 1rem;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    color: #fff;
                    display: flex;
                    flex-direction: column;
                    cursor: pointer;
                }
                .achievement-glossy-box:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 0 30px rgba(13, 110, 253, 0.3);
                }
                .achievement-glossy-box:hover h6 {
                    color: #fdc937;
                    transition: color 0.3s ease;
                }
                .achievement-glossy-box:hover .btn-outline-info {
                    border-color: #fdc937;
                    color: #fff;
                    background-color: transparent;
                    box-shadow: 0 0 10px rgba(253, 201, 55, 0.5);
                    transition: color 0.3s ease, border-color 0.3s ease;
                }

                
                
            `}</style>
        </div>
    )
}
