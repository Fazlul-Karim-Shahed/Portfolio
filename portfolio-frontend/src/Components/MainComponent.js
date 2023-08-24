import React from 'react'
import { Route, Routes } from 'react-router'
import Admin from './Admin/Admin'
import AdminAbout from './Admin/AdminComponents/AdminAbout'
import AdminLinks from './Admin/AdminComponents/AdminLinks'
import AdminTestimonial from './Admin/AdminComponents/AdminTestimonial'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import AllProject from './Body/AllProject'
import AdminAchievement from './Admin/AdminComponents/AdminAchievement'
import AdminCertification from './Admin/AdminComponents/AdminCertification'
import Navbar from './Header/Navbar'

export default function MainComponent() {


    let general =

        <>

            <Route path='/' element={
                <div>
                    <Header />
                    <Body />
                    <Footer />
                </div>
            } />

            <Route path='/all-projects' element={<AllProject />} />
            <Route path='*' element={
                <div>
                    {/* <div className="bg-dark"><Navbar /></div> */}
                    <h1>Not found</h1>
                </div>
            } />


        </>

    let admin =
        <Route path={'/admin/' + process.env.REACT_APP_ADMIN_PASS} element={<Admin />}>
            <Route path='about' element={<AdminAbout />} />
            <Route path='links' element={<AdminLinks />} />
            <Route path='testimonial' element={<AdminTestimonial />} />
            <Route path='achievement' element={<AdminAchievement />} />
            <Route path='certification' element={<AdminCertification />} />
            <Route path='*' element={"Not found"} />
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
