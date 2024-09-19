import { useParams } from 'react-router-dom'
import { useGetAdsLocationWiseQuery } from '../../../redux/api-slices/kaamwalaApiSlice'
import AdCard from './AdCard'

//imports..................................................

function AdsByLocation() {
	const { location } = useParams()
	const { data } = useGetAdsLocationWiseQuery(location)

	return (
		<div className='flex flex-col gap-2 md:px-[180px] w-full p-1'>
			<h1 className='text-center font-bold text-green-500'>{`Showing Best Offers in ${location}`}</h1>
			<div className='border w-full p-2 gap-2 rounded grid grid-cols-1 md:grid-cols-2'>
				{data?.filters.map(ad => (
					<AdCard key={ad.id} ad={ad} />
				))}
			</div>
		</div>
	)
}

export default AdsByLocation
