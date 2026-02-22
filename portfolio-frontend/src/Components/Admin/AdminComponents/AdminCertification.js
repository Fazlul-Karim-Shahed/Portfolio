import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';

export default function AdminCertification() {
  const [certifications, setCertifications] = useState(null);
  const [editKey, setEditKey] = useState(null);
  const [editValues, setEditValues] = useState({});

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = () => {
    axios.get(process.env.REACT_APP_BACKEND_API + 'Certifications.json')
      .then(res => setCertifications(res.data));
  };

  const del = i => {
    axios.delete(`${process.env.REACT_APP_BACKEND_API}Certifications/${i}.json`)
      .then(() => fetchCertifications());
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditValues(prev => ({ ...prev, [name]: value }));
  };

  const startEdit = (key) => {
    setEditKey(key);
    setEditValues(certifications[key]);
  };

  const cancelEdit = () => {
    setEditKey(null);
    setEditValues({});
  };

  const saveEdit = (key) => {
    axios.patch(`${process.env.REACT_APP_BACKEND_API}Certifications/${key}.json`, editValues)
      .then(() => {
        setEditKey(null);
        setEditValues({});
        fetchCertifications();
      });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      padding: '2rem .5rem',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      overflowX: 'hidden',
      transition: 'all 0.4s ease',
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
      boxShadow: 'var(--shadow)',
      border: '1px solid var(--border-color)',
      padding: '1.5rem .5rem',
      color: 'var(--text-primary)',
      transition: 'all 0.3s ease-in-out',
      boxSizing: 'border-box',
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
      transition: 'all 0.3s',
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
      padding: '0.75rem 2rem',
      borderRadius: '16px',
      cursor: 'pointer',
      fontSize: '1.1rem',
      boxShadow: '0 0 15px var(--accent)',
      transition: 'all 0.3s ease',
    },
    cardsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem',
      justifyContent: 'center',
      width: '100%',
      boxSizing: 'border-box',
    },
    card: {
      background: 'var(--bg-card)',
      borderRadius: '16px',
      backdropFilter: 'blur(12px)',
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow)',
      padding: '1rem',
      color: 'var(--text-primary)',
      maxWidth: '100%',
      boxSizing: 'border-box',
      transition: 'all 0.4s ease',
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      marginBottom: '1rem',
      color: 'var(--accent)',
    },
    cardField: {
      fontSize: '1rem',
      marginBottom: '0.7rem',
      color: 'var(--text-secondary)',
      wordBreak: 'break-word',
    },
    btnRemove: {
      background: '#ff416c',
      border: 'none',
      color: 'white',
      padding: '0.5rem 1.2rem',
      borderRadius: '16px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '700',
      boxShadow: '0 0 12px rgba(255, 65, 108, 0.5)',
      transition: 'all 0.3s ease',
      marginTop: 'auto',
      marginLeft: 'auto',
    },
    btnEdit: {
      background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
      border: 'none',
      color: 'white',
      padding: '0.5rem 1.2rem',
      borderRadius: '16px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '700',
      boxShadow: '0 0 12px #2575fc',
      transition: 'background 0.3s ease',
      marginTop: 'auto',
      marginRight: '0.5rem',
    },
    btnSaveCancelContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '0.5rem',
      marginTop: 'auto',
    },
    btnSave: {
      background: 'linear-gradient(45deg, #00c853, #64dd17)',
      border: 'none',
      color: 'white',
      padding: '0.5rem 1.2rem',
      borderRadius: '16px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '700',
      boxShadow: '0 0 12px #00c853',
      transition: 'background 0.3s ease',
    },
    btnCancel: {
      background: 'linear-gradient(45deg, #d50000, #ff1744)',
      border: 'none',
      color: 'white',
      padding: '0.5rem 1.2rem',
      borderRadius: '16px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '700',
      boxShadow: '0 0 12px #d50000',
      transition: 'background 0.3s ease',
    },
    noDataText: {
      textAlign: 'center',
      opacity: 0.6,
      fontSize: '1.2rem',
      marginTop: '3rem',
    },
    gradientText: {
      background: 'linear-gradient(45deg, #00c6ff, #0072ff)',
      WebkitBackgroundClip: 'text',
      // WebkitTextFillColor: 'transparent',
    },
  };

  let certificationsArr = [];
  if (certifications != null) {
    certificationsArr = Object.entries(certifications).map(([key, cert]) => {
      const isEditing = editKey === key;
      return (
        <div key={key} style={styles.card}>
          {isEditing ? (
            <>
              <input style={styles.input} type="text" name="name" value={editValues.name} onChange={handleEditChange} placeholder="Certification Name" />
              <input style={styles.input} type="text" name="pdfLink" value={editValues.pdfLink} onChange={handleEditChange} placeholder="PDF Link" />
              <input style={styles.input} type="text" name="organizationLogoLink" value={editValues.organizationLogoLink} onChange={handleEditChange} placeholder="Organization Logo Link" />
              <input style={styles.input} type="text" name="organization" value={editValues.organization} onChange={handleEditChange} placeholder="Organization" />
              <input style={styles.input} type="text" name="thumbnailLink" value={editValues.thumbnailLink} onChange={handleEditChange} placeholder="Thumbnail Link" />
              <textarea style={{ ...styles.input, ...styles.textarea }} name="description" value={editValues.description} onChange={handleEditChange} placeholder="Description" />
              <div style={styles.btnSaveCancelContainer}>
                <button style={styles.btnSave} onClick={() => saveEdit(key)} type="button">Save</button>
                <button style={styles.btnCancel} onClick={cancelEdit} type="button">Cancel</button>
              </div>
            </>
          ) : (
            <>
              <h3 style={styles.cardTitle}>{cert.name}</h3>
              <div style={styles.cardField}><strong>PDF Link:</strong> <a href={cert.pdfLink} target="_blank" rel="noreferrer" style={{ color: '#00c6ff' }}>{cert.pdfLink}</a></div>
              <div style={styles.cardField}><strong>Organization:</strong> {cert.organization}</div>
              <div style={styles.cardField}><strong>Organization Logo:</strong> <a href={cert.organizationLogoLink} target="_blank" rel="noreferrer" style={{ color: '#00c6ff' }}>{cert.organizationLogoLink}</a></div>
              <div style={styles.cardField}><strong>Description:</strong> {cert.description}</div>
              <div style={styles.cardField}><strong>Thumbnail Link:</strong> <a href={cert.thumbnailLink} target="_blank" rel="noreferrer" style={{ color: '#00c6ff' }}>{cert.thumbnailLink}</a></div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: 'auto' }}>
                <button style={styles.btnEdit} onClick={() => startEdit(key)} type="button">Edit</button>
                <button style={styles.btnRemove} onClick={() => del(key)} type="button">Remove</button>
              </div>
            </>
          )}
        </div>
      );
    });
  }

  return (
    <div style={styles.container}>
      <h2 className="text-center fw-bold mb-5" style={styles.gradientText}>🎓 Manage Certifications</h2>

      <div style={styles.formCard}>
        <h4 className="mb-3">➕ Add New Certificate</h4>
        <Formik
          initialValues={{
            name: '',
            pdfLink: '',
            organizationLogoLink: '',
            description: '',
            organization: '',
            thumbnailLink: ''
          }}
          onSubmit={val => {
            axios.post(process.env.REACT_APP_BACKEND_API + 'Certifications.json', val)
              .then(() => fetchCertifications());
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" value={values.name} onChange={handleChange} placeholder="Certification Name" style={styles.input} />
              <input type="text" name="pdfLink" value={values.pdfLink} onChange={handleChange} placeholder="PDF Link" style={styles.input} />
              <input type="text" name="organizationLogoLink" value={values.organizationLogoLink} onChange={handleChange} placeholder="Organization Logo Link" style={styles.input} />
              <input type="text" name="organization" value={values.organization} onChange={handleChange} placeholder="Organization" style={styles.input} />
              <input type="text" name="thumbnailLink" value={values.thumbnailLink} onChange={handleChange} placeholder="Thumbnail Link" style={styles.input} />
              <textarea name="description" value={values.description} onChange={handleChange} placeholder="Description" style={{ ...styles.input, ...styles.textarea }} />
              <button type="submit" style={styles.btnSubmit}>Add Certification</button>
            </form>
          )}
        </Formik>
      </div>

      <h4 className="mt-5 mb-4">📁 Your Certificates</h4>
      <div style={styles.cardsContainer}>
        {certificationsArr.length > 0 ? certificationsArr : (
          <p style={styles.noDataText}>No certifications found.</p>
        )}
      </div>
    </div>
  );
}
