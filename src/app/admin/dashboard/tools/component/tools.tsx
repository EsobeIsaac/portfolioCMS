'use client'
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import RequestClass from '@/app/admin/components/requestClass';
import AlertContext from '@/app/admin/components/context/AlertContext'
import { CiEdit } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { TbReload } from "react-icons/tb";
import { RiDeleteBin3Line } from "react-icons/ri";
import ToolForm from './ToolForm';
import LoadingBtn from '@/app/admin/components/Loading/LoadingBtn'

const ToolsComponent: React.FC = () => {

  const context = useContext(AlertContext)

  interface Tools {
    _id: string,
    name: string,
    logo: string
  }

  const [tools, setTools] = useState<Tools[] | null>(null)

  const [loading, setLoading] = useState<Boolean>(false);
  
  const requestClass = new RequestClass('/api/v1/tool')

  const fetchTools = async() => {
    setLoading(true)
    try {
      const res = await requestClass.getRequest()
      // console.log(res)
    
      setTools(res.data.data)
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

  const deleteTools = async(tool: Tools) => {
    setDeleting(true)
    try {
      const res = await requestClass.deleteRequest(tool?._id)
      console.log(res)
      if(context?.alert) {
        context?.setAlert({
          message: res.data.message,
          status: res.data.status
        })
      }
      await fetchTools()
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
    fetchTools()
  }, [])

  interface showToolFormInterface {
    command: Boolean,
    tool?: Tools
  }

  const [showToolForm, setShowToolForm] = useState<showToolFormInterface >({
    command: false,
  })

  const closeToolForm = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if(target.classList.contains('close')) {
      setShowToolForm({command: false})
    }
  }

  return (
    <section className='py-14'>
      <div className="flex justify-between items-center mb-5">
        <h2 className='text-xl font-semibold text-slate-700 mb-0'>TOOLS: </h2>
        {
          loading ? <LoadingBtn/> : <button className="text-slate-700 bg-white text-3xl p-2 rounded-[100%]" onClick={fetchTools}><TbReload/></button>
        } 
      </div>
   
      {  
        tools && tools[0] ? (
          <div className='grid grid-cols-3 gap-3 md:grid-cols-4'>
            {
              tools.map((item, index)=><div className='col-span-1 bg-white shadow-xl p-2 pt-8' key={index}>
                  <div style={{ position: 'relative', height: '50px' }} className="w-full mx-auto lg:w-[80%]">
                    <Image
                        src={item.logo}
                        alt={item.name}
                        sizes="100%"
                        fill
                        style={{
                          objectFit: 'contain',
                          position: 'absolute'
                        }}
                    />      
                </div>
                <h2 className="text-md font-semibold text-slate-500 my-2 text-center mb-8">{item.name}</h2>
                <div className='mt-5 w-fit ml-auto'>
                    <button className='bg-slate-700 text-white text-md p-2 rounded-[100%]' onClick={()=>setShowToolForm({command: true, tool: item})}><CiEdit /></button>
                    {
                      deleting ? <LoadingBtn/> : <button className='bg-red-500 text-md text-white p-2 rounded-[100%] ml-3' onClick={()=>deleteTools(item)}><RiDeleteBin3Line/></button>
                    }
                    
                </div>
              </div>)
            }
          </div>
        ) : null
      }

      <button className='bg-slate-700 font-bold absolute bottom-10 right-5 text-white text-3xl p-2 rounded-[100%]' onClick={()=>setShowToolForm({command: true})}><IoIosAddCircleOutline /></button>

      {
        showToolForm.command ? <article className='absolute left-0 flex items-center justify-center top-0 bg-black/25 min-h-full w-full close py-10' onClick={closeToolForm}>
        <div className='bg-white rounded-xl p-5 min-w-[90%] md:min-w-[50%] shadow-3xl'>
          <button className='text-2xl font-bold text-red-500 p-4 w-fit shadow-md close'>&times;</button>
          
          <ToolForm tool={showToolForm.tool ? showToolForm.tool : null} fetchTools={fetchTools}/>
        </div>
      </article> : null
      }

      
    </section>
    
  );
};

export default ToolsComponent;
