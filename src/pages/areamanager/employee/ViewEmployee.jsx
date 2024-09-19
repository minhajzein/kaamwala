import { GoDotFill } from 'react-icons/go'
import { MdMyLocation, MdOutlineWatchLater, MdSmartphone } from 'react-icons/md'
import { IoLocation } from 'react-icons/io5'
import { Modal } from 'antd'
import { FaGraduationCap } from 'react-icons/fa'
import JobExperienceTimeline from '../../../components/common/JobExperienseTimeline'
import { useState } from 'react'
import AddExperience from './AddExperience'
import { useParams } from 'react-router-dom'
import { useGetSingleEmployeeUnderAreaManagerQuery } from '../../../redux/area-manager/api-slices/employeeApiSlice'
import { CgSpinner } from 'react-icons/cg'
import AverageRating from './AverageRating'
import { HiringStatus } from '../../../components/table/Columns/StaffColumns'

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
		<div className='md:p-5 w-full'>
			<div className='bg-white w-full p-5 rounded-md border'>
				<div className='flex flex-col justify-between gap-2 w-full md:flex-row'>
					<div className='rounded-md md:w-1/5'>
						<img
							src={
								data?.employees?.photo === 'null'
									? '/Images/avatar.jpg'
									: data?.employees?.photo
							}
							className='rounded-md max-w-full max-h-48 p-1 border-2'
							alt='photo'
						/>
					</div>
					<div className='flex flex-col md:w-2/5 md:px-2 gap-2'>
						<div className='text-2xl capitalize'>{data?.employees?.name}</div>
						<HiringStatus hiringStatus={data?.employees?.status} />
						<div className='flex flex-col w-full lg:flex-row gap-2'>
							<div className='py-2 flex flex-col gap-2 border p-2 rounded-lg'>
								<h1 className='font-bold text-center'>
									{data?.employees?.main_category} in
								</h1>
								<ul className='text-gray-600 capitalize list-inside'>
									{data?.employees?.job_categories?.map((category, i) => (
										<li key={i}>{category}</li>
									))}
								</ul>
							</div>
							<div className='flex flex-col gap-2 text-gray-600'>
								<div className='flex gap-2 items-center'>
									<MdMyLocation />
									{data?.employees?.location_name}
								</div>
								<div className='flex gap-2 items-center'>
									<IoLocation />
									{data?.employees?.district}
								</div>
								<div className='flex gap-2 items-center'>
									<MdOutlineWatchLater />
									{data?.employees.restaurants
										.reduce(
											(acc, cur) => (acc += Number(cur.total_experience)),
											0
										)
										.toFixed()}{' '}
									years of experience
								</div>
								<div className='flex gap-2 items-center'>
									<MdSmartphone />
									{data?.employees?.phone}
								</div>
							</div>
						</div>
					</div>
					<div className='mt-2 md:w-2/5 w-full flex flex-col justify-between items-end gap-3'>
						<button
							onClick={() => setShowModal(true)}
							className='capitalize border rounded h-10 text-sm px-2 text-white border-white bg-blue-500'
						>
							add experience
						</button>
						<AverageRating experiences={data?.employees.restaurants} />
					</div>
				</div>
			</div>
			<div className='bg-white border rounded-sm p-4 mt-4'>
				<div className='flex gap-2 items-center mb-5'>
					<FaGraduationCap />
					Experience
				</div>
				{isSuccess && (
					<JobExperienceTimeline experiences={data?.employees.restaurants} />
				)}
			</div>
			<Modal
				open={showModal}
				footer={[]}
				title='Add Experience'
				closeIcon={true}
				onCancel={() => setShowModal(false)}
			>
				<AddExperience setShowModal={setShowModal} />
			</Modal>
		</div>
	)
}

export default ViewEmployee
