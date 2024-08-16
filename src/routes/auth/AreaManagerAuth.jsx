import { jwtDecode } from 'jwt-decode'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

//imports..................................................................

function AreaManagerAuth() {
	const location = useLocation()
	const token = JSON.parse(localStorage.getItem('kaamwala-token'))

	return token &&
		jwtDecode(token).role === 'area_manager' &&
		new Date().getTime() < jwtDecode(token).exp * 1000 ? (
		<Outlet />
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	)
}

export default AreaManagerAuth
