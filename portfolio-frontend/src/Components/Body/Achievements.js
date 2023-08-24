import React, { useEffect, useState } from 'react'
import { } from '@fortawesome/free-solid-svg-icons'
import { PDFReader } from 'reactjs-pdf-reader';
import axios from 'axios';
import { Card, CardBody, CardLink, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { Margin } from '@mui/icons-material';

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
                <div className='col-lg-3 col-sm-12 col-md-6 px-3 mb-4'>
                    <Card className='achievement_card h-100'>
                        <CardBody>
                            <CardTitle tag='h5'>{achievements[i].name}</CardTitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6">
                                {achievements[i].organization}
                            </CardSubtitle>
                        </CardBody>
                        <img className=''
                            alt="Card cap"
                            width='100%'
                            height='200px'
                            src={achievements[i].organizationLogoLink}
                        // src='https://picsum.photos/318/180'


                        />

                        <CardBody>
                            <CardText>
                                {achievements[i].description}
                            </CardText>
                            <a className='text-decoration-none btn btn-outline-info w-100' target='_blank' href={achievements[i].pdfLink}>View details</a>
                        </CardBody>
                    </Card>


                </div>
            )
        }
    }




    return (
        <div>
            <div className='row'>
                {!showMore ? <>
                    {achievementsArr[0]}
                    {achievementsArr[1]}
                    {achievementsArr[2]}
                    {achievementsArr[3]}
                </> : achievementsArr}


            </div>
            <div className='text-center'>
                <button onClick={toggle} className="btn btn-primary my-5">Show more</button>
            </div>
        </div>

    )
}
