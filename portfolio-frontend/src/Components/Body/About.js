import React from 'react'
import './BodyStyles/About.css'
import { TextField, Autocomplete } from '@mui/material'

export default function About() {

  return (
    <div>
      <div className="container  py-5">
        <div className='text-center py-3'>
          <h1 className='fw-bold'>About Me</h1>
          <div className=''>
            <div className='fw-bold'>---------- <span className='text-danger'>Who am I</span> ----------</div>
          </div>
        </div>

        <div className="row m-0 pt-5">
          <div className="col-md-5 text-center">
            <img className='img-fluid w-75' src="./Assets/me.png" alt="" />
          </div>
          <div className="col-md-7 mt-5">
            <h3 className='fw-bold'>I am a Shahed and I am a <span className='text-warning'>Web developer</span></h3>
            <div className='pt-3' style={{ textAlign: 'justify' }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus nesciunt fuga perspiciatis suscipit officiis dolor nemo est et ducimus labore modi, minus totam odit. Nulla minus pariatur dicta eum veniam? Sequi eaque odit vero impedit neque consequatur ad, quia quasi fugiat delectus aspernatur, quaerat nihil quae, ducimus maiores ipsam porro. Suscipit pariatur eveniet explicabo perferendis ut, porro sapiente quam natus velit sequi neque architecto a, dolorem quia illo consequatur magnam temporibus in quod totam at? Quas eaque veniam est sequi nulla quod architecto error molestiae. Eaque, culpa quisquam aliquam molestias tempora necessitatibus ratione enim dolores voluptatum odio, numquam maiores explicabo?
            </div>

            <button className="about_hireBtn">Hire me</button>

          </div>
        </div>

      </div>
    </div>
  )
}
