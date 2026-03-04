import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Reveal from '../Reveal';

export default function ExperienceSection() {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchExperiences();
    }, []);

    const getDateValue = (period) => {
        if (!period) return { year: 0, month: 0 };
        if (period.includes('Present')) return { year: 9999, month: 12 };
        const startDate = period.split('-')[0].trim();
        const months = {
            'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
            'Jul': 7, 'Aug': 8, 'Sep': 9, 'Sept': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
        };
        const parts = startDate.split(' ');
        const month = months[parts[0]] || 1;
        const year = parseInt(parts[1]) || 0;
        return { year, month };
    };

    const fetchExperiences = () => {
        setError(null);
        axios.get(process.env.REACT_APP_BACKEND_API + 'Experiences.json')
            .then((res) => {
                const data = res.data;
                if (data) {
                    let entries = Object.entries(data).map(([id, value]) => ({ id, ...value }));
                    entries.sort((a, b) => {
                        const dateA = getDateValue(a.period);
                        const dateB = getDateValue(b.period);
                        if (dateA.year !== dateB.year) return dateB.year - dateA.year;
                        return dateB.month - dateA.month;
                    });
                    setExperiences(entries);
                } else {
                    setExperiences([]);
                }
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setExperiences([]);
                setLoading(false);
            });
    };

    const generateSlug = (item) => {
        if (item.slug) return item.slug;
        const text = `${item.org || ''}`;
        return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };

    const renderSkeleton = () => (
        <div className="row m-0">
            {[1, 2, 3].map(i => (
                <div className="col-md-6 col-lg-4 mb-4 px-3" key={i}>
                    <div className="exp-skeleton" style={{ height: '200px', borderRadius: '16px' }}></div>
                </div>
            ))}
        </div>
    );

    const [showAll, setShowAll] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const displayedExperiences = (isMobile && !showAll) ? experiences.slice(0, 2) : experiences;

    return (
        <div className='pb-5' id='experience'>
            <Reveal effect="fade-up">
                <div className="container py-4">
                    <div className='text-center mb-5'>
                        <h1 className='fw-bold section-heading'>Professional Experience</h1>
                        <p className='section-subtitle'>My Career Journey</p>
                    </div>

                    {error && (
                        <div className="alert alert-danger text-center">
                            Error loading experiences: {error}
                        </div>
                    )}

                    {loading ? renderSkeleton() : experiences.length === 0 ? (
                        <p className="text-center" style={{ color: 'var(--text-tertiary)' }}>No experiences found.</p>
                    ) : (
                        <div className="row m-0">
                            {displayedExperiences.map((item, index) => (
                                <div className="col-md-6 col-lg-4 mb-4 px-3" key={index}>
                                    <Link
                                        to={`/experience/${generateSlug(item)}`}
                                        className="text-decoration-none"
                                    >
                                        <div className="exp-card h-100">
                                            <div className="exp-card-glow"></div>
                                            <div className="exp-card-content">
                                                <div className="exp-card-header">
                                                    <div className="exp-logo-wrapper">
                                                        <img
                                                            src={item.image}
                                                            alt={item.org}
                                                            className="exp-logo"
                                                        />
                                                    </div>
                                                    <div className="exp-card-badge">
                                                        {item.period && item.period.includes('Present') ? 'Current' : ''}
                                                    </div>
                                                </div>
                                                <h4 className="exp-card-title">
                                                    {item.positions && item.positions.length > 0
                                                        ? item.positions[item.positions.length - 1].title
                                                        : item.title}
                                                </h4>
                                                <p className="exp-card-org">{item.org}</p>
                                                <p className="exp-card-period">
                                                    {item.positions && item.positions.length > 0 ? (
                                                        <>
                                                            {item.positions[item.positions.length - 1].startDate} - {item.positions[item.positions.length - 1].endDate}
                                                            <span style={{ display: 'block', fontSize: '0.75rem', opacity: 0.7, marginTop: '2px' }}>
                                                                (+ {item.positions.length - 1} earlier role{item.positions.length > 2 ? 's' : ''})
                                                            </span>
                                                        </>
                                                    ) : (
                                                        item.period
                                                    )}
                                                </p>
                                                {item.summary && (
                                                    <p className="exp-card-summary">{item.summary}</p>
                                                )}
                                                <div className="exp-card-arrow">
                                                    <span>View Details →</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                            {isMobile && experiences.length > 2 && (
                                <div className="col-12 text-center mt-2 mb-4">
                                    <button
                                        className="btn btn-outline-warning px-5 py-2"
                                        style={{ borderRadius: '30px', fontWeight: '600', fontSize: '0.9rem' }}
                                        onClick={() => setShowAll(!showAll)}
                                    >
                                        {showAll ? 'Show Less History ↑' : 'See Full Experience ↓'}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </Reveal>

            <style>{`
                .exp-card {
                    position: relative;
                    background: var(--bg-card);
                    border: 1px solid var(--border-color);
                    border-radius: 16px;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                }

                .exp-card:hover {
                    transform: translateY(-8px);
                    border-color: var(--accent);
                    box-shadow: 0 12px 40px rgba(0, 229, 255, 0.15), 0 0 60px rgba(0, 229, 255, 0.05);
                }

                .exp-card-glow {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, transparent, var(--accent), var(--accent-secondary), transparent);
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }

                .exp-card:hover .exp-card-glow {
                    opacity: 1;
                }

                .exp-card-content {
                    padding: 1.5rem;
                }

                .exp-card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1rem;
                }

                .exp-logo-wrapper {
                    width: 56px;
                    height: 56px;
                    border-radius: 12px;
                    overflow: hidden;
                    border: 1px solid var(--border-color);
                    background: var(--bg-secondary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .exp-logo {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .exp-card-badge {
                    font-size: 0.7rem;
                    font-weight: 600;
                    color: var(--accent);
                    background: rgba(0, 229, 255, 0.1);
                    border: 1px solid rgba(0, 229, 255, 0.2);
                    padding: 2px 10px;
                    border-radius: 20px;
                    min-height: 24px;
                }

                .exp-card-title {
                    font-size: 1.15rem;
                    font-weight: 700;
                    color: var(--text-primary) !important;
                    margin-bottom: 0.3rem;
                    line-height: 1.3;
                }

                .exp-card-org {
                    font-size: 0.9rem;
                    color: var(--accent) !important;
                    font-weight: 500;
                    margin-bottom: 0.3rem;
                }

                .exp-card-period {
                    font-size: 0.8rem;
                    color: var(--text-tertiary) !important;
                    margin-bottom: 0.5rem;
                }

                .exp-card-summary {
                    font-size: 0.85rem;
                    color: var(--text-secondary) !important;
                    line-height: 1.5;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .exp-card-arrow {
                    margin-top: 1rem;
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: var(--accent) !important;
                    opacity: 0;
                    transform: translateX(-10px);
                    transition: all 0.3s ease;
                }

                .exp-card:hover .exp-card-arrow {
                    opacity: 1;
                    transform: translateX(0);
                }

                .exp-skeleton {
                    background: linear-gradient(90deg, var(--bg-secondary) 25%, var(--bg-tertiary) 50%, var(--bg-secondary) 75%);
                    background-size: 200% 100%;
                    animation: skeletonShimmer 1.5s infinite;
                    border: 1px solid var(--border-color);
                }

                @keyframes skeletonShimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }

                .section-heading {
                    color: var(--text-primary);
                }

                .section-subtitle {
                    color: var(--text-tertiary);
                    font-size: 1rem;
                }
            `}</style>
        </div>
    );
}
