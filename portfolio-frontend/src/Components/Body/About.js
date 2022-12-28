import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './BodyStyles/About.css'
import { Collapse } from 'reactstrap'

export default function About() {

  const [about, setAbout] = useState('')
  const [open, setOpen] = useState(false)

  
  useEffect(() => {

    axios.get(process.env.REACT_APP_BACKEND_API + 'About.json').then(data => {
      setAbout(data.data.about)
    })

  }, [])


  const toggle = () => setOpen(!open)
  let text = about.split('\n')

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
            <img className='img-fluid w-75' src="./Assets/me3.png" alt="" />
          </div>
          <div className="col-md-7 mt-4 mt-md-0 d-flex flex-column justify-content-center">
            <h3 className='fw-bold'>A passionate <span className='text-warning'>Web developer</span></h3>
            <div className='pt-3' style={{ textAlign: 'justify' }}>{text[0]}</div>
            <Collapse isOpen={open} >
              <div className='pt-3' style={{ textAlign: 'justify' }}>{text[1]}</div>
            </Collapse>

            <div onClick={toggle} className="text-primary pt-2" style={{ cursor: 'pointer' }}>Show {open ? 'less' : 'more...'}</div>
          </div>
        </div>
        <br />
      </div>
    </div>
  )
}
