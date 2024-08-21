import { useState } from 'react'
import { FaMapMarkedAlt, FaBriefcase } from 'react-icons/fa'
import Location from './location/Location'
import JobCategory from './jobcategory/JobCategory'
import Modal from '../../../components/Modal'

const DataManage = () => {
	const [currentSection, setCurrentSection] = useState('Location')
	const [modalVisible, setModalVisible] = useState(false)
	const [showEditModal, setShowEditModal] = useState(false)

	const handleCloaseVisibleModal = () => {
		setModalVisible(false)
	}
	const handleCloseEditModal = () => {
		setShowEditModal(false)
	}
	const renderSection = () => {
		switch (currentSection) {
			case 'Location':
				return <Location />
			case 'JobCategory':
				return <JobCategory />
			default:
				return <Location />
		}
	}

	return (
		<div className='container bg-white md:bg-none p-1 w-full flex flex-col gap-1 md:p-8'>
			<div className='flex md:gap-8 gap-2'>
				<button
					onClick={() => setCurrentSection('Location')}
					className={`flex items-center gap-2 md:p-3 p-2 rounded shadow-lg transition-all duration-300 focus:outline-none ${
						currentSection === 'Location'
							? 'bg-blue-500 text-white'
							: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
					}`}
				>
					<FaMapMarkedAlt className='md:size-6 size-3' />
					<span className='font-semibold text-sm md:text-xl'>Location</span>
				</button>
				<button
					onClick={() => setCurrentSection('JobCategory')}
					className={`flex items-center gap-2 px-5 py-3 rounded shadow-lg transition-all duration-300 focus:outline-none ${
						currentSection === 'JobCategory'
							? 'bg-blue-500 text-white'
							: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
					}`}
				>
					<FaBriefcase className='md:size-6 size-3' />
					<span className='font-semibold text-sm md:text-xl'>Job Category</span>
				</button>
			</div>
			<div className='md:p-6 py-1 md:bg-white rounded-xl md:shadow-lg'>
				{renderSection()}
			</div>

			{modalVisible && (
				<Modal
					visible={modalVisible}
					onClose={handleCloaseVisibleModal}
					id='modal-11-X'
					title='Modal Title'
					content={'koya'}
					size='big'
				/>
			)}
			{showEditModal && (
				<Modal
					visibles={showEditModal}
					onClose={handleCloseEditModal}
					id='edit-Madrasa-admin'
					title='Edit Madrasa'
					content={'yeah'}
					size='big'
				/>
			)}
		</div>
	)
}

export default DataManage
