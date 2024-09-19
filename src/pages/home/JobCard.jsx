import { MdOutlineWatchLater } from 'react-icons/md'
import { HiringStatus } from '../../components/table/Columns/StaffColumns'
import { IoLocation } from 'react-icons/io5'
import { FaCopy } from 'react-icons/fa'
import { toast } from 'react-toastify'

//imports...................................................................................................

const JobCard = ({ job, onClick }) => {
	const copyToClipBoard = () => {
		navigator.clipboard.writeText(
			`${window.location.origin.toString()}/employee/${job.id}`
		)
		toast.success('Profile link copied to clipboard')
	}

	return (
		<div className='flex flex-col gap-2 border p-2 md:p-4 rounded-lg shadow-md'>
			<div
				className='flex w-full h-full gap-4 cursor-pointer'
				onClick={onClick}
			>
				<img
					className='size-16 rounded-full object-cover'
					src={job?.photo !== 'null' ? job.photo : '/Images/avatar.jpg'}
					alt='profile'
				/>
				<div className='flex flex-col gap-1'>
					<div className='flex flex-col'>
						<h1 className='italic text-gray-500 font-semibold'>
							{job.main_category} in
						</h1>
						<ul className='font-bold capitalize text-sm underline'>
							{job.job_categories?.map((category, id) => (
								<li key={id}>{category}</li>
							))}
						</ul>
						<h1 className='capitalize text-sm text-gray-700'>
							Name: {job.name}
						</h1>
					</div>

					<h1 className='bg-[#2d607b] text-[10px] p-1 text-center rounded text-white'>
						EM-CODE: {job.employee_code}
					</h1>
				</div>
			</div>
			<HiringStatus hiringStatus={job.status} />
			<div className='flex justify-between gap-1'>
				<h1 className='capitalize text-xs flex justify-center items-center gap-1 text-gray-700'>
					<MdOutlineWatchLater />{' '}
					{job.restaurants.reduce(
						(acc, cur) => (acc += Number(cur.total_experience)),
						0
					)}{' '}
					years
				</h1>
				<h1 className='capitalize flex justify-center items-center gap-1 text-xs text-gray-700'>
					<IoLocation /> {job.location_name}
				</h1>
				<h1
					onClick={copyToClipBoard}
					className='capitalize cursor-pointer flex justify-center items-center gap-1 text-xs text-gray-700'
				>
					<FaCopy /> copy profile link
				</h1>
			</div>
		</div>
	)
}

export default JobCard
