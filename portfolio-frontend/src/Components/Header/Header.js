import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import './HeaderStyle/Header.css'
import useVisitorTracker from '../../hooks/useVisitorTracker'

export default function Header() {
  useVisitorTracker()
  return (
    <div>
      <div className="area">
        <ul className="circles" aria-hidden="true">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>

        <div className="header">
          <Navbar />
          <Hero />
        </div>
      </div>
    </div>
  )
}
