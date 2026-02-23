import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool, faBuildingColumns, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

export default function Education() {
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
        <div className="row">
            {educationList.map((edu, index) => (
                <div className="col-md-6 mb-4 px-4 px-md-3" key={index}>
                    <div className="card education-glass-card h-100 w-100">
                        <div className="card-body d-flex align-items-start">
                            <div className="me-3 mt-1">
                                <FontAwesomeIcon icon={edu.icon} className="text-warning fs-2" />
                            </div>
                            <div>
                                <h5 className="fw-bold text-white mb-1">{edu.level}</h5>
                                <p className="mb-1 text-white-50 small">{edu.duration}</p>
                                {edu.detail && <p className="mb-1 text-light small">{edu.detail}</p>}
                                <p className="mb-0 text-white small fw-semibold mt-3">{edu.institute}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <style>{`
                .education-glass-card {
                    background: rgba(20, 20, 20, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 0.75rem;
                    box-shadow: 0 0 15px rgba(255, 255, 255, 0.04), inset 0 0 10px rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .education-glass-card:hover {
                    transform: scale(1.03);
                    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
                }
            `}</style>
        </div>
    );
}
