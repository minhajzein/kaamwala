import { Routes } from 'react-router-dom'
import Home from '../../pages/home/Home'
import SingleEmployee from '../../pages/home/SingleEmployee'

//imports................................................................

const HomeRoute = () => {
	return (
		<div>
			<Routes>
				<Routes path='/' element={<Home />} />
				<Routes path='/employee/:id' element={<SingleEmployee />} />
			</Routes>
		</div>
	)
}

export default HomeRoute
