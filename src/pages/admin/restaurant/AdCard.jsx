import { GoTrash } from 'react-icons/go'
import { useDeleteAdMutation } from '../../../redux/admin/api-slices/adApiSlice'
import { CgSpinner } from 'react-icons/cg'

//imports................................................................................................

function AdCard({ ad }) {
	const [deleteAd, { isLoading }] = useDeleteAdMutation()

	return (
		<div className='bg-white relative flex w-full h-full flex-col p-2 rounded-md border shadow-md max-w-md mx-auto cursor-pointer ease-in duration-300'>
			<img src={ad?.add} className='rounded w-full border-2 p-2' alt='Avatar' />
			<button
				className='absolute top-10 right-10 bg-white rounded-full border p-1 text-red-600'
				disabled={isLoading}
				onClick={() => deleteAd(ad.id)}
			>
				{isLoading ? <CgSpinner className='animate-spin' /> : <GoTrash />}
			</button>
		</div>
	)
}

export default AdCard
