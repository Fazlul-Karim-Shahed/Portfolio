import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool, faBuildingColumns, faGraduationCap } from '@fortawesome/free-solid-svg-icons'

export default function Education() {
  return (
      <div className="row">
          <div className="col-md-6">
              <div className='d-flex pb-4  align-items-center'>
                  <div className='me-4'><FontAwesomeIcon className='fa-2x' icon={faGraduationCap} /></div>
                  <div>
                      <h5>Undergraduate</h5>
                      <h6>2020 - Present</h6>
                      <h6>North South University, Dhaka, Bangladesh</h6>
                      <h6 className='small fst-italic'>Major EEE, Department of Electrical & Computer Engineering</h6>
                      <h6 className='small fst-italic'>CGPA 3.3 out of 4</h6>
                  </div>
              </div>
              <div className='d-flex pb-4  align-items-center'>
                  <div className='me-4'><FontAwesomeIcon className='fa-2x' icon={faBuildingColumns} /></div>
                  <div>
                      <h5>HSC</h5>
                      <h6>2017 - 2019</h6>
                      <h6>Bangladesh Nou-Bahini School & College, Chattagram, Bangladesh</h6>
                      <h6 className='small fst-italic'>Science</h6>
                      <h6 className='small fst-italic'>GPA 4.83 out of 5</h6>
                  </div>
              </div>
          </div>
          <div className="col-md-6">
              <div className='d-flex pb-4 ms-0 ms-md-5  align-items-center'>
                  <div className='me-4'><FontAwesomeIcon className='fa-2x' icon={faSchool} /></div>
                  <div>
                      <h5>SSC</h5>
                      <h6>2016 - 2017</h6>
                      <h6>Bangladesh Nou-Bahini School & College, Chattagram, Bangladesh</h6>
                      <h6 className='small fst-italic'>Science</h6>
                      <h6 className='small fst-italic'>GPA 5 out of 5</h6>
                  </div>
              </div>
          </div>
      </div>

  )
}
