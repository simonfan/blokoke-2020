import React, { useState, useRef, useContext } from 'react'
import { HtmlTag } from '../HtmlTag/HtmlTag'
import { DataContext } from '../../components/DataContext/DataContext'

import { useRect } from '@orioro/react-util'
import { useDebounce } from 'react-use'

const calculateImageDimensions = ({
  aspectRatios = [],
  availableWidth = 1000,
  targetHeight = 200,
  gap = 20,
}) => {
  const sameHeightWidths = aspectRatios.map(({ width, height }) => (targetHeight / height) * width)

  const totalSize = sameHeightWidths.reduce((acc, width) => acc + width, 0) + (aspectRatios.length - 1) * gap

  const multiplier = totalSize > availableWidth
    ? availableWidth / totalSize
    : 1

  return sameHeightWidths.map((w, index) => {
    const aspectRatio = aspectRatios[index]
    const width = w * multiplier
    const height = width * (aspectRatio.height / aspectRatio.width)

    return {
      width,
      height
    }
  })
}

export const ImageRow = ({
  images,
  targetHeight = 200,
  gap = 20,
  style = {},
  direction = 'ltr',
  defaultAspectRatio = {
    width: 1,
    height: 1
  },
  Block,

  ...props
}) => {
  const containerRef = useRef(null)

  const { getImageData } = useContext(DataContext)
  const [imageDimensions, setImageDimensions] = useState(null)
  const { width, height } = useRect(containerRef)

  const aspectRatios = images.map(image => getImageData(image).aspectRatio)


  useDebounce(() => {
    setImageDimensions(
      (width && height)
        ? calculateImageDimensions({
            aspectRatios,
            availableWidth: width,
            targetHeight: height,
            gap,
          })
        : null
    )
  }, 1000, [width, height, aspectRatios, gap, calculateImageDimensions])

  const marginCSSKey = direction === 'ltr' ? 'marginLeft' : 'marginRight'

  return <HtmlTag
    {...props}
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      ...style,
      height: imageDimensions
        ? Math.min(imageDimensions[0].height, targetHeight)
        : targetHeight,
    }}
    ref={containerRef}>
    {imageDimensions && images.map(({ type, ...imageProps}, index) => <div
      style={index > 0 ? {
        [marginCSSKey]: gap,
      } : {}}>
      <Block
        {...imageProps}
        key={index}
        type={type ? type : 'Image'}
        width={imageDimensions[index].width}
        height={imageDimensions[index].height}
      />
    </div>)}
  </HtmlTag>
}
