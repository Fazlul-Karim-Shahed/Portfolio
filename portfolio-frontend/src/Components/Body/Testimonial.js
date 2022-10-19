import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { Card, CardBody } from 'reactstrap';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './BodyStyles/Testimonial.css'

export default function Testimonial() {

    let size = window.innerWidth
    console.log(size);

    return (
        <div className='container'>
            <div className="py-5">
                <div className='text-center py-3'>
                    <h1 className='fw-bold'>Testimonial</h1>
                    <div className=''>
                        <div className='fw-bold'>---------- <span className='text-danger'>Who with me</span> ----------</div>
                    </div>
                </div>
            </div>

            <Swiper
                slidesPerView={size > 766 ? 3 : 1}
                spaceBetween={-10}
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
                <SwiperSlide>
                    <div className='p-5'>
                        <Card className='py-5 px-4 testimonial_card'>
                            <CardBody className='text-center testimonial_card_body'>
                                <FontAwesomeIcon className='h1' icon={faCode} />
                                <h3 className='py-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. </h3>
                            </CardBody>
                        </Card>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='p-5'>
                        <Card className='py-5 px-4 testimonial_card'>
                            <CardBody className='text-center testimonial_card_body'>
                                <FontAwesomeIcon className='h1' icon={faCode} />
                                <h3 className='py-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. </h3>
                            </CardBody>
                        </Card>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='p-5'>
                        <Card className='py-5 px-4 testimonial_card'>
                            <CardBody className='text-center testimonial_card_body'>
                                <FontAwesomeIcon className='h1' icon={faCode} />
                                <h3 className='py-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. </h3>
                            </CardBody>
                        </Card>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='p-5'>
                        <Card className='py-5 px-4 testimonial_card'>
                            <CardBody className='text-center testimonial_card_body'>
                                <FontAwesomeIcon className='h1' icon={faCode} />
                                <h3 className='py-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. </h3>
                            </CardBody>
                        </Card>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='p-5'>
                        <Card className='py-5 px-4 testimonial_card'>
                            <CardBody className='text-center testimonial_card_body'>
                                <FontAwesomeIcon className='h1' icon={faCode} />
                                <h3 className='py-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. </h3>
                            </CardBody>
                        </Card>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='p-5'>
                        <Card className='py-5 px-4 testimonial_card'>
                            <CardBody className='text-center testimonial_card_body'>
                                <FontAwesomeIcon className='h1' icon={faCode} />
                                <h3 className='py-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. </h3>
                            </CardBody>
                        </Card>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}


