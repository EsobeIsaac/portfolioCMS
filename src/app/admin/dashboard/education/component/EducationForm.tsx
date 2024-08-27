import React, { useEffect, useState, useContext } from 'react'
import InputField from '../../../components/textInput'
import RequestClass from '../../../components/requestClass'

import AlertContext from '@/app/admin/components/context/AlertContext'
import FileInput from '../../../components/fileUpload'
import LoadingBtn from '@/app/admin/components/Loading/LoadingBtn'
import InputArea from '@/app/admin/components/textArea'
import DateInput from '@/app/admin/components/dateInput'

// degree start end school discription
interface Education {
  _id?: string,
  school: string,
  description: string,
  degree: string,
  start: string,
  end: string,
}

interface EducationFormProp {
  education: Education | null,
  fetchEducations: ()=>{}
}

const EducationForm: React.FC<EducationFormProp> = ({fetchEducations, education}) => {

  const context = useContext(AlertContext)


    const [educationT, setEducationT] = useState<Education>({
      school: ' ',
      description: ' ',
      degree: ' ',
      start: ' ',
      end: ' ',
    })

    useEffect(()=>{
        if(education) {
          setEducationT(education)
        }
    }, [education])    
    
      const requestClass = new RequestClass('/api/v1/education')

      const [loading, setLoading] = useState<Boolean>(false);
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEducationT((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        setLoading(true)

        try {
          const res = education ? await requestClass.patchRequest(educationT, education?._id) : await requestClass.postRequest(educationT);
          if(context?.alert) {
            context?.setAlert({
              message: res.data.message,
              status: res.data.status
            })
          }
          if(education) {
              setEducationT(res.data.data)
          } else{
            setEducationT({
              school: ' ',
              description: ' ',
              degree: ' ',
              start: ' ',
              end: ' ',
            })
          }
          await fetchEducations()
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
      };

  return (
    <form className="py-10" onSubmit={handleSubmit}>
        <InputField label='School:' name='school' value={educationT.school} onChange={handleInputChange} />

        <InputField label='Degree:' name='degree' value={educationT.degree} onChange={handleInputChange} />

        <DateInput label='Start:' name='start' value={educationT.start} onChange={handleInputChange} />

        <DateInput label='End:' name='end' value={educationT.end} onChange={handleInputChange} />

        <InputArea label='Description' name='description' value={educationT.description} onChange={handleInputChange}/>
    

        {
          loading ? <div className="mt-10 w-full py-0 bg-slate-500 text-white/25 md:px-10 md:w-fit flex gap-5 items-center justify-center">Loading <LoadingBtn/></div> : <button type="submit" className="mt-10 w-full py-2 bg-slate-500 text-white md:px-10 md:w-fit">Submit</button>
        } 

    </form>
  )
}

export default EducationForm