const fs = require('fs')
const { promisify } = require('util')
const path = require('path')

const readdir = promisify(fs.readdir)
const writeFile = promisify(fs.writeFile)

const IMAGES_DIR = path.join(__dirname, '../public/photos/full')
const OUT_FILE = path.join(__dirname, '../src/data/sections-base.json')

const generateBaseConfig = async () => {
  const images = await readdir(IMAGES_DIR)

  const config = images.map(img => {
    return {
      type: 'ImageSection',
      id: img,
      imageRows: [[{
        id: img,
      }]],
      caption: img
    }
  })

  return writeFile(OUT_FILE, JSON.stringify(config, null, '  '), 'utf8')
}

generateBaseConfig()
