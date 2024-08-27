'use client'
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import RequestClass from '@/app/admin/components/requestClass';
import AlertContext from '@/app/admin/components/context/AlertContext'
import { CiEdit } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { TbReload } from "react-icons/tb";
import { RiDeleteBin3Line } from "react-icons/ri";
import AchievementForm from './AchievementForm';
import LoadingBtn from '@/app/admin/components/Loading/LoadingBtn'

const AchievementComponent: React.FC = () => {

  const context = useContext(AlertContext)
  interface Achievement {
    _id?: string,
    title: string,
    description: string,
    image: string
  }
  const [achievement, setAchievement] = useState<Achievement[] | null>(null)

  const [loading, setLoading] = useState<Boolean>(false);
  
  const requestClass = new RequestClass('/api/v1/achievement')

  const fetchAchievement = async() => {
    setLoading(true)
    try {
      const res = await requestClass.getRequest()
      // console.log(res)
    
      setAchievement(res.data.data)
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

  const deleteAchievement = async(achievement: Achievement) => {
    setDeleting(true)
    try {
      if(achievement?._id) {
        const res = await requestClass.deleteRequest(achievement?._id)
        console.log(res)
        if(context?.alert) {
          context?.setAlert({
            message: res.data.message,
            status: res.data.status
          })
        }
        await fetchAchievement()
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
    fetchAchievement()
  }, [])

  interface showAchievementFormInterface {
    command: Boolean,
    achievement?: Achievement
  }

  const [showAchievementForm, setShowAchievementForm] = useState<showAchievementFormInterface >({
    command: false,
  })

  const closeAchievementForm = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if(target.classList.contains('close')) {
      setShowAchievementForm({command: false})
    }
  }

  return (
    <section className='py-14'>
      <div className="flex justify-between items-center mb-5">
        <h2 className='text-xl font-semibold text-slate-700 mb-0'>ACHIEVEMENTS: </h2>
        {
          loading ? <LoadingBtn/> : <button className="text-slate-700 bg-white text-3xl p-2 rounded-[100%]" onClick={fetchAchievement}><TbReload/></button>
        } 
      </div>
   
      {  
        achievement && achievement[0] ? (
          <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
            {
              achievement.map((item, index)=><div className='col-span-1 bg-white shadow-xl p-2' key={index}>
                  <div style={{ position: 'relative', height: '100px' }} className="w-[100%] mx-auto lg:w-[80%]">
                    <Image
                        src={item.image}
                        alt={item.title}
                        sizes="100%"
                        fill
                        style={{
                          objectFit: 'contain',
                          position: 'absolute'
                        }}
                    />      
                </div>
                <div className='my-4'>
                  <h3 className='text-lg font-semibold mb-2'>{item.title}</h3>
                  <p className='text-sm'>{item.description.slice(0, 50)}{item.description[51] && '...'}</p>
                </div>
                <div className='mt-5 w-fit ml-auto'>
                    <button className='bg-slate-700 text-white text-md p-2 rounded-[100%]' onClick={()=>setShowAchievementForm({command: true, achievement: item})}><CiEdit /></button>
                    {
                      deleting ? <LoadingBtn/> : <button className='bg-red-500 text-md text-white p-2 rounded-[100%] ml-3' onClick={()=>deleteAchievement(item)}><RiDeleteBin3Line/></button>
                    }
                    
                </div>
              </div>)
            }
          </div>
        ) : null
      }

      <button className='bg-slate-700 font-bold absolute bottom-10 right-5 text-white text-3xl p-2 rounded-[100%]' onClick={()=>setShowAchievementForm({command: true})}><IoIosAddCircleOutline /></button>

      {
        showAchievementForm.command ? <article className='absolute left-0 flex items-center justify-center top-0 bg-black/25 min-h-full w-full close py-10' onClick={closeAchievementForm}>
        <div className='bg-white rounded-xl p-5 min-w-[90%] md:min-w-[50%] shadow-3xl'>
          <button className='text-2xl font-bold text-red-500 p-4 w-fit shadow-md close'>&times;</button>
          
          <AchievementForm achievement={showAchievementForm.achievement ? showAchievementForm.achievement : null} fetchAchievement={fetchAchievement}/>
        </div>
      </article> : null
      }

      
    </section>
    
  );
};

export default AchievementComponent;
