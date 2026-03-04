import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);



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

  const generateSlug = (org, title) => {
    const text = `${org}-${title}`;
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };



  // Helper component for array fields
  const ArrayInput = ({ label, values, name, setFieldValue }) => {
    const [inputVal, setInputVal] = useState('');
    const items = values[name] || [];

    const addItem = () => {
      if (inputVal.trim()) {
        setFieldValue(name, [...items, inputVal.trim()]);
        setInputVal('');
      }
    };

    const removeItem = (index) => {
      setFieldValue(name, items.filter((_, i) => i !== index));
    };

    return (
      <div style={{ marginBottom: '1rem' }}>
        <label style={styles.label}>{label}</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addItem(); } }}
            placeholder={`Add ${label.toLowerCase()}...`}
            style={{ ...styles.input, flex: 1, marginBottom: 0 }}
          />
          <button type="button" onClick={addItem} style={styles.btnAddItem}>+</button>
        </div>
        <div style={styles.tagContainer}>
          {items.map((item, i) => (
            <span key={i} style={styles.tag}>
              {item}
              <button type="button" onClick={() => removeItem(i)} style={styles.tagRemove}>×</button>
            </span>
          ))}
        </div>
      </div>
    );
  };

  const PositionInput = ({ values, name, setFieldValue }) => {
    const items = values[name] || [];

    const addPosition = () => {
      setFieldValue(name, [...items, { title: '', startDate: '', endDate: '' }]);
    };

    const updatePosition = (index, field, val) => {
      const newItems = [...items];
      newItems[index][field] = val;
      setFieldValue(name, newItems);
    };

    const removePosition = (index) => {
      setFieldValue(name, items.filter((_, i) => i !== index));
    };

    return (
      <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
        <label style={{ ...styles.label, marginBottom: '1rem', color: 'var(--accent)', fontSize: '0.95rem' }}>🔄 Promotion Timeline / Roles</label>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Add roles chronologically (oldest first). The last role will be shown as your current/latest role on the homepage.</p>

        {items.map((pos, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(150px, 2fr) minmax(100px, 1fr) minmax(100px, 1fr) auto', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
            <input value={pos.title} onChange={e => updatePosition(i, 'title', e.target.value)} placeholder="Role Title (e.g. Trainee Verification Engineer)" style={{ ...styles.input, marginBottom: 0 }} />
            <input value={pos.startDate} onChange={e => updatePosition(i, 'startDate', e.target.value)} placeholder="Start (e.g. Jan 2023)" style={{ ...styles.input, marginBottom: 0 }} />
            <input value={pos.endDate} onChange={e => updatePosition(i, 'endDate', e.target.value)} placeholder="End (e.g. Dec 2023)" style={{ ...styles.input, marginBottom: 0 }} />
            <button type="button" onClick={() => removePosition(i)} style={{ ...styles.btnDelete, height: '42px', padding: '0 0.8rem', marginBottom: 0 }}>×</button>
          </div>
        ))}
        <button type="button" onClick={addPosition} style={{ ...styles.btnAddItem, fontSize: '0.85rem', marginTop: '0.5rem' }}>+ Add Role Timeline</button>
      </div>
    );
  };

  const ProjectInput = ({ values, name, setFieldValue }) => {
    const items = values[name] || [];

    const addProject = () => {
      setFieldValue(name, [...items, { name: '', image: '', description: '', skillsUsed: '' }]);
    };

    const updateProject = (index, field, val) => {
      const newItems = [...items];
      newItems[index][field] = val;
      setFieldValue(name, newItems);
    };

    const removeProject = (index) => {
      setFieldValue(name, items.filter((_, i) => i !== index));
    };

    return (
      <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
        <label style={{ ...styles.label, marginBottom: '1rem', color: 'var(--accent)', fontSize: '0.95rem' }}>💼 Projects Overview</label>
        
        {items.map((proj, i) => (
          <div key={i} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px dashed var(--border-color)' }}>
            <input value={proj.name || ''} onChange={e => updateProject(i, 'name', e.target.value)} placeholder="Project Name" style={{ ...styles.input, marginBottom: '0.5rem' }} />
            <input value={proj.image || ''} onChange={e => updateProject(i, 'image', e.target.value)} placeholder="Project Image URL (Optional)" style={{ ...styles.input, marginBottom: '0.5rem' }} />
            <textarea value={proj.description || ''} onChange={e => updateProject(i, 'description', e.target.value)} placeholder="Project Description" style={{ ...styles.textarea, minHeight: '60px', marginBottom: '0.5rem' }} />
            <textarea value={proj.skillsUsed || ''} onChange={e => updateProject(i, 'skillsUsed', e.target.value)} placeholder="Technical Skills Used (e.g. Verilog, Python, UVM)" style={{ ...styles.textarea, minHeight: '60px', marginBottom: '0.5rem' }} />
            <button type="button" onClick={() => removeProject(i)} style={{ ...styles.btnDelete, marginTop: '0.5rem' }}>🗑️ Remove Project</button>
          </div>
        ))}
        <button type="button" onClick={addProject} style={{ ...styles.btnAddItem, fontSize: '0.85rem' }}>+ Add Project</button>
      </div>
    );
  };

  const styles = {
    container: {
      minHeight: '100vh',
      padding: '2rem .5rem',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      fontFamily: 'Inter, Segoe UI, sans-serif',
      transition: 'all 0.4s ease',
    },
    heading: {
      fontSize: '2rem',
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
      padding: '1.5rem',
      boxShadow: 'var(--shadow)',
      transition: 'all 0.4s ease',
      width: '100%',
      margin: '0 auto',
    },
    label: {
      fontSize: '0.85rem',
      fontWeight: 600,
      color: 'var(--text-secondary)',
      display: 'block',
      marginBottom: '0.4rem',
    },
    input: {
      width: '100%',
      padding: '0.7rem 1rem',
      marginBottom: '1rem',
      borderRadius: '10px',
      border: '1px solid var(--border-color)',
      background: 'var(--bg-secondary)',
      color: 'var(--text-primary)',
      fontSize: '0.95rem',
      outline: 'none',
      transition: 'all 0.3s ease',
    },
    select: {
      width: '100%',
      padding: '0.7rem 1rem',
      marginBottom: '1rem',
      borderRadius: '10px',
      border: '1px solid var(--border-color)',
      background: 'var(--bg-secondary)',
      color: 'var(--text-primary)',
      fontSize: '0.95rem',
      outline: 'none',
      cursor: 'pointer',
    },
    textarea: {
      width: '100%',
      padding: '0.7rem 1rem',
      marginBottom: '1rem',
      borderRadius: '10px',
      border: '1px solid var(--border-color)',
      background: 'var(--bg-secondary)',
      color: 'var(--text-primary)',
      fontSize: '0.95rem',
      outline: 'none',
      minHeight: '80px',
      resize: 'vertical',
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
    btnSubmit: {
      background: 'var(--accent)',
      border: 'none',
      color: '#ffffff',
      fontWeight: '700',
      padding: '0.7rem 2rem',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '0.95rem',
      marginRight: '1rem',
      transition: 'all 0.3s ease',
    },
    btnCancel: {
      background: '#ef4444',
      border: 'none',
      color: 'white',
      fontWeight: '700',
      padding: '0.7rem 1.6rem',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '0.95rem',
    },
    btnAddItem: {
      background: 'var(--accent)',
      border: 'none',
      color: '#fff',
      fontWeight: '700',
      padding: '0.5rem 1rem',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '1.1rem',
    },
    tagContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.4rem',
      marginTop: '0.5rem',
    },
    tag: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.3rem',
      background: 'rgba(0, 229, 255, 0.1)',
      border: '1px solid rgba(0, 229, 255, 0.2)',
      color: 'var(--accent)',
      padding: '0.25rem 0.7rem',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: 500,
    },
    tagRemove: {
      background: 'none',
      border: 'none',
      color: '#ef4444',
      cursor: 'pointer',
      fontSize: '1rem',
      padding: '0 2px',
      lineHeight: 1,
    },
    cardContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
      marginTop: '2rem',
      width: '100%',
      margin: '2rem auto 0',
    },
    card: {
      background: 'var(--bg-card)',
      borderRadius: '16px',
      backdropFilter: 'blur(12px)',
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow)',
      padding: '1.25rem',
      transition: 'all 0.4s ease',
    },
    cardTitle: {
      fontSize: '1.2rem',
      fontWeight: '700',
      marginBottom: '0.75rem',
      color: 'var(--accent)',
    },
    cardField: {
      fontSize: '0.85rem',
      marginBottom: '0.4rem',
      color: 'var(--text-secondary)',
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
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '0.85rem',
      fontWeight: '600',
    },
    btnDelete: {
      background: '#ef4444',
      border: 'none',
      color: 'white',
      padding: '0.4rem 1rem',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '0.85rem',
      fontWeight: '600',
    },
    sectionDivider: {
      borderTop: '1px solid var(--border-color)',
      marginTop: '1.5rem',
      paddingTop: '1.5rem',
    },
    sectionTitle: {
      fontSize: '1rem',
      fontWeight: 700,
      color: 'var(--accent)',
      marginBottom: '1rem',
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
          slug: initialValues.slug || '',
          location: initialValues.location || '',
          summary: initialValues.summary || '',
          companyDescription: initialValues.companyDescription || '',
          responsibilities: initialValues.responsibilities || '',
          projects: initialValues.projects || [],
          tools: initialValues.tools || [],
          skills: initialValues.skills || [],
          methodologies: initialValues.methodologies || [],
          clients: initialValues.clients || '',
          achievements: initialValues.achievements || '',
          learnings: initialValues.learnings || '',
          seoTitle: initialValues.seoTitle || '',
          seoDescription: initialValues.seoDescription || '',
          positions: initialValues.positions || [],
        }}
        onSubmit={(values) => {
          const period = formatPeriod(values.startMonth, values.startYear, values.endMonth, values.endYear, values.isPresent);
          const slug = values.slug || generateSlug(values.org);
          const dataToSave = {
            title: values.title,
            org: values.org,
            image: values.image,
            period,
            slug,
            location: values.location,
            summary: values.summary,
            companyDescription: values.companyDescription,
            responsibilities: values.responsibilities,
            projects: values.projects,
            tools: values.tools,
            skills: values.skills,
            methodologies: values.methodologies,
            clients: values.clients,
            achievements: values.achievements,
            learnings: values.learnings,
            seoTitle: values.seoTitle,
            seoDescription: values.seoDescription,
            positions: values.positions,
          };

          onSubmit(dataToSave);
        }}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>

            {/* ===== BASIC INFO ===== */}
            <h6 style={styles.sectionTitle}>📋 Basic Information</h6>

            <label style={styles.label}>Job Title *</label>
            <input name="title" value={values.title} onChange={handleChange} placeholder="e.g. RTL Design Verification Engineer" style={styles.input} required />

            <label style={styles.label}>Organization / Company *</label>
            <input name="org" value={values.org} onChange={handleChange} placeholder="e.g. ABC Semiconductor" style={styles.input} required />

            <div style={styles.rowContainer}>
              <div>
                <label style={styles.label}>Location</label>
                <input name="location" value={values.location} onChange={handleChange} placeholder="e.g. Dhaka, Bangladesh" style={styles.input} />
              </div>
              <div>
                <label style={styles.label}>Logo Image URL</label>
                <input name="image" value={values.image} onChange={handleChange} placeholder="https://..." style={styles.input} />
              </div>
            </div>

            <label style={styles.label}>Short Summary (for cards)</label>
            <textarea name="summary" value={values.summary} onChange={handleChange} placeholder="1-2 line summary visible on the experience card..." style={styles.textarea} rows={2} />

            {/* ===== DATE ===== */}
            <div style={styles.sectionDivider}>
              <h6 style={styles.sectionTitle}>📅 Duration</h6>
            </div>

            <label style={styles.label}>Start Date</label>
            <div style={styles.rowContainer}>
              <select name="startMonth" value={values.startMonth} onChange={handleChange} style={styles.select}>
                {months.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <select name="startYear" value={values.startYear} onChange={handleChange} style={styles.select}>
                {years.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            <label style={styles.label}>End Date</label>
            <div style={{ ...styles.rowContainer, marginBottom: '0.5rem' }}>
              <select name="endMonth" value={values.endMonth} onChange={handleChange} style={styles.select} disabled={values.isPresent}>
                {months.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <select name="endYear" value={values.endYear} onChange={handleChange} style={styles.select} disabled={values.isPresent}>
                {years.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            <div style={styles.checkbox}>
              <input type="checkbox" id="isPresent" name="isPresent" checked={values.isPresent} onChange={handleChange} style={{ cursor: 'pointer', width: '18px', height: '18px' }} />
              <label htmlFor="isPresent" style={{ cursor: 'pointer', marginBottom: 0, fontSize: '0.9rem' }}>Currently working here</label>
            </div>

            {/* ===== DETAILED INFO ===== */}
            <div style={styles.sectionDivider}>
              <h6 style={styles.sectionTitle}>📝 Detailed Information</h6>
            </div>

            <label style={styles.label}>Company Description</label>
            <textarea name="companyDescription" value={values.companyDescription} onChange={handleChange} placeholder="Brief overview of the company..." style={styles.textarea} />

            <PositionInput values={values} name="positions" setFieldValue={setFieldValue} />

            <label style={styles.label}>Responsibilities (Rich Text)</label>
            <div style={{ marginBottom: '1rem' }}>
              <ReactQuill
                value={values.responsibilities}
                onChange={(val) => setFieldValue('responsibilities', val)}
                theme="snow"
                placeholder="Describe your role and responsibilities..."
                style={{ background: 'var(--bg-secondary)', borderRadius: '10px', color: 'var(--text-primary)' }}
              />
            </div>

            <ProjectInput values={values} name="projects" setFieldValue={setFieldValue} />
            <ArrayInput label="Tools & Technologies" values={values} name="tools" setFieldValue={setFieldValue} />
            <ArrayInput label="Technical Skills" values={values} name="skills" setFieldValue={setFieldValue} />
            <ArrayInput label="Verification Methodologies" values={values} name="methodologies" setFieldValue={setFieldValue} />

            <label style={styles.label}>Clients / Stakeholders</label>
            <input name="clients" value={values.clients} onChange={handleChange} placeholder="e.g. Client A, Client B" style={styles.input} />

            <label style={styles.label}>Achievements & Impact</label>
            <textarea name="achievements" value={values.achievements} onChange={handleChange} placeholder="Key achievements during this role..." style={styles.textarea} />

            <label style={styles.label}>Key Learnings</label>
            <textarea name="learnings" value={values.learnings} onChange={handleChange} placeholder="What you learned..." style={styles.textarea} />

            {/* ===== SEO ===== */}
            <div style={styles.sectionDivider}>
              <h6 style={styles.sectionTitle}>🔍 SEO Settings</h6>
            </div>

            <label style={styles.label}>URL Slug (auto-generated if empty)</label>
            <input name="slug" value={values.slug} onChange={handleChange} placeholder={generateSlug(values.org || 'company', values.title || 'role')} style={styles.input} />

            <label style={styles.label}>SEO Title</label>
            <input name="seoTitle" value={values.seoTitle} onChange={handleChange} placeholder="Custom page title for search engines" style={styles.input} />

            <label style={styles.label}>SEO Description</label>
            <textarea name="seoDescription" value={values.seoDescription} onChange={handleChange} placeholder="Custom meta description..." style={{ ...styles.textarea, minHeight: '60px' }} rows={2} />

            {/* ===== ACTIONS ===== */}
            <div style={{ ...styles.btnGroup, marginTop: '1.5rem' }}>
              <button type="submit" style={styles.btnSubmit}>
                {showCancelBtn ? '💾 Save Changes' : '➕ Add Experience'}
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

export default function AdminExperience() {
  const [experiences, setExperiences] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = () => {
    axios.get(process.env.REACT_APP_BACKEND_API + 'Experiences.json')
      .then((res) => {
        const data = res.data;
        if (data) {
          const entries = Object.entries(data).map(([id, value]) => ({ id, ...value }));
          setExperiences(entries);
        } else {
          setExperiences([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching experiences:', err);
      });
  };

  const deleteExperience = (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      axios.delete(`${process.env.REACT_APP_BACKEND_API}Experiences/${id}.json`)
        .then(() => fetchExperiences());
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>💼 Manage Experiences</h2>

      {/* Add / Edit Experience Form */}
      <div style={styles.formCard} id="experience-form-top">
        <h4 className='mb-3' style={{ color: 'var(--text-primary)' }}>
          {editData ? '✏️ Update Experience' : '➕ Add New Experience'}
        </h4>
        <ExperienceForm
          initialValues={editData || {}}
          showCancelBtn={!!editData}
          onCancel={() => setEditData(null)}
          onSubmit={(values) => {
            if (editData) {
              axios.put(`${process.env.REACT_APP_BACKEND_API}Experiences/${editData.id}.json`, values)
                .then(() => {
                  fetchExperiences();
                  setEditData(null);
                })
                .catch((err) => console.error('Error updating:', err));
            } else {
              axios.post(`${process.env.REACT_APP_BACKEND_API}Experiences.json`, values)
                .then(() => {
                  fetchExperiences();
                  setEditData(null);
                })
                .catch((err) => console.error('Error adding experience:', err));
            }
          }}
        />
      </div>

      {/* Experiences List */}
      <h4 className='mt-5 mb-4 text-center' style={{ color: 'var(--text-primary)' }}>📁 Your Experiences</h4>
      <div style={styles.cardContainer}>
        {experiences.length > 0 ? (
          experiences.map((exp, i) => (
            <div key={exp.id} style={styles.card}>
              <h3 style={styles.cardTitle}>{exp.title}</h3>
              <div style={styles.cardField}><strong>Company:</strong> {exp.org}</div>
              <div style={styles.cardField}><strong>Overall Period:</strong> {exp.period}</div>
              {exp.positions && exp.positions.length > 0 && (
                <div style={styles.cardField}>
                  <strong>Timeline:</strong>
                  <ul style={{ margin: '0.2rem 0 0.5rem 1.2rem', padding: 0 }}>
                    {exp.positions.map((p, idx) => (
                      <li key={idx}>
                        {p.title} <span style={{ opacity: 0.7, fontSize: '0.8rem' }}>({p.startDate} - {p.endDate})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {exp.location && <div style={styles.cardField}><strong>Location:</strong> {exp.location}</div>}
              {exp.slug && <div style={styles.cardField}><strong>Slug:</strong> {exp.slug}</div>}
              {exp.summary && <div style={styles.cardField}><strong>Summary:</strong> {exp.summary}</div>}
              {exp.skills && exp.skills.length > 0 && (
                <div style={styles.cardField}>
                  <strong>Skills:</strong>
                  <div style={styles.tagContainer}>
                    {exp.skills.map((s, j) => <span key={j} style={styles.tag}>{s}</span>)}
                  </div>
                </div>
              )}
              <div style={styles.btnGroup}>
                <button onClick={() => {
                  setEditData(exp);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} style={styles.btnEdit}>✏️ Edit</button>
                <button onClick={() => deleteExperience(exp.id)} style={styles.btnDelete}>🗑️ Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', opacity: 0.6 }}>No experiences found.</p>
        )}
      </div>

      <style>{`
        .ql-toolbar.ql-snow {
          border: 1px solid var(--border-color) !important;
          border-radius: 10px 10px 0 0;
          background: var(--bg-tertiary);
        }
        .ql-container.ql-snow {
          border: 1px solid var(--border-color) !important;
          border-radius: 0 0 10px 10px;
          min-height: 120px;
          font-size: 0.95rem;
        }
        .ql-editor {
          color: var(--text-primary) !important;
          min-height: 100px;
        }
        .ql-editor.ql-blank::before {
          color: var(--text-tertiary) !important;
        }
        .ql-snow .ql-stroke {
          stroke: var(--text-secondary) !important;
        }
        .ql-snow .ql-fill {
          fill: var(--text-secondary) !important;
        }
        .ql-snow .ql-picker-label {
          color: var(--text-secondary) !important;
        }
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
