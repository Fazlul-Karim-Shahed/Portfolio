import React from 'react'
import About from './About'
import Contact from './Contact'
import Services from './Services'
import Skill from './Skill'
import Testimonial from './Testimonial'

export default function Body() {
    return (
        <div>
            <About />
            <Skill />
            <Services />
            <Testimonial />
            <Contact />
        </div>
    )
}
