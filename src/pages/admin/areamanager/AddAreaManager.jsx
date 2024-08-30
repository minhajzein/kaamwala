import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Select } from 'antd'
import { toast } from 'react-toastify'
import { useAddAreaManagerMutation } from '../../../redux/admin/api-slices/managerApiSlice'
import { useGetAllLocationsQuery } from '../../../redux/admin/api-slices/locationApiSlice'

//imports................................................................

const AddAreaManager = ({ handleClose }) => {
	const [addAreaManager, { loading: adding }] = useAddAreaManagerMutation()
	const { data: locations } = useGetAllLocationsQuery()

	const validationSchema = Yup.object({
		name: Yup.string().required('Full name is required'),
		phone: Yup.string()
			.required('Contact number is required')
			.matches(
				/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/,
				'Invalid Phone Number'
			),
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required'),
		location_id: Yup.string().required('Location is required'),
		address: Yup.string().required('Address is required'),
	})

	const formik = useFormik({
		initialValues: {
			name: '',
			phone: '',
			email: '',
			location_id: '',
			address: '',
		},
		validationSchema,
		onSubmit: async values => {
			const response = await addAreaManager(values)
			if (response?.data?.success) {
				toast.success(response.data.success)
				handleClose()
			} else {
				toast.error('Area manager is already exists')
			}
		},
	})

	return (
		<div className='text-black'>
			<form onSubmit={formik.handleSubmit} className=''>
				<div className='grid grid-cols-2 gap-2'>
					<div>
						<label
							htmlFor='name'
							className='block text-gray-700 text-sm font-medium mb-1'
						>
							Full Name
						</label>
						<input
							type='text'
							id='name'
							{...formik.getFieldProps('name')}
							className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${
								formik.touched.name && formik.errors.name
									? 'border-red-500'
									: ''
							}`}
							placeholder='Full Name'
						/>
						{formik.touched.name && formik.errors.name && (
							<p className='text-red-500 text-xs italic'>
								{formik.errors.name}
							</p>
						)}
					</div>
					<div>
						<label
							htmlFor='phone'
							className='block text-gray-700 text-sm font-medium mb-1'
						>
							Contact
						</label>
						<input
							type='text'
							id='phone'
							{...formik.getFieldProps('phone')}
							className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${
								formik.touched.phone && formik.errors.phone
									? 'border-red-500'
									: ''
							}`}
							placeholder='Contact Number'
						/>
						{formik.touched.phone && formik.errors.phone && (
							<p className='text-red-500 text-xs italic'>
								{formik.errors.phone}
							</p>
						)}
					</div>
					<div>
						<label
							htmlFor='email'
							className='block text-gray-700 text-sm font-medium mb-1'
						>
							Email
						</label>
						<input
							type='email'
							id='email'
							{...formik.getFieldProps('email')}
							className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${
								formik.touched.email && formik.errors.email
									? 'border-red-500'
									: ''
							}`}
							placeholder='Email Address'
						/>
						{formik.touched.email && formik.errors.email && (
							<p className='text-red-500 text-xs italic'>
								{formik.errors.email}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor='location'
							className='block text-gray-700 text-sm font-medium mb-1'
						>
							Location
						</label>
						<Select
							onChange={value => formik.setFieldValue('location_id', value)}
							placeholder='Select Location'
							className='w-full'
							showSearch
							optionFilterProp='children'
							filterOption={(input, option) =>
								option.props.children
									.toLowerCase()
									.indexOf(input.toLowerCase()) >= 0
							}
							size='large'
						>
							{locations?.locations.map(loc => (
								<Select.Option value={loc.id}>{loc.location}</Select.Option>
							))}
						</Select>
						{formik.touched.location && formik.errors.location && (
							<p className='text-red-500 text-xs italic'>
								{formik.errors.location}
							</p>
						)}
					</div>
					<div>
						<label
							htmlFor='address'
							className='block text-gray-700 text-sm font-medium mb-1'
						>
							Address
						</label>
						<input
							type='text'
							id='address'
							{...formik.getFieldProps('address')}
							className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${
								formik.touched.address && formik.errors.address
									? 'border-red-500'
									: ''
							}`}
							placeholder='Address'
						/>
						{formik.touched.address && formik.errors.address && (
							<p className='text-red-500 text-xs italic'>
								{formik.errors.address}
							</p>
						)}
					</div>
				</div>
				<div className='flex justify-end space-x-2 mt-5'>
					<button
						type='button'
						onClick={handleClose}
						className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2'
					>
						Close
					</button>
					<button
						disabled={adding}
						type='submit'
						className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white modalAddBtn hover:modalAddBtnHover ${
							adding ? 'animate-pulse' : ''
						}`}
					>
						{adding ? 'Adding Area Manager...' : 'Add Area Manager'}
					</button>
				</div>
			</form>
		</div>
	)
}

export default AddAreaManager
