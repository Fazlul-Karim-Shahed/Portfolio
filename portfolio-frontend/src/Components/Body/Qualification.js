import React, { useState, useEffect } from 'react'
import './BodyStyles/Qualification.css'
import Education from './Education'
import Experience from './Experience'
import Reveal from '../Reveal'

export default function Qualification() {
    const [content, setContent] = useState('experience')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // On mount, set the first tab active
        const el = document.querySelectorAll('.qualification_tab_link')
        el.forEach((item, index) => {
            if (index === 0) {
                item.classList.add('active-tab')
            }
        })
    }, [])

    const tab = (str, pos) => {
        if (content === str) return; // Prevent re-animating the active tab
        
        // Experience relies on network data
        if (str === 'experience') {
            setLoading(true);
        } else {
            // Education is hardcoded local data
            setLoading(false);
        }

        setContent(str)
        const el = document.querySelectorAll('.qualification_tab_link')
        el.forEach((item, index) => {
            if (index === pos) {
                item.classList.add('active-tab')
            } else {
                item.classList.remove('active-tab')
            }
        })
    }

    const renderSkeleton = () => (
        <div className="w-100 px-3">
            <div className="skeleton-glossy mb-3" style={{ height: '90px', borderRadius: '12px' }}></div>
            <div className="skeleton-glossy mb-3" style={{ height: '90px', borderRadius: '12px' }}></div>
            <div className="skeleton-glossy mb-3" style={{ height: '90px', borderRadius: '12px' }}></div>
        </div>
    )

    return (
        <div className='glossy-bg py-5' id='qualification'>
            <Reveal effect="fade-up">
                <div className="container py-4">
                    <div className='text-center'>
                        <h1 className='fw-bold mb-2 text-white'>Qualification</h1>
                        <p className='section-subtitle'>What I Have</p>
                    </div>

                    <div className='glass-card py-4 px-md-4 rounded-4 shadow-lg'>

                        <div className='d-flex justify-content-center mb-4 qualification_tab'>
                            <div
                                onClick={() => tab('experience', 0)}
                                className='mx-3 mx-md-4 pb-2 qualification_tab_link'
                                role="button"
                                tabIndex={0}
                            >
                                Experience
                            </div>

                            <div
                                onClick={() => tab('education', 1)}
                                className='mx-3 mx-md-4 pb-2 qualification_tab_link'
                                role="button"
                                tabIndex={0}
                            >
                                Education
                            </div>
                        </div>

                        <div className={`row pt-2 pb-2 ${loading ? '' : 'glossy-fade-in'}`}>
                            <div className="col-12">
                                {content === 'experience' && <Experience loading={loading} setLoading={setLoading} renderSkeleton={renderSkeleton} />}
                                {content === 'education' && <Education />}
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>

            {/* Inline CSS to match Skill section tabs */}
            <style>{`
                .qualification_tab_link {
                    font-size: 1rem;
                    font-weight: 500;
                    color: #f8f9fa;
                    cursor: pointer;
                    padding: 8px 12px;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                    user-select: none;
                }

                .qualification_tab_link:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                }

                .qualification_tab_link.active-tab {
                    color: #0d6efd;
                    font-weight: bold;
                    border-bottom: 3px solid #0d6efd;
                }

                @keyframes glossyFadeIn {
                    0% {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .glossy-fade-in {
                    animation: glossyFadeIn 0.4s ease-out forwards;
                }

                .skeleton-glossy {
                    background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.03) 75%);
                    background-size: 200% 100%;
                    animation: skeletonLoading 1.5s infinite;
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(255,255,255,0.05);
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                }

                @keyframes skeletonLoading {
                    0% {
                        background-position: 200% 0;
                    }
                    100% {
                        background-position: -200% 0;
                    }
                }
                    
            `}</style>
        </div>
    )
}
