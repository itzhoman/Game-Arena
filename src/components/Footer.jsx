import { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaEnvelope, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Canvas } from '@react-three/fiber'
import ParticlesBackground from './ParticlesBackground'

export const quickLinks = [
    { key: 'home', label: 'Home', url: '#' },
    { key: 'about', label: 'About Us', url: '#' },
    { key: 'shop', label: 'Shop', url: '#' },
    { key: 'sale', label: 'Sale', url: '#' },
];

export const exploreMore = [
    { key: 'contact', label: 'Contact Us', url: '#' },
    { key: 'returns', label: 'Returns', url: '#' },
    { key: 'policy', label: 'Privacy Policy', url: '#' },
    { key: 'faq', label: 'FAQs', url: '#' },
];

export const socialLinks = [
    { key: 'linkedin', label: 'LinkedIn', url: '#', icon: <FaLinkedin className="text-2xl" /> },
    { key: 'twitter', label: 'Twitter', url: '#', icon: <FaTwitter className="text-2xl" /> },
    { key: 'instagram', label: 'Instagram', url: '#', icon: <FaInstagram className="text-2xl" /> },
    { key: 'email', label: 'Email', url: '#', icon: <FaEnvelope className="text-2xl" /> },
];

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);

    useEffect(() => {
        const footer = footerRef.current;
        gsap.fromTo(
            footer,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: footer,
                    start: 'top 90%',
                    end: 'top 70%',
                    once: true,
                },
            }
        );
    }, [])

    return (
        <div ref={footerRef} className='w-full flex flex-col justify-center relative items-center 
        bg-gradient-background text-[var(--color-text-primary)] overflow-hidden'>
           
           {/* Three.js Canvas Background with pointer-events-none */}
           <div className='absolute top-0 left-0 w-full h-full pointer-events-none'>
               <Canvas camera={{ position: [0, 0, 1] }}>
                   <ParticlesBackground />
               </Canvas>
           </div>

            <div className='container mx-auto grid grid-cols-1 sm:grid-cols-4 gap-10 mt-25 relative z-10'>
                {/* Brand Section */}
                <div className='sm:col-span-1 flex flex-col items-center sm:items-start'>
                    <div className='mb-4 text-xl font-extrabold tracking-widest hover:text-[#ec4899] ransition-colors duration-300'>
                        <a href="https://www.linkedin.com/in/itzhoman">Homan Hajimohamadi</a>
                    </div>
                    <p className='font-bold text-lg'>&copy; 2025 Game Arena</p>
                    <p className='font-bold text-lg'>All rights reserved.</p>
                </div>

                {/* Quick Links Section */}
                <div className='sm:col-span-1 text-center sm:text-left'>
                    <h3 className='font-extrabold text-xl mb-4'>Quick Links</h3>
                    <ul>
                        {quickLinks.map((link) => (
                            <li key={link.key} className='mb-2'>
                                <a href={link.url} className='font-bold text-lg hover:text-[#ec4899]  transition-colors duration-300'>
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Explore More Section */}
                <div className='sm:col-span-1 text-center sm:text-left'>
                    <h3 className='font-extrabold text-xl mb-4'>Explore More</h3>
                    <ul>
                        {exploreMore.map((link) => (
                            <li key={link.key} className='mb-2'>
                                <a href={link.url} className='font-bold text-lg hover:text-[#ec4899]  transition-colors duration-300'>
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social Links Section */}
                <div className='sm:col-span-1 text-center sm:text-left '>
                    <h3 className='font-extrabold text-xl mb-4'>Connect With Us</h3>
                    <ul className='flex flex-col items-center sm:items-start gap-3'>
                        {socialLinks.map((link) => (
                            <li key={link.key}>
                                <a href={link.url} className='flex items-center gap-3 font-bold text-lg hover:hover:text-[#ec4899] transition-colors duration-300'>
                                    {link.icon} {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer