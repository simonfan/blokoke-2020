import React, { useRef } from 'react'
import './Section.scss'

import { useWindowScroll, useWindowSize } from 'react-use'
import { useRect } from '@orioro/react-util'

export const Section = ({ Block, children, ...props }) => {
  const { y: scrollY } = useWindowScroll()
  const { height } = useWindowSize()
  const ref = useRef(null)

  // Force component to rerender upon rect changing
  useRect(ref)

  // TODO: might cause performance issues
  const top = ref.current ? window.pageYOffset + ref.current.getBoundingClientRect().top : 0

  return <section
    ref={ref}
    className={`Section ${ top < scrollY + height * 2 / 3 ? 'Section--active' : ''}`}
    {...props}>
    <div className='Section__Contents'>
      {children}
    </div>
  </section>
}
