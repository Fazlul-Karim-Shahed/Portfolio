import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import './AdminAchievement.css';

export default function AdminAchievement() {
  const [achievements, setAchievements] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = () => {
    axios.get(process.env.REACT_APP_BACKEND_API + 'Achievements.json')
      .then((res) => {
        const data = res.data;
        if (data) {
          const entries = Object.entries(data).map(([id, value]) => ({ id, ...value }));
          setAchievements(entries);
        } else {
          setAchievements([]);
        }
      });
  };

  const deleteAchievement = (id) => {
    axios.delete(`${process.env.REACT_APP_BACKEND_API}Achievements/${id}.json`)
      .then(() => fetchAchievements());
  };

  const styles = {
    container: {
      minHeight: '100vh',
      padding: '2rem .5rem',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      fontFamily: 'Segoe UI, sans-serif',
      transition: 'all 0.4s ease',
    },
    gradientText: {
      color: 'var(--accent)',
    },
    heading: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '2rem',
      color: 'var(--accent)',
    },
    formCard: {
      background: 'var(--bg-card)',
      borderRadius: '16px',
      backdropFilter: 'blur(10px)',
      border: '1px solid var(--border-color)',
      padding: '1.5rem .5rem',
      boxShadow: 'var(--shadow)',
      transition: 'all 0.4s ease',
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      marginBottom: '1rem',
      borderRadius: '12px',
      border: '1px solid var(--border-color)',
      background: 'var(--bg-secondary)',
      color: 'var(--text-primary)',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.3s ease',
    },
    textarea: {
      minHeight: '100px',
      resize: 'vertical',
    },
    btnSubmit: {
      background: 'var(--accent)',
      border: 'none',
      color: '#ffffff',
      fontWeight: '700',
      padding: '0.7rem 2rem',
      borderRadius: '16px',
      cursor: 'pointer',
      fontSize: '1rem',
      marginRight: '1rem',
      transition: 'all 0.3s ease',
    },
    btnCancel: {
      background: '#ff416c',
      border: 'none',
      color: 'white',
      fontWeight: '700',
      padding: '0.7rem 1.6rem',
      borderRadius: '16px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
    },
    cardContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
      marginTop: '2rem',
    },
    card: {
      background: 'var(--bg-card)',
      borderRadius: '16px',
      backdropFilter: 'blur(12px)',
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow)',
      padding: '1rem',
      transition: 'all 0.4s ease',
    },
    cardTitle: {
      fontSize: '1.3rem',
      fontWeight: '700',
      marginBottom: '1rem',
      color: 'var(--accent)',
    },
    cardField: {
      fontSize: '0.9rem',
      marginBottom: '0.5rem',
      color: 'var(--text-secondary)',
    },
    cardLink: {
      color: 'var(--accent)',
      wordBreak: 'break-word',
    },
    btnGroup: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '0.5rem',
      marginTop: '1rem',
    },
    btnEdit: {
      background: 'var(--accent)',
      border: 'none',
      color: '#ffffff',
      padding: '0.4rem 1rem',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
    },
    btnDelete: {
      background: '#ff416c',
      border: 'none',
      color: 'white',
      padding: '0.4rem 1rem',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
    },
  };

  return (
    <div style={styles.container}>
      <h2 className='text-center fw-bold mb-5' style={styles.gradientText}>🏆 Manage Achievements</h2>

      {/* Add Achievement Form */}
      <div style={styles.formCard}>
        <h4 className='mb-3'>➕ Add New Achievement</h4>
        <Formik
          initialValues={{
            name: '',
            pdfLink: '',
            organizationLogoLink: '',
            description: '',
            organization: '',
            thumbnailLink: '',
          }}
          onSubmit={(values, { resetForm }) => {
            axios.post(`${process.env.REACT_APP_BACKEND_API}Achievements.json`, values)
              .then(() => {
                fetchAchievements();
                resetForm();
              });
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <input name="name" value={values.name} onChange={handleChange} placeholder="Name" style={styles.input} />
              <input name="pdfLink" value={values.pdfLink} onChange={handleChange} placeholder="PDF Link" style={styles.input} />
              <input name="organizationLogoLink" value={values.organizationLogoLink} onChange={handleChange} placeholder="Organization Logo" style={styles.input} />
              <input name="organization" value={values.organization} onChange={handleChange} placeholder="Organization" style={styles.input} />
              <input name="thumbnailLink" value={values.thumbnailLink} onChange={handleChange} placeholder="Thumbnail Link" style={styles.input} />
              <textarea name="description" value={values.description} onChange={handleChange} placeholder="Description" style={{ ...styles.input, ...styles.textarea }} />
              <button type="submit" style={styles.btnSubmit}>Add Achievement</button>
            </form>
          )}
        </Formik>
      </div>

      {/* Achievements List */}
      <h4 className='mt-5 mb-4'>📁 Your Achievements</h4>
      <div style={styles.cardContainer}>
        {achievements.length > 0 ? achievements.map((a, i) => (
          <div key={a.id} style={styles.card}>
            {editIndex === i ? (
              <Formik
                enableReinitialize
                initialValues={{
                  name: a.name,
                  pdfLink: a.pdfLink,
                  organizationLogoLink: a.organizationLogoLink,
                  description: a.description,
                  organization: a.organization,
                  thumbnailLink: a.thumbnailLink,
                }}
                onSubmit={(val) => {
                  axios.put(`${process.env.REACT_APP_BACKEND_API}Achievements/${a.id}.json`, val)
                    .then(() => {
                      fetchAchievements();
                      setEditIndex(null);
                    });
                }}
              >
                {({ values, handleChange, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <input name="name" value={values.name} onChange={handleChange} placeholder="Name" style={styles.input} />
                    <input name="pdfLink" value={values.pdfLink} onChange={handleChange} placeholder="PDF Link" style={styles.input} />
                    <input name="organizationLogoLink" value={values.organizationLogoLink} onChange={handleChange} placeholder="Organization Logo" style={styles.input} />
                    <input name="organization" value={values.organization} onChange={handleChange} placeholder="Organization" style={styles.input} />
                    <input name="thumbnailLink" value={values.thumbnailLink} onChange={handleChange} placeholder="Thumbnail Link" style={styles.input} />
                    <textarea name="description" value={values.description} onChange={handleChange} placeholder="Description" style={{ ...styles.input, ...styles.textarea }} />
                    <div style={styles.btnGroup}>
                      <button type="submit" style={styles.btnSubmit}>Save</button>
                      <button type="button" onClick={() => setEditIndex(null)} style={styles.btnCancel}>Cancel</button>
                    </div>
                  </form>
                )}
              </Formik>
            ) : (
              <>
                <h3 style={styles.cardTitle}>{a.name}</h3>
                <div style={styles.cardField}><strong>PDF:</strong> <a href={a.pdfLink} target="_blank" rel="noreferrer" style={styles.cardLink}>{a.pdfLink}</a></div>
                <div style={styles.cardField}><strong>Organization:</strong> {a.organization}</div>
                <div style={styles.cardField}><strong>Logo:</strong> <a href={a.organizationLogoLink} target="_blank" rel="noreferrer" style={styles.cardLink}>{a.organizationLogoLink}</a></div>
                <div style={styles.cardField}><strong>Description:</strong> {a.description}</div>
                <div style={styles.cardField}><strong>Thumbnail:</strong> <a href={a.thumbnailLink} target="_blank" rel="noreferrer" style={styles.cardLink}>{a.thumbnailLink}</a></div>
                <div style={styles.btnGroup}>
                  <button onClick={() => setEditIndex(i)} style={styles.btnEdit}>Edit</button>
                  <button onClick={() => deleteAchievement(a.id)} style={styles.btnDelete}>Delete</button>
                </div>
              </>
            )}
          </div>
        )) : (
          <p style={{ textAlign: 'center', opacity: 0.6 }}>No achievements found.</p>
        )}
      </div>
    </div>
  );
}
