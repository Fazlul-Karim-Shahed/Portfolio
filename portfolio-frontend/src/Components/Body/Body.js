import React from 'react'
import { Route, Routes } from 'react-router'
import About from './About'
import Contact from './Contact'
import Qualification from './Qualification'
import Services from './Services'
import Skill from './Skill'
import Testimonial from './Testimonial'

export default function Body() {

    return (
        <div>
            <About />
            <Qualification />
            <Skill />
            <Testimonial />
            <Services />
            <Contact />
        </div>
    )
}
