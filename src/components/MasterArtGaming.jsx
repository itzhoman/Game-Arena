import { Canvas } from '@react-three/fiber';
import ParticlesBackground from './ParticlesBackground';
import Master from '../assets/Master.png'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const MasterArtGaming = () => {

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


    useEffect(() => {
        // Animate buttons
        const buttons = buttonsRef.current
        gsap.fromTo(buttons,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 1.5,
                stagger: 0.2,
                ease: 'power2.out'
            }
        )
    }, [buttonsRef])


    return (
        <div className='w-full h-full bg-gradient-background overflow-hidden relative '>
            {/* Three.js Canvas Background */}
            <div className='absolute top-0 left-0 w-full h-full z-0'>
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <ParticlesBackground />
                </Canvas>
            </div>
            <div className='w-full h-[800ox] flex items-center justify-between mt-22 gap-12  p-6'>
                {/* Image section */}
                <img
                    className='w-1/2 mx-auto'
                    src={Master}
                    alt=""
                />
                {/* Text Section */}
                <motion.div className='flex flex-col items-center gap-10 text-[#d1d5db] '>
                    <h1 ref={titleRef} className='text-3xl font-extrabold '>
                        Elevate Your Gaming Supremacy
                    </h1>
                    <p className='text-xl font-bold w-[600px]'>
                        Unlock the Secrets of Gaming Mastery
                        Discover the ultimate gaming solutions at our premier gaming shop.
                        Explore the latest hardware, accessories,
                        and cutting-edge technology to elevate your experience.
                        Immerse yourself in the ultimate gaming adventure with our curated selection of
                        premium equipment—from the newest consoles and controllers to high-performance gear.
                    </p>
                    <div ref={buttonsRef}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='bg-gradient-primary duration-500 w-[150px] p-3 font-extrabold
                        tracking-widest rounded-full  shadow-lg hover:shadow-xl opacity-'
                        >
                            Explore More
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default MasterArtGaming
