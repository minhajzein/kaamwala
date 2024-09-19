import React, { useState } from 'react'
import { BiEdit, BiSearch } from 'react-icons/bi'
import Modal from '../../../../components/Modal'
import LocationForm from './LocationForm'
import {
	useAddLocationMutation,
	useEditLocationMutation,
	useGetAllLocationsQuery,
} from '../../../../redux/admin/api-slices/locationApiSlice'
import { toast } from 'react-toastify'

//imports......................................................................................

const Location = () => {
	const { data } = useGetAllLocationsQuery()
	const [addLocation, { isLoading: adding }] = useAddLocationMutation()
	const [editLocation, { isLoading: updating }] = useEditLocationMutation()
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

	const handleSubmit = async data => {
		if (currentItem) {
			// Update logic here
			const response = await editLocation(currentItem.id, data)

			console.log(response)
		} else {
			// Create logic here
			const response = await addLocation(data)
			if (response?.data) {
				toast.success('Location added successfully')
				setModalVisible(false)
			} else {
				toast.error(response.error.data.errors.location[0])
			}
		}
	}

	return (
		<div className='flex flex-col gap-2 md:p-6 w-full'>
			<div className='flex flex-col gap-2 md:flex-row w-full justify-between items-center'>
				<h2 className='md:text-2xl font-semibold'>Location Management</h2>
				<div className='flex w-full md:w-auto items-center gap-2 md:gap-4'>
					<div className='flex items-center md:w-auto w-[80%]  border rounded-md md:px-3 p-1 md:py-2 bg-white'>
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
						className='bg-blue-600 truncate text-white py-1 px-3 md:py-2 md:px-4 rounded-lg'
					>
						<span className='md:hidden'>+</span>{' '}
						<span className='hidden md:block'>Add new</span>
					</button>
				</div>
			</div>
			<div className='bg-white w-full overflow-x-auto rounded-lg shadow-md md:p-4'>
				<table className='md:w-full'>
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
									{item.district_name}
								</td>
								<td className='px-4 py-4 border-b border-gray-200 bg-white text-sm'>
									{item.location}
								</td>
								<td className='px-4 py-4 border-b border-gray-200 bg-white text-sm flex justify-end items-center'>
									<button
										onClick={() => handleEdit(item)}
										className='text-indigo-600 hover:text-indigo-900'
									>
										<BiEdit className='text-xl' />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className='flex justify-end'>
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
			{modalVisible && (
				<Modal
					visibles={modalVisible}
					onClose={() => setModalVisible(false)}
					id='location-datamanage-add'
					title={currentItem ? 'Edit Location' : 'Add Location'}
					content={
						<LocationForm
							initialData={currentItem}
							onSubmit={handleSubmit}
							handleClose={() => setModalVisible(false)}
							districts={data?.districts}
							isLoading={adding || updating}
						/>
					}
					size='big'
				/>
			)}
		</div>
	)
}

export default Location
