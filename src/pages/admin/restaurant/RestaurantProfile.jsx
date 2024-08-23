import food from '/Images/food.jpg'
import {
	MdMyLocation,
	MdOutlineMailOutline,
	MdSmartphone,
} from 'react-icons/md'
import { IoLocation } from 'react-icons/io5'
import { FaGraduationCap, FaRegUser } from 'react-icons/fa'
import EmployeeCard from '../../../components/common/EmployeeCard'
import { useParams } from 'react-router-dom'
import { useGetSingleRestaurantQuery } from '../../../redux/admin/api-slices/restaurantApiSlice'

//imports.....................................................................................

const RestaurantProfile = () => {
	const { id } = useParams()
	const { data } = useGetSingleRestaurantQuery(id)
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
		<div className='p-5'>
			<div className='bg-white p-5 rounded-md border'>
				<div className='grid grid-cols-1 lg:grid-cols-[1fr,4fr] gap-4'>
					<div className='rounded-md'>
						<img src={food} className='rounded-md w-48 p-2 border-2' alt='' />
					</div>
					<div className='p-2'>
						<div className='flex flex-col lg:flex-row justify-between'>
							<div>
								<div className='text-2xl'>
									{data?.restaurent.restaurent_name}
								</div>
								<div className='flex gap-2 items-center'>
									<IoLocation />
									{data?.restaurent.location_name}
								</div>
							</div>
						</div>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-2 w-full pt-4 text-gray-600'>
							<div className='flex gap-2 items-center'>
								<FaRegUser />
								{data?.restaurent.owner_name}
							</div>
							<div className='flex gap-2 items-center'>
								<MdMyLocation />
								{data?.restaurent.address}
							</div>
							<div className='flex gap-2 items-center'>
								<MdOutlineMailOutline />
								{data?.restaurent.email}
							</div>
							<div className='flex gap-2 items-center'>
								<MdSmartphone />
								{data?.restaurent.contact}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-white border rounded-sm p-4 mt-4'>
				<div className='flex gap-2 items-center mb-5'>
					<FaGraduationCap />
					Employees
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					<EmployeeCard employees={data?.employees} />
				</div>
			</div>
		</div>
	)
}

export default RestaurantProfile
