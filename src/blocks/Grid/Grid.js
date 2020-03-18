import React from 'react'
import './Grid.scss'
import { HtmlTag } from '../HtmlTag/HtmlTag'

export const GridArea = ({
  tagName = 'div',
  children,
  columnStart = 1,
  columnEnd = 1,
  rowStart = 1,
  rowEnd = 1,

  style = {}
}) => (<HtmlTag
  tagName={tagName}
  className='GridArea'
  style={{
    ...style,
    gridColumnStart: columnStart,
    gridColumnEnd: columnEnd,
    gridRowStart: rowStart,
    gridRowEnd: rowEnd
  }}>
  {children}
</HtmlTag>)

export const GridContainer = ({
  tagName = 'div',
  columns,
  rows,
  rowGap = '20px',
  columnGap = '20px',
  children,
}) => <HtmlTag
  tagName={tagName}
  className='GridContainer'
  style={{
    gridTemplateColumns: columns.join(' '),
    gridTemplateRows: rows.join(' '),
    rowGap,
    columnGap,
  }}>
  {children}
</HtmlTag>
