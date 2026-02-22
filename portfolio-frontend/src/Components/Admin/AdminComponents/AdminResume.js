import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminResume() {
    const [resumeUrl, setResumeUrl] = useState('');
    const [savedUrl, setSavedUrl] = useState(null);
    const [message, setMessage] = useState('');
    const [btnHover, setBtnHover] = useState(false);

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_API + 'Resume.json')
            .then(res => {
                if (res.data && res.data.url) {
                    setSavedUrl(res.data.url);
                }
            })
            .catch(() => { });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!resumeUrl.trim()) return;

        // Convert Google Drive share link to direct download link
        let downloadUrl = resumeUrl.trim();
        const driveMatch = downloadUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (driveMatch) {
            downloadUrl = `https://drive.google.com/uc?export=download&id=${driveMatch[1]}`;
        }

        axios.put(process.env.REACT_APP_BACKEND_API + 'Resume.json', { url: downloadUrl })
            .then(() => {
                setSavedUrl(downloadUrl);
                setResumeUrl('');
                setMessage('✅ Resume link updated successfully!');
                setTimeout(() => setMessage(''), 3000);
            })
            .catch(() => {
                setMessage('❌ Failed to save. Try again.');
                setTimeout(() => setMessage(''), 3000);
            });
    };

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            padding: '2rem .5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'all 0.4s ease',
        },
        card: {
            background: 'var(--bg-card)',
            borderRadius: '16px',
            backdropFilter: 'blur(12px)',
            boxShadow: 'var(--shadow)',
            border: '1px solid var(--border-color)',
            width: '100%',
            maxWidth: '700px',
            padding: '2rem',
            marginBottom: '2rem',
            transition: 'all 0.4s ease',
        },
        gradientText: {
            background: 'linear-gradient(45deg, #00c6ff, #0072ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        },
        input: {
            width: '100%',
            padding: '1rem',
            fontSize: '1rem',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            outline: 'none',
            transition: 'all 0.3s ease',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        button: {
            background: 'var(--accent)',
            border: 'none',
            padding: '0.7rem 2rem',
            borderRadius: '12px',
            color: '#ffffff',
            fontWeight: '600',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 0 15px var(--accent)',
            transition: 'all 0.3s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
        },
        buttonHover: {
            boxShadow: '0 0 25px var(--accent)',
            transform: 'translateY(-2px)',
        },
        currentResume: {
            background: 'var(--bg-card)',
            padding: '1.5rem',
            borderRadius: '16px',
            boxShadow: 'var(--shadow)',
            border: '1px solid var(--border-color)',
            width: '100%',
            maxWidth: '700px',
        },
        message: {
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            marginTop: '1rem',
            fontSize: '0.95rem',
            fontWeight: '500',
        },
    };

    return (
        <div style={styles.container}>
            <h2 className='text-center fw-bold mb-5' style={styles.gradientText}>📄 Resume</h2>

            <div style={styles.card}>
                <h4 className='mb-3'>🔗 Update Resume Link</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    Upload your resume to Google Drive, set sharing to "Anyone with the link", and paste the link below.
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="url"
                        value={resumeUrl}
                        onChange={(e) => setResumeUrl(e.target.value)}
                        placeholder="Paste Google Drive link here..."
                        style={styles.input}
                    />

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                        <button
                            type="submit"
                            style={{
                                ...styles.button,
                                ...(btnHover && resumeUrl.trim() ? styles.buttonHover : {}),
                                opacity: !resumeUrl.trim() ? 0.5 : 1,
                                cursor: !resumeUrl.trim() ? 'not-allowed' : 'pointer',
                            }}
                            onMouseEnter={() => setBtnHover(true)}
                            onMouseLeave={() => setBtnHover(false)}
                            disabled={!resumeUrl.trim()}
                        >
                            💾 Save
                        </button>
                    </div>
                </form>

                {message && (
                    <div style={{
                        ...styles.message,
                        background: message.includes('✅') ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: message.includes('✅') ? '#22c55e' : '#ef4444',
                    }}>
                        {message}
                    </div>
                )}
            </div>

            <div style={styles.currentResume}>
                <h5 style={{ marginBottom: '1rem', fontWeight: '600', color: '#00c6ff' }}>
                    Current Resume:
                </h5>
                {savedUrl ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <a
                            href={savedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '600' }}
                        >
                            📄 View Resume ↗
                        </a>
                    </div>
                ) : (
                    <span style={{ color: 'var(--text-secondary)' }}>No resume link saved yet.</span>
                )}
            </div>
        </div>
    );
}
