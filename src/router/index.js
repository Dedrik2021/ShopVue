import {createRouter, createWebHistory} from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import SingleProductPage from '@/pages/SingleProductPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import CartPage from '@/pages/CartPage.vue'
import CheckoutPage from '@/pages/CheckoutPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/product/:id',
        name: 'SingleProduct',
        component: SingleProductPage
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/register',
        name: 'Register',
        component: LoginPage
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: CheckoutPage
    },
    {
        path: '/cart/:id?',
        name: 'Cart',
        component: CartPage
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFoundPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router