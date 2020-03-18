import React from 'react'

export const HtmlTag = React.forwardRef(({
  tagName = 'div',
  children,
  Block,
  ...props
}, ref) => {
  const Tag = tagName

  return <Tag {...props} ref={ref}>
    {children}
  </Tag>
})
