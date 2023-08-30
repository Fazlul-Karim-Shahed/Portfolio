import React from 'react'
import About from './About'
import Contact from './Contact'
import Qualification from './Qualification'
import Services from './Services'
import Skill from './Skill'
import Testimonial from './Testimonial'
import Accomplishment from './Accomplishment'

export default function Body() {

    return (
        <div>
            <About />
            <Qualification  />
            <Skill />
            <Accomplishment />
            <Services />
            <Testimonial />
            <Contact />
        </div>
    )
}
