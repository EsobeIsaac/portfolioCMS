'use client'
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import RequestClass from '@/app/admin/components/requestClass';
import AlertContext from '@/app/admin/components/context/AlertContext'
import { CiEdit } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { TbReload } from "react-icons/tb";
import { RiDeleteBin3Line } from "react-icons/ri";
import TestimonialForm from './TestimonialForm';
import LoadingBtn from '@/app/admin/components/Loading/LoadingBtn'

const TestimonialComponent: React.FC = () => {
// profile name image testimonial
  const context = useContext(AlertContext)

  interface Testimonial {
    _id: string,
    name: string,
    profile: string,
    testimonial: string,
    image: string,
  }
// <{ [key: string]: string | undefined }>
  const [testimonial, setTestimonial] = useState<Testimonial[] | null>(null)

  const [loading, setLoading] = useState<Boolean>(false);
  
  const requestClass = new RequestClass('/api/v1/testimonial')

  const fetchTestimonial = async() => {
    setLoading(true)
    try {
      const res = await requestClass.getRequest()
      // console.log(res)
    
      setTestimonial(res.data.data)
      setLoading(false)
    } catch (err: any) {
      if (err.response) {
        if(context?.alert) {
          context?.setAlert({
            message: err.response.data.message,
            status: err.response.data.status
          })
        }
      } else {
        console.log(err);
      }
      setLoading(false)
    } 
    
  }

  const [deleting, setDeleting] = useState<Boolean>(false)

  const deleteTestimonial = async(client: Testimonial) => {
    setDeleting(true)
    try {
      const res = await requestClass.deleteRequest(client?._id)
      console.log(res)
      if(context?.alert) {
        context?.setAlert({
          message: res.data.message,
          status: res.data.status
        })
      }
      await fetchTestimonial()
      setDeleting(false)
    } catch (err: any) {
      if (err.response) {
        if(context?.alert) {
          context?.setAlert({
            message: err.response.data.message,
            status: err.response.data.status
          })
        }
      } else {
        console.log(err);
      }
      setDeleting(false)
    } 
    
  }

  useEffect(()=>{
    fetchTestimonial()
  }, [])

  interface showTestimonialFormInterface {
    command: Boolean,
    testimonial?: Testimonial
  }

  const [showTestimonialForm, setShowTestimonialMenu] = useState<showTestimonialFormInterface >({
    command: false,
  })

  const closeTestimonialForm = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if(target.classList.contains('close')) {
      setShowTestimonialMenu({command: false})
    }
  }

  return (
    <section className='py-14'>
      <div className="flex justify-between items-center mb-5">
        <h2 className='text-xl font-semibold text-slate-700 mb-0'>TESTIMONIALS: </h2>
        {
          loading ? <LoadingBtn/> : <button className="text-slate-700 bg-white text-3xl p-2 rounded-[100%]" onClick={fetchTestimonial}><TbReload/></button>
        } 
      </div>
   
      {  
        testimonial && testimonial[0] ? (
          <div className='grid grid-cols-2 gap-3 md:grid-cols-4 '>
            {
              testimonial.map((item, index)=><div className='col-span-1 bg-white shadow-xl p-2 pb-10 relative' key={index}>
                  <div style={{ position: 'relative', height: '100px' }} className="w-[100%] mx-auto lg:w-[80%]">
                    <Image
                        src={item.image}
                        alt={item.name}
                        sizes="100%"
                        fill
                        style={{
                          objectFit: 'contain',
                          position: 'absolute'
                        }}
                    />      
                </div>
                <div className='my-4'>
                  <h5 className='text-md text-slate-700'>{item.name}</h5>
                  <p className='text-sm my-2'>{item.testimonial.slice(0, 50)}{item.testimonial[51] && '...'}</p>
                  <small className='text-slate-700'>{item.profile}</small>
                </div>
                <div className='mt-5 w-fit absolute bottom-4 right-4'>
                    <button className='bg-slate-700 text-white text-md p-2 rounded-[100%]' onClick={()=>setShowTestimonialMenu({command: true, testimonial: item})}><CiEdit /></button>
                    {
                      deleting ? <LoadingBtn/> : <button className='bg-red-500 text-md text-white p-2 rounded-[100%] ml-3' onClick={()=>deleteTestimonial(item)}><RiDeleteBin3Line/></button>
                    }
                    
                </div>
              </div>)
            }
          </div>
        ) : null
      }

      <button className='bg-slate-700 font-bold absolute bottom-5 right-5 text-white text-3xl p-2 rounded-[100%]' onClick={()=>setShowTestimonialMenu({command: true})}><IoIosAddCircleOutline /></button>

      {
        showTestimonialForm.command ? <article className='absolute left-0 flex items-center justify-center top-0 bg-black/25 min-h-full w-full close py-10' onClick={closeTestimonialForm}>
        <div className='bg-white rounded-xl p-5 min-w-[90%] md:min-w-[50%] shadow-3xl'>
          <button className='text-2xl font-bold text-red-500 p-4 w-fit shadow-md close'>&times;</button>
          
          <TestimonialForm testimonial={showTestimonialForm.testimonial ? showTestimonialForm.testimonial : null} fetchTestimonials={fetchTestimonial}/>
        </div>
      </article> : null
      }

      
    </section>
    
  );
};

export default TestimonialComponent;
