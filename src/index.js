import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/App/App'
import 'normalize.css/normalize.css'
import './index.scss'

import SECTIONS from './data/sections.js'
import IMAGES from './data/images.json'

const parseSections = () => SECTIONS.map(section => (section.type === 'image-section'
  ? {
    ...section,
    imageRows: section.imageRows.map(rowImages => rowImages.map(image => ({
      ...image,
      aspectRatio: IMAGES[image.id].aspectRatio,
      // data: IMAGES[image.id],
    })))
  } : section
))

ReactDOM.render(
  <App
    sections={parseSections()}
  />,
  document.getElementById('root')
)
