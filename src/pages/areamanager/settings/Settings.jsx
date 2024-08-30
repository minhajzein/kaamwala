import { useState } from 'react'
import {
	useAreaManagerProfileQuery,
	useUpdateAreaManagerProfileMutation,
} from '../../../redux/area-manager/api-slices/profileApiSlice'
import { Modal } from 'antd'
import * as Yup from 'yup'
import { CgSpinner } from 'react-icons/cg'
import { useFormik } from 'formik'
import { BiEdit } from 'react-icons/bi'
import { toast } from 'react-toastify'

//imports...........................................................

const Settings = () => {
	const [isOpen, setIsOpen] = useState(false)
	const { data, isLoading } = useAreaManagerProfileQuery()
	const [updateAreaManager, { isLoading: updating }] =
		useUpdateAreaManagerProfileMutation()

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
		password: Yup.string().required('Password is required'),
	})

	const formik = useFormik({
		initialValues: {
			name: data?.profile.name,
			phone: data?.profile.phone,
			email: data?.profile.email,
			password: data?.profile.password,
		},
		enableReinitialize: true,
		validationSchema,
		onSubmit: async values => {
			const response = await updateAreaManager(values)

			if (response?.data?.success) {
				toast.success(response.data.success)
				formik.resetForm()
				setIsOpen(false)
			} else {
				toast.error('Profile Updation Failed')
			}
		},
	})
	return isLoading ? (
		<div className='h-dvh w-full flex'>
			<CgSpinner className='animate-spin m-auto' />
		</div>
	) : (
		<div className='w-full flex flex-col gap-2'>
			<div className='flex w-full justify-between'>
				<h1 className='capitalize text-xl font-semibold'>
					Name: {data?.profile.name}
				</h1>
				<button
					onClick={() => setIsOpen(true)}
					title='Update Profile'
					className='bg-blue-500 flex justify-center items-center gap-1 text-white px-3 capitalize py-2 rounded-lg'
				>
					<BiEdit />
					<span className='hidden md:block'>update profile</span>
				</button>
			</div>
			<h1>Email: {data?.profile.email}</h1>{' '}
			<h1>Phone: {data?.profile?.phone}</h1>
			<Modal
				open={isOpen}
				title='Update Profile'
				footer={[]}
				closeIcon={true}
				onCancel={() => setIsOpen(false)}
			>
				<form onSubmit={formik.handleSubmit} className=''>
					<div className='grid grid-cols-2 gap-4'>
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
									formik.touched.name && formik.errors.name && 'border-red-500'
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
									formik.touched.phone &&
									formik.errors.phone &&
									'border-red-500'
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
									formik.touched.email &&
									formik.errors.email &&
									'border-red-500'
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
									formik.touched.password &&
									formik.errors.password &&
									'border-red-500'
								}`}
								placeholder='Enter Password'
							/>
							{formik.touched.password && formik.errors.password && (
								<p className='text-red-500 text-xs italic'>
									{formik.errors.password}
								</p>
							)}
						</div>
					</div>
					<div className='flex justify-end space-x-2 mt-5'>
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
			</Modal>
		</div>
	)
}

export default Settings
