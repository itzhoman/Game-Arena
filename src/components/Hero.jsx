import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas } from '@react-three/fiber'
import HeroImage from '../assets/HeroImage.png'
import ParticlesBackground from './ParticlesBackground'
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const titleRef = useRef(null)
    const descriptionRef = useRef(null)
    const buttonsRef = useRef(null)
    const imageRef = useRef(null)

    useEffect(() => {
        const title = titleRef.current
        const chars = title.textContent.split('')
        title.textContent = ''
        chars.forEach((char, i) => {
            const span = document.createElement('span')
            span.textContent = char
            span.style.opacity = '0'
            title.appendChild(span)

            gsap.to(span, {
                opacity: 1,
                duration: 0.1,
                delay: i * 0.05,
                ease: 'power2.out',
                color: '#ec4899',
            })
        })

        const gradientText = title.querySelector('.bg-gradient-to-r')
        gsap.to(gradientText, {
            backgroundImage: 'linear-gradient(45deg, var(--color-primary), var(--color-secondary), var(--color-primary))',
            backgroundSize: '200% 100%',
            duration: 3,
            repeat: -1,
            ease: 'none',
            backgroundPosition: ['0% 50%', '200% 50%']
        })

        gsap.fromTo(descriptionRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 1,
                ease: 'power3.out'
            }
        )

        const buttons = buttonsRef.current.children
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

        gsap.to(imageRef.current, {
            y: '20px',
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        })

        const blobs = document.querySelectorAll('.animate-blob')
        blobs.forEach((blob, index) => {
            gsap.to(blob, {
                scale: 1.2,
                duration: 3,
                repeat: -1,
                yoyo: true,
                delay: index * 0.5,
                ease: 'power1.inOut'
            })
        })
    }, [])

    return (
        <div className='flex flex-col lg:flex-row justify-between items-center w-full  bg-gradient-background 
        text-[var(--color-text-primary)] relative overflow-hidden px-4 md:px-12 py-16'>
            {/* Three.js Canvas Background */}
            <div className='absolute top-0 left-0 w-full h-full'>
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <ParticlesBackground />
                </Canvas>
            </div>

            {/* Background decorative elements */}
            <div className='absolute top-0 left-0 w-full h-full'>
                <div className='absolute top-20 left-10 w-52 h-52 md:w-72 md:h-72 bg-[var(--color-primary)] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob'></div>
                <div className='absolute top-40 right-10 w-52 h-52 md:w-72 md:h-72 bg-[var(--color-primary)] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000'></div>
                <div className='absolute bottom-20 left-20 w-52 h-52 md:w-72 md:h-72 bg-[var(--color-secondary)] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000'></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className='w-full lg:w-1/2 relative z-10 max-w-[600px]'
            >
                <h1 ref={titleRef} className='text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide leading-tight'>
                    The New <span className='bg-pink-800 inline-block'>Immersive Gaming</span> Experience
                </h1>
                <p ref={descriptionRef} className='mt-6 text-base sm:text-lg md:text-xl font-medium text-[var(--color-text-muted)] leading-relaxed opacity-0'>
                    Welcome to our gaming shop, where the latest and greatest gaming hardware 
                    and accessories come together to create an unparalleled gaming experience.
                    Level up your game with premium gear.
                </p>
                <div ref={buttonsRef} className='flex flex-col sm:flex-row gap-4 mt-8'>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='bg-gradient-primary
                        duration-500 w-full sm:w-[150px] p-3 tracking-widest rounded-full font-semibold shadow-lg hover:shadow-xl opacity-0'
                    >
                        Buy Now
                    </motion.button>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='border-2 border-[var(--color-text-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)]
                        duration-500 w-full sm:w-[150px] p-3 tracking-widest rounded-full font-semibold opacity-0'
                    >
                        Learn More
                    </motion.button>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className='relative z-10 w-full lg:w-1/2 mt-12 lg:mt-0 flex justify-center'
            >
                <div className='relative'>
                    <div className='absolute -inset-4 bg-gradient-primary rounded-full blur opacity-30'></div>
                    <img 
                        ref={imageRef}
                        src={HeroImage} 
                        alt="Gaming Setup" 
                        className='relative w-full max-w-[500px] h-auto object-contain'
                    />
                </div>
            </motion.div>
        </div>
    )
}

export default Hero
