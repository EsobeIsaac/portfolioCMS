'use client'
import React, { useEffect, useState } from 'react'
import getWebContent from '../admin/components/getWebContents'
import Image from 'next/image'
import Link from 'next/link'
import axiosInstance from './AxiosInstance'

import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';


interface TestimonialInterface {
    _id: string,
    name: string,
    image: string,
    profile: string,
    testimonial: string,
  }


const Testimonials: React.FC<any> = ({testimonial}) => {


    const [testimonials, setTestimonials] = useState<TestimonialInterface[]>([])

    useEffect(()=>{
        (async() => {
            setTestimonials([])
          const res = await axiosInstance.get('/api/v1/testimonial');
          setTestimonials(res.data.data)
        })()
    }, [])

    const [sliderSettings, setSliderSettings] = useState({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    });

      useEffect(() => {
        const updateSettings = () => {
          if (window.innerWidth > 1000) {
            setSliderSettings((prevSettings) => ({
              ...prevSettings,
              centerMode: true,
              centerPadding: "150px",
              className: "center",
            }));
          } else {
            setSliderSettings((prevSettings) => ({
              ...prevSettings,
              centerMode: true,
              centerPadding: "10px",
              className: "center",
            }));
          }
        };
    
        // Initial settings update
        updateSettings();
    
        // Add event listener to update settings on window resize
        window.addEventListener("resize", updateSettings);
    
        // Cleanup event listener on component unmount
        return () => {
          window.removeEventListener("resize", updateSettings);
        };
      }, []);
    

    return (
        <div className='max-w-[1200px] px-[3%] py-20 mx-auto relative' id='testimonials'>
              <div className='grid grid-cols-3 items-start md:space-x-16 md:bg-transparent'>

              <div className='col-span-3 md:col-span-1'>
            <h2 className='text-[40px] font-bold leading-[4rem]'>{testimonial.title}</h2>         
              </div>

              <div className='col-span-3 md:col-span-2'>
            <Slider {...sliderSettings}>
                {testimonials.map((item) => (
                    <div className='md:p-3 p-1'>
                <div key={item._id} className='shadow-md bg-white p2 relative'>
                        <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                            <Image
                                src={item.image}
                                alt="Picture of the author"
                                sizes="100%"
                                fill
                                style={{
                                objectFit: 'cover',
                                }}
                            />
                        </div>
                        <div className='p-5 bg-white shadow-2xl text-2xl absolute top-[170px] left-5 rounded-full'>
                        <FaQuoteLeft className='text-xl text-blue-900'/>
                        </div>
                        <blockquote className='w-full bg-white px-2 py-5 rounded-md pt-16'>
                            <p className='text-sm mb-5'>{item.testimonial}</p>
                            <cite className='text-md'><strong>{item.name}</strong></cite><br/>
                            <em className='text-sm'>{item.profile}</em>
                        </blockquote>
                    </div>
                    </div>
                    
                  ))}
            </Slider>
                  </div>
              </div>
        </div>
    )
}

// Custom Next Arrow with React Icon
const SampleNextArrow: React.FC<any> = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow custom-next-arrow`}
        style={{ ...style }}
        onClick={onClick}
      >
        <FaChevronRight size={24} color="white" />
      </div>
    );
  };
  
  // Custom Prev Arrow with React Icon
const SamplePrevArrow: React.FC<any> = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow custom-prev-arrow`}
        style={{ ...style }}
        onClick={onClick}
      >
        <FaChevronLeft size={24} color="white" />
      </div>
    );
  };

export default Testimonials