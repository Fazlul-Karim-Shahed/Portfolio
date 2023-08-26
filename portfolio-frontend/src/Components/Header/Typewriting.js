import React, { useState } from 'react'
import './HeaderStyle/Typewriting.css'
import Typewriter from 'typewriter-effect';

export default function Typewriting() {

    return (
        <div class="mt-2">
            <h5 ><Typewriter
                options={{
                    strings: ['I am an Engineer', 'I am a Passionate Developer', 'I am an Enthusiast',],
                    autoStart: true,
                    loop: true,
                }}
            /></h5>


        </div>

    )
}
