import { Select, Input, Button } from 'antd'
import { CiSearch } from 'react-icons/ci'
const { Option } = Select

//imports................................................................................................................................

const SearchFilter = ({
	jobFilter,
	setJobFilter,
	locationFilter,
	setLocationFilter,
	jobOptions,
	locationOptions,
	setSearch,
	search,
}) => {
	return (
		<div className="bg-[url('/Images/kaamwala.jpg')] flex flex-col gap-4 md:px-14 bg-cover bg-center w-full p-2">
			<img
				src='/Images/logo.png'
				className='md:w-1/6 rounded-lg w-1/3 object-contain'
				alt='logo'
			/>
			<div className='flex flex-col'>
				<h1 className='md:text-3xl text-lg text-primary-50 font-bold'>
					Find Your Perfect Employee
				</h1>
				<p className='text-primary-50 text-xs md:text-lg'>
					Discover the best candidates to fill your restaurant positions and
					elevate your business.
				</p>
			</div>
			<div className='w-full flex flex-col gap-2'>
				<div className='flex border p-2 rounded-xl bg-primary-50 shadow-lg  flex-col gap-2'>
					<div className='flex z-50 md:gap-2 gap-1 border-gray-200 w-full rounded-lg'>
						<input
							type='search'
							placeholder='Search here...'
							value={search}
							onChange={e => setSearch(e.target.value)}
							className='p-2 w-full border outline-none rounded-lg border-primary-400'
						/>
					</div>
					<div className='flex gap-2 md:gap-4'>
						<Select
							value={jobFilter}
							onChange={value => setJobFilter(value)}
							placeholder='Filter by Job'
							className='w-full'
						>
							<Option value=''>All Jobs</Option>
							{jobOptions.map(job => (
								<Option key={job} value={job}>
									{job}
								</Option>
							))}
						</Select>
						<Select
							value={locationFilter}
							onChange={value => setLocationFilter(value)}
							placeholder='Filter by Location'
							className='w-full'
						>
							<Option value=''>All Locations</Option>
							{locationOptions.map(location => (
								<Option key={location} value={location}>
									{location}
								</Option>
							))}
						</Select>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SearchFilter
