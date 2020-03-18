import React from 'react'
import './App.scss'

import { Block } from '../Block/Block'
import { DataContext } from '../DataContext/DataContext'
import IMAGES from '../../data/images.json'
import mediumZoom from 'medium-zoom'

export const App = ({
  sections
}) => {
  const zoomRef = React.useRef(mediumZoom({ background: 'rgba(0, 0, 0, 0.9)', margin: 0 }))

  return <DataContext.Provider value={{
      zoomRef,
      resolveImageUrls: ({ id }) => ({
        placeholderSrc: `photos/miniature/${id}`,
        zoomSrc: `photos/2000w/${id}`,
        srcset: `photos/900w/${id} 900w,
          photos/1400w/${id} 1400w,
          photos/2000w/${id} 2000w,
          photos/full/${id}`
      }),
      getImageData: ({ id }) => IMAGES[id]
    }}>
    <main className='App'>
      {sections.map((section, index) => (
        <Block
          key={index}
          {...section}
        />
      ))}
    </main>
  </DataContext.Provider>
}
