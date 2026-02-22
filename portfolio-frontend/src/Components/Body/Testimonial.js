import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'
import { Card, CardBody } from 'reactstrap'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import axios from 'axios'
import Reveal from '../Reveal'

export default function Testimonial() {
  const [allTestimonial, setAllTestimonial] = useState(null)
  const size = window.innerWidth

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_API + 'feedback.json')
      .then((res) => {
        const data = res.data
        if (Array.isArray(data)) {
          setAllTestimonial(data.filter(item => item && item.approved === true))
        } else if (typeof data === 'object' && data !== null) {
          setAllTestimonial(Object.values(data).filter(item => item && item.approved === true))
        } else {
          console.error("Unexpected response format:", data)
          setAllTestimonial([])
        }
      })
      .catch((err) => {
        alert(err.message)
        setAllTestimonial([])
      })
  }, [])

  const testimonialShow = allTestimonial && allTestimonial.map((item, i) => (
    <SwiperSlide key={item.name + i}>
      <div className="h-50">
        <Card className="testimonial-glossy-card text-center p-4 h-100 d-flex flex-column align-items-center justify-content-start w-100">
          <img
            src="/Assets/unknown.png"
            alt="User"
            className="img-fluid rounded-circle border border-3 border-warning mb-3"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
          <h4 className="text-white">{item.name}</h4>
          <p className="fst-italic text-white-50 px-3 mt-2 flex-grow-1" style={{ minHeight: '80px' }}>
            "{item.description}"
          </p>
          <h6 className="text-warning fw-bold mt-auto pt-3">{item.designation}</h6>
        </Card>
      </div>
    </SwiperSlide>
  ))

  return (
    <div className="glossy-bg py-5">
      <div className="container" id="testimonial">
        <Reveal effect="fade-up">
          <div className="text-center">
            <h1 className="fw-bold text-white">Testimonial</h1>
            <p className="section-subtitle">Who With Me</p>
          </div>
        </Reveal>

        {allTestimonial === null ? (
          <p className="text-danger text-center my-5">Check internet connection!</p>
        ) : (
          <Reveal effect="zoom">
            <Swiper
              slidesPerView={size > 766 ? 3 : 1}
              spaceBetween={30}
              slidesPerGroup={size > 766 ? 3 : 1}
              loop={true}
              loopFillGroupWithBlank={true}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper p-5"
            >
              {testimonialShow}
            </Swiper>
          </Reveal>
        )}

        <style>{`
          .glossy-bg {
            background: #0f2027;
            color: #fff;
          }

          .testimonial-glossy-card {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 1.5rem;
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            min-height: 360px; /* Ensures consistent height */
            display: flex;
            flex-direction: column;
          }

          .testimonial-glossy-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 0 30px rgba(253, 201, 55, 0.7);
          }

          .testimonial-glossy-card:hover h4 {
            color: #fdc937;
          }

          .testimonial-glossy-card:hover p {
            color: #ffffff;
          }
        `}</style>
      </div>
    </div>
  )
}
