import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddAreaManager from '../../pages/admin/areamanager/AddAreaManager'
import Modal from '../Modal'
import AddRestaurant from '../../pages/admin/restaurant/AddRestaurant'
import AddEmployee from '../../pages/areamanager/employee/AddEmployee'

//imports................................................................

const components = {
	Area_Manager: AddAreaManager,
	Restaurant: AddRestaurant,
	Employee: AddEmployee,
}

const ModalManage = ({ title, type, navigateto }) => {
	const navigate = useNavigate()
	const [modalConfig, setModalConfig] = useState({
		visible: false,
		content: null,
		modalTitle: '',
	})

	const handleOpenModal = modalTitle => {
		setModalConfig({
			visible: true,
			content: React.createElement(components[modalTitle], {
				handleClose: handleCloseModal,
			}),
			modalTitle,
		})
	}

	const handleCloseModal = () => {
		setModalConfig({
			visible: false,
			content: null,
			modalTitle: '',
		})
	}

	const handleNavigate = path => {
		navigate(path)
	}

	return (
		<div>
			{type == 'modal' && (
				<button
					onClick={() => handleOpenModal(title)}
					className='addBtn hover:addBtnHover text-white bg-black text-[.5rem] md:text-[.9rem] p-[.5rem]  leading-none rounded'
				>
					Add {title.replace(/_/g, ' ')}
				</button>
			)}
			{modalConfig.visible && (
				<Modal
					visibles={modalConfig.visible}
					onClose={handleCloseModal}
					id='add-madrasa-admin'
					title={modalConfig.modalTitle}
					content={modalConfig.content}
					size='big'
				/>
			)}
			{type == 'redirect' && (
				<button
					onClick={() => handleNavigate(navigateto)}
					className='addBtn text-white bg-black text-[.5rem] md:text-[.9rem] p-[.5rem] leading-none rounded'
				>
					Add {title}
				</button>
			)}
		</div>
	)
}

export default ModalManage
