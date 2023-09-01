import React, { useEffect, useState } from 'react'
import { } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { Card, CardBody, CardLink, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import Zoom from 'react-reveal/Zoom'

export default function Certifications() {

  const [certifications, setCertifications] = useState(null)
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_API + 'Certifications.json')
      .then(res => {
        setCertifications(res.data)
      })
  }, [])


  const toggle = () => setShowMore(!showMore)


  let certificationsArr = []
  if (certifications != null) {
    for (let i in certifications) {
      certificationsArr.push(
        <Zoom>
          <div className='col-lg-3 col-sm-12 col-md-6 px-3 mb-4'>
            <Card className='certification_card h-100'>
              <CardBody>
                <CardTitle tag='h5'>{certifications[i].name}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {certifications[i].organization}
                </CardSubtitle>
              </CardBody>
              <img className=''
                alt="Card cap"
                width='100%'
                height='200px'
                src={certifications[i].organizationLogoLink}
              // src='https://picsum.photos/318/180'


              />

              <CardBody>
                <CardText>
                  {certifications[i].description}
                </CardText>
                <a className='text-decoration-none btn btn-outline-info w-100' target='_blank' href={certifications[i].pdfLink}>View details</a>
              </CardBody>
            </Card>


          </div>
        </Zoom>
      )
    }
  }




  return (
    <div>
      <div className='row'>
        {!showMore ? <>
          {certificationsArr[0]}
          {certificationsArr[1]}
          {certificationsArr[2]}
          {certificationsArr[3]}
        </> : certificationsArr}


      </div>
      <div className='text-center'>
        <button onClick={toggle} className="btn btn-primary my-5">Show more</button>
      </div>
    </div>

  )
}
