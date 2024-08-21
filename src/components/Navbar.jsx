import { useState, useRef, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'

const convertPathname = pathname => {
	const trimmedPathname = pathname.endsWith('/')
		? pathname.slice(0, -1)
		: pathname
	const convertedPathname = trimmedPathname.split('/').join(' > ')
	return convertedPathname
}

const Navbar = ({ type }) => {
	const location = useLocation()
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const dropdownRef = useRef(null)
	const navigate = useNavigate()
	const convertedPath = convertPathname(location.pathname)

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen)
	}

	const handleClickOutside = event => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setIsDropdownOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<nav className='sticky bg-white top-0 z-10 '>
			<div className='max-w-7xl mx-auto px-4 sm:px-2 '>
				<div className='flex justify-between  items-center'>
					<div className='flex items-center space-x-4'>
						<h1 className='md:text-md text-[14px] truncate font-medium text-gray-600 capitalize'>
							{convertedPath}
						</h1>
						<h1 className='text-xl font-medium text-gray-800'>{''}</h1>
					</div>
					<div className='flex items-center'>
						<div className='relative' ref={dropdownRef}>
							<button
								type='button'
								className='flex items-center text-sm rounded-full focus:outline-none focus:shadow-solid transition ease-in-out duration-150'
								onClick={toggleDropdown}
							>
								<img
									src='/Images/avatar.jpg'
									alt=''
									className='h-10 p-1 rounded-full'
								/>
							</button>
							<div
								className={`${
									isDropdownOpen ? 'block' : 'hidden'
								} absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none transition duration-150 ease-in-out`}
							>
								<div className='py-1'>
									<div
										onClick={() => {
											type == 'areamanager'
												? navigate('/area-manager/profile')
												: alert('its admin page')
										}}
										className='flex justify-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer focus:bg-gray-100'
									>
										Your Profile
									</div>
								</div>
								<div className='py-1'>
									<button
										onClick={() => {
											localStorage.removeItem('kaamwala-token')
											localStorage.removeItem('kaamwala-user')
											navigate('/login')
										}}
										className='block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100'
									>
										Logout
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
