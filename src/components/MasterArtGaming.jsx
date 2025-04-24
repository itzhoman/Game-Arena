import { Canvas } from '@react-three/fiber';
import ParticlesBackground from './ParticlesBackground';
import Master from '../assets/Master.png'
import { motion } from 'framer-motion'

const MasterArtGaming = () => {
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
                    <h1 className='text-3xl font-extrabold '>
                        Elevate Your Gaming Supremacy
                    </h1>
                    <p className='text-xl font-bold'>
                        Unlock the Secrets of Gaming Mastery
                        Discover the ultimate gaming solutions at our premier gaming shop.
                        Explore the latest hardware, accessories,
                        and cutting-edge technology to elevate your experience.
                        Immerse yourself in the ultimate gaming adventure with our curated selection of
                        premium equipment—from the newest consoles and controllers to high-performance gear.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='bg-gradient-primary duration-500 w-[150px] p-3 
                        tracking-widest rounded-full font-semibold shadow-lg hover:shadow-xl opacity-'
                    >
                        Buy Now
                    </motion.button>
                </motion.div>
            </div>
        </div>
    )
}

export default MasterArtGaming
