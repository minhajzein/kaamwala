import { FaRegEye } from 'react-icons/fa'
import { RiEditLine } from 'react-icons/ri'
import { Tooltip } from 'antd'

//imports................................................................

const RestaurantColumns = (viewActionClick, editActionClick) => [
	{
		Header: 'Restaurant Name',
		accessor: 'restaurent_name',
	},
	{
		Header: 'Owner Name',
		accessor: 'owner_name',
	},
	{
		Header: 'Contact',
		accessor: 'contact',
	},
	{
		Header: 'Email',
		accessor: 'email',
	},
	{
		Header: 'Location',
		accessor: 'location_name',
	},
	{
		Header: 'Address',
		accessor: 'address',
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

export { RestaurantColumns }
