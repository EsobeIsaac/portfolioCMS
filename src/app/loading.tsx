import React from 'react';
import loadingIcon from '@/app/utils/images/load.gif';
import Image from 'next/image';


function Loading() {
    return (
        <div className='flex items-center justify-center bg-white w-full h-screen'>
            <Image src={loadingIcon} height={100} width={100} alt='Loading..'/>
        </div>
    )
}



export default Loading