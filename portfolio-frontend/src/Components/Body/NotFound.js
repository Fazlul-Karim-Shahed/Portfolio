import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-wrapper d-flex justify-content-center align-items-center text-white text-center">
      <div className="glass-card p-5">
        <h1 className="display-1 fw-bold glitch">404</h1>
        <h2 className="mb-4">Oops! Page Not Found</h2>
        <p className="mb-4">The page you're looking for doesn't exist or has been moved.</p>
        <button className="btn btn-gradient px-4 py-2" onClick={() => navigate('/')}>
          Take Me Home
        </button>
      </div>

      {/* Custom CSS Styles */}
      <style>{`
        .notfound-wrapper {
          min-height: 100vh;
          background: linear-gradient(-45deg, #0f2027, #203a43, #2c5364, #0f2027);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          padding: 2rem;
        }

        @keyframes gradientShift {
          0% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          backdrop-filter: blur(12px);
          box-shadow: 0 0 40px rgba(0,0,0,0.4);
          max-width: 500px;
          width: 100%;
        }

        .btn-gradient {
          background: linear-gradient(45deg, #ff416c, #ff4b2b);
          border: none;
          border-radius: 30px;
          color: white;
          font-weight: 600;
          box-shadow: 0 0 10px rgba(255, 65, 108, 0.6);
          transition: all 0.3s ease;
        }

        .btn-gradient:hover {
          background: linear-gradient(45deg, #ff4b2b, #ff416c);
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(255, 65, 108, 0.8);
        }

        .glitch {
          position: relative;
          color: white;
          animation: glitch 1s infinite;
        }

        @keyframes glitch {
          0% { text-shadow: 2px 2px #ff00c1, -2px -2px #00fff9; }
          50% { text-shadow: -2px -2px #ff00c1, 2px 2px #00fff9; }
          100% { text-shadow: 2px 2px #ff00c1, -2px -2px #00fff9; }
        }
      `}</style>
    </div>
  );
}
