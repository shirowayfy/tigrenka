'use strict'

/**
 * Seed script — заполняет базу данных Strapi начальными данными.
 *
 * Запуск: node scripts/seed.js
 * (из директории backend/) 
 *
 * Скрипт загружает Strapi программно, заливает WebP-изображения
 * из frontend/src/assets/images/ и создаёт все записи контента.
 * Если данные уже существуют — пропускает заполнение.
 */

const path = require('path')
const fs = require('fs')

// Путь к изображениям во frontend
const IMAGES_DIR = path.join(__dirname, '../../frontend-astro/src/assets/images')

// ─── Данные для заполнения ───────────────────────────────────────────────────

const SEED_DATA = {
  homePage: {
    bannerTitle: 'Игровая Тигра: Отдохни по полной — приключения оживают здесь!',
    bannerButtonText: 'В центре Аши',
    bannerButtonLink: '/contacts',
    bannerImage: 'tiger-banner.webp',
    featuredLabel: 'Найдите развлечения по душе',
    featuredItem1Title: 'Активити парк',
    featuredItem1Text: '6 игровых зон для разных возрастов',
    featuredItem1Link: '/attractions#activity-park',
    featuredItem2Title: 'XBOX',
    featuredItem2Text: 'Это портал в многоуровневую реальность, где стираются границы.',
    featuredItem2Link: '/attractions#xbox',
  },

  attractionsPage: {
    bannerTitle: 'Развлечения и аттракционы в Игровой Тигра',
    bannerText: 'Для любого возраста от 1 до 99 лет',
    bannerButtonText: 'В центре Аши',
    bannerButtonLink: '/contacts',
    bannerImage: 'tiger-attractions.webp',
    activityParkLabel: 'Для разных возрастов',
    activityParkNumber: '6',
    activityParkUnit: 'игровых зон',
    activityParkDescription:
      'Большой лабиринт, домики на столбах, горки, батутная арена, бассейн с шарами, мячи, конструктор, модули, качели',
    activityParkImage1: 'activity-park/1.webp',
    activityParkImage2: 'activity-park/2.webp',
    xboxDescription:
      'Современная арена, где каждая деталь, каждый звук и каждое движение становятся частью вашей захватывающей истории',
    xboxFeatures:
      'Бесшовная реакция\nпространственный звук\nэмоциональный драйв\nкомандные игры до 8 человек\n13 вариантов игры от 6 до 99 лет',
    xboxImage1: 'xbox/2.webp',
    xboxImage2: 'xbox/1.webp',
  },

  pricesPage: {
    bannerTitle: 'Цены в Игровой Тигра',
    bannerImage: 'tiger-price.webp',
    introText1:
      'Яркие шоу, весёлые аниматоры, захватывающие аттракционы — ваш праздник станет незабываемым приключением для детей и спокойным отдыхом для родителей.',
    introText2:
      'Гарантируем: безопасность, радость и море эмоций, которые останутся в памяти надолго!',
    pricingImage1: 'pricing/2.webp',
    pricingImage2: 'pricing/1.webp',
  },

  footer: {
    phone: '+7-912-307-08-07',
    address: 'город Аша, ул. Толстова, дом 5',
    copyright: '©2025 TigraIgra',
    vkLink: 'https://vk.com/ashatigra',
    instagramLink: '#',
    telegramLink: '#',
  },

  contactsPage: {
    address: '456010, город Аша, ул. Толстова, д. 5',
    phone: '8 (912) 307-08-07',
    vkLink: 'https://vk.com/ashatigra',
    collaborationText: 'Мы всегда открыты для предложений и сотрудничества!',
    socialText: 'Будьте всегда в центре новостей, узнавайте первыми о наших акциях и скидках.',
    offerLink: '#',
  },

  mapSection: {
    title: 'Где мы находимся',
    subtitle: 'Как нас найти?',
    embedUrl:
      'https://yandex.ru/map-widget/v1/?um=constructor%3A&source=constructorStatic&ll=57.279484%2C54.990757&z=17&pt=57.279484%2C54.990757%2Cpm2rdm',
  },

  advantageCards: [
    { label: 'Яркое игровое пространство', number: '180', unit: 'кв. м', largeIcon: false, order: 1, image: 'advantages/room.webp' },
    { label: '1 банкетная комната для компаний', number: '10', unit: 'человек', largeIcon: false, order: 2, image: 'advantages/people.webp' },
    { label: '6 игровых зон для детей от 1 года', number: '12', unit: 'лет', largeIcon: false, order: 3, image: 'advantages/zones.webp' },
    { label: 'Разрешаем праздники со своей едой и напитками', number: '', unit: '', largeIcon: false, order: 4, image: 'advantages/food.webp' },
    { label: 'XBOX: не просто игра. от 6 до 99 лет', number: '', unit: '', largeIcon: false, order: 5, image: 'advantages/games.webp' },
    { label: 'Стоимость билетов', number: '', unit: '', largeIcon: true, order: 6, image: 'advantages/tickets.webp' },
  ],

  reviews: [
    {
      text: 'Отличный детский игровой центр! Ребёнка было просто невозможно утащить 😄 Всё чисто, ярко, безопасно, куча развлечений на любой возраст. Персонал очень внимательный и доброжелательный — чувствуется, что детей тут реально любят, а не «отрабатывают смену». Родителям тоже комфортно: можно спокойно посидеть и выдохнуть, пока дети счастливы.',
      author: 'Анастасия К.',
      date: '28 декабря 2025',
      order: 1,
    },
    {
      text: 'Замечательное место для детей. Видно, что продуманный дизайн, разнообразные активности и всё аккуратно. Сотрудники следят за порядком. Ребёнок в восторге, обязательно будем приходить ещё!',
      author: 'Марина С.',
      date: '15 января 2026',
      order: 2,
    },
    {
      text: 'Были с двумя детьми, оба остались довольны! Младшему 3 года, старшему 8 — каждому нашлось занятие. Очень понравилась чистота и организация пространства. Цены адекватные, персонал приветливый. Рекомендую!',
      author: 'Елена П.',
      date: '5 февраля 2026',
      order: 3,
    },
    {
      text: 'Ходим сюда регулярно, дети просто обожают это место. Всегда чисто, безопасно, аниматоры на высоте. Отдельное спасибо за зону для родителей — можно спокойно попить кофе!',
      author: 'Ольга В.',
      date: '10 февраля 2026',
      order: 4,
    },
    {
      text: 'Прекрасный игровой центр! Ребёнок не хотел уходить. Много разных зон, всё продумано до мелочей. Персонал очень дружелюбный. Обязательно вернёмся!',
      author: 'Наталья Д.',
      date: '20 января 2026',
      order: 5,
    },
  ],

  faqs: [
    {
      question: 'Бывают ли у вас скидки?',
      answer: 'Да! Мы регулярно проводим акции и скидки для постоянных клиентов. Следите за нашими соцсетями.',
      order: 1,
    },
    {
      question: 'Какие праздники у нас проводятся?',
      answer: 'Мы проводим дни рождения, выпускные, корпоративы и тематические праздники для детей и взрослых.',
      order: 2,
    },
    {
      question: 'Какие скидки есть на выходные?',
      answer: 'На выходные действуют специальные семейные тарифы и скидки для именинников.',
      order: 3,
    },
    {
      question: 'Какой график работы?',
      answer: 'Мы работаем ежедневно с 10:00 до 21:00 без перерывов и выходных.',
      order: 4,
    },
    {
      question: 'Есть ли у вас Labubu?',
      answer: 'Да! У нас есть коллекция Labubu в нашем магазине игрушек.',
      order: 5,
    },
    {
      question: 'Что такое XBOX?',
      answer:
        'XBOX — это портал в многоуровневую реальность, где стираются границы. Игровые приставки с большим выбором игр для всех возрастов.',
      order: 6,
    },
  ],

  teamMembers: [
    { name: 'Светлана Иванова', description: '10+ лет опыта работы с детьми по воспитанию и заботы', order: 1 },
    { name: 'Мария Волкова', description: '10+ лет опыта работы с детьми по воспитанию и заботы', order: 2 },
    { name: 'Дарья Новикова', description: '10+ лет опыта работы с детьми по воспитанию и заботы', order: 3 },
    { name: 'Ксения Морозова', description: '10+ лет опыта работы с детьми по воспитанию и заботы', order: 4 },
    { name: 'Диана Лебедева', description: '10+ лет опыта работы с детьми по воспитанию и заботы', order: 5 },
  ],

  pricingCards: [
    {
      badge: 'Активити парк',
      title: 'Будни и выходные',
      content: '1 час - 350 рублей\nдоп. час - 150 рублей\nгруппа от 2 человек 1 час - 300 рублей\nдоп. час - 150 рублей',
      order: 1,
    },
    {
      badge: 'День рождения',
      title: 'Будни и выходные',
      content: '1 час - 250 рублей\nдоп. час - 100 рублей',
      order: 2,
    },
  ],
}

// ─── Вспомогательные функции ─────────────────────────────────────────────────

/**
 * Загружает файл изображения через Strapi Upload Service.
 * @param {object} strapi - экземпляр Strapi
 * @param {string} relPath - путь относительно IMAGES_DIR
 * @returns {object} - загруженный объект файла
 */
async function uploadImage(strapi, relPath) {
  const filePath = path.join(IMAGES_DIR, relPath)

  if (!fs.existsSync(filePath)) {
    throw new Error(`Файл не найден: ${filePath}`)
  }

  const fileName = path.basename(relPath)
  const ext = path.extname(fileName).toLowerCase()
  const mimeTypes = {
    '.webp': 'image/webp',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
  }
  const mimeType = mimeTypes[ext] || 'image/webp'
  const stats = fs.statSync(filePath)

  const uploadService = strapi.plugin('upload').service('upload')
  const [file] = await uploadService.upload({
    data: {
      fileInfo: { name: fileName, caption: '', alternativeText: '' },
    },
    files: {
      name: fileName,
      type: mimeType,
      size: stats.size / 1024,
      path: filePath,
    },
  })

  return file
}

/**
 * Загружает все нужные изображения и возвращает словарь {relPath: fileId}.
 */
async function uploadAllImages(strapi) {
  const imageFiles = [
    'tiger-banner.webp',
    'tiger-attractions.webp',
    'tiger-price.webp',
    'activity-park/1.webp',
    'activity-park/2.webp',
    'xbox/1.webp',
    'xbox/2.webp',
    'pricing/1.webp',
    'pricing/2.webp',
    'advantages/room.webp',
    'advantages/people.webp',
    'advantages/zones.webp',
    'advantages/food.webp',
    'advantages/games.webp',
    'advantages/tickets.webp',
  ]

  const images = {}
  for (const imgPath of imageFiles) {
    process.stdout.write(`  Загрузка ${imgPath}... `)
    const file = await uploadImage(strapi, imgPath)
    images[imgPath] = file.id
    console.log(`✓ (id: ${file.id})`)
  }
  return images
}

// ─── Заполнение контента ─────────────────────────────────────────────────────

async function seedAll(strapi) {
  // Проверяем, есть ли уже данные (по home-page как индикатор)
  const existingFiles = await strapi.db.query('plugin::upload.file').count()
  if (existingFiles > 0) {
    console.log('⚠️  В базе уже есть данные. Пропускаем заполнение.')
    console.log('   Для принудительного пересоздания удалите файл .tmp/data.db и запустите снова.')
    return
  }

  console.log('\n📦 Загружаем изображения...')
  const images = await uploadAllImages(strapi)

  console.log('\n📝 Создаём записи контента...')

  // Home Page
  await strapi.entityService.create('api::home-page.home-page', {
    data: {
      ...SEED_DATA.homePage,
      bannerImage: images[SEED_DATA.homePage.bannerImage],
    },
  })
  console.log('  ✓ Home Page')

  // Attractions Page
  await strapi.entityService.create('api::attractions-page.attractions-page', {
    data: {
      ...SEED_DATA.attractionsPage,
      bannerImage: images[SEED_DATA.attractionsPage.bannerImage],
      activityParkImage1: images[SEED_DATA.attractionsPage.activityParkImage1],
      activityParkImage2: images[SEED_DATA.attractionsPage.activityParkImage2],
      xboxImage1: images[SEED_DATA.attractionsPage.xboxImage1],
      xboxImage2: images[SEED_DATA.attractionsPage.xboxImage2],
    },
  })
  console.log('  ✓ Attractions Page')

  // Prices Page
  await strapi.entityService.create('api::prices-page.prices-page', {
    data: {
      ...SEED_DATA.pricesPage,
      bannerImage: images[SEED_DATA.pricesPage.bannerImage],
      pricingImage1: images[SEED_DATA.pricesPage.pricingImage1],
      pricingImage2: images[SEED_DATA.pricesPage.pricingImage2],
    },
  })
  console.log('  ✓ Prices Page')

  // Footer
  await strapi.entityService.create('api::footer.footer', {
    data: SEED_DATA.footer,
  })
  console.log('  ✓ Footer')

  // Contacts Page
  await strapi.entityService.create('api::contacts-page.contacts-page', {
    data: SEED_DATA.contactsPage,
  })
  console.log('  ✓ Contacts Page')

  // Map Section
  await strapi.entityService.create('api::map-section.map-section', {
    data: SEED_DATA.mapSection,
  })
  console.log('  ✓ Map Section')

  // Advantage Cards
  for (const card of SEED_DATA.advantageCards) {
    await strapi.entityService.create('api::advantage-card.advantage-card', {
      data: {
        label: card.label,
        number: card.number || null,
        unit: card.unit || null,
        largeIcon: card.largeIcon,
        order: card.order,
        image: images[card.image],
      },
    })
  }
  console.log(`  ✓ Advantage Cards (${SEED_DATA.advantageCards.length} шт.)`)

  // Reviews
  for (const review of SEED_DATA.reviews) {
    await strapi.entityService.create('api::review.review', { data: review })
  }
  console.log(`  ✓ Reviews (${SEED_DATA.reviews.length} шт.)`)

  // FAQs
  for (const faq of SEED_DATA.faqs) {
    await strapi.entityService.create('api::faq.faq', { data: faq })
  }
  console.log(`  ✓ FAQs (${SEED_DATA.faqs.length} шт.)`)

  // Team Members
  for (const member of SEED_DATA.teamMembers) {
    await strapi.entityService.create('api::team-member.team-member', { data: member })
  }
  console.log(`  ✓ Team Members (${SEED_DATA.teamMembers.length} шт.)`)

  // Pricing Cards
  for (const card of SEED_DATA.pricingCards) {
    await strapi.entityService.create('api::pricing-card.pricing-card', { data: card })
  }
  console.log(`  ✓ Pricing Cards (${SEED_DATA.pricingCards.length} шт.)`)

  console.log('\n✅ База данных успешно заполнена!\n')
}

// ─── Настройка прав доступа ──────────────────────────────────────────────────

/**
 * Выдаёт роли Public разрешения на чтение всех API-эндпоинтов.
 * Идемпотентна — безопасно запускать повторно.
 */
async function setupPermissions(strapi) {
  console.log('\n🔐 Настройка прав доступа...')

  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  })

  if (!publicRole) {
    console.error('  ❌ Роль Public не найдена')
    return
  }

  const actionsToEnable = [
    // Single types
    'api::footer.footer.find',
    'api::home-page.home-page.find',
    'api::attractions-page.attractions-page.find',
    'api::prices-page.prices-page.find',
    'api::contacts-page.contacts-page.find',
    'api::map-section.map-section.find',
    // Collection types
    'api::advantage-card.advantage-card.find',
    'api::advantage-card.advantage-card.findone',
    'api::review.review.find',
    'api::review.review.findone',
    'api::faq.faq.find',
    'api::faq.faq.findone',
    'api::team-member.team-member.find',
    'api::team-member.team-member.findone',
    'api::pricing-card.pricing-card.find',
    'api::pricing-card.pricing-card.findone',
    // Contact form
    'api::contact-submission.contact-submission.create',
  ]

  const existingPermissions = await strapi.query('plugin::users-permissions.permission').findMany({
    where: { role: publicRole.id },
  })
  const existingMap = new Map(existingPermissions.map(p => [p.action, p]))

  let created = 0
  for (const action of actionsToEnable) {
    const existing = existingMap.get(action)
    if (!existing) {
      await strapi.query('plugin::users-permissions.permission').create({
        data: { action, enabled: true, role: publicRole.id },
      })
      created++
    } else if (!existing.enabled) {
      await strapi.query('plugin::users-permissions.permission').update({
        where: { id: existing.id },
        data: { enabled: true },
      })
      created++
    }
  }

  const skipped = actionsToEnable.length - created
  console.log(`  ✓ Разрешения: ${created} создано/обновлено, ${skipped} уже настроены`)
  console.log('\n✅ Права доступа настроены!\n')
}

// ─── Точка входа ─────────────────────────────────────────────────────────────

async function main() {
  console.log('🚀 Запуск seed-скрипта...')
  console.log(`   Изображения: ${IMAGES_DIR}`)

  // Проверяем наличие WebP файлов
  const requiredImages = [
    'tiger-banner.webp', 'tiger-attractions.webp', 'tiger-price.webp',
    'activity-park/1.webp', 'activity-park/2.webp',
    'xbox/1.webp', 'xbox/2.webp',
    'pricing/1.webp', 'pricing/2.webp',
    'advantages/room.webp', 'advantages/people.webp', 'advantages/zones.webp',
    'advantages/food.webp', 'advantages/games.webp', 'advantages/tickets.webp',
  ]
  const missing = requiredImages.filter(f => !fs.existsSync(path.join(IMAGES_DIR, f)))
  if (missing.length > 0) {
    console.error('\n❌ Не найдены WebP изображения:')
    missing.forEach(f => console.error(`   - ${f}`))
    console.error('\n   Запустите сначала: npm run convert-images')
    process.exit(1)
  }

  // Загружаем Strapi программно
  const strapiFactory = require('@strapi/strapi')
  const app = strapiFactory({ appDir: path.join(__dirname, '..') })

  try {
    console.log('\n⏳ Инициализация Strapi...')
    await app.load()
    console.log('✓ Strapi загружен\n')
    await seedAll(app)
    await setupPermissions(app)
  } catch (err) {
    console.error('\n❌ Ошибка:', err.message)
    console.error(err.stack)
    process.exit(1)
  } finally {
    await app.destroy()
  }
}

main()
