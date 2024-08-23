import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../../components/table/DataTable'
import Modal from '../../../components/Modal'
import { StaffColumns } from '../../../components/table/Columns/StaffColumns'
import EditEmployee from './EditEmployee'
import { useGetAllEmployeesUnderAreaManagerQuery } from '../../../redux/area-manager/api-slices/employeeApiSlice'

//imports................................................................

const Employee = () => {
	const [showEditModal, setShowEditModal] = useState(false)
	const [currentEmployee, setCurrentEmployee] = useState(null)
	const navigate = useNavigate()

	const handleCloseEditModal = () => {
		setShowEditModal(false)
	}

	const handleView = employee => {
		navigate(`/area-manager/employee/profile/${employee.id}`)
	}

	const handleEdit = data => {
		setCurrentEmployee(data)
		setShowEditModal(true)
	}

	const { data } = useGetAllEmployeesUnderAreaManagerQuery()

	const columns = StaffColumns(handleView, handleEdit)

	return (
		<>
			<DataTable
				data={data?.employees}
				columns={columns}
				filterColumn='job_category'
				filterColumn2='location_name'
				title={'Employee'}
				type={'modal'}
			/>
			{showEditModal && (
				<Modal
					visibles={showEditModal}
					onClose={handleCloseEditModal}
					id='edit-kaamwala-admin'
					title='Edit Employee'
					content={
						<EditEmployee
							employee={currentEmployee}
							handleClose={handleCloseEditModal}
						/>
					}
					size='big'
				/>
			)}
		</>
	)
}

export default Employee
