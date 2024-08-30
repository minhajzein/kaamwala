import { useNavigate } from 'react-router-dom'
import DataTable from '../../../components/table/DataTable'
import { StaffColumns } from '../../../components/table/Columns/StaffColumns'
import { useGetAllEmployeesQuery } from '../../../redux/admin/api-slices/employeeApiSlice'
import Modal from '../../../components/Modal'
import { useState } from 'react'
import EditEmployee from '../../areamanager/employee/EditEmployee'
import { useDeleteEmployeeMutation } from '../../../redux/area-manager/api-slices/employeeApiSlice'
import { toast } from 'react-toastify'

//imports............................................................................

const Staffs = () => {
	const [showEditModal, setShowEditModal] = useState(false)
	const [currentEmployee, setCurrentEmployee] = useState(null)
	const [deleteEmplyee, { isLoading }] = useDeleteEmployeeMutation()

	const navigate = useNavigate()

	const handleView = data => {
		navigate(`/admin/staff/profile/${data.id}`)
	}

	const handleCloseEditModal = () => {
		setShowEditModal(false)
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

	const columns = StaffColumns(handleView, handleEdit, handleDelete)

	const { data } = useGetAllEmployeesQuery()

	return (
		<div>
			<DataTable
				data={data?.employees}
				columns={columns}
				filterColumn='location_name'
				filterColumn2='job_categories'
				type={'modal'}
				title={'Employee'}
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
		</div>
	)
}

export default Staffs
