import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AreaManagerColumns } from '../../../components/table/Columns/AreaManagerColumn'
import DataTable from '../../../components/table/DataTable'
import Modal from '../../../components/Modal'
import EditAreaManager from './EditAreaManager'
import { useGetAllAreaManagersQuery } from '../../../redux/admin/api-slices/managerApiSlice'

//imports................................................................

const AreaManager = () => {
	const [showEditModal, setShowEditModal] = useState(false)
	const [currentAreaManager, setCurrentAreaManager] = useState(null)
	const navigate = useNavigate()
	const { data } = useGetAllAreaManagersQuery()

	const handleCloseEditModal = () => {
		setShowEditModal(false)
	}

	const handleView = data => {
		navigate(`/admin/areamanager/profile/${data.id}`)
	}

	const handleEdit = data => {
		setCurrentAreaManager(data)
		setShowEditModal(true)
	}

	const columns = AreaManagerColumns(handleView, handleEdit)

	return (
		<>
			<DataTable
				data={data?.areaMangers}
				columns={columns}
				filterColumn='location_name'
				title='Area_Manager'
				type='modal'
			/>
			{showEditModal && (
				<Modal
					visibles={showEditModal}
					onClose={handleCloseEditModal}
					id='edit-area-manager'
					title='Edit Area Manager'
					content={
						<EditAreaManager
							handleClose={handleCloseEditModal}
							areaManager={currentAreaManager}
						/>
					}
					size='big'
				/>
			)}
		</>
	)
}

export default AreaManager
