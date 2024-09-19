import React from 'react'
import { useGetOneAdQuery } from '../../../redux/api-slices/kaamwalaApiSlice'
import { useParams } from 'react-router-dom'

//imports................................................................................................
function SingleAd() {
	const { id } = useParams()
	const { data } = useGetOneAdQuery(id)

	return (
		<div className='w-full p-1'>
			<img className='w-full object-contain' src={data?.ad.ad} alt='ima' />
		</div>
	)
}

export default SingleAd
