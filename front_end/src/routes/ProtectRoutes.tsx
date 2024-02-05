import { lazy } from 'react';
import MainLayout from '@/components/layout/MainLayout'
const Profile = lazy(() => import('@/pages/profile/Profile'))
const protectedRoutes = [
    {
        path: '/profile',
        component: <Profile/>,
        layout: MainLayout,
    },
]
export { protectedRoutes }