import React from 'react'
import { TbReload } from "react-icons/tb";
import classes from './Loading.module.css'

function LoadingBtn() {
    
  return (
    <span className={["text-slate-700 bg-white text-2xl p-2 rounded-[100%] rota", classes.rotating].join(' ')}><TbReload/></span>
  )
}

export default LoadingBtn