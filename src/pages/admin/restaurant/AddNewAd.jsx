import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useAddNewadMutation } from '../../../redux/admin/api-slices/adApiSlice'
import { useState } from 'react'
import getBase64 from '../../../utils/convertToBase64'
import { toast } from 'react-toastify'
import { CgSpinner } from 'react-icons/cg'

//imports...........................................................

function AddNewAd({ restaurantId, location, setIsShow }) {
	const [image, setImage] = useState(null)
	const [addNewAd, { isLoading }] = useAddNewadMutation()
	const handleSubmit = async () => {
		if (!image) return toast.error('Please add an image')
		const response = await addNewAd({
			restaurent_id: restaurantId,
			location: location,
			add: image,
		})
		if (response?.data?.success) {
			toast.success(response.data.success)
			setIsShow(false)
		} else {
			toast.error('Adding ad is failed')
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
		<div className='w-full flex flex-col gap-2'>
			<Upload
				listType='picture'
				maxCount={1}
				onChange={async info => {
					setImage(await toBase64(info.file))
				}}
				beforeUpload={() => false}
			>
				<Button type='dashed' icon={<UploadOutlined />}>
					Upload
				</Button>
			</Upload>
			<div className='w-full py-2 flex justify-end'>
				<botton
					type='submit'
					disabled={isLoading}
					onClick={handleSubmit}
					className='bg-blue-500 py-1 cursor-pointer px-2 rounded text-white'
				>
					{isLoading ? <CgSpinner className='animate-spin' /> : 'save'}
				</botton>
			</div>
		</div>
	)
}

export default AddNewAd
