'use client'
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image'
import RequestClass from '@/app/admin/components/requestClass';
import AlertContext from '@/app/admin/components/context/AlertContext'
import { CiEdit } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaLink } from "react-icons/fa";
import { TbReload } from "react-icons/tb";
import { RiDeleteBin3Line } from "react-icons/ri";
import PortfolioForm from './PortfolioForm';
import LoadingBtn from '@/app/admin/components/Loading/LoadingBtn'

const PortfolioComponent: React.FC = () => {

  const context = useContext(AlertContext)
  interface Portfolio {
    _id?: string,
    title: string,
    tag: string,
    url: string,
    description: string,
    image: string
  }
  const [portfolio, setPortfolio] = useState<Portfolio[] | null>(null)

  const [loading, setLoading] = useState<Boolean>(false);
  
  const requestClass = new RequestClass('/api/v1/portfolio')

  const fetchPortfolio = async() => {
    setLoading(true)
    try {
      const res = await requestClass.getRequest()
      // console.log(res)
    
      setPortfolio(res.data.data)
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

  const deletePortfolio = async(portfolio: Portfolio) => {
    setDeleting(true)
    try {
      if(portfolio?._id) {
        const res = await requestClass.deleteRequest(portfolio?._id)
        console.log(res)
        if(context?.alert) {
          context?.setAlert({
            message: res.data.message,
            status: res.data.status
          })
        }
        await fetchPortfolio()
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
    fetchPortfolio()
  }, [])

  interface showPortfolioFormInterface {
    command: Boolean,
    portfolio?: Portfolio
  }

  const [showPortfolioForm, setShowPortfolioForm] = useState<showPortfolioFormInterface >({
    command: false,
  })

  const closePortfolioForm = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if(target.classList.contains('close')) {
      setShowPortfolioForm({command: false})
    }
  }

  return (
    <section className='py-14'>
      <div className="flex justify-between items-center mb-5">
        <h2 className='text-xl font-semibold text-slate-700 mb-0'>PORTFOLIOS: </h2>
        {
          loading ? <LoadingBtn/> : <button className="text-slate-700 bg-white text-3xl p-2 rounded-[100%]" onClick={fetchPortfolio}><TbReload/></button>
        } 
      </div>
   
      {  
        portfolio && portfolio[0] ? (
          <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
            {
              portfolio.map((item, index)=><div className='col-span-1 bg-white shadow-xl p-2 relative' key={index}>
                <div className='bg-slate-950 text-white flex w-full items-center justify-between absolute top-0 left-0 px-2 py-1'>
                  <h5 className='text-sm font-semibold'>{item.tag}</h5>
                  <a href={item.url} target='_blank' className='text-white'><FaLink/></a>
                </div>
                  <div style={{ position: 'relative', height: '100px' }} className="w-[100%] mx-auto lg:w-[80%] mt-6">
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
                    <button className='bg-slate-700 text-white text-md p-2 rounded-[100%]' onClick={()=>setShowPortfolioForm({command: true, portfolio: item})}><CiEdit /></button>
                    {
                      deleting ? <LoadingBtn/> : <button className='bg-red-500 text-md text-white p-2 rounded-[100%] ml-3' onClick={()=>deletePortfolio(item)}><RiDeleteBin3Line/></button>
                    }
                    
                </div>
              </div>)
            }
          </div>
        ) : null
      }

      <button className='bg-slate-700 font-bold absolute bottom-10 right-5 text-white text-3xl p-2 rounded-[100%]' onClick={()=>setShowPortfolioForm({command: true})}><IoIosAddCircleOutline /></button>

      {
        showPortfolioForm.command ? <article className='absolute left-0 flex items-center justify-center top-0 bg-black/25 min-h-full w-full close py-10' onClick={closePortfolioForm}>
        <div className='bg-white rounded-xl p-5 min-w-[90%] md:min-w-[50%] shadow-3xl'>
          <button className='text-2xl font-bold text-red-500 p-4 w-fit shadow-md close'>&times;</button>
          
          <PortfolioForm portfolio={showPortfolioForm.portfolio ? showPortfolioForm.portfolio : null} fetchPortfolio={fetchPortfolio}/>
        </div>
      </article> : null
      }

      
    </section>
    
  );
};

export default PortfolioComponent;
