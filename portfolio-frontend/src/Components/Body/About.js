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
    }).catch(err => {
      // alert(err.message)
    })

  }, [])


  const toggle = () => setOpen(!open)


  let aboutArr = about.split('.')
  let firstPart = aboutArr.filter((i, n) => { if (n < 6) return i })
  let secondPart = aboutArr.filter((i, n) => { if (n >= 6) return i })
  firstPart.push('') // for last "."

  return (
    <div style={{ backgroundColor: '' }}>
      <div className="container py-5" id='about'>
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
            {about === '' ? <p className='mt-5 text-danger'>Check internet connection!</p> : <div className='mt-3'>

              <span className='pt-2' style={{ textAlign: 'justify' }}>{firstPart.join('.')}</span>
              <Collapse isOpen={open} >
                <br />
                <span className='pt-3' style={{ textAlign: 'justify' }}>{secondPart.join('.')}</span>
              </Collapse>

              <div onClick={toggle} className="text-primary pt-2" style={{ cursor: 'pointer' }}>Show {open ? 'less' : 'more...'}</div>
            </div>}
          </div>
        </div>
        <br />
      </div>
    </div>
  )
}
