import React from 'react'

import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'

import { user } from '../hooks/auth'

const Routes: React.FC = () => {
    return user  ? <AppRoutes /> : <AuthRoutes />
}

export default Routes;
