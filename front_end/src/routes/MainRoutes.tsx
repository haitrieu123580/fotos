import { lazy } from 'react';
import MainLayout from '@/components/layout/MainLayout'
const Login = lazy(() => import('@/pages/login/Login'))
const Home = lazy(() => import('@/pages/home/Home'))
const publicRoutes = [
    {
        path: '/',
        component: Home,
        layout: MainLayout,
    },
    {
        path: '/login',
        component: Login,
        layout: MainLayout,
    },
]
export { publicRoutes }