//imports................................................................................................

import { RiPhoneFindLine } from 'react-icons/ri'

const Navbar = ({ scrollbtn }) => {
	return (
		<div className='bg-primary-100 z-30 px-4 border border-primary-400 rounded-lg'>
			<div className='flex justify-between h-16'>
				<div className='flex items-center'>
					<h1 className='text-primary-950 text-sm sm:text-base md:text-lg lg:text-xl font-bold'>
						Kaamwaala
					</h1>
				</div>
				<div className='flex items-center'>
					<button
						onClick={() => scrollbtn()}
						className='text-[.6rem] flex items-center gap-1 rounded-lg md:text-[.8rem] border border-primary-500 text-primary-500 p-2 cursor-pointer hover:scale-95 duration-200  font-semibold'
					>
						<RiPhoneFindLine />
						Find a Job
					</button>
				</div>
			</div>
		</div>
	)
}

export default Navbar
