import { useEffect, useRef } from 'react';
import { featured } from '../data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import ParticlesBackground from './ParticlesBackground';

gsap.registerPlugin(ScrollTrigger);

const Feature = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const title = sectionRef.current;
    const items = itemsRef.current;

    // Initial setup - hide items
    gsap.set(items, {
      x: 100,
      opacity: 0
    });

    // Title animation
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

    // Items animation
    ScrollTrigger.batch(items, {
      start: " center",
      onEnter: elements => {
        gsap.to(elements, {
          x: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.1,
          ease: "power2.out"
        });
      }
    });
  }, []);

  return (
    <div ref={sectionRef} className='relative w-full py-20 lg:py-32 bg-gradient-background text-[var(--color-text-primary)] overflow-hidden'>
      {/* Three.js Canvas Background */}
      <div className='absolute top-0 left-0 w-full h-full'>
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticlesBackground />
        </Canvas>
      </div>

      {/* Background decorative elements */}
      <div className='absolute top-0 left-0 w-full h-full'>
        <div className='absolute top-20 left-20 w-72 h-72 lg:w-96 lg:h-96 bg-[var(--color-primary)] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob'></div>
        <div className='absolute top-40 right-20 w-72 h-72 lg:w-96 lg:h-96 bg-[var(--color-primary)] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000'></div>
        <div className='absolute bottom-20 left-40 w-72 h-72 lg:w-96 lg:h-96 bg-[var(--color-secondary)] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000'></div>
      </div>

      <div className='container mx-auto px-4 lg:px-8 z-10 relative'>
        <h2 className='text-5xl lg:text-6xl font-bold text-center mb-10 lg:mb-8 bg-clip-text text-transparent 
        bg-gradient-to-r from-indigo-500 to-purple-500'>
          Discover the best gaming products for your home
        </h2>
        <p className='text-center text-xl lg:text-2xl text-[var(--color-text-muted)] mb-16 lg:mb-24 max-w-2xl lg:max-w-3xl mx-auto'>
          We offer a wide range of gaming products to suit all your gaming needs.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 
        gap-8 md:gap-10 lg:gap-12 xl:gap-16 max-w-7xl mx-auto'>
          {featured.map((item, index) => (
            <div
              key={item.id}
              ref={el => itemsRef.current[index] = el}
              className='group relative bg-black/30 backdrop-blur-sm rounded-xl p-6 lg:p-8 
              hover:bg-indigo-900/40 transition-all duration-300 transform hover:-translate-y-2
              border border-[var(--color-border)] hover:border-[var(--color-border-hover)]'
            >
              <div className='relative h-48 lg:h-56 mb-6 lg:mb-8 overflow-hidden rounded-lg'>
                <div className='absolute -inset-1 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity'></div>
                <img
                  src={item.image}
                  alt={item.title}
                  className='relative w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300'
                />
              </div>

              <h3 className='text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 text-white capitalize'>{item.title}</h3>
              <p className='text-lg lg:text-xl text-gray-300'>{item.description}</p>

              <div className='absolute bottom-0 left-0 w-full h-1 lg:h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 
              transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feature;
