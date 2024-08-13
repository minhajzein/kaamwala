import React, { useState } from 'react'
import { BiEdit, BiSearch } from 'react-icons/bi'
import Modal from '../../../../components/Modal'
import LocationForm from './LocationForm'
import { useGetAllLocationsQuery } from '../../../../redux/admin/api-slices/locationApiSlice'

//imports......................................................................................

const Location = () => {
	const [locations, setLocations] = useState([])
	const { data, error, isLoading } = useGetAllLocationsQuery()
	console.log(data, error)

	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage] = useState(10)
	const [modalVisible, setModalVisible] = useState(false)
	const [currentItem, setCurrentItem] = useState(null)
	const [search, setSearch] = useState('')

	const filteredItems = data?.locations?.filter(
		item =>
			item.district_name?.toLowerCase().includes(search.toLowerCase()) ||
			item.location?.toLowerCase().includes(search.toLowerCase())
	)

	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = filteredItems?.slice(indexOfFirstItem, indexOfLastItem)

	const paginate = pageNumber => setCurrentPage(pageNumber)

	const pageNumbers = []
	for (let i = 1; i <= Math.ceil(filteredItems?.length / itemsPerPage); i++) {
		pageNumbers.push(i)
	}

	const handleCreate = () => {
		setCurrentItem(null)
		setModalVisible(true)
	}

	const handleEdit = item => {
		setCurrentItem(item)
		setModalVisible(true)
	}

	const handleSubmit = data => {
		if (currentItem) {
			// Update logic here
			setLocations(locations.map(loc => (loc === currentItem ? data : loc)))
		} else {
			// Create logic here
			setLocations([...locations, data])
		}
		setModalVisible(false)
	}

	const handleClose = () => {
		setModalVisible(false)
	}

	return (
		<div className='container mx-auto p-6'>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-2xl font-semibold'>Location Management</h2>
				<div className='flex items-center gap-4'>
					<div className='flex items-center border rounded-md px-3 py-2 bg-white'>
						<BiSearch className='text-gray-500' />
						<input
							type='text'
							placeholder='Search...'
							onChange={e => setSearch(e.target.value)}
							className='ml-2 border-none focus:outline-none'
						/>
					</div>
					<button
						onClick={handleCreate}
						className='bg-blue-600 text-white py-2 px-4 rounded-lg'
					>
						Add New Location
					</button>
				</div>
			</div>
			<div className='bg-white rounded-lg shadow-md p-4'>
				<table className='min-w-full'>
					<thead>
						<tr>
							<th className='px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
								District
							</th>
							<th className='px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
								Location
							</th>
							<th className='px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-end text-xs font-semibold text-gray-600 uppercase tracking-wider'>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{currentItems?.map((item, index) => (
							<tr key={index}>
								<td className='px-4 py-4 border-b border-gray-200 bg-white text-sm'>
									{item.district}
								</td>
								<td className='px-4 py-4 border-b border-gray-200 bg-white text-sm'>
									{item.location}
								</td>
								<td className='px-4 py-4 border-b border-gray-200 bg-white text-sm flex justify-end items-center'>
									<button
										onClick={() => handleEdit(item)}
										className='text-indigo-600 hover:text-indigo-900'
									>
										<BiEdit />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className='flex justify-end mt-4'>
					{pageNumbers.map(number => (
						<button
							key={number}
							onClick={() => paginate(number)}
							className='text-xs bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-2 mx-1 rounded'
						>
							{number}
						</button>
					))}
				</div>
			</div>
			{modalVisible && (
				<Modal
					visibles={modalVisible}
					onClose={handleClose}
					id='location-datamanage-add'
					title={currentItem ? 'Edit Location' : 'Add Location'}
					content={
						<LocationForm
							initialData={currentItem}
							onSubmit={handleSubmit}
							handleClose={handleClose}
						/>
					}
					size='big'
				/>
			)}
		</div>
	)
}

export default Location
