import { Table } from 'antd'
import { useGetDashboardDataQuery } from '../../../redux/admin/api-slices/dashbordApiSlice'
import Cards from './Cards'
import recentEmployeesColumns from '../../../components/table/Columns/RecentEmployeesColumn'

//imports................................................................................................

const Dashboard = () => {
	const { data, error } = useGetDashboardDataQuery()

	return (
		<div>
			<Cards
				totalAreaManagers={data?.totalAreaManagers}
				totalEmployees={data?.totalEmployees}
				workingCount={data?.workingEmployees}
				nonWorking={data?.inactiveEmployees}
			/>
			<Table
				dataSource={data?.recentEmployees}
				columns={recentEmployeesColumns}
				pagination={{ position: ['bottomCenter'] }}
				rowKey={record => record.id}
			/>
		</div>
	)
}

export default Dashboard
