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
		<div className='container mx-auto p-8'>
			<div className='flex  gap-8 mb-8'>
				<button
					onClick={() => setCurrentSection('Location')}
					className={`flex items-center gap-2 px-5 py-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none ${
						currentSection === 'Location'
							? 'bg-blue-500 text-white'
							: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
					}`}
				>
					<FaMapMarkedAlt className='w-6 h-6' />
					<span className='font-semibold'>Location</span>
				</button>
				<button
					onClick={() => setCurrentSection('JobCategory')}
					className={`flex items-center gap-2 px-5 py-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none ${
						currentSection === 'JobCategory'
							? 'bg-blue-500 text-white'
							: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
					}`}
				>
					<FaBriefcase className='w-6 h-6' />
					<span className='font-semibold'>Job Category</span>
				</button>
			</div>
			<div className='p-6 bg-white rounded-xl shadow-lg'>{renderSection()}</div>

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
