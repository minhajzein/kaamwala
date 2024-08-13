import { jwtDecode } from 'jwt-decode'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

//imports...................................................................

function PublicRoute() {
	const location = useLocation()
	const token = JSON.parse(localStorage.getItem('kaamwala-token'))
	return token &&
		new Date().getTime() < jwtDecode(token).exp * 1000 &&
		jwtDecode(token).role === 'admin' ? (
		<Navigate to='/admin' state={{ from: location }} replace />
	) : token &&
	  new Date().getTime() < jwtDecode(token).exp * 1000 &&
	  jwtDecode(token).role === 'area-manager' ? (
		<Navigate to='/area-manager' state={{ from: location }} replace />
	) : (
		<Outlet />
	)
}

export default PublicRoute
