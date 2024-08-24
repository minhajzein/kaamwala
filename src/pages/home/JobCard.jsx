import { HiringStatus } from '../../components/table/Columns/StaffColumns'

//imports...................................................................................................

const JobCard = ({ job, onClick }) => {
	return (
		<div
			onClick={() => onClick(job.id)}
			className='cursor-pointer flex flex-col gap-2 border p-2 md:p-4 rounded-lg shadow-md'
			hoverable
		>
			<div className='flex w-full h-full gap-4'>
				<img
					className='size-16 rounded-full object-cover'
					src={job?.photo !== 'null' ? job.photo : avatar}
					alt='profile'
				/>
				<div className='flex flex-col gap-1'>
					<h2 className='font-bold capitalize underline'>{job.job_category}</h2>
					<p className='text-xs text-gray-700'>
						<h1>EMP-CODE: {job.employee_code}</h1>
					</p>
				</div>
			</div>
			<div className='flex flex-col gap-2'>
				<HiringStatus hiringStatus={job.status} />
				<p className='text-sm text-gray-700'>
					<h1 className='capitalize'>Name: {job.name}</h1>
				</p>
				<p className='text-sm text-gray-700 '>
					<h1 className='capitalize'>role: {job.job_category}</h1>
				</p>
				<p className='text-sm text-gray-700'>
					<h1 className='capitalize'>location: {job.location_name}</h1>
				</p>
			</div>
		</div>
	)
}

export default JobCard
