'use client'
import React from 'react';

import Intro from './component/Intro'
import Testimonials from './component/testimonials'

const Testimonial: React.FC = () => {

  return (
    <div>
      <Intro/>
      <Testimonials/>
    </div>
  );
};

export default Testimonial;
