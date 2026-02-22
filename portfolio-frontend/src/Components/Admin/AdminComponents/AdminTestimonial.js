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
      boxShadow: '0 0 12px #ff416c',
      transition: 'background 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem',
    },
    btnHover: {
      background: 'linear-gradient(45deg, #ff4b2b, #ff416c)',
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
              <div key={key} style={styles.card}>
                <div>
                  <h3 style={styles.name}>{testimonial.name}</h3>
                  <div style={styles.designation}>Designation: {testimonial.designation}</div>
                  <p style={styles.description}>{testimonial.description}</p>
                </div>
                <button
                  style={{ ...styles.btn, ...(hoverIndex === i ? styles.btnHover : {}) }}
                  onClick={() => del(key)}
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <i className="fas fa-trash" style={styles.icon}></i> Remove
                </button>
              </div>
            ))
        }
      </div>
    </div>
  );
}
