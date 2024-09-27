'use client'
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import RequestClass from '@/app/admin/components/requestClass';
import AlertContext from '@/app/admin/components/context/AlertContext'
import { CiEdit } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { TbReload } from "react-icons/tb";
import { RiDeleteBin3Line } from "react-icons/ri";
import EducationForm from './EducationForm';
import LoadingBtn from '@/app/admin/components/Loading/LoadingBtn'

const EducationsComponent: React.FC = () => {
// profile name image testimonial
  const context = useContext(AlertContext)

  interface Education {
    _id?: string,
    school: string,
    description: string,
    degree: string,
    start: string,
    end: string,
  }
// <{ [key: string]: string | undefined }>
  const [educations, setEducations] = useState<Education[] | null>(null)

  const [loading, setLoading] = useState<Boolean>(false);
  
  const requestClass = new RequestClass('/api/v1/education')

  const fetchEducations = async() => {
    setLoading(true)
    try {
      const res = await requestClass.getRequest()
      // console.log(res)
    
      setEducations(res.data.data)
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

  const deleteEducation = async(education: Education) => {
    setDeleting(true)
    try {
      if(education?._id) {
        const res = await requestClass.deleteRequest(education._id)
        console.log(res)
        if(context?.alert) {
          context?.setAlert({
            message: res.data.message,
            status: res.data.status
          })
        }
        await fetchEducations()
        setDeleting(false)
      }
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
    fetchEducations()
  },[])

  interface showEducationFormInterface {
    command: Boolean,
    education?: Education
  }

  const [showEducationForm, setShowEducationForm] = useState<showEducationFormInterface>({
    command: false,
  })

  const closeEducationForm = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if(target.classList.contains('close')) {
      setShowEducationForm({command: false})
    }
  }

  return (
    <section className='py-14'>
      <div className="flex justify-between items-center mb-5">
        <h2 className='text-xl font-semibold text-slate-700 mb-0'>EDUCATIONS: </h2>
        {
          loading ? <LoadingBtn/> : <button className="text-slate-700 bg-white text-3xl p-2 rounded-[100%]" onClick={fetchEducations}><TbReload/></button>
        } 
      </div>
   
      {  
        educations && educations[0] ? (
          <div className='grid grid-cols-2 gap-3 md:grid-cols-4 '>
            {
              educations.map((item, index)=><div className='col-span-1 bg-white shadow-xl p-2 pb-10 relative' key={index}>
                <h2 className="text-sm text-blue-500">{item.start} - {item.end}</h2>
                <h2 className="text-md text-slate-700">{item.school}</h2>
                <h2 className="text-xl text-black my-4">{item.degree}</h2>
                <p className='mb-5'>
                  {item.description.slice(0, 50)}{item.description[51] && '...'}
                </p>
                <div className='mt-5 w-fit absolute bottom-4 right-4'>
                    <button className='bg-slate-700 text-white text-md p-2 rounded-[100%]' onClick={()=>setShowEducationForm({command: true, education: item})}><CiEdit /></button>
                    {
                      deleting ? <LoadingBtn/> : <button className='bg-red-500 text-md text-white p-2 rounded-[100%] ml-3' onClick={()=>deleteEducation(item)}><RiDeleteBin3Line/></button>
                    }
                    
                </div>
              </div>)
            }
          </div>
        ) : null
      }

      <button className='bg-slate-700 font-bold absolute bottom-5 right-5 text-white text-3xl p-2 rounded-[100%]' onClick={()=>setShowEducationForm({command: true})}><IoIosAddCircleOutline /></button>

      {
        showEducationForm.command ? <article className='absolute left-0 flex items-center justify-center top-0 bg-black/25 min-h-full w-full close py-10' onClick={closeEducationForm}>
        <div className='bg-white rounded-xl p-5 min-w-[90%] md:min-w-[50%] shadow-3xl'>
          <button className='text-2xl font-bold text-red-500 p-4 w-fit shadow-md close'>&times;</button>
          
          <EducationForm education={showEducationForm.education ? showEducationForm.education : null} fetchEducations={fetchEducations}/>
        </div>
      </article> : null
      }

      
    </section>
    
  );
};

export default EducationsComponent;
