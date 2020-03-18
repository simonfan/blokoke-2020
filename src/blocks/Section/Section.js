import React from 'react'
import './Section.scss'

export const Section = ({ children }) => (<section className='Section'>
  <div className='Section__Contents'>
    {children}
  </div>
</section>)
