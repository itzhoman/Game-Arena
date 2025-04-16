import React from 'react'
import { TopSellerData } from '../data'
import { Canvas } from '@react-three/fiber'
import ParticlesBackground from './ParticlesBackground'

const TopSeller = () => {
    return (
        <div className='relative w-full  bg-gradient-background text-[var(--color-text-primary)] overflow-hidden'>
            {/* Three.js Canvas Background */}
            <div className='absolute top-0 left-0 w-full h-full'>
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <ParticlesBackground />
                </Canvas>
            </div>

            {/* Background decorative elements */}
            <div className='absolute top-0 left-0 w-full h-full'>
                <div className='absolute top left-20 w-72 h-72 lg:w-96 lg:h-96 bg-[var(--color-primary)] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob'></div>
                <div className='absolute top-40 right-20 w-72 h-72 lg:w-96 lg:h-96 bg-[var(--color-primary)] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000'></div>
                <div className='absolute bottom-20 left-40 w-72 h-72 lg:w-96 lg:h-96 bg-[var(--color-secondary)] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000'></div>
            </div>

            <div className='container mx-auto px-4 lg:px-8 z-10 relative'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
                    {TopSellerData.map((item) => (
                        <div key={item.title} className='group relative bg-black/30 backdrop-blur-sm rounded-xl p-4 
                         transition-all duration-300 transform hover:-translate-y-2
                        border border-[var(--color-border)] hover:border-[var(--color-border-hover)]'>
                            <div className='flex gap-4'>
                                <div className='w-1/3'>
                                    <div className='relative h-32 overflow-hidden rounded-lg'>
                                        <div className='absolute -inset-1 bg-gradient-primary rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity'></div>
                                        <img 
                                            src={item.img} 
                                            alt={item.title} 
                                            className='relative w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300' 
                                        />
                                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
                                    </div>
                                </div>
                                <div className='w-2/3 flex flex-col justify-center'>
                                    <h3 className='text-xl font-bold text-white capitalize mb-2'>{item.title}</h3>
                                    <p className='text-sm text-gray-300'>{item.des}</p>
                                </div>
                            </div>
                            <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 
                            transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TopSeller
