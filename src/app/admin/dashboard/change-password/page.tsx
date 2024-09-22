// pages/login.js
"use client"

import React, { useContext, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import AlertContext from '@/app/admin/components/context/AlertContext'
import RequestClass from '@/app/admin/components/requestClass';
import LoadingBtn from '@/app/admin/components/Loading/LoadingBtn'



interface User {
  oldPassword: string,
  password: string,
  confirmPassword: string
}


const ChangePasswordPage = () => {

    const router = useRouter();

    const context = useContext(AlertContext)

    const [loading, setLoading] = useState<Boolean>(false);

    const [userData, setUserData] = useState<User>({
      oldPassword: '',
      password: '',
      confirmPassword: '',
    })
    
    const requestClass = new RequestClass('/api/v1/user/auth/change-password');

    console.log(localStorage.getItem('token'))

    const changePassword = async(e: React.FormEvent) => {

        e.preventDefault();

        setLoading(true)
        try {
          const res =  await requestClass.patchRequest(userData);

          if(context?.alert) {
            context?.setAlert({
              message: res.data.message,
              status: res.data.status
            })
          }
          
            setUserData({
              oldPassword: '',
              password: '',
              confirmPassword: '',
            })
        //   await fetchTools()
          setLoading(false)

        } catch (err: any) {
          if (err.response) {
            console.log(err.response)
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


  return (
    <div className="min-h-screen py-12 sm:px-6 lg:px-8">
        <h2 className="mt-6 text-center text-md md:text-xl font-extrabold text-gray-900 mb-10">
          Reset Your Password
        </h2>
        <div className="py-8 px-4 sm:px-10">
          <form className="space-y-6" action="#" method="POST" onSubmit={changePassword}>
            <div>
              <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <div className="mt-1">
                <input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={userData.oldPassword}
                  onChange={(e)=>setUserData((prevState)=>({...prevState, oldPassword: e.target.value}))}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={userData.password}
                  onChange={(e)=>setUserData((prevState)=>({...prevState, password: e.target.value}))}
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={userData.confirmPassword}
                  onChange={(e)=>setUserData((prevState)=>({...prevState, confirmPassword: e.target.value}))}
                />
              </div>
            </div>

            

            <div>
                {
                    loading ? <div className="mt-10 w-full py-0 bg-slate-300 text-white/25 md:px-10 md:w-fit flex gap-5 items-center justify-center">Loading <LoadingBtn/></div> : <button type="submit" className="mt-10 w-full py-2 bg-slate-500 hover:bg-slate-300 text-white md:px-10 ">Submit</button>
                } 
            </div>
          </form>

        </div>
    </div>
  );
};

export default ChangePasswordPage;
