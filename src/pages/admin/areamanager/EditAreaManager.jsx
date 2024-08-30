import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Select } from 'antd'
import { toast } from 'react-toastify'
import { useGetAllLocationsQuery } from '../../../redux/admin/api-slices/locationApiSlice'
import { useEditAreaManagerMutation } from '../../../redux/admin/api-slices/managerApiSlice'

//imports................................................................

const EditAreaManager = ({ handleClose, areaManager }) => {
	const { data: locations } = useGetAllLocationsQuery()
	const [updateAreaManager, { isLoading: updating }] =
		useEditAreaManagerMutation()

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
		address: Yup.string().required('Staff count is required'),
		status: Yup.string().required('Status is required'),
		password: Yup.string().required('Password is required'),
	})

	const formik = useFormik({
		initialValues: {
			name: areaManager.name,
			phone: areaManager.phone,
			email: areaManager.email,
			password: areaManager.password,
			location_id: areaManager.location_id,
			address: areaManager.address,
			status: areaManager.status,
		},
		enableReinitialize: true,
		validationSchema,
		onSubmit: async values => {
			const response = await updateAreaManager({
				id: areaManager.id,
				credentials: values,
			})

			if (response?.data?.success) {
				toast.success(response.data.success)
				handleClose()
			} else {
				toast.error('Area Manager Creation Failed')
			}
		},
	})

	return (
		<div className='text-black'>
			<form onSubmit={formik.handleSubmit} className=''>
				<div className='grid grid-cols-2 gap-4'>
					<div className='mb-4'>
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
					<div className='mb-4'>
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
					<div className='mb-4'>
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
					<div className='mb-4'>
						<label
							htmlFor='password'
							className='block text-gray-700 text-sm font-medium mb-1'
						>
							Password
						</label>
						<input
							type='text'
							id='password'
							{...formik.getFieldProps('password')}
							className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${
								formik.touched.password && formik.errors.password
									? 'border-red-500'
									: ''
							}`}
							placeholder='Enter Password'
						/>
						{formik.touched.password && formik.errors.password && (
							<p className='text-red-500 text-xs italic'>
								{formik.errors.password}
							</p>
						)}
					</div>
					<div className='mb-4'>
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
					<div className='mb-4'>
						<label
							htmlFor='location'
							className='block text-gray-700 text-sm font-medium mb-1'
						>
							Location
						</label>
						<Select
							onChange={value => formik.setFieldValue('location_id', value)}
							placeholder={`${areaManager.location_name}`}
							className='w-full'
							id='location_name'
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
					</div>{' '}
					<div className='mb-4'>
						<label
							htmlFor='status'
							className='block text-gray-700 text-sm font-medium mb-1'
						>
							Status
						</label>
						<Select
							onChange={value => formik.setFieldValue('status', value)}
							placeholder={`${
								areaManager.status === '0' ? 'active' : 'Inactive'
							}`}
							className='w-full'
						>
							<Option value='0'>Active</Option>
							<Option value='1'>Inactive</Option>
						</Select>
						{formik.touched.status && formik.errors.status && (
							<p className='text-red-500 text-xs italic'>
								{formik.errors.status}
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
						disabled={updating}
						type='submit'
						className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white modalAddBtn hover:modalAddBtnHover ${
							updating ? 'animate-pulse' : ''
						}`}
					>
						{updating ? 'Saving...' : 'Save'}
					</button>
				</div>
			</form>
		</div>
	)
}

export default EditAreaManager
