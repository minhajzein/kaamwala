import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../../layouts/AdminLayout'
import Dashboard from '../../pages/admin/dashboard/Dashboard'
import DataManage from '../../pages/admin/datamanage/DataManage'
import AreaManager from '../../pages/admin/areamanager/AreaManager'
import ViewAreaManager from '../../pages/admin/areamanager/ViewAreaManager'
import Staffs from '../../pages/admin/staffs/Staffs'
import ViewEmployee from '../../pages/areamanager/employee/ViewEmployee'
import RestaurantProfile from '../../pages/admin/restaurant/RestaurantProfile'
import Restaurant from '../../pages/admin/restaurant/Restaurant'
import AddStaffs from '../../pages/admin/staffs/AddStaffs'
import Settings from '../../pages/admin/settings/Settings'
import AdminAuth from '../auth/AdminAuth'

const AdminRoute = () => {
	return (
		<div>
			<Routes>
				<Route element={<AdminAuth />}>
					<Route path='/' element={<AdminLayout />}>
						<Route path='/' element={<Dashboard />} />
						<Route path='/datamanage' element={<DataManage />} />
						<Route path='/areamanager' element={<AreaManager />} />
						<Route
							path='/areamanager/profile/:id'
							element={<ViewAreaManager />}
						/>
						<Route path='/restaurant' element={<Restaurant />} />
						<Route
							path='/restaurant/profile/:id'
							element={<RestaurantProfile />}
						/>
						<Route path='/staffs' element={<Staffs />} />
						<Route path='/staff/add' element={<AddStaffs />} />
						<Route path='/staff/profile/:id' element={<ViewEmployee />} />
						<Route path='/settings' element={<Settings />} />
					</Route>
				</Route>
			</Routes>
		</div>
	)
}

export default AdminRoute
