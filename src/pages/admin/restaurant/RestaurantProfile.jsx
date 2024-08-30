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
					{data?.employees.map(exp => (
						<div
							key={exp.employee.id}
							className='bg-white flex w-full h-full flex-col p-2 rounded-md border shadow-md max-w-md mx-auto cursor-pointer ease-in duration-300'
						>
							<div className='flex flex-col md:flex-row items-center md:items-start'>
								<img
									src={exp.employee.photo}
									className='rounded-full w-24 h-24 md:w-28 md:h-28 border-2 p-2'
									alt='Avatar'
								/>
								<div className='p-2'>
									<h1 className='text-lg font-normal capitalize'>
										{exp.employee.name}
									</h1>
									<h2 className='text-gray-600 text-sm capitalize'>
										{exp.employee.job_category_name}
									</h2>
									<div className='mt-2 text-gray-600'>
										<div className='flex items-center gap-2 text-blue-500'>
											<MdSmartphone />
											{exp.employee.phone}
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default RestaurantProfile
