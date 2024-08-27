import React, {useContext} from 'react'
import AlertContext from '@/app/admin/components/context/AlertContext'

function Alert() {

    
    const context = useContext(AlertContext)

    const resetAlert = () => {
        if(context?.setAlert) {
            context.setAlert({
                message: null,
                status: null
            })
        }
    }
    
  return (
    <>
        {
            context?.alert?.message ? <div className={['px-5 py-2 rounded-lg text-white fixed right-3 top-10 flex items-center', context.alert.status === "success" ? 'bg-green-500' : 'bg-red-500'].join(' ')}>{context.alert.message} <button className='text-md ml-3' onClick={resetAlert}>&times;</button></div> : null
        }
    </>
    
  )
}

export default Alert