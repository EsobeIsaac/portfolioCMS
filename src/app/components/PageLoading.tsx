import React from 'react';
import loadingIcon from '@/app/utils/images/load.gif';
import Image from 'next/image';


function PageLoading() {
    return (
        <div className='fixed top-0 left-0 flex items-center justify-center bg-white w-full min-h-screen z-50'>
            <Image src={loadingIcon} height={100} width={100} alt='Loading..'/>
        </div>
    )
}



export default PageLoading