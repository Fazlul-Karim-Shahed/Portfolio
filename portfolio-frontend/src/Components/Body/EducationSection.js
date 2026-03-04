import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool, faBuildingColumns, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import Reveal from '../Reveal';

export default function EducationSection() {
    const educationList = [
        {
            level: 'Undergraduate',
            duration: '2020 - Present',
            institute: 'North South University, Dhaka, Bangladesh',
            detail: 'Major EEE, Department of Electrical & Computer Engineering',
            icon: faGraduationCap,
        },
        {
            level: 'HSC',
            duration: '2017 - 2019',
            institute: 'Bangladesh Navy School & College, Chattagram, Bangladesh',
            detail: 'Science Group',
            icon: faBuildingColumns,
        },
        {
            level: 'SSC',
            duration: '2016 - 2017',
            institute: 'Bangladesh Navy School & College, Chattagram, Bangladesh',
            detail: 'Science Group',
            icon: faSchool,
        },
    ];

    return (
        <div className='pb-5' id='education'>
            <Reveal effect="fade-up">
                <div className="container py-4">
                    <div className='text-center mb-5'>
                        <h1 className='fw-bold section-heading'>Education</h1>
                        <p className='section-subtitle'>Academic Background</p>
                    </div>

                    <div className="edu-timeline">
                        {educationList.map((edu, index) => (
                            <div className="edu-timeline-item" key={index}>
                                <Reveal effect="fade-up">
                                    <div className="edu-timeline-dot">
                                        <FontAwesomeIcon icon={edu.icon} />
                                    </div>
                                    <div className="edu-timeline-card">
                                        <div className="edu-timeline-content">
                                            <div className="edu-timeline-header">
                                                <h4 className="edu-timeline-level">{edu.level}</h4>
                                                <div className="edu-timeline-period">{edu.duration}</div>
                                            </div>
                                            <p className="edu-timeline-institute">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle', color: 'var(--accent)' }}>
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                    <circle cx="12" cy="10" r="3"></circle>
                                                </svg>
                                                {edu.institute}
                                            </p>
                                            <p className="edu-timeline-detail">{edu.detail}</p>
                                        </div>
                                    </div>
                                </Reveal>
                            </div>
                        ))}
                    </div>
                </div>
            </Reveal>

            <style>{`
                .edu-timeline {
                    position: relative;
                    max-width: 850px;
                    margin: 0 auto;
                    padding: 2rem 0 2rem 2rem;
                }

                .edu-timeline::before {
                    content: '';
                    position: absolute;
                    left: 42px;
                    top: 2rem;
                    bottom: 2rem;
                    width: 2px;
                    background: linear-gradient(180deg, var(--accent) 0%, rgba(0, 229, 255, 0.2) 50%, var(--accent) 100%);
                    box-shadow: 0 0 10px rgba(0, 229, 255, 0.3);
                }

                .edu-timeline-item {
                    position: relative;
                    padding-left: 4rem;
                    margin-bottom: 2.5rem;
                }

                .edu-timeline-item:last-child {
                    margin-bottom: 0;
                }

                .edu-timeline-dot {
                    position: absolute;
                    left: -20px;
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: var(--bg-card);
                    border: 2px solid var(--accent);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--accent);
                    font-size: 1rem;
                    z-index: 2;
                    top: 15px;
                    box-shadow: 0 0 15px rgba(0, 229, 255, 0.2);
                    transition: all 0.3s ease;
                }

                .edu-timeline-card {
                    background: var(--bg-card);
                    border: 1px solid var(--border-color);
                    border-radius: 12px;
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .edu-timeline-card::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 4px;
                    background: var(--accent);
                    opacity: 0.5;
                    transition: all 0.3s ease;
                }

                .edu-timeline-card:hover {
                    border-color: rgba(0, 229, 255, 0.4);
                    box-shadow: 0 8px 30px rgba(0, 229, 255, 0.1);
                    transform: translateX(5px);
                }

                .edu-timeline-card:hover::before {
                    opacity: 1;
                    box-shadow: 2px 0 10px rgba(0, 229, 255, 0.5);
                }

                .edu-timeline-card:hover + .edu-timeline-dot,
                .edu-timeline-item:hover .edu-timeline-dot {
                    background: var(--accent);
                    color: #fff;
                    box-shadow: 0 0 20px rgba(0, 229, 255, 0.5);
                    transform: scale(1.1);
                }

                .edu-timeline-content {
                    padding: 1.5rem 1.8rem;
                }

                .edu-timeline-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .edu-timeline-level {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: var(--text-primary) !important;
                    margin: 0;
                }

                .edu-timeline-period {
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: var(--accent);
                    background: rgba(0, 229, 255, 0.08);
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    border: 1px solid rgba(0, 229, 255, 0.15);
                }

                .edu-timeline-institute {
                    font-size: 1rem;
                    color: var(--text-secondary) !important;
                    margin-bottom: 0.75rem;
                    font-weight: 600;
                }

                .edu-timeline-detail {
                    font-size: 0.95rem;
                    color: var(--text-tertiary) !important;
                    margin: 0;
                    line-height: 1.6;
                }

                @media (max-width: 768px) {
                    .edu-timeline {
                        padding-left: 1rem;
                    }
                    .edu-timeline::before {
                        left: 26px;
                    }
                    .edu-timeline-item {
                        padding-left: 2.5rem;
                    }
                    .edu-timeline-dot {
                        left: -20px;
                        width: 36px;
                        height: 36px;
                        font-size: 0.85rem;
                        top: 20px;
                    }
                    .edu-timeline-header {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    .edu-timeline-content {
                        padding: 1.25rem;
                    }
                }
            `}</style>
        </div>
    );
}
