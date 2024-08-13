import { MdSmartphone } from 'react-icons/md'

//imports................................................................................................

const EmployeeCard = ({ employee }) => {
	return (
		<div className='grid w-full gap-5 grid-cols-3 '>
			{employee.map(i => {
				return (
					<div className='bg-white flex flex-col p-2 rounded-md border shadow-md max-w-md mx-auto cursor-pointer ease-in duration-300'>
						<div className='flex flex-col md:flex-row items-center md:items-start'>
							{/* <img src={avatar} className="rounded-full w-24 h-24 md:w-28 md:h-28 border-2 p-2" alt="Avatar" /> */}
							<div className='p-2'>
								<h1 className='text-lg font-normal'>{i.name}</h1>
								<h2 className='text-gray-600 text-sm'>{i.position}</h2>
								<div className='mt-2 text-gray-600'>
									<div className='flex items-center gap-2 text-blue-500'>
										<MdSmartphone />
										{i.phone}
									</div>
								</div>
							</div>
						</div>
						<div className='flex gap-2 p-2'>
							<h1 className='text-sm pt-1'>Skills:</h1>
							<div className='flex flex-wrap gap-2'>
								{i.skills.map((skill, index) => (
									<div className='pt-1'>
										<div
											key={index}
											className='rounded-3xl bg-blue-50 border-2 border-blue-200 leading-none  text-[.7rem] p-1 text-center px-2 font-medium'
										>
											{skill}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default EmployeeCard
