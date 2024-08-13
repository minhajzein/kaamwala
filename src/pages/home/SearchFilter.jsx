import { Select, Input, Button } from 'antd'
import { FiSearch } from 'react-icons/fi'
import { CiSearch } from 'react-icons/ci'
const { Option } = Select

//imports................................................................................................................................

const SearchFilter = ({
	search,
	setSearch,
	jobFilter,
	setJobFilter,
	locationFilter,
	setLocationFilter,
	jobOptions,
	locationOptions,
	onSearch,
}) => (
	<div className='px-10 py-3'>
		<div className='w-full flex sticky flex-col gap-2 bg-primary-50 border shadow p-4 rounded-lg'>
			<div className='flex md:gap-2 gap-1 border-gray-200 w-full rounded-lg'>
				<Input
					placeholder='Job Title or Keyword'
					value={search}
					onChange={e => setSearch(e.target.value)}
					className='p-2 w-full border border-primary-400'
				/>
				<div className='border flex md:hidden items-center justify-center mb-2 rounded-lg'>
					<FiSearch />
				</div>
				<Button
					type='button'
					onClick={onSearch}
					className='p-3 hidden text-primary-900 border-primary-900 h-full md:flex gap-1 leading-none border text-center justify-center items-center rounded-lg cursor-pointer  font-medium bg-white hover:bg-gray-50'
				>
					<CiSearch />
					Search
				</Button>
			</div>
			<div className='grid md:grid-cols-4 md:gap-4'>
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

export default SearchFilter
