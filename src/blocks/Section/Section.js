import React from 'react'
import './Section.scss'

export const Section = ({ children, ...props }) => (<section
  className='Section'
  {...props}>
  <div className='Section__Contents'>
    {children}
  </div>
</section>)
