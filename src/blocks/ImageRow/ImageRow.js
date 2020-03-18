import React, { useRef, useContext } from 'react'
import { HtmlTag } from '../HtmlTag/HtmlTag'
import { DataContext } from '../../components/DataContext/DataContext'

import { useRect } from '@orioro/react-util'
import { useMedia } from 'react-use'

const calculateImageDimensions = ({
  aspectRatios = [],
  availableWidth = 1000,
  targetHeight = 200,
  gap = 20,
}) => {
  const sameHeightWidths = aspectRatios.map(({ width, height }) => (targetHeight / height) * width)

  const gapsTotalWidth = (aspectRatios.length - 1) * gap
  const totalSize = sameHeightWidths.reduce((acc, width) => acc + width, 0)

  const availableWidthMinusGaps = availableWidth - gapsTotalWidth

  const multiplier = totalSize > availableWidthMinusGaps
    ? availableWidthMinusGaps / totalSize
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
  gap,
  style = {},
  direction = 'ltr',
  defaultAspectRatio = {
    width: 1,
    height: 1
  },
  Block,

  ...props
}) => {
  const isMobile = useMedia('(max-width: 600px)')
  gap = isMobile ? 15 : 20

  const shouldBeFullWidthImage = isMobile && images.length === 1

  const containerRef = useRef(null)

  const { getImageData } = useContext(DataContext)
  const { width } = useRect(containerRef)

  const aspectRatios = images.map(image => getImageData(image).aspectRatio)
  const imageDimensions = (width !== undefined)
    ? calculateImageDimensions({
        aspectRatios,
        availableWidth: width,
        targetHeight,
        gap,
      })
    : null

  const marginCSSKey = direction === 'ltr' ? 'marginLeft' : 'marginRight'

  return <HtmlTag
    {...props}
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      ...style,
      height: shouldBeFullWidthImage
        ? 'auto'
        : imageDimensions
          ? Math.min(imageDimensions[0].height, targetHeight)
          : targetHeight,
    }}
    ref={containerRef}>
    {imageDimensions && images.map(({ type, ...imageProps}, index) => {
      const width = shouldBeFullWidthImage
        ? '100%'
        : imageDimensions[index].width

      const height = shouldBeFullWidthImage
        ? 'auto'
        : imageDimensions[index].height

      return <div
        key={index}
        style={{
          [marginCSSKey]: index > 0 ? gap : 0,
          width,
        }}>
        <Block
          {...imageProps}
          type={type ? type : 'Image'}
          width={width}
          height={height}
        />
      </div>
    })}
  </HtmlTag>
}
