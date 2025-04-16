import React from 'react'
import { Navigation, Pagination,Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { navigation } from '../data';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Canvas } from '@react-three/fiber'
import ParticlesBackground from './ParticlesBackground'

const TrendProducts = () => {
    return (
        <div className='relative w-full h-[550px] bg-gradient-background overflow-hidden'>
            {/* Three.js Canvas Background */}
            <div className='absolute top-0 left-0 w-full h-full'>
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <ParticlesBackground />
                </Canvas>
            </div>

            {/* Content */}
            <div className='relative z-10 h-full flex items-center justify-center'>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    autoplay={{
                        delay : 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    className='w-full max-w-4xl'
                >
                    <SwiperSlide className='flex items-center justify-center'>
                        <div className='text-black text-2xl'>Slide 1</div>
                    </SwiperSlide>
                    <SwiperSlide className='flex items-center justify-center'>
                        <div className='text- text-2xl'>Slide 2</div>
                    </SwiperSlide>
                    <SwiperSlide className='flex items-center justify-center'>
                        <div className='text- text-2xl'>Slide 3</div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default TrendProducts
