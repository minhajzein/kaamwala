import avatar from '/Images/avatar.jpg'
import { MdOutlineWatchLater, MdSmartphone } from 'react-icons/md'
import { IoLocation } from 'react-icons/io5'
import { FaGraduationCap } from 'react-icons/fa'
import JobExperienceTimeline from '../../../components/common/JobExperienseTimeline'
import { HiringStatus } from '../../../components/table/Columns/StaffColumns'
import { PiAddressBookLight } from 'react-icons/pi'
import AverageRating from '../../areamanager/employee/AverageRating'
import { useParams } from 'react-router-dom'
import { CgSpinner } from 'react-icons/cg'
import { useGetSingleEmployeeQuery } from '../../../redux/admin/api-slices/employeeApiSlice'

//imports................................................................

const ViewStaffs = ({ employee }) => {
	const { id } = useParams()
	const { data, isLoading } = useGetSingleEmployeeQuery(id)
	if (employee === undefined) employee = data?.employees

	return isLoading ? (
		<div className='w-full flex'>
			<CgSpinner className='animate-spin m-auto' />
		</div>
	) : (
		<div className='flex flex-col gap-2'>
			<div className='bg-white flex flex-col gap-2 p-2 md:p-4 rounded-md border'>
				<div className='rounded-md w-full flex flex-col md:flex-row'>
					<img
						src={employee?.photo !== 'null' ? employee?.photo : avatar}
						className='rounded-md md:w-1/2 w-full p-2 border-2'
						alt='avatar'
					/>
					<div className='md:w-1/2 w-full flex flex-col gap-3 justify-between p-2'>
						<div className='flex flex-col justify-between'>
							<div className='flex flex-col gap-2'>
								<div className='text-3xl font-semibold capitalize'>
									{employee?.name}
								</div>
								<h1 className='italic'>{employee?.main_category} in</h1>
								<ul className='text-gray-600 capitalizel list-inside'>
									{employee?.job_categories.map((category, i) => (
										<li key={i}>{category}</li>
									))}
								</ul>
							</div>
						</div>
						<HiringStatus hiringStatus={employee?.status} />
					</div>
				</div>
				{employee?.status !== '1' && (
					<div className='grid md:grid-cols-2 gap-2 w-full text-gray-600'>
						<div className='flex gap-2 items-center'>
							<PiAddressBookLight />
							{employee?.address}
						</div>
						<div className='flex gap-2 items-center'>
							<IoLocation />
							{employee?.location_name}
						</div>
						<div className='flex gap-2 items-center'>
							<MdOutlineWatchLater />
							{employee?.restaurants.reduce(
								(acc, cur) => (acc += Number(cur.total_experience)),
								0
							)}{' '}
							years of experience
						</div>
						<div className='flex gap-2 items-center'>
							<MdSmartphone />
							{employee?.phone}
						</div>
					</div>
				)}
				{employee?.restaurants.length > 0 && (
					<AverageRating experiences={employee?.restaurants} />
				)}
			</div>
			{employee?.status !== '1' && employee?.restaurants.length > 0 && (
				<div className='bg-white border rounded-sm md:p-4 p-2'>
					<div className='flex gap-2 items-center mb-5'>
						<FaGraduationCap />
						Experience
					</div>
					<JobExperienceTimeline experiences={employee?.restaurants} />
				</div>
			)}
		</div>
	)
}

export default ViewStaffs
