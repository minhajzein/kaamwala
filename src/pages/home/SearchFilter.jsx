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
	onSearch,
}) => {
	return (
		<div className='md:px-10  md:py-3'>
			<div className='w-full flex flex-col gap-2 bg-primary-50 border shadow md:p-4 p-2 rounded-lg'>
				<div className='flex md:gap-2 gap-1 border-gray-200 w-full rounded-lg'>
					<Input
						placeholder='Employee Code or Name'
						onChange={e => onSearch(e.target.value)}
						className='p-2 w-full border border-primary-400'
					/>
					<Button
						type='button'
						onClick={onSearch}
						className='p-3  text-primary-900 border-primary-900 h-full flex gap-1 leading-none border text-center justify-center items-center rounded-lg cursor-pointer  font-medium bg-white hover:bg-gray-50'
					>
						<CiSearch />
						<span className='hidden md:block'>Search</span>
					</Button>
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
	)
}

export default SearchFilter
