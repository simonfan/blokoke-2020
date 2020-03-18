import React from 'react'
import './RichText.scss'
import Markdown from 'react-markdown'
import { HtmlTag } from '../HtmlTag/HtmlTag'

export const RichText = ({
  tagName = 'div',
  className,
  content,
}) => (<HtmlTag
  tagName={tagName}
  className={`RichText ${className ? className : ''}`}>
  <Markdown source={content} />
</HtmlTag>)
