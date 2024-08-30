import { useGetDashboardDataQuery } from '../../../redux/admin/api-slices/dashbordApiSlice'
import Cards from './Cards'
import DataTable from '../../../components/table/DataTable'
import { StaffColumns } from '../../../components/table/Columns/StaffColumns'
import { RecentEmployeesColumns } from '../../../components/table/Columns/RecentEmployeeColumns'

//imports................................................................................................

const Dashboard = () => {
	const { data } = useGetDashboardDataQuery()
	const columns = RecentEmployeesColumns()

	return (
		<div>
			<Cards
				totalAreaManagers={data?.totalAreaManagers}
				totalEmployees={data?.totalEmployees}
				workingCount={data?.workingEmployees}
				nonWorking={data?.inactiveEmployees}
			/>
			<DataTable
				data={data?.recentEmployees}
				columns={columns}
				filterColumn2='job_categories'
				filterColumn='location_name'
				title={'recent employees'}
				nopagination={true}
			/>
		</div>
	)
}

export default Dashboard
