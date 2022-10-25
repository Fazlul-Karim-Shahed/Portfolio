import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './BodyStyles/About.css'

export default function About() {

  const [about, setAbout] = useState('')
  useEffect(() => {

    axios.get(process.env.REACT_APP_BACKEND_API + 'About.json').then(data => {
      setAbout(data.data.about)
    })

  }, [])



  return (
    <div>
      <div className="container  py-5" id='about'>
        <div className='text-center py-3'>
          <h1 className='fw-bold'>About Me</h1>
          <div className=''>
            <div className='fw-bold'>---------- <span className='text-danger'>Who am I</span> ----------</div>
          </div>
        </div>

        <div className="row m-0 pt-5">
          <div className="col-md-5 text-center">
            <img className='img-fluid w-100 h-100' src="./Assets/me.png" alt="" />
          </div>
          <div className="col-md-7 mt-5">
            <h3 className='fw-bold'>A passionate <span className='text-warning'>Web developer</span></h3>
            <div className='pt-3' style={{ textAlign: 'justify' }}>{about}</div>
            <button className="about_hireBtn">Learn more</button>
          </div>
        </div>

      </div>
    </div>
  )
}
