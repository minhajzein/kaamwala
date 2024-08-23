import { Route, Routes } from 'react-router-dom'
import Dashboard from '../../pages/areamanager/dashboard/Dashboard'
import Profile from '../../pages/areamanager/profile/Profile'
import Employee from '../../pages/areamanager/employee/Employee'
import AreaManagerLayout from '../../layouts/AreaManagerLayout'
import Settings from '../../pages/areamanager/settings/Settings'
import Restaurant from '../../pages/areamanager/restaurant/Restaurant'
import RestaurantProfile from '../../pages/admin/restaurant/RestaurantProfile'
import ViewEmployee from '../../pages/areamanager/employee/ViewEmployee'
import AreaManagerAuth from '../auth/AreaManagerAuth'

//imports........................................................................................

const AreaManagerRoute = () => {
	return (
		<div>
			<Routes>
				<Route element={<AreaManagerAuth />}>
					<Route path='/' element={<AreaManagerLayout />}>
						<Route path='/' element={<Dashboard />} />
						<Route path='/restaurant' element={<Restaurant />} />
						<Route
							path='/restaurant/profile/:id'
							element={<RestaurantProfile />}
						/>
						<Route path='/profile' element={<Profile />} />
						<Route path='/employee' element={<Employee />} />
						<Route path='/employee/profile/:id' element={<ViewEmployee />} />
						<Route path='/settings' element={<Settings />} />
					</Route>
				</Route>
			</Routes>
		</div>
	)
}

export default AreaManagerRoute
