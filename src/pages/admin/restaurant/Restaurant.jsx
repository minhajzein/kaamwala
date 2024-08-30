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
	const [restaurant, setRestaurant] = useState(null)
	const navigate = useNavigate()
	const { data } = useGetAllRestaurantsQuery()

	const handleCloseEditModal = () => {
		setShowEditModal(false)
	}

	const handleView = data => {
		navigate(`/admin/restaurant/profile/${data.id}`)
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
					id='edit-restaurant-admin'
					title='Edit Restaurant'
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
