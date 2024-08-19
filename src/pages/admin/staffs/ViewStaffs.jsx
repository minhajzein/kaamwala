import React from 'react'
import avatar from '/Images/avatar.jpg'
import { GoDotFill } from 'react-icons/go'
import { MdMyLocation, MdOutlineWatchLater, MdSmartphone } from 'react-icons/md'
import { IoLocation } from 'react-icons/io5'
import { Rate } from 'antd'
import { FaGraduationCap } from 'react-icons/fa'
import JobExperienceTimeline from '../../../components/common/JobExperienseTimeline'

//imports................................................................

const ViewStaffs = ({ employee }) => {
	return (
		<div className='p-4'>
			<div className='bg-white p-5 rounded-md border'>
				<div className=' gap-4'>
					<div className='rounded-md'>
						<img
							src={employee?.photo !== 'null' ? employee?.photo : avatar}
							className='rounded-md w-48 p-2 border-2'
							alt='avatar'
						/>
					</div>
					<div className='p-2'>
						<div className='flex flex-col lg:flex-row justify-between'>
							<div>
								<div className='text-2xl'>{employee.name}</div>
								<div className='text-gray-600'>{employee.job_category}</div>
							</div>
						</div>
						<div className='mt-2 flex flex-col'>
							{employee.status === 'active' || employee.status === '1' ? (
								<div className='text-green-500 flex gap-1 items-center '>
									<GoDotFill />
									Available for hiring
								</div>
							) : (
								<div className='text-red-500 flex gap-1 items-center justify-end'>
									<GoDotFill />
									Not Available
								</div>
							)}
						</div>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-2 w-full pt-4 text-gray-600'>
							<div className='flex gap-2 items-center'>
								<MdMyLocation />
								{employee.address}
							</div>
							<div className='flex gap-2 items-center'>
								<IoLocation />
								{employee.location_name}
							</div>
							<div className='flex gap-2 items-center'>
								<MdOutlineWatchLater />
								{employee.total_experience} years of experience
							</div>
							<div className='flex gap-2 items-center'>
								<MdSmartphone />
								{employee.phone}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-white border rounded-sm p-4 mt-4'>
				<div className='flex gap-2 items-center mb-5'>
					<FaGraduationCap />
					Experience
				</div>
				<JobExperienceTimeline experiences={employee.restaurants} />
			</div>
		</div>
	)
}

export default ViewStaffs
