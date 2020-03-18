import React from 'react'

export const FigCaption = ({
  address = false,
  caption = false,

  Block,
  ...props
}) => {
  const children = [
    ...(address ? [{
      type: 'RichText',
      tagName: 'address',
      content: address
    }] : []),
    ...(caption ? [{
      type: 'RichText',
      content: caption
    }] : [])
  ]
  return <Block
    {...props}
    tagName='figcaption'
    className='RichText--figcaption'
    children={children}
  />
}
