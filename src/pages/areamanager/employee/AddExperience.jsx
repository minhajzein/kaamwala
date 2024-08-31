import { Select, DatePicker, Rate, Radio } from 'antd'
import { useGetAllRestaurantsQuery } from '../../../redux/admin/api-slices/restaurantApiSlice'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAddExperienceMutation } from '../../../redux/area-manager/api-slices/employeeApiSlice'
import { useParams } from 'react-router-dom'
import { CgSpinner } from 'react-icons/cg'
import { toast } from 'react-toastify'

//imports................................................................................................

function AddExperience({ setShowModal }) {
	const { data } = useGetAllRestaurantsQuery()
	const [addExperience, { isLoading }] = useAddExperienceMutation()
	const { id } = useParams()

	const formik = useFormik({
		initialValues: {
			restaurent_id: '',
			start_date: '',
			end_date: '',
			total_experience: 0,
			case: false,
			case_details: '',
			hygiene: 0,
			wastage_control: 0,
			communication: 0,
			attenance: 0,
			productivity: 0,
		},
		validationSchema: Yup.object({
			restaurent_id: Yup.string().required('Please select a restaurant'),
			start_date: Yup.string().required(),
			end_date: Yup.string().required('Please select a date range'),
			total_experience: Yup.string().required(),
			case: Yup.boolean().required(),
			case_details: Yup.string(),
			hygiene: Yup.number().required(),
			wastage_control: Yup.number().required(),
			communication: Yup.number().required(),
			attenance: Yup.number().required(),
			productivity: Yup.number().required(),
		}),
		onSubmit: async values => {
			try {
				const response = await addExperience({ id, credentials: values })
				if (response?.data?.success) {
					toast.success(response.data.success)
					formik.resetForm()
					setShowModal(false)
				} else {
					toast.error('Please try again later')
				}
			} catch (error) {
				console.error(error)
			}
		},
	})

	const calculateExp = (value, dateString) => {
		let experience
		let years =
			Number(dateString[1].split('-')[0]) - Number(dateString[0].split('-')[0])
		let months =
			Number(dateString[1].split('-')[1]) - Number(dateString[0].split('-')[1])
		if (months < 0) {
			years - 1
			months = 12 + months
			experience = `${years}.${months}`
		} else {
			experience = `${years}.${months}`
		}
		formik.setFieldValue('total_experience', experience)
		formik.setFieldValue('start_date', dateString[0])
		formik.setFieldValue('end_date', dateString[1])
	}

	return (
		<form onSubmit={formik.handleSubmit} className='w-full flex flex-col gap-2'>
			<div className='flex flex-col'>
				<Select
					placeholder='Select a Restaurant'
					onChange={value => formik.setFieldValue('restaurent_id', value)}
					showSearch
					optionFilterProp='children'
					filterOption={(input, option) =>
						option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
						0
					}
				>
					{data?.restaurents.map(res => (
						<Select.Option value={res.id} key={res.id}>
							{res.restaurent_name}
						</Select.Option>
					))}
				</Select>
				{formik.touched.restaurent_id && (
					<p className='text-red-500 text-[10px]'>
						{formik.errors.restaurent_id}
					</p>
				)}
			</div>
			<div className='flex flex-col'>
				<DatePicker.RangePicker onChange={calculateExp} />
				{formik.touched.end_date && (
					<p className='text-red-500 text-[10px]'>{formik.errors.end_date}</p>
				)}
			</div>
			<input
				type='number'
				className='border rounded p-1'
				disabled
				placeholder={`Total Years of Experience : ${formik.values.total_experience} `}
			/>
			<hr />
			<h1 className='capitalize underline'>Ratings</h1>
			<div className='flex w-full items-center justify-between'>
				<h1>Hygiene</h1>
				<hr className='w-[20%]' />
				<Rate onChange={value => formik.setFieldValue('hygiene', value)} />
			</div>
			<div className='flex w-full items-center justify-between'>
				<h1>Wastage Control</h1>
				<hr className='w-[20%]' />
				<Rate
					onChange={value => formik.setFieldValue('wastage_control', value)}
				/>
			</div>
			<div className='flex w-full items-center justify-between'>
				<h1>Communication</h1>
				<hr className='w-[20%]' />
				<Rate
					onChange={value => formik.setFieldValue('communication', value)}
				/>
			</div>
			<div className='flex w-full items-center justify-between'>
				<h1>Attendance</h1>
				<hr className='w-[20%]' />
				<Rate onChange={value => formik.setFieldValue('attenance', value)} />
			</div>
			<div className='flex w-full items-center justify-between'>
				<h1>Productivity</h1>
				<hr className='w-[20%]' />
				<Rate onChange={value => formik.setFieldValue('productivity', value)} />
			</div>
			<hr />
			<h1 className='capitalize underline'>Case Details</h1>
			<div className='flex flex-col'>
				<Radio.Group onChange={formik.handleChange} name='case'>
					<Radio value={true}>yes</Radio>
					<Radio value={false}>no</Radio>
				</Radio.Group>
				{formik.touched.case && (
					<p className='text-red-500 text-[10px]'>{formik.errors.case}</p>
				)}
			</div>

			{formik.values.case && (
				<textarea
					className='border rounded outline-none p-2'
					name='case_details'
					value={formik.values.case_details}
					onChange={formik.handleChange}
				/>
			)}
			<button
				type='submit'
				disabled={isLoading}
				className='rounded border border-green-500 flex justify-center text-green-500 py-1 px-2'
			>
				{isLoading ? <CgSpinner className='animate-spin m-auto' /> : 'Save'}
			</button>
		</form>
	)
}

export default AddExperience
