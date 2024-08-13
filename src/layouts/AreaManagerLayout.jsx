import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AreaManagerSidebar from '../components/sidebar/AreaManagerSidebar'

const AreaManagerLayout = type => {
	return (
		<div className='h-screen flex '>
			<AreaManagerSidebar className='transition-all duration-300 ' />
			<div className='flex flex-col flex-grow  h-screen  overflow-hidden '>
				<div className='flex-grow overflow-y-auto no-scrollbar overflow-x-auto h-full mainClr m-5 rounded-2xl rounded-l-none ml-0 border '>
					<Navbar type={'areamanager'} className='  z-50 ' />
					<div className='p-5 '>
						<Outlet className='h-dvh' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default AreaManagerLayout
