import { useState, useEffect } from 'react'

//imports.................................................................

const LocationForm = ({ initialData, onSubmit, handleClose, districts }) => {
	const [district, setDistrict] = useState(initialData?.district || '')
	const [location, setLocation] = useState(initialData?.location || '')

	const handleSubmit = async e => {
		e.preventDefault()
		const formData = { district_id: district, location }
		onSubmit(formData)
	}

	return (
		<form onSubmit={handleSubmit} className=' rounded-lg'>
			<div className='mb-4'>
				<label
					className='block text-gray-700 text-sm font-bold mb-2'
					htmlFor='district'
				>
					District
				</label>
				<select
					id='district'
					value={district}
					onChange={e => setDistrict(e.target.value)}
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					required
				>
					<option value='' disabled>
						Select district
					</option>
					{districts?.map(dist => (
						<option key={dist.id} value={dist.id}>
							{dist.district}
						</option>
					))}
				</select>
			</div>
			<div className='mb-4'>
				<label
					className='block text-gray-700 text-sm font-bold mb-2'
					htmlFor='location'
				>
					Location
				</label>
				<input
					type='text'
					id='location'
					value={location}
					onChange={e => setLocation(e.target.value)}
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					placeholder='Enter location'
					required
				/>
			</div>
			<div className='flex justify-end space-x-2 mt-4'>
				<button
					type='button'
					onClick={handleClose}
					className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2'
				>
					Close
				</button>
				<button
					type='submit'
					className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2'
				>
					Save
				</button>
			</div>
		</form>
	)
}

export default LocationForm
