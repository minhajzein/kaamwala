import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

//imports..................................................................

function AdminAuth() {
	const location = useLocation()
	const token = JSON.parse(localStorage.getItem('kaamwala-token'))

	return token &&
		jwtDecode(token).role === 'admin' &&
		new Date().getTime() < jwtDecode(token).exp * 1000 ? (
		<Outlet />
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	)
}

export default AdminAuth
