import { useParams } from 'react-router-dom'
import { useGetSingleEmployeeQuery } from '../../redux/admin/api-slices/employeeApiSlice'
import ViewStaffs from '../admin/staffs/ViewStaffs'

//imports................................................

function SingleEmployee() {
	const { id } = useParams()
	const { data } = useGetSingleEmployeeQuery(id)

	return (
		<div className='w-full p-4'>
			<ViewStaffs employee={data?.employees} />
		</div>
	)
}

export default SingleEmployee
