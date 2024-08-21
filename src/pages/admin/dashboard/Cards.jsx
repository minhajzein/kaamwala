import { FaUsers, FaUserTie, FaUserCheck, FaUserTimes } from 'react-icons/fa'

//imports................................................................................................

const Cards = ({
	totalAreaManagers,
	totalEmployees,
	workingCount,
	nonWorking,
}) => {
	const cardData = [
		{
			id: 1,
			title: 'Area Managers',
			count: totalAreaManagers,
			icon: FaUserTie,
			color: 'blue',
		},
		{
			id: 2,
			title: 'Employees',
			count: totalEmployees,
			icon: FaUsers,
			color: 'blue',
		},
		{
			id: 3,
			title: 'Working',
			count: workingCount,
			icon: FaUserCheck,
			color: 'gray',
		},
		{
			id: 4,
			title: 'Non-Working',
			count: nonWorking,
			icon: FaUserTimes,
			color: 'red',
		},
	]
	return (
		<section className='text-gray-700 body-font bg-gray-100'>
			<div className='container md:p-5'>
				<div className='grid grid-cols-2 md:grid-cols-4 text-center'>
					{cardData.map(card => (
						<div key={card.id} className='p-1 w-full h-full'>
							<div
								className={`border-2 border-dotted border-gray-300 bg-white py-4 rounded-lg shadow-lg hover:shadow-2xl transform transition duration-500 hover:scale-105`}
							>
								<div className='flex w-full justify-evenly place-items-center'>
									<div className=''>
										<card.icon
											className={`text-${card.color}-500 md:size-12 size-8 mb-3 inline-block`}
										/>
									</div>
									<div className='grid justify-center items-center'>
										<h2 className='font-extrabold text-2xl md:text-4xl text-gray-900'>
											{card.count}
										</h2>
									</div>
								</div>
								<p className='font-bold text-xs text-gray-600'>{card.title}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default Cards
