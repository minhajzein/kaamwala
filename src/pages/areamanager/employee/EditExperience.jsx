import { DatePicker, Form, Radio, Rate, Select } from 'antd'
import { useFormik } from 'formik'
import { CgSpinner } from 'react-icons/cg'
import * as Yup from 'yup'
import { useGetAllRestaurantsQuery } from '../../../redux/admin/api-slices/restaurantApiSlice'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import { useEditEmployeeExperienceMutation } from '../../../redux/area-manager/api-slices/employeeApiSlice'

//imports................................................................

function EditExperience({ experience, setShowModal }) {
	const { data, isLoading } = useGetAllRestaurantsQuery()
	const [editExperience, { isLoading: editing }] =
		useEditEmployeeExperienceMutation()

	const formik = useFormik({
		initialValues: {
			restaurent_id: experience.restaurent_id,
			start_date: experience.start_date,
			end_date: experience.end_date,
			total_experience: experience.total_experience,
			case: experience.case,
			case_details: experience.case_details ? experience.case_details : '',
			hygiene: experience.hygiene,
			wastage_control: experience.wastage_control,
			communication: experience.communication,
			attenance: experience.attenance,
			productivity: experience.productivity,
		},
		enableReinitialize: true,
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
				const response = await editExperience({
					id: experience.id,
					credentials: values,
				})

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
		<form
			onSubmit={formik.handleSubmit}
			className='w-full flex flex-col gap-2 mt-6'
		>
			<div className='flex flex-col'>
				<Select
					placeholder='Select a Restaurant'
					onChange={value => formik.setFieldValue('restaurent_id', value)}
					showSearch
					optionFilterProp='children'
					defaultValue={experience?.restaurant_details?.restaurent_name}
					loading={isLoading}
					id='restaurent_id'
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
				<DatePicker.RangePicker
					onChange={calculateExp}
					defaultValue={[
						dayjs(formik.values.start_date, 'YYYY/MM/DD'),
						dayjs(formik.values.end_date, 'YYYY/MM/DD'),
					]}
				/>
				{formik.touched.end_date && (
					<p className='text-red-500 text-[10px]'>{formik.errors.end_date}</p>
				)}
			</div>
			<input
				type='number'
				className='border rounded p-1'
				name='total_experience'
				disabled
				placeholder={`Total Years of Experience : ${formik.values.total_experience} `}
			/>
			<hr />
			<h1 className='capitalize underline'>Ratings</h1>
			<div className='flex w-full items-center justify-between'>
				<h1>Hygiene</h1>
				<hr className='w-[20%]' />
				<Rate
					id='hygiene'
					defaultValue={formik.values.hygiene}
					onChange={value => formik.setFieldValue('hygiene', value)}
				/>
			</div>
			<div className='flex w-full items-center justify-between'>
				<h1>Wastage Control</h1>
				<hr className='w-[20%]' />
				<Rate
					defaultValue={formik.values.wastage_control}
					id='wastage_control'
					onChange={value => formik.setFieldValue('wastage_control', value)}
				/>
			</div>
			<div className='flex w-full items-center justify-between'>
				<h1>Communication</h1>
				<hr className='w-[20%]' />
				<Rate
					defaultValue={formik.values.communication}
					id='communication'
					onChange={value => formik.setFieldValue('communication', value)}
				/>
			</div>
			<div className='flex w-full items-center justify-between'>
				<h1>Attendance</h1>
				<hr className='w-[20%]' />
				<Rate
					defaultValue={formik.values.attenance}
					id='attenance'
					onChange={value => formik.setFieldValue('attenance', value)}
				/>
			</div>
			<div className='flex w-full items-center justify-between'>
				<h1>Productivity</h1>
				<hr className='w-[20%]' />
				<Rate
					defaultValue={formik.values.productivity}
					id='productivity'
					onChange={value => formik.setFieldValue('productivity', value)}
				/>
			</div>
			<hr />
			<h1 className='capitalize underline'>Case Details</h1>
			<div className='flex flex-col'>
				<Radio.Group
					onChange={formik.handleChange}
					name='case'
					defaultValue={formik.values.case}
				>
					<Radio value={'1'}>yes</Radio>
					<Radio value={'0'}>no</Radio>
				</Radio.Group>
				{formik.touched.case && (
					<p className='text-red-500 text-[10px]'>{formik.errors.case}</p>
				)}
			</div>

			{formik.values.case !== '0' && (
				<textarea
					className='border rounded outline-none p-2'
					name='case_details'
					value={formik.values.case_details}
					onChange={formik.handleChange}
				/>
			)}
			<button
				type='submit'
				disabled={editing}
				className='rounded border border-green-500 flex justify-center text-green-500 py-1 px-2'
			>
				{editing ? <CgSpinner className='animate-spin m-auto' /> : 'Save'}
			</button>
		</form>
	)
}

export default EditExperience
