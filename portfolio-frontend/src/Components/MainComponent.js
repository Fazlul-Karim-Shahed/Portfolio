import React from 'react'
import { Route, Routes } from 'react-router'
import Admin from './Admin/Admin'
import AdminAbout from './Admin/AdminComponents/AdminAbout'
import AdminLinks from './Admin/AdminComponents/AdminLinks'
import AdminTestimonial from './Admin/AdminComponents/AdminTestimonial'
import Body from './Body/Body'
import Feedback from './Body/Feedback'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import Navbar from './Header/Navbar'

export default function MainComponent() {



    let general =
        <Route path='/' element={
            <div>
                <Header />
                <Body />
                <Footer />
            </div>
        }>
        </Route>

    let admin =
        <Route path={'/admin/' + process.env.REACT_APP_ADMIN_PASS} element={<Admin />}>
            <Route path='about' element={<AdminAbout />} />
            <Route path='links' element={<AdminLinks />} />
            <Route path='testimonial' element={<AdminTestimonial />} />
        </Route>

    return (
        <div>
            <Routes>
                {general}
                {admin}
            </Routes>
        </div>
    )
}
