import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { Card, CardBody } from 'reactstrap';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './BodyStyles/Testimonial.css'
import axios from 'axios';
import Fade from 'react-reveal/Fade';

export default function Testimonial() {

    const [allTestimonial, setAllTestimonial] = useState(null)
    let size = window.innerWidth

    useEffect(() => {

        axios.get(process.env.REACT_APP_BACKEND_API + 'feedback.json').then(data => {
            setAllTestimonial(data.data)
        }).catch(err => {
            alert(err.message)
        })

    }, [])

    let testimonialShow = []
    if (allTestimonial != null) {
        for (let i in allTestimonial) {
            testimonialShow.push(
                <SwiperSlide>
                    <div className='p-5'>
                        <Card className='p-1 testimonial_card'>
                            <CardBody className='text-center testimonial_card_body'>
                                <img src="/Assets/unknown.png" alt="" className='img-fluid w-50 m-auto' />
                                <h2 className='py-3'>{allTestimonial[i].name}</h2>
                                <h6 className='py-0 small'>{allTestimonial[i].description}</h6>
                                <h6 className='py-3 fst-italic fw-bold'>{allTestimonial[i].designation}</h6>
                            </CardBody>
                        </Card>
                    </div>
                </SwiperSlide>
            )
        }
    }

    return (
        <div className='container' id='testimonial'>
            <div className="">
                <Fade top>
                    <div className='text-center py-3 mt-5'>
                        <h1 className='fw-bold'>Testimonial</h1>
                        <div className=''>
                            <div className='fw-bold'>---------- <span className='text-danger'>Who with me</span> ----------</div>
                        </div>
                    </div>
                </Fade>
            </div>

            {allTestimonial === null ? <p className='text-danger text-center my-5'>Check internet connection!</p> : 
            
                <Fade bottom>
                    <Swiper
                        slidesPerView={size > 766 ? 3 : 1}
                        spaceBetween={-30}
                        slidesPerGroup={size > 766 ? 3 : 1}
                        loop={true}
                        loopFillGroupWithBlank={true}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                    >

                        {testimonialShow}

                    </Swiper>
                </Fade>
            }
        </div>
    )
}


