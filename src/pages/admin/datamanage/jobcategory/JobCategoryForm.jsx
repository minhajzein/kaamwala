import React, { useState } from 'react'
import { CgSpinner } from 'react-icons/cg'

const JobCategoryForm = ({ initialData, onSubmit, isLoading, onCancel }) => {
	const [name, setName] = useState(initialData?.category || '')

	const handleSubmit = e => {
		e.preventDefault()
		const formData = { ...initialData, category: name }
		onSubmit(formData)
	}

	return (
		<form onSubmit={handleSubmit} className=''>
			<div className='mb-4'>
				<label
					className='block text-gray-700 text-sm font-bold mb-2'
					htmlFor='name'
				>
					Job Category
				</label>
				<input
					type='text'
					id='name'
					value={name}
					onChange={e => setName(e.target.value)}
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					placeholder='Enter job category'
					required
				/>
			</div>
			<div className='flex justify-end space-x-2 mt-4'>
				<button
					type='button'
					onClick={onCancel}
					className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2'
				>
					Close
				</button>
				<button
					type='submit'
					disabled={isLoading}
					className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2'
				>
					{isLoading ? <CgSpinner className='m-auto animate-spin' /> : 'Save'}
				</button>
			</div>
		</form>
	)
}

export default JobCategoryForm
