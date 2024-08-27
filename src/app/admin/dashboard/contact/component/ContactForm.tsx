import React, { useEffect, useState, useContext } from 'react'
import InputField from '../../../components/textInput'
import RequestClass from '../../../components/requestClass'

import AlertContext from '@/app/admin/components/context/AlertContext'
import FileInput from '../../../components/fileUpload'
import LoadingBtn from '@/app/admin/components/Loading/LoadingBtn'
import InputArea from '@/app/admin/components/textArea'


interface Contacts {
    _id?: string,
    active: boolean,
    address: string,
    contactType: string
  }

interface ContactFormProp {
  contact: Contacts,
    fetchContacts: ()=>{}
}

const ContactForm: React.FC<ContactFormProp> = ({fetchContacts, contact}) => {

  const context = useContext(AlertContext)


    const [contactT, setContactT] = useState<Contacts>({
      active: true,
      address: ' ',
      contactType: ' '
    })

    useEffect(()=>{
        if(contact) {
            setContactT(contact)
        }
    }, [contact])

    
    
      const requestClass = new RequestClass('/api/v1/contact')

      const [loading, setLoading] = useState<Boolean>(false);
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContactT({
          ...contactT,
          address: e.target.value
        });
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();

        let contactTString = JSON.stringify(contactT)

        formData.append(contactT.contactType, contactTString);        
      
        setLoading(true)
        try {
          const res = await requestClass.patchRequest(formData);
          if(context?.alert) {
            context?.setAlert({
              message: res.data.message,
              status: res.data.status
            })
          }

          for(let key in res.data.data) {
            if(key === contactT.contactType) {
              console.log(res.data.data[key])
               setContactT(
                {
                  ...res.data.data[key],
                  contactType: key
                }
              )
            }
          }
          
          fetchContacts()
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
        <InputField label='Address:' name='address' value={contactT.address} onChange={handleInputChange} /> 

        <label htmlFor='active' className="text-md font-semibold">
        <input 
          type="checkbox" 
          id='active' 
          checked={contactT.active} 
          onChange={() => setContactT((prevState) => ({ ...prevState, active: !prevState.active }))}
          className="mr-2"
        /> 
        Activate
      </label>

        {
          loading ? <div className="mt-10 w-full py-0 bg-slate-500 text-white/25 md:px-10 md:w-fit flex gap-5 items-center justify-center">Loading <LoadingBtn/></div> : <button type="submit" className="mt-10 w-full py-2 bg-slate-500 text-white md:px-10 md:w-fit">Submit</button>
        } 

    </form>
  )
}

export default ContactForm;