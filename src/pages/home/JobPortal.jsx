import React, { useState, useEffect } from 'react'
import JobCard from './JobCard'
import SearchFilter from './SearchFilter'
import { Button } from 'antd'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './JobPortal.css'
import ViewStaffs from '../admin/staffs/ViewStaffs'
import { useGetAllEmployeesQuery } from '../../redux/api-slices/kaamwalaApiSlice'

const JobPortal = () => {
	const [search, setSearch] = useState('')
	const [jobFilter, setJobFilter] = useState('')
	const [locationFilter, setLocationFilter] = useState('')
	const [filteredJobs, setFilteredJobs] = useState([])
	const [shownJobs, setShownJobs] = useState([])
	const [visibleCount, setVisibleCount] = useState(10)
	const [searched, setSearched] = useState(false)
	const { data, isSuccess } = useGetAllEmployeesQuery()
	const [selectedJobId, setSelectedJobId] = useState(
		isSuccess && data?.employees[0]?.id
	)

	useEffect(() => {
		const jobs = data?.employees.filter(
			job =>
				job.job_category.toLowerCase().includes(search.toLowerCase()) &&
				(jobFilter ? job.job_category === jobFilter : true) &&
				(locationFilter ? job.location_name === locationFilter : true)
		)
		setFilteredJobs(jobs)
		setShownJobs(jobs?.slice(0, visibleCount))
	}, [search, jobFilter, locationFilter, visibleCount])

	const jobOptions = [...new Set(data?.employees?.map(job => job.job_category))]
	const locationOptions = [
		...new Set(data?.employees.map(job => job.location_name)),
	]

	const handleSearch = () => {
		setSearched(true)
		setVisibleCount(10) // Reset visible count on new search
		const jobs = data?.employees.filter(
			job =>
				job.name.toLowerCase().includes(search.toLowerCase()) &&
				(jobFilter ? job.name === jobFilter : true) &&
				(locationFilter ? job.employee_code === locationFilter : true)
		)
		setFilteredJobs(jobs)
		setShownJobs(jobs?.slice(0, 10))
	}

	const loadMore = () => {
		setShownJobs(filteredJobs?.slice(0, visibleCount + 10))
		setVisibleCount(visibleCount + 10)
	}

	const selectedJob = filteredJobs?.find(job => job.id === selectedJobId)
	console.log(filteredJobs)

	return (
		<div className='border bg-[url("/Images/hero-background.jpg")]   bg-cover overflow-hidden w-full flex flex-col gap-2 rounded-xl'>
			<SearchFilter
				search={search}
				setSearch={setSearch}
				jobFilter={jobFilter}
				setJobFilter={setJobFilter}
				locationFilter={locationFilter}
				setLocationFilter={setLocationFilter}
				jobOptions={jobOptions}
				locationOptions={locationOptions}
				onSearch={handleSearch}
			/>
			{searched && (
				<div className='bg-primary-50 overflow-auto'>
					{filteredJobs?.length > 0 ? (
						<div className='w-full flex'>
							<div className='w-1/3   max-h-dvh overflow-y-auto'>
								<h1 className='text-center p-2 italic'>
									Showing {shownJobs.length} of {filteredJobs.length} employees
								</h1>
								<div className='space-y-4 px-2 overflow-y-auto'>
									<TransitionGroup>
										{shownJobs.map(job => (
											<CSSTransition
												key={job.id}
												timeout={300}
												classNames='fade'
											>
												<JobCard
													job={job}
													isFocused={job.id === selectedJobId}
													onClick={setSelectedJobId}
												/>
											</CSSTransition>
										))}
									</TransitionGroup>
									{shownJobs.length < filteredJobs.length && (
										<Button
											onClick={loadMore}
											className='mt-4 w-full bg-blue-600 text-white hover:bg-blue-700'
										>
											Show More
										</Button>
									)}
								</div>
							</div>
							<div className='w-2/3 h-full max-h-dvh overflow-y-auto'>
								{isSuccess && selectedJob && (
									<ViewStaffs employee={selectedJob} />
								)}
							</div>
						</div>
					) : (
						<div className='text-center text-gray-600'>No data available</div>
					)}
				</div>
			)}
		</div>
	)
}

export default JobPortal
