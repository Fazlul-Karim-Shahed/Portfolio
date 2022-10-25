import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool, faBuildingColumns, faGraduationCap } from '@fortawesome/free-solid-svg-icons'

export default function Experience() {
    return (
        <div className="row">
            <div className="col-md-6">
                <div className='d-flex pb-4 align-items-center'>
                    <div className='me-4'><h6 className='fw-bold'>2021 - Present</h6></div>
                    <div>
                        <h5>Incharge</h5>
                        <h6>Website Development Team, IEEE NSU Student Branch</h6>
                        <h6 className='small fst-italic'>Maintaining INSB website and the team as well</h6>
                    </div>
                </div>

                {/* <div className='d-flex pb-4 align-items-center'>
                    <div className='me-4'><h6 className='fw-bold'>2021 - Present</h6></div>
                    <div>
                        <h5>Incharge</h5>
                        <h6>Website Development Team, IEEE NSU Student Branch</h6>
                        <h6 className='small fst-italic'>Maintaining INSB website and the team as well</h6>
                    </div>
                </div> */}
            </div>


            <div className="col-md-6">
                {/* <div className='d-flex pb-4 ms-0 ms-md-5 align-items-center'>
                    <div className='me-4'><h6 className='fw-bold'>2021 - Present</h6></div>
                    <div>
                        <h5>Incharge</h5>
                        <h6>Website Development Team, IEEE NSU Student Branch</h6>
                        <h6 className='small fst-italic'>Maintaining INSB website and the team as well</h6>
                    </div>
                </div> */}
            </div>
        </div>

    )
}
