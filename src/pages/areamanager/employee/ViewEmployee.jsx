import avatar from '/Images/avatar.jpg'
import { GoDotFill } from 'react-icons/go'
import { MdMyLocation, MdOutlineWatchLater, MdSmartphone } from 'react-icons/md'
import { IoLocation } from 'react-icons/io5'
import { Modal, Rate } from 'antd'
import { FaGraduationCap } from 'react-icons/fa'
import JobExperienceTimeline from '../../../components/common/JobExperienseTimeline'
import { useState } from 'react'
import AddExperience from './AddExperience'
import { useParams } from 'react-router-dom'
import { useGetSingleEmployeeUnderAreaManagerQuery } from '../../../redux/area-manager/api-slices/employeeApiSlice'
import { CgSpinner } from 'react-icons/cg'

//imports.................................................................................................

const ViewEmployee = () => {
	const [showModal, setShowModal] = useState(false)
	const { id } = useParams()
	const { data, isLoading, isSuccess } =
		useGetSingleEmployeeUnderAreaManagerQuery(id)

	return isLoading ? (
		<div className='w-full h-full flex min-h-dvh'>
			<CgSpinner className='m-auto animate-spin' />
		</div>
	) : (
		<div className='p-5'>
			<div className='bg-white p-5 rounded-md border'>
				<div className='grid grid-cols-1 lg:grid-cols-[1fr,3fr,2fr] gap-4'>
					<div className='rounded-md'>
						<img
							src={`https://kaam-wala.grohance.com/api/${data.employees?.photo}`}
							className='rounded-md w-48 p-2 border-2'
							alt=''
						/>
					</div>
					<div className='p-2'>
						<div className='flex flex-col lg:flex-row justify-between'>
							<div>
								<div className='text-2xl'>{data.employees?.name}</div>
								<div className='text-gray-600'>
									{data.employees?.job_category}
								</div>
							</div>
						</div>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-2 w-full pt-4 text-gray-600'>
							<div className='flex gap-2 items-center'>
								<MdMyLocation />
								Palazhi
							</div>
							<div className='flex gap-2 items-center'>
								<IoLocation />
								{data?.employees?.district}
							</div>
							<div className='flex gap-2 items-center'>
								<MdOutlineWatchLater />
								MRA Calicut
							</div>
							<div className='flex gap-2 items-center'>
								<MdSmartphone />
								{data?.employees?.phone}
							</div>
						</div>
					</div>
					<div className='mt-2 flex flex-col justify-between items-center gap-3'>
						<div className='text-green-500 flex gap-1 items-center'>
							<GoDotFill className='animate-ping' />
							Available for hiring
						</div>
						<div className='text-[.8rem] font-medium text-gray-600 grid w-full mt-2'>
							<div className='flex w-full justify-between items-center capitalize'>
								<h1>Hygiene</h1>
								<hr className='w-[20%]' />
								<div>
									<Rate allowHalf disabled defaultValue={4} />
								</div>
							</div>
							<div className='flex w-full justify-between items-center capitalize'>
								<h1>waste control</h1>
								<hr className='w-[20%]' />
								<div>
									<Rate allowHalf disabled defaultValue={4} />
								</div>
							</div>
							<div className='flex w-full justify-between items-center capitalize'>
								<h1>communication</h1>
								<hr className='w-[20%]' />
								<div>
									<Rate allowHalf disabled defaultValue={4} />
								</div>
							</div>
							<div className='flex w-full justify-between items-center capitalize'>
								<div>Attendance</div>
								<hr className='w-[20%]' />
								<div>
									<Rate allowHalf disabled defaultValue={4} />
								</div>
							</div>
							<div className='flex w-full justify-between items-center capitalize'>
								<div>Productivity</div>
								<hr className='w-[20%]' />
								<div>
									<Rate allowHalf disabled defaultValue={4.5} />
								</div>
							</div>
						</div>
						<button
							onClick={() => setShowModal(true)}
							className='capitalize border rounded p-2  border-black bg-gray-200'
						>
							add experience
						</button>
					</div>
				</div>
			</div>
			<div className='bg-white border rounded-sm p-4 mt-4'>
				<div className='flex gap-2 items-center mb-5'>
					<FaGraduationCap />
					Experience
				</div>
				{isSuccess && (
					<JobExperienceTimeline experiences={data.employees.restaurants} />
				)}
			</div>
			<Modal
				open={showModal}
				footer={[]}
				closeIcon={true}
				onCancel={() => setShowModal(false)}
			>
				<AddExperience setShowModal={setShowModal} />
			</Modal>
		</div>
	)
}

export default ViewEmployee
