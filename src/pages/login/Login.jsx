import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useLoginMutation } from '../../redux/admin/api-slices/authApiSlice'
import { toast } from 'react-toastify'
import { CgSpinner } from 'react-icons/cg'
import { useState } from 'react'
import { setCredentials } from '../../redux/admin/slices/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//imports................................................................................................................................
const Login = () => {
	const [login, { isLoading }] = useLoginMutation()
	const [isShow, setIsShow] = useState(false)
	const dispatch = useDispatch()

	const navigate = useNavigate()
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().required(),
			password: Yup.string().required(),
		}),
		onSubmit: async credentials => {
			try {
				const response = await login(credentials)

				if (response?.error) return toast.error(response.error.data.error)
				dispatch(
					setCredentials({
						token: response.data.token,
						user: response.data.user,
					})
				)
				localStorage.setItem(
					'kaamwala-token',
					JSON.stringify(response.data.token)
				)
				localStorage.setItem(
					'kaamwala-user',
					JSON.stringify(response.data.user)
				)
				if (response.data.user.role === 'admin') navigate('/admin')
				else navigate('/area-manager')
			} catch (error) {
				console.error(error)
			}
		},
	})

	return (
		<div className='font-[sans-serif] bg-gray-900 min-h-dvh md:p-5'>
			<div className='grid md:grid-cols-2 items-center md:gap-8 h-full'>
				<div className=' p-4'>
					<img
						src='https://readymadeui.com/signin-image.webp'
						className='lg:max-w-[80%] w-full h-full object-contain block mx-auto'
						alt='login-image'
					/>
				</div>
				<div className='flex items-center md:rounded p-5 h-full'>
					<form
						onSubmit={formik.handleSubmit}
						className=' w-full flex flex-col gap-5 bg-white p-5 md:p-10 rounded-xl'
					>
						<h3 className='text-gray-800 text-2xl md:text-4xl font-extrabold'>
							Sign In
						</h3>
						<div className='flex flex-col'>
							<label htmlFor='email' className='text-gray-800 text-xs block'>
								Email
							</label>
							<div className='relative flex items-center'>
								<input
									name='email'
									id='email'
									type='text'
									value={formik.values.email}
									onChange={formik.handleChange}
									className='w-full text-sm border-b bg-primary-50 rounded border-gray-300 focus:border-gray-800 px-2 py-3 outline-none'
									placeholder='Enter email'
								/>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='#bbb'
									stroke='#bbb'
									className='w-[18px] h-[18px] absolute right-2'
									viewBox='0 0 682.667 682.667'
								>
									<defs>
										<clipPath id='a' clipPathUnits='userSpaceOnUse'>
											<path d='M0 512h512V0H0Z' data-original='#000000'></path>
										</clipPath>
									</defs>
									<g
										clipPath='url(#a)'
										transform='matrix(1.33 0 0 -1.33 0 682.667)'
									>
										<path
											fill='none'
											strokeMiterlimit='10'
											strokeWidth='40'
											d='M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z'
											data-original='#000000'
										></path>
										<path
											d='M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z'
											data-original='#000000'
										></path>
									</g>
								</svg>
							</div>
							<p className='text-red-500 text-xs'>{formik.errors.email}</p>
						</div>
						<div className='flex flex-col'>
							<label className='text-gray-800 text-xs block'>Password</label>
							<div className='relative flex items-center'>
								<input
									name='password'
									type={isShow ? 'text' : 'password'}
									value={formik.values.password}
									onChange={formik.handleChange}
									className='w-full text-sm border-b border-gray-300 bg-primary-50 rounded focus:border-gray-800 px-2 py-3 outline-none'
									placeholder='Enter password'
								/>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='#bbb'
									onClick={() => setIsShow(!isShow)}
									stroke='#bbb'
									className='w-[18px] h-[18px] absolute right-2 cursor-pointer'
									viewBox='0 0 128 128'
								>
									<path
										d='M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z'
										data-original='#000000'
									></path>
								</svg>
							</div>
							<p className='text-red-500 text-xs'>{formik.errors.password}</p>
						</div>

						<button
							type='submit'
							disabled={isLoading}
							className='w-full py-3 px-6 text-sm font-semibold tracking-wider rounded-full text-white bg-gray-800 hover:bg-[#222] focus:outline-none'
						>
							{isLoading ? (
								<CgSpinner className='animate-spin m-auto' />
							) : (
								'Sign in'
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login
