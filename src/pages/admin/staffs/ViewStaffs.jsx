import React from 'react'
import avatar from '/Images/avatar.jpg'
import { GoDotFill } from 'react-icons/go'
import { MdMyLocation, MdOutlineWatchLater, MdSmartphone } from 'react-icons/md'
import { IoLocation } from 'react-icons/io5'
import { FaCircleDot } from 'react-icons/fa6'
import { Rate } from 'antd'
import { FaGraduationCap } from 'react-icons/fa'
import JobExperienceTimeline from '../../../components/common/JobExperienseTimeline'

const ViewStaffs = () => {
	const skills = ['Shawarma Maker', 'Chineese food', 'Arabic Dish']
	return (
		<div className='p-4'>
			<div className='bg-white p-5 rounded-md border'>
				<div className='grid grid-cols-1 lg:grid-cols-[1fr,3fr,2fr] gap-4'>
					<div className='rounded-md'>
						<img src={avatar} className='rounded-md w-48 p-2 border-2' alt='' />
					</div>
					<div className='p-2'>
						<div className='flex flex-col lg:flex-row justify-between'>
							<div>
								<div className='text-2xl'>Muhammed Shaikh Zahid U</div>
								<div className='text-gray-600'>Master Chef</div>
							</div>
						</div>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-2 w-full pt-4 text-gray-600'>
							<div className='flex gap-2 items-center'>
								<MdMyLocation />
								Palazhi
							</div>
							<div className='flex gap-2 items-center'>
								<IoLocation />
								Kozhikode
							</div>
							<div className='flex gap-2 items-center'>
								<MdOutlineWatchLater />
								MRA Calicut
							</div>
							<div className='flex gap-2 items-center'>
								<MdSmartphone />
								9207738383
							</div>
						</div>
						<div className='mt-5'>
							<div className='text-[1.1rem] mb-2'>Skills</div>
							<div className='flex flex-wrap gap-3'>
								{skills.map((skill, index) => (
									<div
										key={index}
										className='rounded-3xl bg-blue-50 border-2 border-blue-200 text-[.9rem] p-2 px-4 font-medium'
									>
										{skill}
									</div>
								))}
							</div>
						</div>
					</div>
					<div className='mt-2 flex flex-col'>
						<div className='text-green-500 flex gap-1 items-center justify-end'>
							<GoDotFill />
							Available for hiring
						</div>
						<div className='text-[.8rem] font-medium text-gray-600 grid justify-end mt-2'>
							<div className='grid grid-cols-[2fr,3fr] capitalize'>
								<div>Hygiene</div>
								<div>
									<Rate allowHalf disabled defaultValue={4} />
								</div>
							</div>
							<div className='grid grid-cols-[2fr,3fr]'>
								<div>Wastage Control</div>
								<div>
									<Rate allowHalf disabled defaultValue={3.5} />
								</div>
							</div>
							<div className='grid grid-cols-[2fr,3fr]'>
								<div>Communication</div>
								<div>
									<Rate allowHalf disabled defaultValue={3} />
								</div>
							</div>
							<div className='grid grid-cols-[2fr,3fr]'>
								<div>Attendance</div>
								<div>
									<Rate allowHalf disabled defaultValue={4} />
								</div>
							</div>
							<div className='grid grid-cols-[2fr,3fr]'>
								<div>Productivity</div>
								<div>
									<Rate allowHalf disabled defaultValue={4.5} />
								</div>
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
				<JobExperienceTimeline />
			</div>
		</div>
	)
}

export default ViewStaffs
