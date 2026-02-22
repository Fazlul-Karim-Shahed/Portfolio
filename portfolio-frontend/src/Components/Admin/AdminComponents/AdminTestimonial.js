import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function AdminTestimonial() {
  const [allTestimonial, setAllTestimonial] = useState(null);

  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_API + 'feedback.json')
      .then(data => {
        setAllTestimonial(data.data);
      });
  }, []);

  const del = i => {
    axios.delete(`${process.env.REACT_APP_BACKEND_API}feedback/${i}.json`)
      .then(() => {
        axios.get(process.env.REACT_APP_BACKEND_API + 'feedback.json')
          .then(res => setAllTestimonial(res.data));
      });
  };

  const toggleApprove = (key, currentStatus) => {
    axios.patch(`${process.env.REACT_APP_BACKEND_API}feedback/${key}.json`, { approved: !currentStatus })
      .then(() => {
        // Optimistically update the state
        setAllTestimonial(prev => ({
          ...prev,
          [key]: { ...prev[key], approved: !currentStatus }
        }));
      });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '2rem 1rem',
      transition: 'all 0.4s ease',
    },
    heading: {
      textAlign: 'center',
      fontWeight: '700',
      fontSize: '2.5rem',
      marginBottom: '2.5rem',
      color: 'var(--accent)',
    },
    row: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
      justifyContent: 'center',
      width: '100%',
    },
    card: {
      background: 'var(--bg-card)',
      borderRadius: '16px',
      backdropFilter: 'blur(12px)',
      boxShadow: 'var(--shadow)',
      border: '1px solid var(--border-color)',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: 'all 0.4s ease',
    },
    name: {
      fontSize: '1.5rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
      color: 'var(--accent)',
    },
    designation: {
      fontWeight: '600',
      fontStyle: 'italic',
      marginBottom: '1rem',
      color: 'var(--text-secondary)',
    },
    description: {
      flexGrow: 1,
      marginBottom: '1.5rem',
      color: 'var(--text-secondary)',
      fontSize: '1rem',
      lineHeight: '1.4',
    },
    btn: {
      alignSelf: 'flex-start',
      background: '#ff416c',
      border: 'none',
      color: 'white',
      fontWeight: '600',
      padding: '0.4rem 1.2rem',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem',
    },
    btnHover: {
      boxShadow: '0 0 12px #ff416c',
      background: 'linear-gradient(45deg, #ff4b2b, #ff416c)',
    },
    btnApprove: {
      alignSelf: 'flex-start',
      background: '#198754',
      border: 'none',
      color: 'white',
      fontWeight: '600',
      padding: '0.4rem 1.2rem',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem',
    },
    btnApproveHover: {
      boxShadow: '0 0 12px #198754',
      background: '#157347',
    },
    btnWarning: {
      alignSelf: 'flex-start',
      background: '#ffc107',
      border: 'none',
      color: '#000',
      fontWeight: '600',
      padding: '0.4rem 1.2rem',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem',
    },
    btnWarningHover: {
      boxShadow: '0 0 12px #ffc107',
      background: '#ffca2c',
    },
    badge: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        padding: '0.3rem 0.8rem',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        color: '#fff'
    },
    icon: {
      fontSize: '1rem',
    },
    gradientText: {
      background: 'linear-gradient(45deg, #00c6ff, #0072ff)',
      WebkitBackgroundClip: 'text',
      // WebkitTextFillColor: 'blue',
  },
  };

  // Hover state for buttons
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <div style={styles.container}>
      <h2 className='text-center fw-bold mb-5' style={styles.gradientText}>💬 Manage Testimonials</h2>

      <div style={styles.row}>
        {allTestimonial == null
          ? <p style={{ color: 'rgba(255,255,255,0.5)' }}>Loading testimonials...</p>
          : Object.keys(allTestimonial).length === 0
            ? <p style={{ color: 'rgba(255,255,255,0.5)' }}>No testimonials found.</p>
            : Object.entries(allTestimonial).map(([key, testimonial], i) => (
              <div key={key} style={{ ...styles.card, position: 'relative' }}>
                <div style={{
                  ...styles.badge,
                  background: testimonial.approved ? '#198754' : '#ffc107',
                  color: testimonial.approved ? '#fff' : '#000'
                }}>
                  {testimonial.approved ? 'Approved' : 'Pending'}
                </div>
                <div>
                  <h3 style={styles.name}>{testimonial.name}</h3>
                  <div style={styles.designation}>Designation: {testimonial.designation}</div>
                  <p style={styles.description}>{testimonial.description}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                  <button
                    style={{ ...styles.btn, ...(hoverIndex === `del-${i}` ? styles.btnHover : {}) }}
                    onClick={() => del(key)}
                    onMouseEnter={() => setHoverIndex(`del-${i}`)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    <i className="fas fa-trash" style={styles.icon}></i> Remove
                  </button>
                  <button
                    style={{
                      ...(testimonial.approved ? styles.btnWarning : styles.btnApprove),
                      ...(hoverIndex === `toggle-${i}` ? (testimonial.approved ? styles.btnWarningHover : styles.btnApproveHover) : {})
                    }}
                    onClick={() => toggleApprove(key, testimonial.approved)}
                    onMouseEnter={() => setHoverIndex(`toggle-${i}`)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    <i className={testimonial.approved ? "fas fa-times" : "fas fa-check"} style={styles.icon}></i> 
                    {testimonial.approved ? 'Unapprove' : 'Approve'}
                  </button>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  );
}
