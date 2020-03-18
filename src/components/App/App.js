import React from 'react'
import './App.scss'

import { Block } from '../Block/Block'
import { DataContext } from '../DataContext/DataContext'
import IMAGES from '../../data/images.json'
import mediumZoom from 'medium-zoom'

const PHOTOS_ROOT_URL = process.env.REACT_APP_PHOTOS_ROOT_URL

export const App = ({
  sections
}) => {
  const zoomRef = React.useRef(mediumZoom({
    background: 'rgba(0, 0, 0, 0.9)',
    margin: 0,
    scrollOffset: 0,
  }))

  return <DataContext.Provider value={{
      zoomRef,
      resolveImageUrls: ({ id }) => ({
        placeholderSrc: `${PHOTOS_ROOT_URL}/miniature/${id}`,
        zoomSrc: `${PHOTOS_ROOT_URL}/full/${id}`,
        srcset: `${PHOTOS_ROOT_URL}/900w/${id} 900w,
          ${PHOTOS_ROOT_URL}/1400w/${id} 1400w,
          ${PHOTOS_ROOT_URL}/2000w/${id} 2000w,
          ${PHOTOS_ROOT_URL}/full/${id}`
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
