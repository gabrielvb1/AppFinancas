import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp'
import Login from './pages/Login/Login'
import Main from './pages/Main/Main';
import { getItem } from './utils/storage';
export default function ProjectRoutes() {
    function ProtectedRoutesById({ redirectTo }) {
        const token = getItem('token')
        return token ? <Outlet /> : <Navigate to={redirectTo} />
    }
    return (
        <Routes>
            <Route path='/' >
                <Route path='/' element={<Login />} />
                <Route path='/login' element={<Login />} />
            </Route>

            <Route element={<ProtectedRoutesById redirectTo={'/login'} />}>
                <Route path='/main' element={<Main />} />
            </Route>
            <Route path='/cadastro' element={<SignUp />} />
        </Routes>
    )

}
