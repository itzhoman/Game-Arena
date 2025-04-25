import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ProductsData } from "../data";
import { Canvas } from '@react-three/fiber'
import ParticlesBackground from './ParticlesBackground'

gsap.registerPlugin(ScrollTrigger);

const OfferZone = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const items = sectionRef.current.querySelectorAll(".product-card");

        gsap.fromTo(
            items,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none none",
                },
            }
        );
    }, []);



    return (
        <div ref={sectionRef} className=' w-full flex flex-col justify-center relative items-center mb-10 
         bg-gradient-background text-[var(--color-text-primary)] overflow-hidden'>
            {/* Three.js Canvas Background */}
            <div className='absolute top-0 left-0 w-full h-full'>
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <ParticlesBackground />
                </Canvas>
            </div>

            <div className="container mt-44">
                {/* Swiper Container */}
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {ProductsData.map((data) => (
                        <SwiperSlide
                            key={data.id}>
                            <div
                                className="product-card rounded-2xl bg-secondary hover:bg-primary/10 hover:bg-[#2E2E2E]
                                hover:text-black relative shadow-xl duration-300 group max-w-[450px] md:ml-12 flex flex-col justify-center
                                items-center"
                            >
                                {/* Image section */}
                                <div className="h-[400px] w-[400px]">
                                    <img
                                        src={data.img}
                                        alt=""
                                        className="max-w-[300px] h-[350px] block mx-auto obtain
                                        group-hover:scale-105 duration-300 drop-shadow-md"
                                    />
                                </div>
                                {/* Details section */}
                                <div className="p-4 text-center -mt-8">
                                    {/* Star rating */}
                                    
                                    <h1 className="text-xl font-bold">{data.title}</h1>
                                    <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                                        {data.description}
                                    </p>
                                    <button
                                        className="bg-[#db2777] hover:scale-105 duration-300 text-white py-1 px-4
                                         rounded-full mt-4 group-hover:bg-secondary hover:bg-secondary 
                                         group-hover:text-black"
                                    >
                                        Order Now
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default OfferZone;
