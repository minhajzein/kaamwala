import { useNavigate } from 'react-router-dom'
import DataTable from '../../../components/table/DataTable'
import { StaffColumns } from '../../../components/table/Columns/StaffColumns'
import { useGetAllEmployeesQuery } from '../../../redux/admin/api-slices/employeeApiSlice'

//imports............................................................................

const Staffs = () => {
	const navigate = useNavigate()

	const handleView = data => {
		navigate(`/admin/staff/profile/${data.id}`)
	}

	const columns = StaffColumns(handleView)
	const { data } = useGetAllEmployeesQuery()

	return (
		<div>
			<DataTable
				data={data?.employees}
				columns={columns}
				filterColumn='district'
				filterColumn2='range'
				title={'employe'}
			/>
		</div>
	)
}

export default Staffs
