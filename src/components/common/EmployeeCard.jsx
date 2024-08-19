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
					</div>
				)
			})}
		</div>
	)
}

export default EmployeeCard
