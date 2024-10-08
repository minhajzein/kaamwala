import logo from '/Images/kaamwalalogo.jpeg'

//imports................................................................................................................................

const Banner = () => {
	return (
		<div className='flex flex-col gap-2 rounded-lg md:flex-row items-center justify-between md:min-h-full'>
			<div className='flex flex-col gap-2 text-center md:text-left'>
				<h1 className='text-2xl md:text-6xl font-bold text-primary-900'>
					Find Your Perfect Employee
				</h1>
				<p className='text-sm md:text-2xl text-primary-600'>
					Discover the best candidates to fill your restaurant positions and
					elevate your business.
				</p>
			</div>
		</div>
	)
}

export default Banner
