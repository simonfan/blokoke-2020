const fs = require('fs')
const { promisify } = require('util')
const path = require('path')
const sharp = require('sharp')
const mkdirp = promisify(require('mkdirp'))

const readdir = promisify(fs.readdir)

const SRC_DIR = process.env.PHOTOS_SRC_DIR
const OUT_DIR = path.join(__dirname, '../public/photos')

const IMAGE_RE = /(\.JPG$|\.jpg$)/

const generateImages = async imageName => {
  const imagePath = path.join(SRC_DIR, imageName)

  const image = sharp(imagePath).rotate()

  return Promise.all([
    // Full
    image
      .clone()
      .toFile(path.join(OUT_DIR, 'full', imageName)),
    // Miniature
    image
      .clone()
      .resize({ width: 50, height: 50, fit: 'inside' })
      .toFile(path.join(OUT_DIR, 'miniature', imageName)),
    // 900w
    image
      .clone()
      .resize({ width: 900, height: 900, fit: 'inside' })
      .toFile(path.join(OUT_DIR, '900w', imageName)),
    // 1400w
    image
      .clone()
      .resize({ width: 1400, height: 1400, fit: 'inside' })
      .toFile(path.join(OUT_DIR, '1400w', imageName)),
    // 2000w
    image
      .clone()
      .resize({ width: 2000, height: 2000, fit: 'inside' })
      .toFile(path.join(OUT_DIR, '2000w', imageName)),
  ])

}

const prepareImages = async () => {
  await Promise.all([
    mkdirp(path.join(OUT_DIR, 'full')),
    mkdirp(path.join(OUT_DIR, 'miniature')),
    mkdirp(path.join(OUT_DIR, '900w')),
    mkdirp(path.join(OUT_DIR, '1400w')),
    mkdirp(path.join(OUT_DIR, '2000w')),
  ])

  const images = await readdir(SRC_DIR)

  return images.filter(image => IMAGE_RE.test(image)).reduce((prev, image) => prev.then(() => {
    const imagePath = path.join(SRC_DIR, image)

    console.log(`start preparing ${image}`)

    return generateImages(image)
      .then(() => console.log(`prepared ${image}`))
  }), Promise.resolve())
}

prepareImages()
