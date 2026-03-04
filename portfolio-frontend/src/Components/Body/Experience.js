import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Experience({ loading, setLoading, renderSkeleton }) {
    const [experiences, setExperiences] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchExperiences();
    }, []);

    const getDateValue = (period) => {
        // If period contains "Present", it's the latest, return highest value
        if (period.includes('Present')) {
            return { year: 9999, month: 12 };
        }

        // Extract the start date (first part before "-")
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
                console.log('Fetched experiences data:', data);
                if (data) {
                    let entries = Object.entries(data).map(([id, value]) => ({ id, ...value }));
                    console.log('Mapped entries:', entries);

                    // Sort by date descending (latest first)
                    entries.sort((a, b) => {
                        const dateA = getDateValue(a.period);
                        const dateB = getDateValue(b.period);

                        // Compare years first
                        if (dateA.year !== dateB.year) {
                            return dateB.year - dateA.year;
                        }
                        // If same year, compare months
                        return dateB.month - dateA.month;
                    });

                    console.log('Sorted entries:', entries);
                    setExperiences(entries);
                    setLoading(false);
                } else {
                    setExperiences([]);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.error('Error fetching experiences:', err);
                setError(err.message);
                setExperiences([]);
                setLoading(false);
            });
    };

    const [showAll, setShowAll] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const displayedExperiences = (isMobile && !showAll) ? experiences.slice(0, 2) : experiences;

    return (
        <div className="row m-0">
            {error && (
                <div className="alert alert-danger w-100" style={{ marginBottom: '1rem' }}>
                    Error loading experiences: {error}
                </div>
            )}
            {loading ? renderSkeleton() : experiences.length === 0 ? (
                <div className="w-100 text-center">
                    <p className="text-white-50">No experiences found.</p>
                </div>
            ) : (
                <>
                    {displayedExperiences.map((item, index) => (
                        <div className="col-md-6 mb-4 px-4 px-md-3" key={index}>
                            <div className="card experience-glass-card h-100 w-100">
                                <div className="row g-0 align-items-center">
                                    <div className="col-3 text-center p-3">
                                        <img
                                            src={item.image}
                                            alt={item.org}
                                            className="img-fluid rounded"
                                            style={{ maxHeight: '64px', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="col-9">
                                        <div className="card-body py-3">
                                            <h5 className="card-title fw-bold text-white mb-1">{item.title}</h5>
                                            <p className="card-text text-warning mb-0 small">{item.period}</p>
                                            <p className="card-text text-white-50 fst-italic small">{item.org}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {isMobile && experiences.length > 2 && (
                        <div className="col-12 text-center mt-2 mb-4">
                            <button
                                className="btn btn-outline-warning btn-sm px-4"
                                style={{ borderRadius: '20px', fontSize: '0.85rem' }}
                                onClick={() => setShowAll(!showAll)}
                            >
                                {showAll ? 'Show Less ↑' : 'See More ↓'}
                            </button>
                        </div>
                    )}
                </>
            )}

            <style>{`
                .experience-glass-card {
                    background: rgba(20, 20, 20, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 0.75rem;
                    box-shadow: 0 0 15px rgba(255, 255, 255, 0.05), inset 0 0 10px rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .experience-glass-card:hover {
                    transform: scale(1.015);
                    box-shadow: 0 0 25px rgba(255, 255, 255, 0.12);
                }
            `}</style>
        </div>
    );
}
