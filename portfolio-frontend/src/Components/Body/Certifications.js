import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import Reveal from '../Reveal';

export default function Certifications() {
  const [certifications, setCertifications] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_API + 'Certifications.json')
      .then(res => setCertifications(res.data));
  }, []);

  const toggle = () => setShowMore(!showMore);

  let certificationsArr = [];
  if (certifications != null) {
    for (let i in certifications) {
      certificationsArr.push(
        <Reveal effect="zoom" key={certifications[i].name} className="col-lg-3 col-sm-12 col-md-6 px-3 mb-4">
          <Card className="certification-glossy-box h-100 d-flex flex-column w-100">
            <CardBody>
              <CardTitle tag="h6">{certifications[i].name}</CardTitle>
              <CardSubtitle className="mt-2 text-white-50 small" tag="h6">
                {certifications[i].organization}
              </CardSubtitle>
            </CardBody>

            <img
              alt="Organization Logo"
              width="100%"
              height="200px"
              src={certifications[i].organizationLogoLink}
              style={{ objectFit: 'cover' }}
            />

            <CardBody className="flex-grow-1 d-flex flex-column">
              <CardText className="mb-3 small">{certifications[i].description}</CardText>
              <a
                className="btn btn-outline-info mt-auto w-100 text-center"
                target="_blank"
                rel="noopener noreferrer"
                href={certifications[i].pdfLink}
              >
                View details
              </a>
            </CardBody>
          </Card>
        </Reveal>
      );
    }
  }

  return (
    <div>
      <div className="row">
        {!showMore ? certificationsArr.slice(0, 4) : certificationsArr}
      </div>
      <div className="text-center">
        <button onClick={toggle} className="btn btn-primary mt-5">
          {showMore ? 'Show less' : 'Show more'}
        </button>
      </div>

      {/* Inline CSS for glossy hover effect */}
      <style>{`
        .certification-glossy-box {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 1rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          color: #fff;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }
        .certification-glossy-box:hover {
          transform: translateY(-10px);
          box-shadow: 0 0 30px rgba(13, 110, 253, 0.3);
        }
        .certification-glossy-box:hover h6 {
          color: #fdc937;
          transition: color 0.3s ease;
        }
        .certification-glossy-box:hover .btn-outline-info {
          border-color: #fdc937;
          color: #fff;
          background-color: transparent;
          box-shadow: 0 0 10px rgba(253, 201, 55, 0.5);
          transition: color 0.3s ease, border-color 0.3s ease;
        }
      `}</style>
    </div>
  );
}
