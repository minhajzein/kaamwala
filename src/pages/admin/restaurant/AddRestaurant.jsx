import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import { Select } from 'antd'
import { useAddRestaurantMutation } from '../../../redux/admin/api-slices/restaurantApiSlice'
import { useGetAllLocationsQuery } from '../../../redux/admin/api-slices/locationApiSlice'
import { toast } from 'react-toastify'

const { Option } = Select

//imports................................................................

const AddRestaurant = ({ handleClose }) => {
	const [createRestaurant, { isLoading }] = useAddRestaurantMutation()
	const { data: locations } = useGetAllLocationsQuery()

	const validationSchema = Yup.object({
		restaurent_name: Yup.string().required('Full name is required'),
		contact: Yup.string().required('Contact number is required'),
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required'),
		location_id: Yup.string().required('Location is required'),
		address: Yup.string().required('address is required'),
		owner_name: Yup.string().required('Owner name is required'),
	})

	const formik = useFormik({
		initialValues: {
			restaurent_name: '',
			email: '',
			location_id: '',
			address: '',
			owner_name: '',
			contact: '',
		},
		validationSchema,
		onSubmit: async values => {
			try {
				const response = await createRestaurant(values)
				if (response?.data?.success) {
					toast.success(response.data.success)
					handleClose()
				} else {
					toast.error('Restaurant creation failed')
				}
			} catch (error) {
				console.error(error)
			}
		},
	})

	return (
		<div className='text-black'>
			<form onSubmit={formik.handleSubmit} className=''>
				<div className='grid grid-cols-2 gap-4'>
					<div className='mb-4'>
						<label
							htmlFor='restaurent_name'
							className='block text-gray-700 text-sm font-medium mb-1'
						>
							Restaurant Name
						</label>
						<input
							type='text'
							id='restaurent_name'
							{...formik.getFieldProps('restaurent_name')}
							className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${
								formik.touched.restaurent_name && formik.errors.restaurent_name
									? 'border-red-500'
									: ''
							}`}
							placeholder='Restaurant Name'
						/>
						{formik.touched.restaurent_name &&
							formik.errors.restaurent_name && (
								<p className='text-red-500 text-xs italic'>
									{formik.errors.restaurent_name}
								</p>
							)}
					</div>
					<div className='mb-4'>
						<label
							htmlFor='owner_name'
							className='block text-gray-700 text-sm font-medium mb-1'
						>
							Owner Name
						</label>
						<input
							type='text'
							id='owner_name'
							{...formik.getFieldProps('owner_name')}
							className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${
								formik.touched.owner_name && formik.errors.owner_name
									? 'border-red-500'
									: ''
							}`}
							placeholder='Owner Name'
						/>
						{formik.touched.owner_name && formik.errors.owner_name && (
							<p className='text-red-500 text-xs italic'>
								{formik.errors.owner_name}
							</p>
						)}
					</div>
					<div className='mb-4'>
						<label
							htmlFor='contact'
							className='block text-gray-700 text-sm font-medium mb-1'
						>
							Contact
						</label>
						<input
							type='text'
							id='contact'
							{...formik.getFieldProps('contact')}
							className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${
								formik.touched.contact && formik.errors.contact
									? 'border-red-500'
									: ''
							}`}
							placeholder='Contact Number'
						/>
						{formik.touched.contact && formik.errors.contact && (
							<p className='text-red-500 text-xs italic'>
								{formik.errors.contact}
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
								formik.touched.location && formik.errors.location
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
					</div>{' '}
					<div className='mb-4'>
						<label
							htmlFor='location_id'
							className='block text-gray-700 text-sm font-medium mb-1'
						>
							Location
						</label>
						<Select
							onChange={value => formik.setFieldValue('location_id', value)}
							placeholder='Select Location'
							className='w-full'
						>
							{locations?.locations.map(loc => (
								<Option value={loc.id}>{loc.location}</Option>
							))}
						</Select>
						{formik.touched.location_id && formik.errors.location_id && (
							<p className='text-red-500 text-xs italic'>
								{formik.errors.location_id}
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
						disabled={isLoading}
						type='submit'
						className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white modalAddBtn hover:modalAddBtnHover ${
							isLoading ? 'animate-pulse' : ''
						}`}
					>
						{isLoading ? 'Adding Restaurant...' : 'Add Restaurant'}
					</button>
				</div>
			</form>
		</div>
	)
}

export default AddRestaurant
