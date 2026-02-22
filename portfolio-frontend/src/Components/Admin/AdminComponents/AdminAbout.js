import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['blockquote', 'link'],
    [{ 'align': [] }],
    ['clean'],
  ],
};

const quillFormats = [
  'header', 'bold', 'italic', 'underline', 'strike',
  'list', 'bullet', 'blockquote', 'link', 'align',
];

export default function AdminAbout() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_API + 'About.json')
      .then(data => {
        setAbout({ about: data.data.about });
      });
  }, []);

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
      padding: '1.5rem .5rem',
      marginBottom: '2rem',
      transition: 'all 0.4s ease',
    },
    btnContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '1.5rem',
    },
    button: {
      background: 'var(--accent)',
      border: 'none',
      padding: '0.6rem 1.8rem',
      borderRadius: '12px',
      color: '#ffffff',
      fontWeight: '600',
      fontSize: '1rem',
      cursor: 'pointer',
      boxShadow: '0 0 15px var(--accent)',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    buttonHover: {
      boxShadow: '0 0 20px var(--accent)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    currentAbout: {
      background: 'var(--bg-card)',
      padding: '1.5rem',
      borderRadius: '16px',
      boxShadow: 'var(--shadow)',
      border: '1px solid var(--border-color)',
      color: 'var(--text-secondary)',
      fontSize: '1.1rem',
      lineHeight: '1.6',
      textAlign: 'justify',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    gradientText: {
      background: 'linear-gradient(45deg, #00c6ff, #0072ff)',
      WebkitBackgroundClip: 'text',
    },
  };

  const [btnHover, setBtnHover] = useState(false);

  return (
    <div style={styles.container}>
      <h2 className='text-center fw-bold mb-5' style={styles.gradientText}>👤 About Section</h2>

      <div style={styles.card}>
        <h4 className='mb-3'>✏️ Edit</h4>
        <Formik
          enableReinitialize
          initialValues={{
            about: '',
          }}
          onSubmit={val => {
            axios.put(process.env.REACT_APP_BACKEND_API + 'About.json', val)
              .then(() => {
                axios.get(process.env.REACT_APP_BACKEND_API + 'About.json')
                  .then(data => {
                    setAbout({ about: data.data.about });
                  });
              });
          }}
        >
          {({ values, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <div className="admin-quill-editor">
                <ReactQuill
                  theme="snow"
                  value={values.about}
                  onChange={(content) => setFieldValue('about', content)}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Write something about yourself..."
                />
              </div>

              <div style={styles.btnContainer}>
                <button
                  type="submit"
                  style={{
                    ...styles.button,
                    ...(btnHover ? styles.buttonHover : {}),
                    opacity: !values.about || values.about.replace(/<[^>]*>/g, '').trim() === '' ? 0.5 : 1,
                    cursor: !values.about || values.about.replace(/<[^>]*>/g, '').trim() === '' ? 'not-allowed' : 'pointer',
                  }}
                  onMouseEnter={() => setBtnHover(true)}
                  onMouseLeave={() => setBtnHover(false)}
                  disabled={!values.about || values.about.replace(/<[^>]*>/g, '').trim() === ''}
                >
                  💾 Update
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>

      <div style={styles.currentAbout}>
        <h5 style={{ marginBottom: '1rem', fontWeight: '600', color: '#00c6ff' }}>Current About Content:</h5>
        {about === null
          ? <span style={{ color: 'rgba(255,255,255,0.5)' }}>Loading...</span>
          : <div dangerouslySetInnerHTML={{ __html: about.about }} />}
      </div>

      <style>{`
        .admin-quill-editor .ql-toolbar {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 12px 12px 0 0;
        }
        .admin-quill-editor .ql-toolbar .ql-stroke {
          stroke: var(--text-secondary);
        }
        .admin-quill-editor .ql-toolbar .ql-fill {
          fill: var(--text-secondary);
        }
        .admin-quill-editor .ql-toolbar .ql-picker-label {
          color: var(--text-secondary);
        }
        .admin-quill-editor .ql-toolbar button:hover .ql-stroke,
        .admin-quill-editor .ql-toolbar .ql-picker-label:hover .ql-stroke {
          stroke: var(--accent);
        }
        .admin-quill-editor .ql-toolbar button:hover .ql-fill,
        .admin-quill-editor .ql-toolbar .ql-picker-label:hover .ql-fill {
          fill: var(--accent);
        }
        .admin-quill-editor .ql-toolbar button.ql-active .ql-stroke {
          stroke: var(--accent);
        }
        .admin-quill-editor .ql-toolbar button.ql-active .ql-fill {
          fill: var(--accent);
        }
        .admin-quill-editor .ql-container {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-top: none;
          border-radius: 0 0 12px 12px;
          min-height: 200px;
          font-size: 1rem;
          color: var(--text-primary);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .admin-quill-editor .ql-editor {
          min-height: 200px;
          color: var(--text-primary);
        }
        .admin-quill-editor .ql-editor.ql-blank::before {
          color: var(--text-secondary);
          opacity: 0.5;
          font-style: italic;
        }
        .admin-quill-editor .ql-snow .ql-picker-options {
          background: var(--bg-card);
          border-color: var(--border-color);
        }
        .admin-quill-editor .ql-snow .ql-picker-item {
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
}
