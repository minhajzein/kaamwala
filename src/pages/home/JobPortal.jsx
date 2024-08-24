import { useState, useEffect } from 'react'
import JobCard from './JobCard'
import SearchFilter from './SearchFilter'
import { Button, Modal } from 'antd'
import './JobPortal.css'
import ViewStaffs from '../admin/staffs/ViewStaffs'
import { useGetAllEmployeesInWebQuery } from '../../redux/api-slices/kaamwalaApiSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

//imports..........................................................................................

const JobPortal = () => {
	const [search, setSearch] = useState('')
	const [jobFilter, setJobFilter] = useState('')
	const [locationFilter, setLocationFilter] = useState('')
	const [filteredJobs, setFilteredJobs] = useState([])
	const [shownJobs, setShownJobs] = useState([])
	const [visibleCount, setVisibleCount] = useState(10)
	const { data, isSuccess } = useGetAllEmployeesInWebQuery()
	const [showModal, setShowModal] = useState(false)
	const [currentEmp, setCurrentEmp] = useState(null)

	useEffect(() => {
		const jobs = data?.employees.filter(
			job =>
				job.job_category.toLowerCase().includes(search.toLowerCase()) &&
				(jobFilter ? job.job_category === jobFilter : true) &&
				(locationFilter ? job.location_name === locationFilter : true)
		)
		setFilteredJobs(jobs)
		setShownJobs(jobs?.slice(0, visibleCount))
	}, [jobFilter, isSuccess, locationFilter, visibleCount])

	const jobOptions = [...new Set(data?.employees?.map(job => job.job_category))]
	const locationOptions = [
		...new Set(data?.employees.map(job => job.location_name)),
	]

	const handleSearch = search => {
		setVisibleCount(10) // Reset visible count on new search
		const jobs = data?.employees.filter(job =>
			job.employee_code.toLowerCase().includes(search.toLowerCase())
		)
		setShownJobs(jobs?.slice(0, 20))
	}

	const loadMore = () => {
		setShownJobs(filteredJobs?.slice(0, visibleCount + 10))
		setVisibleCount(visibleCount + 10)
	}

	const handleModal = data => {
		if (data.status === '1') return toast.error('Employee is already working')
		setCurrentEmp(data)
		setShowModal(true)
	}

	return (
		<div className='border bg-cover overflow-hidden w-full flex flex-col gap-2 md:rounded-xl'>
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
			{filteredJobs?.length > 0 ? (
				<div className='w-full'>
					<h1 className='text-center p-2 md:pt-4 italic'>
						Showing {shownJobs.length} of {filteredJobs.length} employees
					</h1>
					<div className='md:gap-4 gap-2 p-2 md:p-4 grid grid-cols1 md:grid-cols-4'>
						{shownJobs.map(job => (
							<JobCard
								job={job}
								key={job.id}
								onClick={() => handleModal(job)}
							/>
						))}
						{shownJobs.length < filteredJobs.length && (
							<Button
								onClick={loadMore}
								className=' w-1/2 h-full border border-blue-500 text-blue-500'
							>
								Show More..
							</Button>
						)}
					</div>
				</div>
			) : (
				<div className='text-center h-dvh flex'>
					<img
						src='/Images/not-found.jpg'
						className='m-auto md:h-[30%] w-[60%] object-contain -translate-y-1/2'
						alt='not-found'
					/>
				</div>
			)}
			<Modal
				footer={[]}
				title={currentEmp?.name}
				closeIcon={true}
				onCancel={() => setShowModal(false)}
				open={showModal}
			>
				<ViewStaffs employee={currentEmp} />
			</Modal>
		</div>
	)
}

export default JobPortal
