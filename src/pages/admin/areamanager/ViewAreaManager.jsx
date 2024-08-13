import {
	MdMyLocation,
	MdOutlineMailOutline,
	MdSmartphone,
} from 'react-icons/md'
import { FaGraduationCap } from 'react-icons/fa'
import EmployeeCard from '../../../components/common/EmployeeCard'

//imports................................................................................................

const ViewAreaManager = () => {
	const employee = [
		{
			name: 'Muhammed Shaikh Zahid U',
			position: 'Master Chef',
			phone: '9207738383',
			skills: ['Shawarma Maker', 'Chinese Food', 'Arabic Dish'],
		},
		{
			name: 'Muhammed Shaikh Zahid U',
			position: 'Master Chef',
			phone: '9207738383',
			skills: ['Shawarma Maker', 'Chinese Food', 'Arabic Dish'],
		},
		{
			name: 'Muhammed Shaikh Zahid U',
			position: 'Master Chef',
			phone: '9207738383',
			skills: ['Shawarma Maker', 'Chinese Food', 'Arabic Dish'],
		},
	]
	const restaurants = [
		{
			name: 'Gourmet Bistro',
			owner: 'John Doe',
			phone: '123-456-7890',
			location: '123 Food Street, Flavor Town',
			email: 'contact@gourmetbistro.com',
		},
		{
			name: 'Italian Delight',
			owner: 'Jane Smith',
			phone: '987-654-3210',
			location: '456 Pasta Avenue, Flavor Town',
			email: 'info@italiandelight.com',
		},
		{
			name: 'Sushi Central',
			owner: 'Kenji Tanaka',
			phone: '555-666-7777',
			location: '789 Sashimi Road, Flavor Town',
			email: 'support@sushicentral.com',
		},
	]
	return (
		<div className=''>
			<div className='bg-white p-5 rounded-md border'>
				<div className='grid grid-cols-1 lg:grid-cols-[1fr] gap-4'>
					<div className='rounded-md'>
						{/* <img src={map} className="rounded-md w-48 p-2 border-2" alt="" /> */}
					</div>
					<div className='p-2'>
						<div className='grid grid-cols-1 sm:grid-cols-3 gap-2 w-full pt-4 text-gray-600'>
							<div className='flex gap-2 items-center'>
								<MdMyLocation />
								Owner Name
							</div>
							<div className='flex gap-2 items-center'>
								<MdOutlineMailOutline />
								mra_restaurant@gmail.com
							</div>
							<div className='flex gap-2 items-center'>
								<MdSmartphone />
								9207738383
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-white border rounded-sm p-4 mt-4'>
				<div className='flex gap-2 items-center mb-5'>
					<FaGraduationCap />
					Emmployees
				</div>
				<div className='grid '>
					<EmployeeCard employee={employee} />
				</div>{' '}
			</div>
		</div>
	)
}

export default ViewAreaManager
