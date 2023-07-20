import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Admin() {

    const [time, setTime] = useState(new Date().toLocaleString())

    useEffect(() => {
        document.title = 'Admin-Panel'
    }, [])


    const adminUri = '/admin/' + process.env.REACT_APP_ADMIN_PASS

    setInterval(() => {
        setTime(new Date().toLocaleString())
    }, 1000);


    return (
        <div>
            <div className='bg-dark d-flex justify-content-between p-3'>
                <div className='text-white'>logo</div>
                <div className='text-center'>
                    <Link className='text-decoration-none mx-4 text-warning' to={adminUri + '/about'}>About</Link>
                    <Link className='text-decoration-none mx-4 text-warning' to={adminUri + '/links'}>Project Links</Link>
                    <Link className='text-decoration-none mx-4 text-warning' to={adminUri + '/testimonial'}>Testimonial</Link>
                    <Link className='text-decoration-none mx-4 text-warning' to={adminUri + '/achievement'}>Achievement</Link>
                    <Link className='text-decoration-none mx-4 text-warning' to={adminUri + '/certification'}>Certification</Link>
                </div>
                <div className='text-white'>{time}</div>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}
