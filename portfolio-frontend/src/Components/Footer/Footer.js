import React from 'react'
import Reveal from '../Reveal'

export default function Footer() {
  return (
    <div className='glossy-bg' id=''>
      <div className="footer-glossy text-white text-center py-3">
        <Reveal effect="fade-up">
          <div className="mb-1 footer-author">
            Created by{' '}
            <a
              className="text-warning text-decoration-none d-inline-flex align-items-center"
              href="https://www.linkedin.com/in/fazlul-karim-a2650b1a9/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fazlul Karim
            </a>
          </div>

          <div className="footer-copy text-white-50 small">
            &copy; {new Date().getFullYear()}. All rights reserved.
          </div>
        </Reveal>

        <style>{`
          #footer {
            background: linear-gradient(135deg, rgba(253, 201, 55, 0.15), rgba(253, 201, 55, 0.05));
          }

          .footer-glossy {
            background: rgba(255, 255, 255, 0.01);
            border-top: 3px solid rgba(253, 201, 55, 0.6);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            box-shadow: 0 8px 32px rgba(253, 201, 55, 0.3);
            border-radius: 15px 15px 0 0;
            margin: 0 auto;
          }

          .footer-link {
            font-weight: 600;
            font-size: 1.15rem;
            transition: all 0.35s ease;
          }

          .footer-link:hover {
            color: #ffdd57;
            text-shadow:
              0 0 8px #ffdd57,
              0 0 15px #ffdd57,
              0 0 25px #ffdd57;
            transform: scale(1.05);
          }

          .footer-author {
            font-weight: 600;
            font-size: 1.25rem;
          }

          .footer-copy {
            font-size: 1rem;
            margin-top: 0.5rem;
            font-style: italic;
          }

          /* LinkedIn icon style */
          .footer-link svg {
            transition: transform 0.35s ease;
            color: #fdc937;
          }
          .footer-link:hover svg {
            transform: translateX(4px);
            color: #ffdd57;
          }

          @media (max-width: 576px) {
            .footer-author {
              font-size: 1.1rem;
            }

            .footer-copy {
              font-size: 0.9rem;
            }
          }
        `}</style>
      </div>
    </div>
  )
}
