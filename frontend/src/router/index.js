import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) {
      return new Promise((resolve) => {
        const check = () => {
          if (document.querySelector(to.hash)) {
            resolve({ el: to.hash, behavior: 'smooth', top: 200 })
          } else {
            requestAnimationFrame(check)
          }
        }
        check()
      })
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
        title: 'Игровой центр Тигра — детский развлекательный центр в Аше',
        description: 'Игровой центр Тигра в Аше — детский развлекательный центр с 6 игровыми зонами, батутной ареной, XBOX и банкетной комнатой. Для детей от 1 до 12 лет.',
      },
    },
    {
      path: '/attractions',
      name: 'attractions',
      component: () => import('@/pages/AttractionsPage.vue'),
      meta: {
        title: 'Аттракционы и развлечения — Игровой центр Тигра в Аше',
        description: 'Активити-парк с 6 игровыми зонами, батутная арена, бассейн с шарами, лабиринт, горки, XBOX — развлечения для детей любого возраста в центре Аши.',
      },
    },
    {
      path: '/prices',
      name: 'prices',
      component: () => import('@/pages/PricesPage.vue'),
      meta: {
        title: 'Цены — Игровой центр Тигра в Аше',
        description: 'Стоимость посещения игрового центра Тигра в Аше. Билеты на аттракционы, XBOX, праздники и дни рождения. Доступные цены для всей семьи.',
      },
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('@/pages/ContactsPage.vue'),
      meta: {
        title: 'Контакты — Игровой центр Тигра в Аше',
        description: 'Адрес: г. Аша, ул. Толстого, дом 5. Телефон: +7-912-307-08-07. Как добраться до игрового центра Тигра — карта и контактная информация.',
      },
    },
  ],
})

const defaultTitle = 'Игровой центр Тигра'

router.afterEach((to) => {
  document.title = to.meta.title || defaultTitle

  const descTag = document.querySelector('meta[name="description"]')
  if (descTag && to.meta.description) {
    descTag.setAttribute('content', to.meta.description)
  }

  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) {
    ogTitle.setAttribute('content', to.meta.title || defaultTitle)
  }

  const ogDesc = document.querySelector('meta[property="og:description"]')
  if (ogDesc && to.meta.description) {
    ogDesc.setAttribute('content', to.meta.description)
  }
})

export default router
