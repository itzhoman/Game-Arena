import { Canvas } from '@react-three/fiber';
import ParticlesBackground from './ParticlesBackground';
import Master from '../assets/Master.png';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const MasterArtGaming = () => {
    gsap.registerPlugin(ScrollTrigger);

    const buttonsRef = useRef(null);
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

        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top center",
            onEnter: () => {
                gsap.to(title.querySelectorAll('span'), {
                    opacity: 1,
                    duration: 0.1,
                    stagger: 0.05,
                    ease: 'power2.out',
                    color: '#7e22ce',
                });
                const buttons = buttonsRef.current;
                gsap.fromTo(buttons,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        delay: 1.5,
                        ease: 'power2.out'
                    }
                );
                const gradientText = title.querySelector('.bg-gradient-to-r');
                if (gradientText) {
                    gsap.to(gradientText, {
                        backgroundImage: 'linear-gradient(45deg, var(--color-primary), var(--color-secondary), var(--color-primary))',
                        backgroundSize: '200% 100%',
                        duration: 3,
                        repeat: -1,
                        ease: 'none',
                        backgroundPosition: ['0% 50%', '200% 50%']
                    });
                }
            }
        });

        ScrollTrigger.refresh();
    }, []);

    useEffect(() => {

    }, []);

    return (
        <div className='w-full  bg-gradient-background overflow-hidden relative'>
            {/* Three.js Canvas Background */}
            <div className='absolute top-0 left-0 w-full h-full z-0'>
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <ParticlesBackground />
                </Canvas>
            </div>

            {/* Content Section */}
            <div
                ref={sectionRef}
                className='w-full flex flex-col lg:flex-row items-center justify-between gap-12 p-6 lg:p-16 relative z-10 my-10'
            >
                {/* Image Section */}
                <img
                    className='w-[90%] max-w-[500px] lg:w-1/2'
                    src={Master}
                    alt="Gaming Master"
                />

                {/* Text Section */}
                <motion.div className='flex flex-col items-center lg:items-start gap-6 text-[#d1d5db] max-w-[700px]'>
                    <h1 ref={titleRef} className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-center lg:text-left'>
                        Elevate Your Gaming Supremacy
                    </h1>
                    <p className='text-base md:text-lg lg:text-xl font-medium text-center lg:text-left'>
                        Unlock the Secrets of Gaming Mastery. Discover the ultimate gaming solutions at our premier gaming shop.
                        Explore the latest hardware, accessories, and cutting-edge technology to elevate your experience.
                        Immerse yourself in the ultimate gaming adventure with our curated selection of premium equipment—
                        from the newest consoles and controllers to high-performance gear.
                    </p>
                    <div ref={buttonsRef}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='bg-gradient-primary duration-500 w-[150px] p-3 font-extrabold tracking-widest 
                            rounded-full shadow-lg hover:shadow-xl mt-4 text-center' 
                        >
                            Explore More
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>

    );
};

export default MasterArtGaming;
