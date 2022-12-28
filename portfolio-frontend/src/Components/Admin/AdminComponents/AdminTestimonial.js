import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Toast } from 'reactstrap'

export default function AdminTestimonial() {

  const [allTestimonial, setAllTestimonial] = useState(null)

  useEffect(() => {

    axios.get(process.env.REACT_APP_BACKEND_API + 'feedback.json').then(data => {
      setAllTestimonial(data.data)
    })

  }, [])

  const del = i => {
    axios.delete(`${process.env.REACT_APP_BACKEND_API}feedback/${i}.json`)
      .then(res => {
        axios.get(process.env.REACT_APP_BACKEND_API + 'feedback.json')
          .then(res => {
            setAllTestimonial(res.data)
          })
      })
  }

  let arr = []
  if (allTestimonial != null) {
    for (let i in allTestimonial) {
      arr.push(
        <div className='col-md-3 my-3'>
          <Toast className='p-3'>
            <h3>{allTestimonial[i].name}</h3>
            Designation: {allTestimonial[i].designation} <br /> <br />
            Description: {allTestimonial[i].description} <br />
            <button onClick={e => del(i)} className='btn btn-danger small my-2'>Remove</button>
          </Toast>
        </div>
      )
    }
  }

  return (
    <div>
      <h2 className='text-center py-5'>Testimonial</h2>
      <div className='row m-0'>
        {arr}
      </div>
    </div>
  )
}
