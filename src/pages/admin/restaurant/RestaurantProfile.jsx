import food from '/Images/food.jpg'
import { GoDotFill } from 'react-icons/go'
import {
	MdMyLocation,
	MdOutlineMailOutline,
	MdOutlineWatchLater,
	MdSmartphone,
} from 'react-icons/md'
import { IoLocation } from 'react-icons/io5'
import { FaGraduationCap } from 'react-icons/fa'
import EmployeeCard from '../../../components/common/EmployeeCard'

const RestaurantProfile = () => {
	const skills = ['Shawarma Maker', 'Chineese food', 'Arabic Dish']
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
								<div className='text-2xl'>MRA Restaurant And Backery</div>
								<div className='text-gray-600'>Vadakara</div>
							</div>
						</div>
						<div className='grid grid-cols-1 sm:grid-cols-3 gap-2 w-full pt-4 text-gray-600'>
							<div className='flex gap-2 items-center'>
								<MdMyLocation />
								Owner Name
							</div>
							<div className='flex gap-2 items-center'>
								<MdMyLocation />
								Opposite New Bus Stand
							</div>
							<div className='flex gap-2 items-center'>
								<IoLocation />
								Kozhikode
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
					Employees
				</div>
				<EmployeeCard employee={employee} />
			</div>
		</div>
	)
}

export default RestaurantProfile
