import { RiMenuSearchLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useGetAllAdsQuery } from '../../../redux/api-slices/kaamwalaApiSlice'
import { Select } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AdCard from './AdCard'
import { FaShare } from 'react-icons/fa'

//imports................................................................

function OfferZone() {
	const { data, isSuccess } = useGetAllAdsQuery()
	const [filtered, setFiltered] = useState([])
	const [search, setSearch] = useState('')
	const [location, setLocation] = useState('')
	const [restaurant, setRestaurant] = useState('')
	const locationOptions = [...new Set(data?.ads?.map(ad => ad.location))]
	const restaurantOptions = [...new Set(data?.ads?.map(ad => ad.restaurant))]

	const copyToClipBoard = () => {
		if (location === '') return toast.error('Please select a location')
		navigator.clipboard.writeText(
			`${window.location.origin.toString()}/offer-zone/location/${location.toLocaleLowerCase()}`
		)
		toast.success('Link copied to clipboard')
	}

	const handleSearch = value => {
		const ads = data?.ads.filter(
			ad =>
				ad.location.toLowerCase().includes(value.toLowerCase()) ||
				ad.restaurant.toLowerCase().includes(value.toLowerCase())
		)
		setFiltered(ads)
	}

	useEffect(() => {
		if (search !== '') {
			handleSearch(search)
		} else if (location !== '' || restaurant !== '') {
			const ads = data?.ads.filter(
				ad =>
					(location ? ad.location === location : true) &&
					(restaurant ? ad.restaurant === restaurant : true)
			)
			setFiltered(ads)
		} else {
			setFiltered(data?.ads)
		}
	}, [search, location, restaurant, isSuccess])

	return (
		<div className='flex flex-col gap-2 md:px-[180px] p-2 '>
			<div className='w-full bg-gray-200 flex shadow justify-between border rounded-lg p-1'>
				<img
					src='/Images/logo.png'
					className='md:w-1/6 rounded-lg shadow w-1/3 object-contain'
					alt='logo'
				/>
				<Link
					to='/'
					className='flex gap-1 justify-center items-center bg-black px-3 text-white rounded-lg capitalize'
				>
					<RiMenuSearchLine />
					<h1>Find Employees</h1>
				</Link>
			</div>
			<div className='flex flex-col w-full gap-2 shadow p-1 border rounded-lg md:flex-row'>
				<input
					type='search'
					value={search}
					onChange={e => setSearch(e.target.value)}
					placeholder='Search here...'
					className='outline-none p-1 rounded-lg border'
				/>
				<div className='flex gap-2 w-full md:w-1/3'>
					<Select
						onChange={value => setRestaurant(value)}
						placeholder='Filter by Restaurant'
						size='large'
						value={restaurant}
						className='w-1/2'
					>
						<Select.Option value=''>All Restaurants</Select.Option>
						{restaurantOptions.map(restaurant => (
							<Select.Option key={restaurant} value={restaurant}>
								{restaurant}
							</Select.Option>
						))}
					</Select>
					<Select
						placeholder='Filter by Location'
						onChange={value => setLocation(value)}
						size='large'
						className='w-1/2'
						value={location}
					>
						<Select.Option value=''>All Locations</Select.Option>
						{locationOptions.map(location => (
							<Select.Option key={location} value={location}>
								{location}
							</Select.Option>
						))}
					</Select>
				</div>
				{location !== '' && (
					<button
						onClick={copyToClipBoard}
						className='capitalize text-xs flex justify-center items-center gap-1 border px-3 rounded-lg'
					>
						<FaShare />
						{`share offers in ${location}`}
					</button>
				)}
			</div>
			<div className='grid p-2 border rounded-lg gap-2 grid-cols-1 md:grid-cols-2'>
				{filtered?.map(ad => (
					<AdCard key={ad.id} ad={ad} />
				))}
			</div>
		</div>
	)
}

export default OfferZone
