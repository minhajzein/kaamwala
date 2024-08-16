import { Tooltip } from 'antd'
import { FaRegEye } from 'react-icons/fa'
import { RiEditLine } from 'react-icons/ri'

export const HiringStatus = ({ hiringStatus }) => {
	const statusClass =
		hiringStatus == 'active'
			? 'bg-green-50 border-green-400 border text-green-700'
			: hiringStatus == 'notavailable'
			? 'bg-orange-50 border border-orange-400 text-orange-700'
			: hiringStatus == 'blacklisted'
			? 'bg-red-50 border border-red-400 text-red-700'
			: ''
	return (
		<span
			className={`px-2 py-[2px] flex items-center justify-center rounded-full capitalize ${statusClass}`}
		>
			{hiringStatus}
		</span>
	)
}

const StaffColumns = (viewActionClick, editActionClick) => [
	{ Header: 'ID', accessor: 'id' },
	{ Header: 'EMP Code', accessor: 'employee_code' },
	{ Header: 'Name', accessor: 'name' },
	{ Header: 'Job Title', accessor: 'job_category' },
	{ Header: 'Location', accessor: 'location_name' },
	{ Header: 'Phone', accessor: 'phone' },
	{
		Header: 'Hiring Status',
		accessor: 'hiringStatus',
		Cell: ({ row }) => <HiringStatus hiringStatus={row.original.status} />,
	},
	{
		Header: () => <div className='text-center'>Actions</div>,
		accessor: 'actions',
		Cell: ({ row }) => (
			<div className='flex justify-center ml-2 space-x-2 items-center'>
				<Tooltip title='View' placement='top'>
					<button
						onClick={() => viewActionClick(row.original)}
						className='flex items-center justify-center p-1 bg-blue-100 text-gray-800 rounded border border-gray-400 hover:bg-blue-50 focus:outline-none focus:ring-2  text-xs md:text-sm'
					>
						<FaRegEye className='text-lg' />
					</button>
				</Tooltip>
				<Tooltip title='Edit' placement='top'>
					<button
						onClick={() => editActionClick(row.original)}
						className='flex items-center justify-center p-1 bg-green-100 text-zinc-800 rounded border border-zinc-400 hover:bg-green-50 focus:outline-none focus:ring-2  text-xs md:text-sm'
					>
						<RiEditLine className='text-lg' />
					</button>
				</Tooltip>
			</div>
		),
	},
]

export { StaffColumns }
