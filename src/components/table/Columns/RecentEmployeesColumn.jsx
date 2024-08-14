import { Space, Tag } from 'antd'
import { Link } from 'react-router-dom'

const recentEmployeesColumns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		render: (_, record) => <Link to={``}>{record.name}</Link>,
	},
	{
		title: 'Restaurant',
		dataIndex: 'restaurant',
		key: 'restaurant',
		render: text => <a>{text}</a>,
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
		render: experience => <h1 className='text-center'>{experience}</h1>,
	},
	{
		title: 'Status',
		key: 'status',
		dataIndex: 'status',
		render: status => (
			<Tag color={status === 'active' ? 'green' : 'red'}>{status}</Tag>
		),
	},
]

export default recentEmployeesColumns
