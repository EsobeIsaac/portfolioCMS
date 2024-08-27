// pages/login.js
"use client"

import React, { useContext, useState } from 'react';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import AlertContext from '@/app/admin/components/context/AlertContext'
import RequestClass from '@/app/admin/components/requestClass';
import LoadingBtn from '@/app/admin/components/Loading/LoadingBtn'



interface User {
  password: string,
  confirmPassword: string
}


const ResetPasswordPage = () => {

    const router = useRouter();

    const context = useContext(AlertContext)

    const [loading, setLoading] = useState<Boolean>(false);

    const [userData, setUserData] = useState<User>({
      password: '',
      confirmPassword: ''
    })

    const params = useParams()
    
    const requestClass = new RequestClass(`/api/v1/user/auth/reset-password/${params.token}`);

    const resetPassword = async(e: React.FormEvent) => {

        e.preventDefault()

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
              password: '',
              confirmPassword: ''
            })
        //   await fetchTools()
          setLoading(false)

          router.push('/admin/login');
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
          Reset Your Password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST" onSubmit={resetPassword}>
          <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
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
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={userData.confirmPassword}
                  onChange={(e)=>setUserData((prevState)=>({...prevState, confirmPassword: e.target.value}))}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/admin/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
                {
                    loading ? <div className="mt-10 w-full py-0 bg-slate-300 text-white/25 md:px-10 md:w-fit flex gap-5 items-center justify-center">Loading <LoadingBtn/></div> : <button type="submit" className="mt-10 w-full py-2 bg-slate-500 hover:bg-slate-300 text-white md:px-10 ">Sign in</button>
                } 
              {/* <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button> */}
            </div>
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

export default ResetPasswordPage;
