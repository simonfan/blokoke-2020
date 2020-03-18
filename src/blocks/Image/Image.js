import React, { useContext } from 'react'
import { DataContext } from '../../components/DataContext/DataContext'
import 'lazysizes'
import 'lazysizes/plugins/attrchange/ls.attrchange'

const ImageZoom = ({ zoom, alt, ...props }) => {
  const zoomRef = React.useRef(zoom.clone())

  const attachZoom = image => {
    zoomRef.current.attach(image)
  }

  return <img
    {...props}
    alt={alt}
    ref={attachZoom}
  />
}

export const Image = ({
  Block,
  onLoad,
  ...props
}) => {
  const { resolveImageUrls, zoomRef } = useContext(DataContext)
  const { srcset, zoomSrc, placeholderSrc } = resolveImageUrls(props)

  return <ImageZoom
    {...props}
    className='lazyload'
    src={placeholderSrc}
    data-srcset={srcset}
    data-zoom-src={zoomSrc}
    onLoad={onLoad}
    zoom={zoomRef.current}
  />
}
