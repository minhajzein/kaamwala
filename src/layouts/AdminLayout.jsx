import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/sidebar/AdminSidebar'
import Navbar from '../components/Navbar'

const AdminLayout = type => {
	return (
		<div className='h-screen flex'>
			<AdminSidebar className='transition-all duration-300 ' />
			<div className='flex flex-col flex-grow h-screen overflow-hidden'>
				<div className='flex-grow overflow-y-auto overflow-x-auto h-full no-scrollbar mainClr md:m-5 rounded-2xl  rounded-l-none ml-0 border '>
					<Navbar type={type} className='z-50' />
					<div className='md:p-2 md:px-4 '>
						<Outlet className='h-dvh' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminLayout
