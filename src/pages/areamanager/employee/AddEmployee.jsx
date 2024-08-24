import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Input, Button, Upload, Radio, Select } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useAddEmployeeMutation } from '../../../redux/area-manager/api-slices/employeeApiSlice'
import { useGetAllCategoriesQuery } from '../../../redux/admin/api-slices/categoryApiSlice'
import { useGetAllLocationsQuery } from '../../../redux/admin/api-slices/locationApiSlice'
import { CgSpinner } from 'react-icons/cg'
import { toast } from 'react-toastify'
import getBase64 from '../../../utils/convertToBase64'
const { TextArea } = Input

//imports................................................................

const validationSchema = Yup.object().shape({
	photo: Yup.string().required('Photo is required'),
	aadhar_front: Yup.string().required('Adhar front is required'),
	aadhar_back: Yup.string().required('Adhar back is required'),
	name: Yup.string().required('Name is required'),
	job_category_id: Yup.string().required('Job is required'),
	address: Yup.string().required('Address is required'),
	location_id: Yup.string().required('Location is required'),
	phone: Yup.string().required('Phone is required'),
	status: Yup.string().required(),
	case_details: Yup.string().when('status', {
		is: val => val === 3,
		then: () => Yup.string().required(),
		otherwise: () => Yup.string(),
	}),
})

const AddEmployee = ({ handleClose }) => {
	const { data: categories } = useGetAllCategoriesQuery()
	const { data: locations } = useGetAllLocationsQuery()
	const [addAnEmployee, { isLoading }] = useAddEmployeeMutation()

	const handleSubmit = async values => {
		const response = await addAnEmployee(values)
		console.log(response)

		if (response?.data?.success) {
			toast.success(response.data.success)
			handleClose()
		} else {
			toast.error('Employee already exists')
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
		<div className='flex flex-col rounded-lg'>
			<Formik
				initialValues={{
					photo: null,
					aadhar_front: null,
					aadhar_back: null,
					name: '',
					job_category_id: '',
					address: '',
					location_id: '',
					phone: '',
					status: '',
					total_experience: 0,
					case_details: '',
				}}
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
									{({ field }) => (
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
									{({ field }) => (
										<Upload
											name='aadhar_front'
											maxCount={1}
											listType='picture'
											beforeUpload={() => false}
											onChange={async info =>
												setFieldValue(
													'aadhar_front',
													await getBase64(info.file)
												)
											}
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
									{({ field }) => (
										<Upload
											name='aadhar_back'
											maxCount={1}
											listType='picture'
											beforeUpload={() => false}
											onChange={async info =>
												setFieldValue('aadhar_back', await getBase64(info.file))
											}
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
											placeholder='Select a Role'
											onChange={value =>
												setFieldValue('job_category_id', value)
											}
										>
											{categories?.jobCategories.map(category => (
												<Option value={category.id}>{category.category}</Option>
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
											placeholder='Select a Location'
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
									onChange={e => setFieldValue('status', e.target.value)}
								>
									<Radio value={1}>Working</Radio>
									<Radio value={2}>Not Working</Radio>
									<Radio value={3}>Blacklisted</Radio>
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

export default AddEmployee
