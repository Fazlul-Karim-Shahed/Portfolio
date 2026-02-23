import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Reveal from '../Reveal';

export default function Achievements() {

    const [achievements, setAchievements] = useState(null)
    const [showMore, setShowMore] = useState(false)
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768)

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 768)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_API + 'Achievements.json')
            .then(res => {
                setAchievements(res.data)
            })
    }, [])

    const toggle = () => setShowMore(!showMore)

    let achievementsArr = []
    if (achievements != null) {
        for (let i in achievements) {
            achievementsArr.push(
                <Reveal effect="zoom" key={achievements[i].name} className='col-lg-3 col-sm-12 col-md-6 px-3 mb-4'>
                    <div className='ac-card h-100'>
                        <div className="ac-card-img-wrap">
                            <img
                                alt="Organization Logo"
                                src={achievements[i].organizationLogoLink}
                            />
                        </div>
                        <div className="ac-card-body">
                            <h6 className="ac-card-title">{achievements[i].name}</h6>
                            <span className="ac-card-org">{achievements[i].organization}</span>
                            <p className="ac-card-desc">{achievements[i].description}</p>
                            <a
                                className='ac-card-btn'
                                target='_blank'
                                rel="noopener noreferrer"
                                href={achievements[i].pdfLink}
                            >
                                View details
                            </a>
                        </div>
                    </div>
                </Reveal>
            )
        }
    }

    const defaultCount = isSmallScreen ? 2 : 4;

    return (
        <div>
            <div className='row'>
                {showMore ? achievementsArr : achievementsArr.slice(0, defaultCount)}
            </div>
            {achievementsArr.length > defaultCount && (
                <div className='text-center'>
                    <button onClick={toggle} className="btn btn-primary mt-5">
                        {showMore ? 'Show less' : 'Show more'}
                    </button>
                </div>
            )}

            <style>{`
                .ac-card {
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 1rem;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
                }
                .ac-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 12px 40px rgba(13, 110, 253, 0.18), 0 0 0 1px rgba(13, 110, 253, 0.12);
                    border-color: rgba(13, 110, 253, 0.25);
                }

                .ac-card-img-wrap {
                    position: relative;
                    overflow: hidden;
                    aspect-ratio: 16 / 10;
                    background: rgba(0, 0, 0, 0.15);
                }
                .ac-card-img-wrap img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.4s ease;
                }
                .ac-card:hover .ac-card-img-wrap img {
                    transform: scale(1.05);
                }

                .ac-card-body {
                    padding: 1.1rem 1.2rem;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .ac-card-title {
                    color: #fff;
                    font-weight: 700;
                    font-size: 1rem;
                    margin-bottom: 0.3rem;
                    transition: color 0.3s ease;
                }
                .ac-card:hover .ac-card-title {
                    color: #fbbf24;
                }

                .ac-card-org {
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 0.78rem;
                    font-weight: 500;
                    margin-bottom: 0.6rem;
                }

                .ac-card-desc {
                    color: rgba(255, 255, 255, 0.45);
                    font-size: 0.82rem;
                    line-height: 1.5;
                    flex: 1;
                    margin-bottom: 0;
                }

                .ac-card-btn {
                    display: block;
                    text-align: center;
                    margin-top: 0.8rem;
                    padding: 8px 0;
                    font-size: 0.82rem;
                    font-weight: 600;
                    color: #38bdf8;
                    border: 1px solid rgba(56, 189, 248, 0.3);
                    border-radius: 8px;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    background: transparent;
                }
                .ac-card-btn:hover {
                    background: rgba(56, 189, 248, 0.1);
                    border-color: #38bdf8;
                    color: #38bdf8;
                    box-shadow: 0 0 14px rgba(56, 189, 248, 0.15);
                }

                /* Light mode */
                html[data-theme="light"] .ac-card {
                    background: rgba(248, 251, 255, 0.95);
                    border-color: rgba(100, 120, 200, 0.25);
                }
                html[data-theme="light"] .ac-card:hover {
                    box-shadow: 0 12px 40px rgba(13, 110, 253, 0.1);
                    border-color: rgba(13, 110, 253, 0.35);
                }
                html[data-theme="light"] .ac-card-title {
                    color: #1a1a2e;
                }
                html[data-theme="light"] .ac-card:hover .ac-card-title {
                    color: #b45309;
                }
                html[data-theme="light"] .ac-card-org {
                    color: #777;
                }
                html[data-theme="light"] .ac-card-desc {
                    color: #555;
                }
                html[data-theme="light"] .ac-card-btn {
                    color: #0284c7;
                    border-color: rgba(2, 132, 199, 0.3);
                }
                html[data-theme="light"] .ac-card-btn:hover {
                    background: rgba(2, 132, 199, 0.08);
                    border-color: #0284c7;
                }
            `}</style>
        </div>
    )
}
