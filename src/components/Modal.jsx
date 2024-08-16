import React, { useEffect, useState } from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io'

//imports................................................................

const Modal = ({ visibles, onClose, id, content, title, size = 'md' }) => {
	const [showStyle, setShowStyle] = useState({
		opacity: 0,
		transition: 'opacity 0s ease',
	})

	useEffect(() => {
		if (visibles) {
			setTimeout(
				() => setShowStyle({ opacity: 1, transition: 'opacity 0.3s ease' }),
				10
			) // Delay slightly for mount
		} else {
			setShowStyle({ opacity: 0, transition: 'opacity 0.3s ease' })
		}
	}, [visibles])

	useEffect(() => {
		const handleKeyDown = event => {
			if (event.keyCode === 27) onClose() // ESC key
		}
		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [onClose])

	if (!visibles) return null

	const handleOnClose = e => {
		if (e.target.id === id) onClose()
	}

	const getSizeClasses = () => {
		switch (size) {
			case 'sm':
				return 'max-w-sm'
			case 'lg':
				return 'max-w-lg'
			case 'xl':
				return 'max-w-xl'
			case '2xl':
				return 'max-w-2xl'
			case 'big':
				return 'max-w-4xl'
			default:
				return 'max-w-md'
		}
	}

	return (
		<div
			id={id}
			onClick={handleOnClose}
			style={{
				...showStyle,
				position: 'fixed',
				inset: 0,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				zIndex: 50,
			}}
			aria-modal='true'
			role='dialog'
			aria-labelledby='modal-title'
		>
			<div
				className={`drop-shadow-md bg-white bg-opacity-90 backdrop-blur-[.4rem] backdrop-filter p-2 md:p-3  md:px-3 rounded-lg shadow-2xl border w-full mx-4 ${getSizeClasses()}`}
				onClick={e => e.stopPropagation()}
			>
				<div className='flex justify-between items-center'>
					<div className='font-normal pl-1 text-[0.9rem] leading-none'>
						{title}
					</div>
					<button
						className='leading-none'
						onClick={onClose}
						style={{
							background: 'none',
							border: 'none',
							color: 'gray',
							cursor: 'pointer',
						}}
					>
						<IoIosCloseCircleOutline className='hover:text-red-700 mr-1 text-xl' />
					</button>
				</div>
				<div className='border p-5 rounded-md' style={{ marginTop: '16px' }}>
					{content}
				</div>
			</div>
		</div>
	)
}

export default Modal
