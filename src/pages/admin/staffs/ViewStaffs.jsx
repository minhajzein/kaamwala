import avatar from '/Images/avatar.jpg'
import { GoDotFill } from 'react-icons/go'
import { MdMyLocation, MdOutlineWatchLater, MdSmartphone } from 'react-icons/md'
import { IoLocation } from 'react-icons/io5'
import { FaGraduationCap } from 'react-icons/fa'
import JobExperienceTimeline from '../../../components/common/JobExperienseTimeline'
import { useGetSingleEmployeeQuery } from '../../../redux/admin/api-slices/employeeApiSlice'
import { useParams } from 'react-router-dom'

//imports................................................................

const ViewStaffs = ({ employee }) => {
	const { id } = useParams()
	const { data, isSuccess } = useGetSingleEmployeeQuery(id)

	if (employee === undefined && isSuccess) {
		employee = data.employees
	}

	return (
		<div className='p-4'>
			<div className='bg-white md:p-5 flex flex-col md:flex-row rounded-md border'>
				<div className='rounded-md w-full md:w-1/4'>
					<img
						src={employee?.photo !== 'null' ? employee.photo : avatar}
						className='rounded-md w-48 p-2 border-2'
						alt='avatar'
					/>
				</div>
				<div className='w-full md:w-3/4 p-2'>
					<div className='flex flex-col lg:flex-row justify-between'>
						<div className='flex flex-col'>
							<div className='text-2xl capitalize'>{employee?.name}</div>
							<div className='text-gray-600 capitalize'>
								{employee?.job_category}
							</div>
						</div>
					</div>
					<div className='mt-2 flex flex-col'>
						{employee?.status === '1' ? (
							<div className='text-orange-400 flex gap-1 items-center '>
								<GoDotFill />
								Working
							</div>
						) : employee?.status === '2' ? (
							<div className='text-green-500 flex gap-1 items-center '>
								<GoDotFill />
								Available for hiring
							</div>
						) : (
							<div className='text-red-500 flex gap-1 items-center'>
								<GoDotFill />
								Blacklisted
							</div>
						)}
					</div>
					{employee?.status !== '1' && (
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-2 w-full pt-4 text-gray-600'>
							<div className='flex gap-2 items-center'>
								<MdMyLocation />
								{employee?.address}
							</div>
							<div className='flex gap-2 items-center'>
								<IoLocation />
								{employee?.location_name}
							</div>
							<div className='flex gap-2 items-center'>
								<MdOutlineWatchLater />
								{employee?.total_experience} years of experience
							</div>
							<div className='flex gap-2 items-center'>
								<MdSmartphone />
								{employee?.phone}
							</div>
						</div>
					)}
				</div>
			</div>
			{employee?.status !== '1' && (
				<div className='bg-white border rounded-sm md:p-4 p-2 mt-4'>
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
