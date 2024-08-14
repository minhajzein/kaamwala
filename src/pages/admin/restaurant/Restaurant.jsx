import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../../components/table/DataTable'
import Modal from '../../../components/Modal'
import { RestaurantColumns } from '../../../components/table/Columns/RestaurantColumn'
import UpdateRestaurant from './UpdateRestaurant'
import { useGetAllRestaurantsQuery } from '../../../redux/admin/api-slices/restaurantApiSlice'

//imports................................................................

const Restaurant = () => {
	const [showEditModal, setShowEditModal] = useState(false)
	const navigate = useNavigate()
	const { data } = useGetAllRestaurantsQuery()

	const handleCloseEditModal = () => {
		setShowEditModal(false)
	}

	const handleView = id => {
		//    dispatch(viewAdminMadrasa(id))
		navigate('/admin/restaurant/profile')
	}
	const handleEdit = id => {
		//    dispatch(editAdminMadrasa(id))
		setShowEditModal(true)
	}

	const columns = RestaurantColumns(handleView, handleEdit)

	return (
		<div>
			<DataTable
				data={data?.restaurents}
				columns={columns}
				filterColumn='location'
				title={'Restaurant'}
				type='modal'
			/>
			{showEditModal && (
				<Modal
					visibles={showEditModal}
					onClose={handleCloseEditModal}
					id='edit-Madrasa-admin'
					title='Edit Madrasa'
					content={<UpdateRestaurant handleClose={handleCloseEditModal} />}
					size='big'
				/>
			)}
		</div>
	)
}

export default Restaurant
