import { MdSmartphone } from 'react-icons/md'

//imports................................................................................................

const EmployeeCard = ({ employees }) => {
	return (
		employees &&
		employees?.map(emp => (
			<div
				key={emp.id}
				className='bg-white flex w-full h-full flex-col p-2 rounded-md border shadow-md max-w-md mx-auto cursor-pointer ease-in duration-300'
			>
				<div className='flex flex-col md:flex-row items-center md:items-start'>
					<img
						src={emp?.photo}
						className='rounded-full w-24 h-24 md:w-28 md:h-28 border-2 p-2'
						alt='Avatar'
					/>
					<div className='p-2'>
						<h1 className='text-lg font-normal capitalize'>{emp.name}</h1>
						<h2 className='text-gray-600 text-sm capitalize'>
							{emp.job_category_name}
						</h2>
						<div className='mt-2 text-gray-600'>
							<div className='flex items-center gap-2 text-blue-500'>
								<MdSmartphone />
								{emp.phone}
							</div>
						</div>
					</div>
				</div>
			</div>
		))
	)
}

export default EmployeeCard
