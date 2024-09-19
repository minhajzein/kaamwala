import { FaCopy } from "react-icons/fa"

function AdCard({ ad }) {
	const copyToClipBoard = id => {
		navigator.clipboard.writeText(
			`${window.location.origin.toString()}/offer-zone/${id}`
		)
		toast.success('Ad link copied to clipboard')
	}

	return (
		<div className='flex flex-col'>
			<img
				className='w-full rounded-t shadow object-contain'
				src={ad.add}
				alt='ads'
			/>
			<div className='w-full bg-gray-100 p-1 rounded-b flex justify-between'>
				<h1 className='capitalize text-xs'>
					{ad.restaurant}, {ad.location}
				</h1>
				<h1
					onClick={() => copyToClipBoard(ad.id)}
					className='text-xs text-blue-500 flex items-center gap-1 cursor-pointer'
				>
					<FaCopy />
					Copy link to clipboard
				</h1>
			</div>
		</div>
	)
}

export default AdCard
