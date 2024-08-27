import React, { useEffect, useState, useContext } from 'react'
import InputField from '../../../components/textInput'
import RequestClass from '../../../components/requestClass'

import AlertContext from '@/app/admin/components/context/AlertContext'
import FileInput from '../../../components/fileUpload'
import LoadingBtn from '@/app/admin/components/Loading/LoadingBtn'
import InputArea from '@/app/admin/components/textArea'
import DateInput from '@/app/admin/components/dateInput'

// degree start end school description
interface Experience {
  _id?: string,
  company: string,
  title: string,
  description: string,
  start: string,
  end: string,
}

interface ExperienceFormProp {
  experience: Experience | null,
  fetchExperiences: ()=>{}
}

const ExperienceForm: React.FC<ExperienceFormProp> = ({fetchExperiences, experience}) => {

  const context = useContext(AlertContext)


    const [experienceT, setExperienceT] = useState<Experience>({
      company: ' ',
      title: ' ',
      description: ' ',
      start: ' ',
      end: ' ',
    })

    useEffect(()=>{
        if(experience) {
          setExperienceT(experience)
        }
    }, [experience])    
    
      const requestClass = new RequestClass('/api/v1/experience')

      const [loading, setLoading] = useState<Boolean>(false);
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setExperienceT((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        const formData = new FormData();
        
        // Iterate through Education object and append each value
        for (const [key, value] of Object.entries(experienceT)) {
            formData.append(key, value);
        }
      
        setLoading(true)
        try {
          const res = experience ? await requestClass.patchRequest(formData, experience?._id) : await requestClass.postRequest(formData);
          if(context?.alert) {
            context?.setAlert({
              message: res.data.message,
              status: res.data.status
            })
          }
          if(experience) {
              setExperienceT(res.data.data)
          } else{
            setExperienceT({
              company: ' ',
              title: ' ',
              description: ' ',
              start: ' ',
              end: ' ',
            })
          }
          await fetchExperiences()
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
        <InputField label='Company:' name='company' value={experienceT.company} onChange={handleInputChange} />

        <InputField label='Title:' name='title' value={experienceT.title} onChange={handleInputChange} />

        <DateInput label='Start:' name='start' value={experienceT.start} onChange={handleInputChange} />

        <DateInput label='End:' name='end' value={experienceT.end} onChange={handleInputChange} />

        <InputArea label='Description' name='description' value={experienceT.description} onChange={handleInputChange}/>
    

        {
          loading ? <div className="mt-10 w-full py-0 bg-slate-500 text-white/25 md:px-10 md:w-fit flex gap-5 items-center justify-center">Loading <LoadingBtn/></div> : <button type="submit" className="mt-10 w-full py-2 bg-slate-500 text-white md:px-10 md:w-fit">Submit</button>
        } 

    </form>
  )
}

export default ExperienceForm