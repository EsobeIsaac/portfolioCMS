'use client'
import React, { useEffect, useState } from 'react'
import getWebContent from '../admin/components/getWebContents'
import Image from 'next/image'
import Link from 'next/link'
import axiosInstance from './AxiosInstance'

import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


interface ServiceInterface {
    _id: string,
    title: string,
    description: string,
    tag: string,
    url: string,
    image: string,
  }


const Services: React.FC<any> = ({portfolio}) => {


    const [portfolios, setPortfolios] = useState<ServiceInterface[]>([])

    useEffect(()=>{
        (async() => {
            setPortfolios([])
          const res = await axiosInstance.get('/api/v1/portfolio');
          console.log(res.data.data)
          setPortfolios(res.data.data)
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
              centerPadding: "300px",
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
        <div className=' py-20  relative' id='portolio'>
            <h2 className='text-[50px] font-bold mb-8 leading-[4rem] text-center'>{portfolio.title}</h2>
            <Slider {...sliderSettings}>
                {portfolios.map((item) => (
                <div key={item._id} className='px-1 md:px-2'>
                    <div style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)), url(${item.image})`}} className='bg-cover bg-no-repeat'>
                        <div className='max-w-[600px] mx-auto py-10 md:py-20 text-center'>
                        <h4 className='bg-gray-400 text-white rounded-md py-2 px-5 text-center w-fit mx-auto mb-5'>{item.tag}</h4>
                        <h2 className='text-2xl text-white text-center mb-5'>{item.title}</h2>
                        <p className='text-gray-100 mb-10'>{item.description}</p>
                        <Link href={item.url} target='_blank' className='text-white border border-white p-4 mt-20'>Case Study</Link>
                        </div>
                    </div>
                </div>
                ))}
            </Slider>
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

export default Services