import React from 'react'
import { Card } from 'antd'

const JobCard = ({ job, isFocused, onClick }) => {
	return (
		<Card
			onClick={() => onClick(job.id)}
			className={`cursor-pointer p-1 mb-2 border rounded-lg shadow-md transition-transform transform hover:scale-95 ${
				isFocused ? 'border-blue-500' : 'border-gray-300'
			}`}
			hoverable
		>
			<h2 className='text-xl font-bold mb-2'>{job.job_category}</h2>
			<p className='text-sm text-gray-700 mb-1'>
				<strong>Name:</strong> {job.name}
			</p>
			<p className='text-sm text-gray-700 mb-1'>
				<strong>EMP-CODE:</strong> {job.employee_code}
			</p>
			<p className='text-sm text-gray-700 mb-1'>
				<strong>role:</strong> {job.job_category}
			</p>
			<p className='text-sm text-gray-700'>
				<strong>location:</strong> {job.location_name}
			</p>
		</Card>
	)
}

export default JobCard
