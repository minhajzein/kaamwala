import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from '../../../components/table/DataTable'
import { RestaurantColumns } from '../../../components/table/Columns/RestaurantColumn'
import { useGetAllRestaurantsQuery } from '../../../redux/admin/api-slices/restaurantApiSlice'
import Modal from '../../../components/Modal'
import UpdateRestaurant from '../../admin/restaurant/UpdateRestaurant'

//imports................................................................

const Restaurant = () => {
	const [showEditModal, setShowEditModal] = useState(false)
	const [restaurant, setRestaurant] = useState(null)
	const navigate = useNavigate()
	const { data } = useGetAllRestaurantsQuery()

	const handleCloseEditModal = () => {
		setShowEditModal(false)
	}

	const handleView = id => {
		//    dispatch(viewAdminMadrasa(id))
		navigate('/areamanager/restaurant/profile')
	}
	const handleEdit = data => {
		setRestaurant(data)
		setShowEditModal(true)
	}

	const columns = RestaurantColumns(handleView, handleEdit)

	return (
		<>
			<DataTable
				data={data?.restaurents}
				columns={columns}
				filterColumn='location_name'
				title={'Restaurant'}
				type='modal'
			/>
			{showEditModal && (
				<Modal
					visibles={showEditModal}
					onClose={handleCloseEditModal}
					id='edit-Madrasa-admin'
					title='Edit Madrasa'
					content={
						<UpdateRestaurant
							handleClose={handleCloseEditModal}
							restaurant={restaurant}
						/>
					}
					size='big'
				/>
			)}
		</>
	)
}

export default Restaurant
