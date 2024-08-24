import { useState } from 'react'
import { Timeline, Card, Rate } from 'antd'
import './JobExperienceTimeline.css'

//imports.............................................................

const JobExperienceTimeline = ({ experiences }) => {
	const [expanded, setExpanded] = useState(
		new Array(experiences?.length).fill(false)
	)

	const toggleExpand = index => {
		const newExpanded = [...expanded]
		newExpanded[index] = !newExpanded[index]
		setExpanded(newExpanded)
	}

	return (
		<Timeline mode='left'>
			{experiences?.map((job, index) => (
				<Timeline.Item key={job.id} className='fade-in-up'>
					<div className='w-full border border-gray-200 p-2 rounded-lg shadow-md bg-white'>
						<div className='text-lg font-bold mb-2'>{job.job_category}</div>
						<div className='mb-2 text-sm md:text-base'>
							<strong>Restaurant:</strong>{' '}
							{job?.restaurant_details?.restaurent_name}
						</div>
						<div className='mb-2 text-sm md:text-base'>
							<strong>Experience:</strong> {job.total_experience}
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
				</Timeline.Item>
			))}
		</Timeline>
	)
}

export default JobExperienceTimeline
