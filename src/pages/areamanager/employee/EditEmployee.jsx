import { useGetAllLocationsQuery } from '../../../redux/admin/api-slices/locationApiSlice'
import { useGetAllCategoriesQuery } from '../../../redux/admin/api-slices/categoryApiSlice'
import { useEditEmployeeMutation } from '../../../redux/area-manager/api-slices/employeeApiSlice'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Input, Radio, Select, Upload } from 'antd'
import * as Yup from 'yup'
import { CgSpinner } from 'react-icons/cg'
import TextArea from 'antd/es/input/TextArea'
import { toast } from 'react-toastify'
import getBase64 from '../../../utils/convertToBase64'

//imports..........................................................................................

const validationSchema = Yup.object().shape({
	photo: Yup.mixed().required('Photo is required'),
	aadhar_front: Yup.mixed().required('Adhar front is required'),
	aadhar_back: Yup.mixed().required('Adhar back is required'),
	name: Yup.string().required('Name is required'),
	job_category_id: Yup.string().required('Job is required'),
	address: Yup.string().required('Address is required'),
	location_id: Yup.string().required('Location is required'),
	phone: Yup.string().required('Phone is required'),
})

const EditEmployee = ({ employee, handleClose }) => {
	const { data: categories } = useGetAllCategoriesQuery()
	const { data: locations } = useGetAllLocationsQuery()
	const [updateAnEmployee, { isLoading }] = useEditEmployeeMutation()
	console.log(employee)

	const handleSubmit = async values => {
		const response = await updateAnEmployee({
			id: employee.id,
			credentials: values,
		})
		console.log(response)
		if (response?.data?.success) {
			toast.success(response.data.success)
			handleClose()
		} else {
			toast.error('Employee updation failed')
		}
	}

	const toBase64 = async file => {
		try {
			const base64 = await getBase64(file)
			return base64
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className='flex flex-col overflow-y-auto rounded-lg'>
			<Formik
				initialValues={{
					photo: employee.photo,
					aadhar_front: employee.aadhar_front,
					aadhar_back: employee.aadhar_back,
					name: employee.name,
					job_category_id: employee.job_category_id,
					address: employee.address,
					location_id: employee.location_id,
					phone: employee.phone,
					status: employee.status,
					case_details: employee.case_details,
				}}
				enableReinitialize:true
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ setFieldValue }) => (
					<Form>
						<div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
							<div>
								<label className='block text-sm font-medium text-gray-700'>
									Photo
								</label>
								<Field name='photo'>
									{() => (
										<Upload
											name='photo'
											maxCount={1}
											listType='picture'
											beforeUpload={() => false}
											onChange={async info => {
												setFieldValue('photo', await toBase64(info.file))
											}}
										>
											<Button icon={<UploadOutlined />}>Upload</Button>
										</Upload>
									)}
								</Field>
								<ErrorMessage
									name='photo'
									component='div'
									className='text-red-500 text-xs mt-1'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700'>
									Adhar Front
								</label>
								<Field name='aadhar_front'>
									{() => (
										<Upload
											name='aadhar_front'
											maxCount={1}
											listType='picture'
											beforeUpload={() => false}
											onChange={async info => {
												setFieldValue('aadhar_front', await toBase64(info.file))
											}}
										>
											<Button icon={<UploadOutlined />}>Upload</Button>
										</Upload>
									)}
								</Field>
								<ErrorMessage
									name='aadhar_front'
									component='div'
									className='text-red-500 text-xs mt-1'
								/>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700'>
									Adhar Back
								</label>
								<Field name='aadhar_back'>
									{() => (
										<Upload
											name='aadhar_back'
											maxCount={1}
											listType='picture'
											beforeUpload={() => false}
											onChange={async info => {
												setFieldValue('aadhar_back', await toBase64(info.file))
											}}
										>
											<Button icon={<UploadOutlined />}>Upload</Button>
										</Upload>
									)}
								</Field>
								<ErrorMessage
									name='aadhar_back'
									component='div'
									className='text-red-500 text-xs mt-1'
								/>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700'>
									Name
								</label>
								<Field
									name='name'
									as={Input}
									className='mt-1 block w-full p-1 border rounded-md'
								/>
								<ErrorMessage
									name='name'
									component='div'
									className='text-red-500 text-xs mt-1'
								/>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700'>
									Job
								</label>
								<Field name='job_category_id'>
									{({ field }) => (
										<Select
											name='job_category_id'
											className='w-full'
											placeholder={employee.job_category}
											onChange={value =>
												setFieldValue('job_category_id', value)
											}
										>
											{categories?.jobCategories.map(category => (
												<Select.Option value={category.id}>
													{category.category}
												</Select.Option>
											))}
										</Select>
									)}
								</Field>
								<ErrorMessage
									name='job_category_id'
									component='div'
									className='text-red-500 text-xs mt-1'
								/>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700'>
									Address
								</label>
								<Field
									name='address'
									as={TextArea}
									className='mt-1 block w-full p-1 border rounded-md'
								/>
								<ErrorMessage
									name='address'
									component='div'
									className='text-red-500 text-xs mt-1'
								/>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700'>
									Location
								</label>
								<Field name='location_id'>
									{({ field }) => (
										<Select
											name='location_id'
											className='w-full'
											placeholder={employee.location_name}
											onChange={value => setFieldValue('location_id', value)}
										>
											{locations?.locations.map(loc => (
												<Option value={loc.id}>{loc.location}</Option>
											))}
										</Select>
									)}
								</Field>
								<ErrorMessage
									name='location_id'
									component='div'
									className='text-red-500 text-xs mt-1'
								/>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700'>
									Phone
								</label>
								<Field
									name='phone'
									as={Input}
									className='mt-1 block w-full p-1 border rounded-md'
								/>
								<ErrorMessage
									name='phone'
									component='div'
									className='text-red-500 text-xs mt-1'
								/>
							</div>
							<div className='flex flex-col gap-1 '>
								<h1>Employee Status</h1>
								<Radio.Group
									className='p-3 rounded-md bg-white border'
									defaultValue={employee.status}
									onChange={e => setFieldValue('status', e.target.value)}
								>
									<Radio value={'1'}>Working</Radio>
									<Radio value={'2'}>Not Working</Radio>
									<Radio value={'3'}>Blacklisted</Radio>
								</Radio.Group>
								<ErrorMessage
									name='status'
									component='div'
									className='text-red-500 text-xs mt-1'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700'>
									Case Details
								</label>
								<Field
									name='case_details'
									as={TextArea}
									className='mt-1 block w-full p-1 border rounded-md'
								/>
								<ErrorMessage
									name='case_details'
									component='div'
									className='text-red-500 text-xs mt-1'
								/>
							</div>
						</div>

						<Button
							type='primary'
							htmlType='submit'
							className='w-full bg-blue-600 mt-2 text-white flex hover:bg-blue-700'
						>
							{isLoading ? (
								<CgSpinner className='m-auto animate-spin' />
							) : (
								'Submit'
							)}
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default EditEmployee
