const fs = require('fs')
const { promisify } = require('util')
const path = require('path')
const imageSize = require('image-size')

const gcd = (a, b) => {
  return b
    ? gcd(b, a % b)
    : a;
}

const readdir = promisify(fs.readdir)
const writeFile = promisify(fs.writeFile)

const IMAGES_DIR = path.join(__dirname, '../public/photos/full')
const OUT_FILE = path.join(__dirname, '../src/data/images.json')

const generateImageData = async () => {
  const images = await readdir(IMAGES_DIR)

  const IMAGE_DATA = images.reduce((acc, fileName) => {
    const { width, height } = imageSize(path.join(IMAGES_DIR, fileName))

    const divisor = gcd(width, height)

    return {
      ...acc,
      [fileName]: {
        fileName,
        orientation: width > height ? 'horizontal' : 'vertical',
        aspectRatio: {
          width: width / divisor,
          height: height / divisor
        }
      }
    }
  }, {})

  return writeFile(OUT_FILE, JSON.stringify(IMAGE_DATA, null, '  '), 'utf8')
}

generateImageData()
