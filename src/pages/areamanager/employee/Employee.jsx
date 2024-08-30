import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../../components/table/DataTable'
import Modal from '../../../components/Modal'
import { StaffColumns } from '../../../components/table/Columns/StaffColumns'
import EditEmployee from './EditEmployee'
import {
	useDeleteEmployeeMutation,
	useGetAllEmployeesUnderAreaManagerQuery,
} from '../../../redux/area-manager/api-slices/employeeApiSlice'

//imports................................................................

const Employee = () => {
	const [showEditModal, setShowEditModal] = useState(false)
	const [currentEmployee, setCurrentEmployee] = useState(null)
	const [deleteEmplyee, { isLoading }] = useDeleteEmployeeMutation()

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

	const handleDelete = async data => {
		try {
			const response = await deleteEmplyee(data.id)
			if (response?.data?.success) {
				toast.success(response.data.success)
			} else {
				toast.error('Deletion failed')
			}
		} catch (error) {
			console.error(error)
		}
	}

	const { data } = useGetAllEmployeesUnderAreaManagerQuery()

	const columns = StaffColumns(handleView, handleEdit, handleDelete)

	return (
		<>
			<DataTable
				data={data?.employees}
				columns={columns}
				filterColumn='location_name'
				filterColumn2='job_categories'
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
