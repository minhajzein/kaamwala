import { Provider } from 'react-redux'
import store from './redux/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminRoute from './routes/admin/AdminRoute'
import AreaManagerRoute from './routes/areamanager/AreaManagerRoute'
import Login from './pages/login/Login'
import PublicRoute from './routes/public/PublicRoute'
import HomeRoute from './routes/home/HomeRoute'

//imports................................................................................................

const App = () => {
	return (
		<Provider store={store}>
			<ToastContainer
				position='top-center'
				autoClose={1500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='dark'
				transition:Slide
			/>
			<BrowserRouter>
				<Routes>
					<Route path='/admin/*' element={<AdminRoute />} />
					<Route path='/area-manager/*' element={<AreaManagerRoute />} />
					<Route path='/*' element={<HomeRoute />} />
					<Route element={<PublicRoute />}>
						<Route path='/login' element={<Login />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	)
}

export default App
