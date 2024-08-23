import { useGetDashboardDataQuery } from '../../../redux/admin/api-slices/dashbordApiSlice'
import Cards from './Cards'
import DataTable from '../../../components/table/DataTable'
import { StaffColumns } from '../../../components/table/Columns/StaffColumns'

//imports................................................................................................

const Dashboard = () => {
	const { data } = useGetDashboardDataQuery()
	const columns = StaffColumns()
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
				filterColumn='job_category'
				filterColumn2='location_name'
				title={'recent employees'}
				nopagination={true}
			/>
		</div>
	)
}

export default Dashboard
