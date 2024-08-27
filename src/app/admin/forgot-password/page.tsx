// pages/login.js

"use client"

import React, { useContext, useState } from 'react';

import AlertContext from '@/app/admin/components/context/AlertContext'
import RequestClass from '@/app/admin/components/requestClass';
import LoadingBtn from '@/app/admin/components/Loading/LoadingBtn'
import Link from 'next/link';

interface User {
    email: string,
}

const LoginPage = () => {

    const context = useContext(AlertContext)

    const [loading, setLoading] = useState<Boolean>(false);

    const [userData, setUserData] = useState<User>({
        email: ' ',
    })
    
    const requestClass = new RequestClass('/api/v1/user/auth/forget-password');

    const login = async(e: React.FormEvent) => {

        e.preventDefault()

        setLoading(true)
        try {
          const res =  await requestClass.postRequest(userData);
          if(context?.alert) {
            context?.setAlert({
              message: res.data.message,
              status: res.data.status
            })
          }
          
            setUserData({
                email: ' '
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
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Forgot your password?
        </h2>
        <p className="text-center text-md font-semibold text-gray-900">Provide your email address below</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST" onSubmit={login}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e)=>setUserData((prevState)=>({...prevState, email: e.target.value}))}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="text-sm">
                <Link href="/admin/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Login
                </Link>
              </div>

                {
                    loading ? <div className="mt-10 w-full py-0 bg-slate-300 text-white/25 md:px-10 md:w-fit flex gap-5 items-center justify-center">Loading <LoadingBtn/></div> : <button type="submit" className="mt-10 w-full py-2 bg-slate-500 hover:bg-slate-300 text-white md:px-10 ">Forget Password</button>
                } 
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500"></span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
