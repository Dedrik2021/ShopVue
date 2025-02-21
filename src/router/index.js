import {createRouter, createWebHistory} from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import SingleProductPage from '@/pages/SingleProductPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import CartPage from '@/pages/CartPage.vue'
import ShippingPage from '@/pages/ShippingPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import OrderPage from '@/pages/OrderPage.vue'
import PaymentPage from '@/pages/PaymentPage.vue'
import PlaceOrderPage from '@/pages/PlaceOrderPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
        meta: { title: 'ProShop | Home' }
    },
    {
        path: '/product/:id',
        name: 'SingleProduct',
        component: SingleProductPage,
        meta: { title: 'ProShop | Product' }
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
        meta: { title: 'ProShop | Login' }
    },
    {
        path: '/payment',
        name: 'Payment',
        component: PaymentPage,
        meta: { title: 'ProShop | Payment' }
    },
    {
        path: '/place-order',
        name: 'PlaceOrder',
        component: PlaceOrderPage,
        meta: { title: 'ProShop | Place Order' }
    },
    {
        path: '/order/:id',
        name: 'Order',
        component: OrderPage,
        meta: { title: 'ProShop | Order' }
    },
    {
        path: '/register',
        name: 'Register',
        component: LoginPage,
        meta: { title: 'ProShop | Register' }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: ProfilePage,
        meta: { title: 'ProShop | Profile' }
    },
    {
        path: '/shipping',
        name: 'Shipping',
        component: ShippingPage,
        meta: { title: 'ProShop | Shipping' }
    },
    {
        path: '/cart/:id?',
        name: 'Cart',
        component: CartPage,
        meta: { title: 'ProShop | Cart' }
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFoundPage,
        meta: { title: 'ProShop | Error 404' }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Default Title'
    next()
})

export default router