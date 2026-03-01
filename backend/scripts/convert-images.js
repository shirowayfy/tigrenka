'use strict'

/**
 * Конвертирует PNG изображения в WebP формат.
 * Требуется: cwebp (установить через brew install webp)
 *
 * Запуск: node scripts/convert-images.js
 * (из директории backend/) 
 */

const path = require('path')
const fs = require('fs')
const { execSync, execFileSync } = require('child_process')

const IMAGES_DIR = path.join(__dirname, '../../frontend/src/assets/images')

// PNG → WebP конфигурация: [relPath, quality]
const CONVERSIONS = [
  // Большие изображения — quality 80
  ['tiger-banner.png', 80],
  ['tiger-attractions.png', 80],
  ['tiger-price.png', 80],
  ['tiger-form.png', 80],
  ['activity-park/1.png', 80],
  ['activity-park/2.png', 80],
  ['xbox/1.png', 80],
  ['xbox/2.png', 80],
  ['pricing/1.png', 80],
  ['pricing/2.png', 80],
  // Иконки и логотипы — quality 88-90
  ['advantages/games.png', 88],
  ['advantages/food.png', 88],
  ['advantages/zones.png', 88],
  ['advantages/room.png', 88],
  ['advantages/people.png', 88],
  ['advantages/tickets.png', 88],
  ['logo.png', 90],
  ['pav.png', 90],
  ['socials/vk.png', 88],
  ['socials/inst.png', 88],
  ['socials/tg.png', 88],
]

function checkCwebp() {
  try {
    execSync('cwebp -version', { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

function checkSharp() {
  try {
    require('sharp')
    return true
  } catch {
    return false
  }
}

async function convertWithSharp(inputPath, outputPath, quality) {
  const sharp = require('sharp')
  await sharp(inputPath).webp({ quality }).toFile(outputPath)
}

function convertWithCwebp(inputPath, outputPath, quality) {
  execFileSync('cwebp', ['-q', String(quality), inputPath, '-o', outputPath], {
    stdio: 'pipe',
  })
}

async function main() {
  console.log('🖼️  Конвертация PNG → WebP\n')

  const hasCwebp = checkCwebp()
  const hasSharp = checkSharp()

  if (!hasCwebp && !hasSharp) {
    console.error('❌ Нет инструментов конвертации.')
    console.error('   Установите один из:')
    console.error('   • cwebp:  brew install webp  (macOS)  |  apt install webp  (Ubuntu)')
    console.error('   • sharp:  npm install sharp --save-dev  (в директории backend)')
    process.exit(1)
  }

  const tool = hasCwebp ? 'cwebp' : 'sharp'
  console.log(`   Используется: ${tool}\n`)

  let converted = 0
  let skipped = 0
  let errors = 0

  for (const [relPath, quality] of CONVERSIONS) {
    const inputPath = path.join(IMAGES_DIR, relPath)
    const outputPath = path.join(IMAGES_DIR, relPath.replace(/\.png$/, '.webp'))

    if (!fs.existsSync(inputPath)) {
      console.log(`  ⚠️  Пропуск (не найден): ${relPath}`)
      skipped++
      continue
    }

    const pngSize = Math.round(fs.statSync(inputPath).size / 1024)

    process.stdout.write(`  ${relPath} (${pngSize}KB) → `)

    try {
      if (hasCwebp) {
        convertWithCwebp(inputPath, outputPath, quality)
      } else {
        await convertWithSharp(inputPath, outputPath, quality)
      }

      const webpSize = Math.round(fs.statSync(outputPath).size / 1024)
      const savings = Math.round((1 - webpSize / pngSize) * 100)
      console.log(`${webpSize}KB (-${savings}%) ✓`)
      converted++
    } catch (err) {
      console.log(`❌ Ошибка: ${err.message}`)
      errors++
    }
  }

  console.log(`\n📊 Итого: ${converted} конвертировано, ${skipped} пропущено, ${errors} ошибок`)

  if (errors > 0) {
    process.exit(1)
  }
}

main().catch(err => {
  console.error('❌', err.message)
  process.exit(1)
})
