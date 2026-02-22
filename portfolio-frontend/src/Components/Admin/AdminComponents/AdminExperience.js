import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';

export default function AdminExperience() {
  const [experiences, setExperiences] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = () => {
    axios.get(process.env.REACT_APP_BACKEND_API + 'Experiences.json')
      .then((res) => {
        const data = res.data;
        console.log('Admin fetched experiences:', data);
        if (data) {
          const entries = Object.entries(data).map(([id, value]) => ({ id, ...value }));
          console.log('Admin mapped entries:', entries);
          setExperiences(entries);
        } else {
          setExperiences([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching experiences in admin:', err);
      });
  };

  const formatPeriod = (startMonth, startYear, endMonth, endYear, isPresent) => {
    const start = `${startMonth} ${startYear}`;
    const end = isPresent ? 'Present' : `${endMonth} ${endYear}`;
    return `${start} - ${end}`;
  };

  const parsePeriod = (period) => {
    if (!period) {
      return { startMonth: 'Jan', startYear: currentYear, endMonth: 'Dec', endYear: currentYear, isPresent: false };
    }

    const parts = period.split(' - ');
    const startParts = parts[0]?.trim().split(' ') || ['Jan', currentYear.toString()];
    const endPart = parts[1]?.trim() || 'Present';

    return {
      startMonth: startParts[0] || 'Jan',
      startYear: parseInt(startParts[1]) || currentYear,
      endMonth: endPart === 'Present' ? 'Dec' : endPart.split(' ')[0],
      endYear: endPart === 'Present' ? currentYear : parseInt(endPart.split(' ')[1]),
      isPresent: endPart === 'Present',
    };
  };

  const deleteExperience = (id) => {
    axios.delete(`${process.env.REACT_APP_BACKEND_API}Experiences/${id}.json`)
      .then(() => fetchExperiences());
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
      background: 'linear-gradient(45deg, var(--accent), #0072ff)',
      WebkitBackgroundClip: 'text',
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
    select: {
      width: '100%',
      padding: '0.75rem 1rem',
      marginBottom: '1rem',
      borderRadius: '12px',
      border: '1px solid var(--border-color)',
      background: 'var(--bg-secondary)',
      color: 'var(--text-primary)',
      fontSize: '1rem',
      outline: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    selectOption: {
      background: 'var(--bg-secondary)',
      color: 'var(--text-primary)',
    },
    rowContainer: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem',
    },
    checkbox: {
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: 'var(--text-primary)',
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
      transition: 'all 0.3s ease',
    },
  };

  const ExperienceForm = ({ initialValues, onSubmit, showCancelBtn = false, onCancel }) => {
    const parsedValues = parsePeriod(initialValues.period);

    return (
      <Formik
        enableReinitialize
        initialValues={{
          title: initialValues.title || '',
          startMonth: parsedValues.startMonth,
          startYear: parsedValues.startYear,
          endMonth: parsedValues.endMonth,
          endYear: parsedValues.endYear,
          isPresent: parsedValues.isPresent,
          org: initialValues.org || '',
          image: initialValues.image || '',
        }}
        onSubmit={(values) => {
          const period = formatPeriod(values.startMonth, values.startYear, values.endMonth, values.endYear, values.isPresent);
          const dataToSave = { title: values.title, org: values.org, image: values.image, period };
          console.log('Saving experience with period:', dataToSave);
          onSubmit(dataToSave);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <input
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="Job Title"
              style={styles.input}
              required
            />

            <label style={{ fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>Start Date:</label>
            <div style={styles.rowContainer}>
              <select name="startMonth" value={values.startMonth} onChange={handleChange} style={styles.select}>
                {months.map((m) => (
                  <option key={m} value={m} style={styles.selectOption}>
                    {m}
                  </option>
                ))}
              </select>
              <select name="startYear" value={values.startYear} onChange={handleChange} style={styles.select}>
                {years.map((y) => (
                  <option key={y} value={y} style={styles.selectOption}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <label style={{ fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>End Date:</label>
            <div style={{ ...styles.rowContainer, marginBottom: '1rem' }}>
              <select
                name="endMonth"
                value={values.endMonth}
                onChange={handleChange}
                style={styles.select}
                disabled={values.isPresent}
              >
                {months.map((m) => (
                  <option key={m} value={m} style={styles.selectOption}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                name="endYear"
                value={values.endYear}
                onChange={handleChange}
                style={styles.select}
                disabled={values.isPresent}
              >
                {years.map((y) => (
                  <option key={y} value={y} style={styles.selectOption}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.checkbox}>
              <input
                type="checkbox"
                id="isPresent"
                name="isPresent"
                checked={values.isPresent}
                onChange={handleChange}
                style={{ cursor: 'pointer', width: '18px', height: '18px' }}
              />
              <label htmlFor="isPresent" style={{ cursor: 'pointer', marginBottom: 0 }}>Currently working here</label>
            </div>

            <input
              name="org"
              value={values.org}
              onChange={handleChange}
              placeholder="Organization Name"
              style={styles.input}
              required
            />

            <input
              name="image"
              value={values.image}
              onChange={handleChange}
              placeholder="Logo Image URL"
              style={styles.input}
            />

            <div style={styles.btnGroup}>
              <button type="submit" style={styles.btnSubmit}>
                {showCancelBtn ? 'Save' : 'Add Experience'}
              </button>
              {showCancelBtn && (
                <button type="button" onClick={onCancel} style={styles.btnCancel}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}
      </Formik>
    );
  };

  return (
    <div style={styles.container}>
      <h2 className='text-center fw-bold mb-5' style={styles.gradientText}>
        💼 Manage Experiences
      </h2>

      {/* Add Experience Form */}
      <div style={styles.formCard}>
        <h4 className='mb-3'>➕ Add New Experience</h4>
        <ExperienceForm
          initialValues={{
            title: '',
            period: '',
            org: '',
            image: '',
          }}
          onSubmit={(values) => {
            console.log('Adding new experience:', values);
            axios.post(`${process.env.REACT_APP_BACKEND_API}Experiences.json`, values)
              .then((res) => {
                console.log('Experience added successfully');
                fetchExperiences();
              })
              .catch((err) => {
                console.error('Error adding experience:', err);
              });
          }}
        />
      </div>

      {/* Experiences List */}
      <h4 className='mt-5 mb-4'>📁 Your Experiences</h4>
      <div style={styles.cardContainer}>
        {experiences.length > 0 ? (
          experiences.map((exp, i) => (
            <div key={exp.id} style={styles.card}>
              {editIndex === i ? (
                <ExperienceForm
                  initialValues={{
                    title: exp.title,
                    period: exp.period,
                    org: exp.org,
                    image: exp.image,
                  }}
                  onSubmit={(values) => {
                    console.log('Updating experience:', values);
                    axios.put(`${process.env.REACT_APP_BACKEND_API}Experiences/${exp.id}.json`, values)
                      .then(() => {
                        console.log('Experience updated successfully');
                        fetchExperiences();
                        setEditIndex(null);
                      })
                      .catch((err) => {
                        console.error('Error updating experience:', err);
                      });
                  }}
                  showCancelBtn={true}
                  onCancel={() => setEditIndex(null)}
                />
              ) : (
                <>
                  <h3 style={styles.cardTitle}>{exp.title}</h3>
                  <div style={styles.cardField}>
                    <strong>Company:</strong> {exp.org}
                  </div>
                  <div style={styles.cardField}>
                    <strong>Period:</strong> {exp.period}
                  </div>
                  <div style={styles.cardField}>
                    <strong>Logo:</strong>{' '}
                    <a href={exp.image} target="_blank" rel="noreferrer" style={styles.cardLink}>
                      {exp.image}
                    </a>
                  </div>
                  <div style={styles.btnGroup}>
                    <button onClick={() => setEditIndex(i)} style={styles.btnEdit}>
                      Edit
                    </button>
                    <button onClick={() => deleteExperience(exp.id)} style={styles.btnDelete}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', opacity: 0.6 }}>No experiences found.</p>
        )}
      </div>

      <style>{`
        select option {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          padding: 0.5rem;
        }

        input:focus,
        select:focus,
        textarea:focus {
          outline: none;
          border-color: var(--accent) !important;
          box-shadow: 0 0 0 3px rgba(0, 82, 204, 0.1);
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
