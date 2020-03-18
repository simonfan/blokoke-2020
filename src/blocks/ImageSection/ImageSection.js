import React from 'react'
import { useMedia } from 'react-use'

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
        "rowGap": isMobile ? '15px' : '20px',
        "columnGap": isMobile ? '15px' : '20px',
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
              images: imageRow.map(image => ({
                alt: caption,
                ...image
              })),
              targetHeight: .8 * window.innerHeight,
              style: {
                marginTop: index > 0
                  ? isMobile ? 15 : 20
                  : 0,
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
