import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminLinks() {
    const [projects, setProjects] = useState(null);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = () => {
        axios.get(process.env.REACT_APP_BACKEND_API + 'Links.json')
            .then(res => setProjects(res.data));
    };

    const del = (id) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_API}Links/${id}.json`)
            .then(fetchProjects);
    };

    const startEdit = (id) => {
        setEditId(id);
    };

    const cancelEdit = () => {
        setEditId(null);
    };

    const styles = {
        container: {
            background: 'var(--bg-primary)',
            minHeight: '100vh',
            color: 'var(--text-primary)',
            fontFamily: 'Segoe UI, sans-serif',
            padding: '2rem 1rem',
            overflowX: 'hidden',
            transition: 'all 0.4s ease',
        },
        glassCard: {
            background: 'var(--bg-card)',
            borderRadius: '16px',
            backdropFilter: 'blur(10px)',
            boxShadow: 'var(--shadow)',
            border: '1px solid var(--border-color)',
            padding: '1.5rem .5rem',
            color: 'var(--text-primary)',
            transition: 'all 0.3s ease-in-out',
        },
        gradientText: {
            color: 'var(--accent)',
        },
        button: {
            marginRight: '0.5rem',
        },
        input: {
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            backdropFilter: 'blur(4px)',
            borderRadius: '8px',
            padding: '0.5rem',
        }
    };

    return (
        <div style={styles.container}>
            <div className=""> {/* ✅ Responsive wrapper */}
                <h2 className='text-center fw-bold mb-5' style={styles.gradientText}>🌟 Manage Projects</h2>

                {/* Add new project */}
                <div style={styles.glassCard} className='mb-5'>
                    <h4 className='mb-3'>➕ Add New Project</h4>
                    <Formik
                        initialValues={{
                            name: '', sourceCode: '', liveLink: '', category: '',
                            image: '', description: '', readmore: ''
                        }}
                        onSubmit={(val, { resetForm }) => {
                            axios.post(process.env.REACT_APP_BACKEND_API + 'Links.json', val)
                                .then(() => {
                                    fetchProjects();
                                    resetForm();
                                });
                        }}
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    {['name', 'category', 'image', 'readmore', 'sourceCode', 'liveLink'].map((field) => (
                                        <div key={field} className="col-md-6">
                                            <input
                                                type="text"
                                                name={field}
                                                value={values[field]}
                                                onChange={handleChange}
                                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                                className='form-control'
                                                style={styles.input}
                                            />
                                        </div>
                                    ))}
                                    <div className="col-12">
                                        <textarea
                                            name='description'
                                            value={values.description}
                                            onChange={handleChange}
                                            placeholder='Description'
                                            className='form-control'
                                            rows="3"
                                            style={styles.input}
                                        />
                                    </div>
                                    <div className="col-12 text-end">
                                        <button className='btn btn-outline-primary px-4' type="submit">
                                            ☑️ Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>

                {/* Project list */}
                <h4 className='mb-4'>📁 Your Projects</h4>
                <div className="row">
                    {projects &&
                        Object.entries(projects).map(([id, item]) => (
                            <div key={id} className='col-sm-12 col-md-6 col-lg-4 mb-4'>
                                <div style={styles.glassCard}>
                                    {editId === id ? (
                                        <Formik
                                            initialValues={item}
                                            onSubmit={(val) => {
                                                axios.put(`${process.env.REACT_APP_BACKEND_API}Links/${id}.json`, val)
                                                    .then(() => {
                                                        fetchProjects();
                                                        setEditId(null);
                                                    });
                                            }}
                                        >
                                            {({ values, handleChange, handleSubmit }) => (
                                                <form onSubmit={handleSubmit}>
                                                    <input className="form-control my-2" style={styles.input} name="name" value={values.name} onChange={handleChange} />
                                                    <input className="form-control my-2" style={styles.input} name="category" value={values.category} onChange={handleChange} />
                                                    <input className="form-control my-2" style={styles.input} name="sourceCode" value={values.sourceCode} onChange={handleChange} />
                                                    <input className="form-control my-2" style={styles.input} name="liveLink" value={values.liveLink} onChange={handleChange} />
                                                    <input className="form-control my-2" style={styles.input} name="readmore" value={values.readmore} onChange={handleChange} />
                                                    <textarea className="form-control my-2" style={styles.input} name="description" value={values.description} onChange={handleChange} />
                                                    <div className='d-flex justify-content-end mt-2'>
                                                        <button type='submit' className='btn btn-success btn-sm' style={styles.button}><i className="fas fa-check me-1"></i>Save</button>
                                                        <button type='button' className='btn btn-secondary btn-sm' onClick={cancelEdit}><i className="fas fa-times me-1"></i>Cancel</button>
                                                    </div>
                                                </form>
                                            )}
                                        </Formik>
                                    ) : (
                                        <>
                                            <h5 className='fw-bold'>{item.name}</h5>
                                            <p className='small text-light'>{item.description}</p>
                                            <p className="mb-1"><i className="fas fa-code"></i> <strong>Code:</strong> <a href={item.sourceCode} className="text-warning" target='_blank' rel='noopener noreferrer'>{item.sourceCode}</a></p>
                                            <p className="mb-1"><i className="fas fa-link"></i> <strong>Live:</strong> <a href={`https://${item.liveLink}`} className="text-info" target='_blank' rel='noopener noreferrer'>{item.liveLink}</a></p>
                                            <div className="mt-3 d-flex justify-content-between">
                                                <button onClick={() => startEdit(id)} className='btn btn-outline-info btn-sm'>
                                                    <i className="fas fa-pen me-1"></i> Edit
                                                </button>
                                                <button onClick={() => del(id)} className='btn btn-outline-danger btn-sm'>
                                                    <i className="fas fa-trash me-1"></i> Delete
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
