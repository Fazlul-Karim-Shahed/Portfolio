import React from 'react'
import Slide from 'react-reveal/Slide';

export default function Footer() {
    return (
        <div className='text-center bg-dark text-white p-2'>

            <Slide bottom>
                <div>Created by <a className='text-decoration-none text-warning' href="https://www.linkedin.com/in/fazlul-karim-a2650b1a9/" target='blank'>Fazlul Karim</a></div>


                <div className='py-1'>
                    Copyright &copy; 2023. All right reserved.
                </div>
            </Slide>

        </div>
    )
}
