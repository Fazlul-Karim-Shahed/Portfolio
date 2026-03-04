import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer';
import Reveal from '../Reveal';

export default function ExperienceDetail() {
    const { slug } = useParams();
    const [experience, setExperience] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchExperience();
    }, [slug]);

    const generateSlug = (item) => {
        if (item.slug) return item.slug;
        const text = `${item.org || ''}`;
        return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };

    const fetchExperience = () => {
        axios.get(process.env.REACT_APP_BACKEND_API + 'Experiences.json')
            .then((res) => {
                const data = res.data;
                if (data) {
                    const entries = Object.entries(data).map(([id, value]) => ({ id, ...value }));
                    const found = entries.find(item => generateSlug(item) === slug);
                    if (found) {
                        setExperience(found);
                        if (found.seoTitle) {
                            document.title = found.seoTitle;
                        } else {
                            document.title = `${found.title} at ${found.org} | Fazlul Karim Shahed`;
                        }
                    } else {
                        setError('Experience not found');
                    }
                } else {
                    setError('No experiences available');
                }
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    const renderSection = (title, content, icon) => {
        if (!content || (Array.isArray(content) && content.length === 0)) return null;
        return (
            <Reveal effect="fade-up">
                <div className="exp-detail-section">
                    <div className="exp-detail-section-header">
                        <span className="exp-detail-section-icon">{icon}</span>
                        <h3 className="exp-detail-section-title">{title}</h3>
                    </div>
                    <div className="exp-detail-section-body">
                        {Array.isArray(content) ? (
                            <div className="exp-detail-tags">
                                {content.map((item, i) => (
                                    <span key={i} className="exp-detail-tag">{item}</span>
                                ))}
                            </div>
                        ) : (
                            <div
                                className="exp-detail-text"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        )}
                    </div>
                </div>
            </Reveal>
        );
    };

    const renderTextSection = (title, content, icon) => {
        if (!content) return null;
        return (
            <Reveal effect="fade-up">
                <div className="exp-detail-section">
                    <div className="exp-detail-section-header">
                        <span className="exp-detail-section-icon">{icon}</span>
                        <h3 className="exp-detail-section-title">{title}</h3>
                    </div>
                    <div className="exp-detail-section-body">
                        <p className="exp-detail-text">{content}</p>
                    </div>
                </div>
            </Reveal>
        );
    };

    const renderProjectSection = (title, content, icon) => {
        if (!content || (Array.isArray(content) && content.length === 0)) return null;
        return (
            <Reveal effect="fade-up">
                <div className="exp-detail-section">
                    <div className="exp-detail-section-header">
                        <span className="exp-detail-section-icon">{icon}</span>
                        <h3 className="exp-detail-section-title">{title}</h3>
                    </div>
                    <div className="exp-detail-section-body">
                        <div className="exp-projects-grid">
                            {content.map((proj, i) => {
                                if (typeof proj === 'string') {
                                    return <span key={i} className="exp-detail-tag" style={{ marginRight: '8px', marginBottom: '8px', display: 'inline-block' }}>{proj}</span>;
                                }
                                return (
                                    <div key={i} className="exp-project-card cyber-premium-card">
                                        {proj.image && (
                                            <div className="exp-project-image-wrap">
                                                <img src={proj.image} alt={proj.name} className="exp-project-image" />
                                                <div className="exp-project-image-gradient"></div>
                                            </div>
                                        )}
                                        <div className="exp-project-content">
                                            <h4 className="exp-project-title">{proj.name}</h4>
                                            {proj.description && <p className="exp-project-desc">{proj.description}</p>}
                                            {proj.skillsUsed && (
                                                <div className="exp-project-learnings">
                                                    <strong>Technical Skills Used:</strong>
                                                    <div className="exp-project-skills-container">
                                                        {proj.skillsUsed.split(',').map((skill, index) => (
                                                            <span key={index} className="exp-project-skill-badge">
                                                                {skill.trim()}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Reveal>
        );
    };

    if (loading) {
        return (
            <div className="exp-detail-page">
                <Navbar />
                <div className="container py-5 mt-5 text-center">
                    <div className="spinner-border" style={{ color: 'var(--accent)' }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !experience) {
        return (
            <div className="exp-detail-page">
                <Navbar />
                <div className="container py-5 mt-5 text-center">
                    <Reveal effect="fade-up">
                        <div className="exp-not-found">
                            <h2 style={{ color: 'var(--text-primary)' }}>Experience Not Found</h2>
                            <p style={{ color: 'var(--text-tertiary)' }}>{error || 'The requested experience could not be found.'}</p>
                            <Link to="/#experience" className="btn exp-back-btn">
                                ← Back to Portfolio
                            </Link>
                        </div>
                    </Reveal>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="exp-detail-page">
            <Navbar />

            {/* Hero Banner */}
            <div className="exp-detail-hero">
                <div className="exp-detail-hero-overlay"></div>
                <div className="container position-relative" style={{ zIndex: 2 }}>
                    <Reveal effect="fade-up">
                        <div className="exp-detail-hero-content">
                            <div className="exp-detail-hero-logo-wrap">
                                {experience.image && (
                                    <img
                                        src={experience.image}
                                        alt={experience.org}
                                        className="exp-detail-hero-logo"
                                    />
                                )}
                            </div>
                            <div>
                                <h1 className="exp-detail-hero-title">
                                    {experience.positions && experience.positions.length > 0
                                        ? experience.positions[experience.positions.length - 1].title
                                        : experience.title}
                                </h1>
                                <h2 className="exp-detail-hero-org">{experience.org}</h2>
                                <div className="exp-detail-hero-meta">
                                    <span className="exp-detail-meta-item">📅 {experience.period}</span>
                                    {experience.location && (
                                        <span className="exp-detail-meta-item">📍 {experience.location}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* Content */}
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">

                        {/* Promotion Timeline */}
                        {experience.positions && experience.positions.length > 0 && (
                            <Reveal effect="fade-up">
                                <div className="exp-detail-section">
                                    <div className="exp-detail-section-header">
                                        <span className="exp-detail-section-icon">📈</span>
                                        <h3 className="exp-detail-section-title">Promotion Timeline</h3>
                                    </div>
                                    <div className="exp-detail-section-body">
                                        <div className="exp-promo-timeline">
                                            {[...experience.positions].reverse().map((pos, i) => (
                                                <div key={i} className="exp-promo-item">
                                                    <div className="exp-promo-dot"></div>
                                                    <div className="exp-promo-content">
                                                        <h4 className="exp-promo-title">{pos.title}</h4>
                                                        <span className="exp-promo-date">{pos.startDate} — {pos.endDate}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        )}

                        {renderTextSection('Company Overview', experience.companyDescription, '🏢')}
                        {renderSection('Role & Responsibilities', experience.responsibilities, '👤')}
                        {renderSection('Technical Skills', experience.skills, '⚡')}
                        {renderProjectSection('Projects', experience.projects, '📁')}
                        {renderSection('Verification Methodologies', experience.methodologies, '🔬')}
                        {renderSection('Tools & Technologies', experience.tools, '🛠️')}
                        {renderTextSection('Clients & Stakeholders', experience.clients, '🤝')}
                        {renderTextSection('Achievements & Impact', experience.achievements, '🏆')}
                        {renderTextSection('Key Learnings', experience.learnings, '📖')}

                        {/* Back Button */}
                        <Reveal effect="fade-up">
                            <div className="text-center mt-5 pt-3">
                                <Link to="/#experience" className="btn exp-back-btn">
                                    ← Back to Portfolio
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>

            <Footer />

            <style>{`
                .exp-detail-page {
                    background: var(--bg-primary);
                    min-height: 100vh;
                }

                .exp-detail-hero {
                    position: relative;
                    padding: 8rem 0 4rem;
                    background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%);
                    border-bottom: 1px solid var(--border-color);
                    overflow: hidden;
                }

                .exp-detail-hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(ellipse at 30% 50%, rgba(0, 229, 255, 0.05) 0%, transparent 70%);
                }

                .exp-detail-hero-content {
                    display: flex;
                    align-items: flex-start;
                    gap: 2rem;
                }

                .exp-detail-hero-logo-wrap {
                    width: 80px;
                    height: 80px;
                    border-radius: 16px;
                    overflow: hidden;
                    border: 2px solid var(--border-color);
                    background: var(--bg-card);
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .exp-detail-hero-logo {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .exp-detail-hero-title {
                    font-size: 2rem;
                    font-weight: 800;
                    color: var(--text-primary) !important;
                    margin-bottom: 0.3rem;
                    line-height: 1.2;
                }

                .exp-detail-hero-org {
                    font-size: 1.2rem;
                    color: var(--accent) !important;
                    font-weight: 600;
                    margin-bottom: 0.8rem;
                }

                .exp-detail-hero-meta {
                    display: flex;
                    gap: 1.5rem;
                    flex-wrap: wrap;
                }

                .exp-detail-meta-item {
                    font-size: 0.9rem;
                    color: var(--text-tertiary);
                }

                .exp-detail-section {
                    background: var(--bg-card);
                    border: 1px solid var(--border-color);
                    border-radius: 16px;
                    padding: 1.5rem 2rem;
                    margin-bottom: 1.5rem;
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    transition: all 0.3s ease;
                }

                .exp-detail-section:hover {
                    border-color: rgba(0, 229, 255, 0.3);
                    box-shadow: 0 4px 20px rgba(0, 229, 255, 0.05);
                }

                .exp-detail-section-header {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                    padding-bottom: 0.75rem;
                    border-bottom: 1px solid var(--border-color);
                }

                .exp-detail-section-icon {
                    font-size: 1.3rem;
                }

                .exp-detail-section-title {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: var(--text-primary) !important;
                    margin: 0;
                }

                /* Promotion Timeline */
                .exp-promo-timeline {
                    position: relative;
                    padding-left: 1.5rem;
                    margin-top: 1rem;
                }

                .exp-promo-timeline::before {
                    content: '';
                    position: absolute;
                    left: 0.35rem;
                    top: 0.5rem;
                    bottom: 0.5rem;
                    width: 2px;
                    background: linear-gradient(180deg, rgba(0, 229, 255, 0.4), rgba(0, 229, 255, 0.05));
                }

                .exp-promo-item {
                    position: relative;
                    margin-bottom: 1.5rem;
                }

                .exp-promo-item:last-child {
                    margin-bottom: 0;
                }

                .exp-promo-dot {
                    position: absolute;
                    left: -1.5rem;
                    top: 0.35rem;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: var(--bg-card);
                    border: 2px solid var(--accent);
                    z-index: 2;
                    box-shadow: 0 0 10px rgba(0, 229, 255, 0.4);
                }
                
                .exp-promo-item:last-child .exp-promo-dot {
                    background: var(--accent);
                    box-shadow: 0 0 15px rgba(0, 229, 255, 0.6);
                }

                .exp-promo-content {
                    background: rgba(0, 229, 255, 0.03);
                    border: 1px solid rgba(0, 229, 255, 0.1);
                    padding: 1rem 1.25rem;
                    border-radius: 12px;
                    transition: all 0.3s ease;
                }

                .exp-promo-content:hover {
                    background: rgba(0, 229, 255, 0.06);
                    border-color: rgba(0, 229, 255, 0.2);
                }

                .exp-promo-title {
                    font-size: 1.05rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin-bottom: 0.2rem;
                }

                .exp-promo-date {
                    font-size: 0.85rem;
                    color: var(--text-tertiary);
                    font-weight: 500;
                }

                .exp-detail-section-body {
                    padding-top: 0.25rem;
                }

                .exp-detail-text {
                    font-size: 0.95rem;
                    color: var(--text-secondary);
                    line-height: 1.7;
                    margin: 0;
                }

                .exp-detail-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .exp-detail-tag {
                    font-size: 0.8rem;
                    font-weight: 500;
                    color: var(--accent);
                    background: rgba(0, 229, 255, 0.08);
                    border: 1px solid rgba(0, 229, 255, 0.15);
                    padding: 0.35rem 0.85rem;
                    border-radius: 20px;
                    transition: all 0.3s ease;
                }

                .exp-detail-tag:hover {
                    background: rgba(0, 229, 255, 0.15);
                    border-color: var(--accent);
                    transform: translateY(-2px);
                }

                .exp-back-btn {
                    color: var(--accent) !important;
                    border: 1px solid var(--accent) !important;
                    background: transparent !important;
                    padding: 0.6rem 1.5rem;
                    border-radius: 30px;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                }

                .exp-back-btn:hover {
                    background: var(--accent) !important;
                    color: #fff !important;
                    box-shadow: 0 0 20px rgba(0, 229, 255, 0.3);
                }

                .exp-not-found {
                    padding: 5rem 0;
                }

                @media (max-width: 768px) {
                    .exp-detail-hero {
                        padding: 6rem 0 3rem;
                    }

                    .exp-detail-hero-content {
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                    }

                    .exp-detail-hero-title {
                        font-size: 1.5rem;
                    }

                    .exp-detail-hero-meta {
                        justify-content: center;
                    }

                    .exp-detail-section {
                        padding: 1.25rem 1.25rem;
                    }
                }
                .exp-projects-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2rem;
                }

                .exp-project-card.cyber-premium-card {
                    background: linear-gradient(135deg, rgba(15, 23, 42, 0.4), rgba(30, 41, 59, 0.2));
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(0, 229, 255, 0.1);
                    border-radius: 16px;
                    padding: 0;
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                .exp-project-card.cyber-premium-card:hover {
                    border-color: rgba(0, 229, 255, 0.4);
                    box-shadow: 0 0 30px rgba(0, 229, 255, 0.1), inset 0 0 15px rgba(0, 229, 255, 0.05);
                }

                .exp-project-image-wrap {
                    width: 100%;
                    height: 220px;
                    position: relative;
                    overflow: hidden;
                    border-bottom: 1px solid rgba(0, 229, 255, 0.1);
                }

                .exp-project-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.8s ease;
                }

                .exp-project-image-gradient {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, transparent 40%, rgba(15, 23, 42, 0.8));
                    z-index: 1;
                }

                .exp-project-card:hover .exp-project-image {
                    transform: scale(1.1) rotate(1deg);
                }

                .exp-project-content {
                    padding: 2rem;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                }

                .exp-project-title {
                    font-size: 1.4rem;
                    font-weight: 800;
                    color: var(--text-primary);
                    margin-bottom: 1rem;
                    letter-spacing: -0.02em;
                    position: relative;
                    display: inline-block;
                }

                .exp-project-desc {
                    font-size: 1rem;
                    color: var(--text-secondary);
                    margin-bottom: 2rem;
                    line-height: 1.7;
                    font-weight: 400;
                }

                .exp-project-learnings {
                    margin-top: auto;
                    padding-top: 1.5rem;
                    border-top: 1px solid rgba(0, 229, 255, 0.05);
                }

                .exp-project-learnings strong {
                    color: var(--accent);
                    display: block;
                    margin-bottom: 1rem;
                    font-size: 0.8rem;
                    font-weight: 700;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                    opacity: 0.8;
                }

                .exp-project-skills-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.6rem;
                }

                .exp-project-skill-badge {
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    background: rgba(0, 229, 255, 0.05);
                    border: 1px solid rgba(0, 229, 255, 0.15);
                    padding: 0.4rem 0.9rem;
                    border-radius: 6px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    backdrop-filter: blur(4px);
                }

                .exp-project-skill-badge:hover {
                    background: rgba(0, 229, 255, 0.2);
                    border-color: var(--accent);
                    transform: translateY(-3px) scale(1.05);
                    box-shadow: 0 5px 15px rgba(0, 229, 255, 0.2);
                    color: var(--accent);
                }

                @media (min-width: 992px) {
                    .exp-projects-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                html[data-theme="light"] .exp-project-card.cyber-premium-card {
                    background: rgba(255, 255, 255, 0.7);
                    border-color: rgba(2, 132, 199, 0.1);
                }

                html[data-theme="light"] .exp-project-image-gradient {
                    background: linear-gradient(to bottom, transparent 40%, rgba(255, 255, 255, 0.9));
                }

                html[data-theme="light"] .exp-project-skill-badge {
                    background: rgba(2, 132, 199, 0.05);
                    border-color: rgba(2, 132, 199, 0.2);
                }
            `}</style>
        </div>
    );
}
