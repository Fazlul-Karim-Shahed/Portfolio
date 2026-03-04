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
import AdminExperience from './Admin/AdminComponents/AdminExperience'
import AdminResume from './Admin/AdminComponents/AdminResume'
import AdminVisitors from './Admin/AdminComponents/AdminVisitors'
import AdminManagement from './Admin/AdminComponents/AdminManagement'
import NotFound from './Body/NotFound'
import Feedback from './Body/Feedback'
import AdminGate from './Admin/AdminGate'
import ExperienceDetail from './Body/ExperienceDetail'

export default function MainComponent() {

    let general =
        <>
            <Route path='/' element={
                <div>
                    <Header />
                    <div className=''>
                        <Body />
                        <Footer />
                    </div>
                </div>
            } />

            <Route path='/all-projects' element={<AllProject />} />
            <Route path='/feedback' element={<Feedback />} />
            <Route path='/experience/:slug' element={<ExperienceDetail />} />
            <Route path='*' element={<NotFound />} />
        </>

    let admin = (
        <Route path='/admin-panel' element={<AdminGate />}>
            <Route path='about' element={<AdminAbout />} />
            <Route path='links' element={<AdminLinks />} />
            <Route path='experience' element={<AdminExperience />} />
            <Route path='testimonial' element={<AdminTestimonial />} />
            <Route path='achievement' element={<AdminAchievement />} />
            <Route path='certification' element={<AdminCertification />} />
            <Route path='resume' element={<AdminResume />} />
            <Route path='visitors' element={<AdminVisitors />} />
            <Route path='admins' element={<AdminManagement />} />
            <Route path='*' element={<NotFound />} />
        </Route>
    );

    return (
        <div className=''>
            <Routes>
                {general}
                {admin}
            </Routes>
        </div>
    )
}
