import React, { useState } from 'react'
import { Timeline, Card, Rate } from 'antd'
import './JobExperienceTimeline.css'

const jobExperiences = [
	{
		name: 'Head Chef',
		company: 'Gourmet Bistro',
		duration: 'Jan 2020 - Dec 2021',
		case: 'Led the kitchen team and managed daily operations.',
		review: 'Outstanding leadership and culinary skills.',
		hygiene: 4,
		wastageControl: 3.5,
		communication: 3,
		attendance: 4,
		productivity: 4.5,
		details: 'Specialized in French cuisine and implemented new menu items.',
		experience: '2 years',
	},
	{
		name: 'Restaurant Manager',
		company: 'The Fine Dine',
		duration: 'Jan 2018 - Dec 2020',
		case: 'Managed staff and ensured customer satisfaction.',
		review: 'Exceptional management and customer service.',
		hygiene: 4.5,
		wastageControl: 4,
		communication: 4.5,
		attendance: 5,
		productivity: 4,
		details: 'Improved service quality and increased revenue.',
		experience: '3 years',
	},
	{
		name: 'Sous Chef',
		company: 'Food Paradise',
		duration: 'Jan 2017 - Dec 2018',
		case: 'Assisted the head chef in daily kitchen operations.',
		review: 'Proficient in food preparation and team coordination.',
		hygiene: 3,
		wastageControl: 3.5,
		communication: 3,
		attendance: 4,
		productivity: 3.5,
		details: 'Prepared and presented dishes as per restaurant standards.',
		experience: '1 year',
	},
]

const JobExperienceTimeline = ({ experiences }) => {
	console.log()

	const [expanded, setExpanded] = useState(
		new Array(jobExperiences.length).fill(false)
	)

	const toggleExpand = index => {
		const newExpanded = [...expanded]
		newExpanded[index] = !newExpanded[index]
		setExpanded(newExpanded)
	}

	return (
		<Timeline mode='left' className='space-y-6'>
			{experiences.map((job, index) => (
				<Timeline.Item key={job.id} className='fade-in-up'>
					<div className='flex justify-center mb-5'>
						<Card className='w-full p-4 border border-gray-200 rounded-lg shadow-md bg-white'>
							<div>
								<div className='text-lg font-bold mb-2'>{job.name}</div>
								<div className='mb-2 text-sm md:text-base'>
									<strong>Restaurant:</strong> {job.company}
								</div>
								<div className='mb-2 text-sm md:text-base'>
									<strong>Experience:</strong> {job.total_experience}
								</div>
								{expanded[index] && (
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
										<div>
											{job.case === '1' && (
												<div className='mb-2 text-sm md:text-base'>
													<strong>Case:</strong> {job.case}
												</div>
											)}
										</div>
										<div className='space-y-1 text-xs md:text-sm'>
											<div className='flex items-center'>
												<strong className='w-1/2'>Hygiene:</strong>
												<Rate
													className='text-xs md:text-base'
													disabled
													defaultValue={job.hygiene}
												/>
											</div>
											<div className='flex items-center'>
												<strong className='w-1/2'>Wastage Control:</strong>
												<Rate
													className='text-xs md:text-base'
													disabled
													defaultValue={job.wastage_control}
												/>
											</div>
											<div className='flex items-center'>
												<strong className='w-1/2'>Communication:</strong>
												<Rate
													className='text-xs md:text-base'
													disabled
													defaultValue={job.communication}
												/>
											</div>
											<div className='flex items-center'>
												<strong className='w-1/2'>Attendance:</strong>
												<Rate
													className='text-xs md:text-base'
													disabled
													defaultValue={job.attenance}
												/>
											</div>
											<div className='flex items-center'>
												<strong className='w-1/2'>Productivity:</strong>
												<Rate
													className='text-xs md:text-base'
													disabled
													defaultValue={job.productivity}
												/>
											</div>
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
						</Card>
					</div>
				</Timeline.Item>
			))}
		</Timeline>
	)
}

export default JobExperienceTimeline
