import {
	MdMyLocation,
	MdOutlineMailOutline,
	MdSmartphone,
} from 'react-icons/md'
import { FaGraduationCap } from 'react-icons/fa'
import EmployeeCard from '../../../components/common/EmployeeCard'
import { useParams } from 'react-router-dom'
import { useGetSingleAreaManagerQuery } from '../../../redux/admin/api-slices/managerApiSlice'

//imports................................................................................................

const ViewAreaManager = () => {
	const { id } = useParams()
	const { data } = useGetSingleAreaManagerQuery(id)
	console.log(data)

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
								{data?.areaManger.name}
							</div>
							<div className='flex gap-2 items-center'>
								<MdOutlineMailOutline />
								{data?.areaManger.email}
							</div>
							<div className='flex gap-2 items-center'>
								<MdSmartphone />
								{data?.areaManger.phone}
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
