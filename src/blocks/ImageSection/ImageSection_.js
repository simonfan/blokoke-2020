import React from 'react'
import { Section } from '../Section/Section'
import { GridContainer, GridArea } from '../Grid/Grid'
import { ImageRow } from '../ImageRow/ImageRow'
import { FigCaption } from '../FigCaption/FigCaption'

import { useMedia } from 'react-use'

import { useRect } from '@orioro/react-util'

export const ImageSection = ({
  imageRows,
  address,
  caption,
  Block,
}) => {
  const isMobile = useMedia('(max-width: 600px)')

  return <Block
    type='Section'
    children={[
      {
        "type": "GridContainer",
        "tagName": "figure",
        "columns": [
          "repeat(12, 1fr)"
        ],
        "rows": ["auto"],
        "children": [
          {
            "type": "GridArea",
            "columnStart": 1,
            "columnEnd": isMobile ? 13 : 11,
            "children": imageRows.map((imageRow, index) => ({
              type: 'ImageRow',
              images: imageRow,
              targetHeight: .8 * window.innerHeight,
              style: {
                marginTop: index > 0 ? 20 : 0,
                justifyContent: 'center',
              }
            }))
          },
          {
            "type": "GridArea",
            "rowStart": isMobile ? 2 : 1,
            "rowEnd": isMobile ? 3 : 2,
            "columnStart": isMobile ? 1 : 11,
            "columnEnd": 13,
            "style": {
              "display": "flex",
              "flexDirection": "column",
              "justifyContent": "flex-end"
            },
            "children": [
              {
                "type": "FigCaption",
                "address": address,
                "caption": caption
              }
            ]
          }
        ]
      }
    ]}
  />
}
