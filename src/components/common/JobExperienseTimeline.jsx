import { useEffect, useState } from 'react'
import { Timeline, Card, Rate, Tooltip, Modal } from 'antd'
import './JobExperienceTimeline.css'
import { RiEditLine } from 'react-icons/ri'
import { FaRegTrashAlt } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import EditExperience from '../../pages/areamanager/employee/EditExperience'
import { useDeleteExperienceMutation } from '../../redux/area-manager/api-slices/employeeApiSlice'
import { CgSpinner } from 'react-icons/cg'

//imports.............................................................

const JobExperienceTimeline = ({ experiences }) => {
	const [showEditModal, setShowEditModal] = useState(false)
	const [actions, setActions] = useState(false)
	const [deleteExperience, { isLoading: deleting }] =
		useDeleteExperienceMutation()

	const location = useLocation()

	const [expanded, setExpanded] = useState(
		new Array(experiences?.length).fill(false)
	)

	const toggleExpand = index => {
		const newExpanded = [...expanded]
		newExpanded[index] = !newExpanded[index]
		setExpanded(newExpanded)
	}
	useEffect(() => {
		if (
			location.pathname.toLowerCase().includes('admin') ||
			location.pathname.toLowerCase().includes('area-manager')
		) {
			setActions(true)
		} else {
			setActions(false)
		}
	}, [])
	return (
		<Timeline mode='left'>
			{experiences?.map((job, index) => (
				<Timeline.Item key={job.id} className='fade-in-up'>
					<div className='w-full border border-gray-200 p-2 rounded-lg shadow-md bg-white'>
						<div className='w-full flex justify-between'>
							<div className='mb-2 text-sm flex gap-2 flex-col md:text-base'>
								<strong>
									Restaurant: {job?.restaurant_details?.restaurent_name}
								</strong>
								<strong>Experience: {job.total_experience}</strong>
							</div>
							{actions && (
								<div className='flex gap-3'>
									<Tooltip title='Edit' placement='top'>
										<button
											onClick={() => setShowEditModal(true)}
											className='flex items-center size-7 justify-center p-1 bg-green-100 text-zinc-800 rounded border border-zinc-400 hover:bg-green-50 focus:outline-none focus:ring-2  text-xs md:text-sm'
										>
											<RiEditLine className='text-lg' />
										</button>
									</Tooltip>
									<Tooltip title='Delete' placement='top'>
										<button
											onClick={() => deleteExperience(job.id)}
											className='flex items-center size-7 justify-center p-1 bg-red-100 text-zinc-800 rounded border border-zinc-400 hover:bg-green-50 focus:outline-none focus:ring-2  text-xs md:text-sm'
										>
											{deleting ? (
												<CgSpinner className='animate-spin m-auto' />
											) : (
												<FaRegTrashAlt className='text-lg' />
											)}
										</button>
									</Tooltip>
								</div>
							)}
						</div>

						{expanded[index] && (
							<div className='flex flex-col mt-2'>
								<div className='flex items-center justify-between'>
									<h1 className='w-1/2'>Hygiene:</h1>
									<Rate disabled defaultValue={job.hygiene} />
								</div>
								<div className='flex items-center justify-between'>
									<h1 className='w-1/2'>Wastage Control:</h1>
									<Rate disabled defaultValue={job.wastage_control} />
								</div>
								<div className='flex items-center justify-between'>
									<h1 className='w-1/2'>Communication:</h1>
									<Rate disabled defaultValue={job.communication} />
								</div>
								<div className='flex items-center justify-between'>
									<h1 className='w-1/2'>Attendance:</h1>
									<Rate disabled defaultValue={job.attenance} />
								</div>
								<div className='flex items-center justify-between'>
									<h1 className='w-1/2'>Productivity:</h1>
									<Rate disabled defaultValue={job.productivity} />
								</div>
							</div>
						)}
						<button
							className='text-blue-500 mt-2'
							onClick={() => toggleExpand(index)}
						>
							{expanded[index] ? 'Show Less' : 'Show More'}
						</button>
					</div>
					<Modal
						open={showEditModal}
						footer={[]}
						closeIcon={true}
						onCancel={() => setShowEditModal(false)}
					>
						<EditExperience experience={job} setShowModal={setShowEditModal} />
					</Modal>
				</Timeline.Item>
			))}
		</Timeline>
	)
}

export default JobExperienceTimeline
