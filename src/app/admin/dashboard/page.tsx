'use client'
import { useState, useEffect, useContext } from 'react';
import Link from "next/link";
import RequestClass from '../components/requestClass';
import AlertContext from '@/app/admin/components/context/AlertContext'

const mockSummaryData = {
  portfolioItems: 12,
  services: 5,
};

interface Summary {
  portfolioCount: number,
  experienceCount: number,
  serviceCount: number,
  clientCount: number
}
const AdminDashboard = () => {
  const context = useContext(AlertContext)

  const [summaryData, setSummaryData] = useState<Summary>({
    portfolioCount: 0,
    experienceCount: 0,
    serviceCount: 0,
    clientCount: 0
  });

  const [loading, setLoading] = useState<Boolean>(false);
  
  const requestClass = new RequestClass('/api/v1/summary')

  const fetchSummary = async() => {
    setLoading(true)
    try {
      const res = await requestClass.getRequest()
      console.log(res.data)
    
      setSummaryData(res.data.data)
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

  useEffect(() => {
    // Simulate fetching data from an API
    fetchSummary();
  }, []);

  const navsLinks = [
    {
      href: '/admin/dashboard/portfolio',
      name: 'Add items to your portfolio'
    },
    {
      href: '/admin/dashboard/experience',
      name: 'Visit experience'
    },
    {
      href: '/admin/dashboard/service',
      name: 'Update services'
    },
    {
      href: '/admin/dashboard/achievement',
      name: 'Add to your achievements'
    }
  ]

  return (
    <div className="py-6 px-[3%]">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex space-x-6 mb-6">
        <div className="w-1/2 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Portfolio Items</h2>
          <p className="text-2xl">{summaryData.portfolioCount}</p>
        </div>
        <div className="w-1/2 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Total Experiences</h2>
          <p className="text-2xl">{summaryData.experienceCount}</p>
        </div>
      </div>

      <div className="flex space-x-6 mb-6">
        <div className="w-1/2 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Services</h2>
          <p className="text-2xl">{summaryData.serviceCount}</p>
        </div>
        <div className="w-1/2 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Clients</h2>
          <p className="text-2xl">{summaryData.clientCount}</p>
        </div>
      </div>

      <div className="p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <ul className="space-y-2">
        {
              navsLinks.map((item, index)=>{
              return <li>
                  <Link href={item.href} key={index} className='text-blue-500 hover:underline'>{item.name}</Link>
                </li>
              })
          }
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
