import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../../components/table/DataTable'
import Modal from '../../../components/Modal'
import { StaffColumns } from '../../../components/table/Columns/StaffColumns'
import EditEmployee from './EditEmployee'
import { useGetAllEmployeesUnderAreaManagerQuery } from '../../../redux/area-manager/api-slices/employeeApiSlice'
import { useSelector } from 'react-redux'

const Employee = () => {
	const [showEditModal, setShowEditModal] = useState(false)
	const navigate = useNavigate()

	const handleCloseEditModal = () => {
		setShowEditModal(false)
	}

	const handleView = employee => {
		navigate(`/area-manager/employee/profile/${employee.id}`)
	}
	const handleEdit = id => {
		setShowEditModal(true)
	}

	const { data } = useGetAllEmployeesUnderAreaManagerQuery()
	console.log(data)

	const columns = StaffColumns(handleView, handleEdit)

	return (
		<div>
			<DataTable
				data={data?.employees}
				columns={columns}
				filterColumn='district'
				filterColumn2='location'
				title={'Employee'}
				type={'modal'}
			/>
			{showEditModal && (
				<Modal
					visibles={showEditModal}
					onClose={handleCloseEditModal}
					id='edit-kaamwala-admin'
					title='Edit Employee'
					content={<EditEmployee handleClose={handleCloseEditModal} />}
					size='big'
				/>
			)}
		</div>
	)
}

export default Employee
