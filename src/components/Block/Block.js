import React from 'react'
import { GridContainer, GridArea } from '../../blocks/Grid/Grid'
import { Section } from '../../blocks/Section/Section'
import { Image } from '../../blocks/Image/Image'
import { ImageSection } from '../../blocks/ImageSection/ImageSection'
import { RichText } from '../../blocks/RichText/RichText'
import { HtmlTag } from '../../blocks/HtmlTag/HtmlTag'
import { FigCaption } from '../../blocks/FigCaption/FigCaption'
import { ImageRow } from '../../blocks/ImageRow/ImageRow'

const RENDERERS = {
  ImageSection,
  GridContainer,
  GridArea,
  Section,
  Image,
  RichText,
  HtmlTag,
  FigCaption,
  ImageRow
}

export const Block = ({
  type = 'HtmlTag',
  children = null,
  ...data
}) => {
  const Renderer = RENDERERS[type]

  if (!Renderer) {
    throw new Error(`Unknown component type ${type}`)
  }

  return <Renderer
    {...data}
    children={Array.isArray(children)
      ? children.map((child, index) => <Block key={index} {...child} />)
      : null}
    Block={Block}
  />
}
