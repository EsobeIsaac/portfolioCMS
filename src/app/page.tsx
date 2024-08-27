'use client'
import React, { useEffect, useState } from 'react'
import getWebContent from '@/app/admin/components/getWebContents'
import Image from 'next/image'
import Banner from './components/Banner'
import Clients from './components/Clients'
import Testimonial from './components/Testimonial'
import Education from './components/Education'
import Experience from './components/Experience'
import Tools from './components/Tools'
import Portfolio from './components/Portfolio'
import Services from './components/Services'
import Achievement from './components/Achievement'
import Contact from './components/Contact'
import CtaBanner from './components/CtaBanner'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer'

interface EducationInterface {
  headline: string,
  image: string,
  message: string,
  title: string,
  _id: string
}

// interface ClientInterface {
//   _id: string,
//   name: string,
//   logo: string,
// }

function Home() {
    
    const [webContent, setWebContent] = useState<any>(null)

    useEffect(()=>{
        (async() => {
          const webContentRes = await getWebContent()
          console.log(webContentRes.data)
          setWebContent(webContentRes.data)
        })()
    }, [])

    return (
        <article className=''>
            {
                webContent ? (
                  <>
                  <div className='shadow-2xl fixed w-full top-0 left-0 bg-white z-40'>
                    <NavBar logo={webContent.logo} ctaBtn={webContent.ctaBtn}/>
                  </div>
                    <Banner banner={webContent.banner} ctaBtn={webContent.ctaBtn} cv={webContent.cv}/>
                    <Clients client={webContent.client}/>
                    
                    <CtaBanner cta={webContent.cta} ctaBtn={webContent.ctaBtn} cv={webContent.cv}/>

                    <section className='bg-image'>
                      <div className='grid lg:grid-cols-3 md:grid-cols-3 gap-5 max-w-[1200px] px-[3%] pt-40 pb-20 mx-auto items-start '>
                      <div>
                        <Education education={webContent.education}/>
                      </div>
                      <div>
                        <Experience experience={webContent.experience}/>
                      </div>
                      <div>
                        <Tools tool={webContent.tools}/>
                      </div>
                    </div>
                    </section>


                    <Portfolio portfolio={webContent.portfolio} ctaBtn={webContent.ctaBtn}/>

                    <section className=''>
                    <Services service={webContent.service} ctaBtn={webContent.ctaBtn}/>
                    </section>


                    <section className=' bg-image'>
                    <Testimonial testimonial={webContent.testimonial} />
                    </section>
                    
                    <Achievement achievement={webContent.achievement}/>

                    <section className=' bg-image'>
                    <Contact contact={webContent.contact} ctaBtn={webContent.ctaBtn}/>
                    </section>

                    <Footer/>
                  </>
                ) : null
            }
        </article>
    )
}

export default Home