import { useGetManagerDashboardDataQuery } from '../../../redux/area-manager/api-slices/dashboardApiSlice'
import Cards from './Cards'

//imports................................................................

const Dashboard = () => {
	const { data } = useGetManagerDashboardDataQuery()

	return (
		<Cards
			totalRestaurants={data?.totalRestaurents}
			totalEmployees={data?.employees}
			workingCount={data?.totalWorkingEmployee}
			nonWorking={data?.totalNonWorkingEmployee}
		/>
	)
}

export default Dashboard
