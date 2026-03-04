import React from 'react'
import About from './About'
import Contact from './Contact'
import ExperienceSection from './ExperienceSection'
import EducationSection from './EducationSection'
import Services from './Services'
import Skill from './Skill'
import Testimonial from './Testimonial'
import Accomplishment from './Accomplishment'

export default function Body() {

    return (
        <div className=''>
            <About />
            <ExperienceSection />
            <EducationSection />
            <Skill />
            <Accomplishment />
            <Services />
            <Testimonial />
            <Contact />
        </div>
    )
}
