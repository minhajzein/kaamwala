import food from '/Images/food.jpg'
import {
	MdMyLocation,
	MdOutlineMailOutline,
	MdSmartphone,
} from 'react-icons/md'
import { IoLocation } from 'react-icons/io5'
import { FaRegUser } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { useGetSingleRestaurantQuery } from '../../../redux/admin/api-slices/restaurantApiSlice'
import { SiGoogleadsense } from 'react-icons/si'
import { Modal } from 'antd'
import { useState } from 'react'
import AddNewAd from './AddNewAd'
import AdCard from './AdCard'

//imports.....................................................................................

const RestaurantProfile = () => {
	const { id } = useParams()
	const { data } = useGetSingleRestaurantQuery(id)
	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<div className='p-5'>
			<div className='bg-white p-5 rounded-md border'>
				<div className='grid grid-cols-1 lg:grid-cols-[1fr,4fr] gap-4'>
					<div className='rounded-md'>
						<img src={food} className='rounded-md w-48 p-2 border-2' alt='' />
					</div>
					<div className='p-2'>
						<div className='flex flex-col lg:flex-row justify-between'>
							<div>
								<div className='text-2xl'>
									{data?.restaurent.restaurent_name}
								</div>
								<div className='flex gap-2 items-center'>
									<IoLocation />
									{data?.restaurent.location_name}
								</div>
							</div>
						</div>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-2 w-full pt-4 text-gray-600'>
							<div className='flex gap-2 items-center'>
								<FaRegUser />
								{data?.restaurent.owner_name}
							</div>
							<div className='flex gap-2 items-center'>
								<MdMyLocation />
								{data?.restaurent.address}
							</div>
							<div className='flex gap-2 items-center'>
								<MdOutlineMailOutline />
								{data?.restaurent.email}
							</div>
							<div className='flex gap-2 items-center'>
								<MdSmartphone />
								{data?.restaurent.contact}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-white border rounded-sm p-4 mt-4'>
				<div className='flex gap-2 justify-between items-center mb-5'>
					<h1 className='flex items-center gap-2'>
						<SiGoogleadsense />
						Ads
					</h1>
					<button
						onClick={() => setIsModalOpen(true)}
						className='bg-blue-500 text-white py-2 px-3 rounded-lg text-xs'
					>
						Add new ad
					</button>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					{data?.ads.map(ad => (
						<AdCard key={ad.id} ad={ad} />
					))}
				</div>
			</div>
			<Modal
				title='Add new Ad'
				open={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				footer={[]}
			>
				<AddNewAd
					restaurantId={data?.restaurent.id}
					location={data?.restaurent.location_name}
					setIsShow={setIsModalOpen}
				/>
			</Modal>
		</div>
	)
}

export default RestaurantProfile
