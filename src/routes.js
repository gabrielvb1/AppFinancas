import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import Main from './pages/Main/Main';
import { getItem } from './utils/storage';
export default function ProjectRoutes() {
    function ProtectedRoutesByToken({ redirectTo }) {
        const token = getItem('token')
        return token ? <Outlet /> : <Navigate to={redirectTo} />
    }

    function ProtectedLogin({ redirectTo }) {
        const token = getItem('token')
        return !token ? <Outlet /> : <Navigate to={redirectTo} />
    }
    return (
        <Routes>
            <Route path='/' element={<ProtectedLogin redirectTo={'/main'}/>}>
                <Route path='/' element={<Login />} />
                <Route path='/login' element={<Login />} />
            </Route>

            <Route element={<ProtectedRoutesByToken redirectTo={'/login'} />}>
                <Route path='/main' element={<Main />} />
            </Route>

            <Route path='/cadastro' element={<SignUp />} />
        </Routes>
    )

}
