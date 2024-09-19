import { useState } from 'react'
import { BiEdit, BiSearch } from 'react-icons/bi'
import {
	useAddMainCategoryMutation,
	useEditMainCategoryMutation,
	useGetAllMainCategoriesQuery,
} from '../../../../redux/admin/api-slices/mainCategoryApiSlice'
import MainCategoryForm from './MainCategoryForm'
import Modal from '../../../../components/Modal'
import { toast } from 'react-toastify'

//imports................................................................

function MainCategory() {
	const { data } = useGetAllMainCategoriesQuery()
	const [addCategory, { isLoading: adding }] = useAddMainCategoryMutation()
	const [editCategory, { isLoading: updating }] = useEditMainCategoryMutation()
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage] = useState(10)
	const [modalVisible, setModalVisible] = useState(false)
	const [currentItem, setCurrentItem] = useState(null)
	const [search, setSearch] = useState('')

	const filteredItems = data?.jobCategories.filter(item =>
		item.category.toLowerCase().includes(search.toLowerCase())
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
			const response = await editCategory({
				id: data.id,
				credentials: { category: data.category },
			})
			if (response?.data?.success) {
				setModalVisible(false)
				return toast.success(response.data.success)
			} else {
				return toast.error('Failed to edit Main category')
			}
		} else {
			const response = await addCategory(data)
			if (response?.data?.success) {
				setModalVisible(false)
				return toast.success(response.data.success)
			} else {
				return toast.error('Failed to add Main category')
			}
		}
	}

	const handleClose = () => {
		setModalVisible(false)
	}

	return (
		<div className='flex flex-col gap-2 md:p-6 w-full'>
			<div className='flex flex-col gap-2 md:flex-row w-full justify-between items-center'>
				<h2 className='md:text-2xl font-semibold'>Main Category Management</h2>
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
			<div className='bg-white rounded-lg shadow-md p-4'>
				<table className='min-w-full'>
					<thead>
						<tr>
							<th className='px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
								Name
							</th>
							<th className='px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{currentItems?.map(item => (
							<tr key={item.id}>
								<td className='px-4 py-4 border-b border-gray-200 bg-white text-sm'>
									{item.category}
								</td>
								<td className='px-4 py-4 border-b border-gray-200 bg-white text-sm flex items-center'>
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
					id={'add-main-category'}
					onClose={handleClose}
					title={currentItem ? 'Edit Main Category' : 'Add Main Category'}
					content={
						<MainCategoryForm
							initialData={currentItem}
							onSubmit={handleSubmit}
							onCancel={handleClose}
							isLoading={adding || updating}
						/>
					}
				/>
			)}
		</div>
	)
}

export default MainCategory
