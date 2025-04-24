import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Canvas } from '@react-three/fiber';
import ParticlesBackground from './ParticlesBackground';
import { TrendProducts } from '../data';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TrendProductsComponent = () => {
    const titleRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const title = titleRef.current;
        const chars = title.textContent.split('');
        title.textContent = '';
        chars.forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            title.appendChild(span);
        });

        // Create ScrollTrigger animation
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top center",
            onEnter: () => {
                // Animate each character
                gsap.to(title.querySelectorAll('span'), {
                    opacity: 1,
                    duration: 0.1,
                    stagger: 0.05,
                    ease: 'power2.out',
                    color: '#7e22ce',
                });

                // Animate gradient
                const gradientText = title.querySelector('.bg-gradient-to-r');
                gsap.to(gradientText, {
                    backgroundImage: 'linear-gradient(45deg, var(--color-primary), var(--color-secondary), var(--color-primary))',
                    backgroundSize: '200% 100%',
                    duration: 3,
                    repeat: -1,
                    ease: 'none',
                    backgroundPosition: ['0% 50%', '200% 50%']
                });
            }
        });
    }, []);

    return (
        <div ref={sectionRef} className='w-full h-full bg-gradient-background overflow-hidden relative '>
            {/* Three.js Canvas Background */}
            <div className='absolute top-0 left-0 w-full h-full z-0'>
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <ParticlesBackground />
                </Canvas>
            </div>
            <h2 ref={titleRef} className='text-5xl lg:text-6xl font-bold text-center mb-6 lg:mb-8 mt-14 bg-clip-text text-transparent 
             bg-gradient-to-r mx-auto px-4 lg:px-8 z-10 from-indigo-500 to-purple-500'>
                Hot  Pc&apos;s with a Cool Vibe  <span className='text-white'> 🔥❄️ </span>
            </h2>
            {/* Swiper Content */}
            <div className='relative flex items-center justify-center mt-12 z-10'>
                <Swiper
                    modules={[Pagination, Autoplay]}
                    autoplay={{
                        delay: 6000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    style={{
                        width: '600px'
                    }}
                >
                    {TrendProducts.map((product) => (
                        <SwiperSlide
                            key={product.img}
                            className='!bg-transparent flex items-center justify-center p-'
                        >
                            <div className='rounded-xl'>
                                <img
                                    style={{
                                        width: '550'
                                    }}
                                    src={product.img}
                                    alt="Trending product"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default TrendProductsComponent;
