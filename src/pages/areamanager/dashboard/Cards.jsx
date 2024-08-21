import { FaUserTie, FaUserCheck, FaUserTimes } from 'react-icons/fa'
import { IoRestaurant } from 'react-icons/io5'

const Cards = ({
	totalRestaurants,
	totalEmployees,
	workingCount,
	nonWorking,
}) => {
	const cardData = [
		{
			id: 1,
			title: 'Total Restaurents',
			count: totalRestaurants,
			icon: IoRestaurant,
			color: 'blue',
		},
		{
			id: 2,
			title: 'Total Employees',
			count: totalEmployees,
			icon: FaUserTie,
			color: 'blue',
		},
		{
			id: 3,
			title: 'Working Count',
			count: workingCount,
			icon: FaUserCheck,
			color: 'gray',
		},
		{
			id: 4,
			title: 'Non-Working Count',
			count: nonWorking,
			icon: FaUserTimes,
			color: 'red',
		},
	]
	return (
		<div>
			<section className='text-gray-700 body-font bg-gray-100'>
				<div className='container px-5 py-5 mx-auto'>
					<div className='flex flex-wrap -m-4 text-center'>
						{cardData.map(card => (
							<div key={card.id} className='p-4 md:w-1/4 sm:w-1/2 w-full'>
								<div
									className={`border-2 border-dotted border-gray-300 bg-white px-6 py-4 rounded-lg shadow-lg hover:shadow-2xl transform transition duration-500 hover:scale-105`}
								>
									<div className='grid grid-cols-[1fr,3fr] place-items-center'>
										<div className=''>
											<card.icon
												className={`text-${card.color}-500 w-12 h-12 mb-3 inline-block`}
											/>
										</div>
										<div className='grid justify-center items-center'>
											<h2 className='title-font text-3xl font-extrabold text-gray-900'>
												{card.count}
											</h2>
										</div>
									</div>
									<p className='font-bold text-gray-600'>{card.title}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}

export default Cards
