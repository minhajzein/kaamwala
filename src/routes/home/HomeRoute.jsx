import { Route, Routes } from 'react-router-dom'
import Home from '../../pages/home/Home'
import SingleEmployee from '../../pages/home/SingleEmployee'
import OfferZone from '../../pages/home/offer-zone/OfferZone'
import SingleAd from '../../pages/home/offer-zone/SingleAd'
import AdsByLocation from '../../pages/home/offer-zone/AdsByLocation'

//imports................................................................

const HomeRoute = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='offer-zone' element={<OfferZone />} />
			<Route path='offer-zone/:id' element={<SingleAd />} />
			<Route path='offer-zone/location/:location' element={<AdsByLocation />} />
			<Route path='employee/:id' element={<SingleEmployee />} />
		</Routes>
	)
}

export default HomeRoute
