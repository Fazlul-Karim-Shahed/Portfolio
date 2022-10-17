import React, { useState } from 'react'
import './HeaderStyle/Typewriting.css'


export default function Typewriting() {

    const [str, setStr] = useState('I am a Web Developer')
    var arr = ['I am a Web Developer', 'I am a programmer']

    setInterval(() => {
        setStr(str === 'I am a Web Developer' ? arr[1] : arr[0])
    }, 4500)

    return (
        <div>
            <div className="typing-demo"> {str}</div>
        </div>
    )
}
