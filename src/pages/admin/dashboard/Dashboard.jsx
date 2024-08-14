import { Table } from 'antd'
import { useGetDashboardDataQuery } from '../../../redux/admin/api-slices/dashbordApiSlice'
import Cards from './Cards'
import recentEmployeesColumns from '../../../components/table/Columns/RecentEmployeesColumn'

//imports................................................................................................

const Dashboard = () => {
	const columns = []
	const { data, error } = useGetDashboardDataQuery()
	console.log(data, error)

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
			/>
		</div>
	)
}

export default Dashboard
