import { Tag } from 'antd'
import { Link } from 'react-router-dom'

const recentEmployeesColumns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		render: (_, record) => (
			<Link to={``} className='capitalize'>
				{record.name}
			</Link>
		),
	},
	{
		title: 'Restaurant',
		dataIndex: 'restaurant',
		key: 'restaurant',
		render: text => <h1>{text}</h1>,
	},
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
	},
	{
		title: 'Experience',
		dataIndex: 'total_experience',
		key: 'total_experience',
		render: experience => <h1>{experience}+</h1>,
	},
	{
		title: 'Status',
		key: 'status',
		dataIndex: 'status',
		render: status => (
			<Tag color={status === '1' ? 'orange' : status === '2' ? 'green' : 'red'}>
				{status === '1'
					? 'Woriking'
					: status === '2'
					? 'Available to Hire'
					: 'Blacklisted'}
			</Tag>
		),
	},
]

export default recentEmployeesColumns
