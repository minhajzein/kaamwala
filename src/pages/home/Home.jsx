import { useRef } from 'react'
import Navbar from './Navbar'
import JobPortal from './JobPortal'
import Banner from './Banner'

const Home = () => {
	const jobDetailsRef = useRef(null)
	const scrollToJobDetails = () => {
		jobDetailsRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	return (
		<div className='flex flex-col py-5 gap-10 px-20'>
			<Navbar scrollbtn={scrollToJobDetails} />
			<Banner />
			<div ref={jobDetailsRef} className='h-dvh'>
				<JobPortal />
			</div>
		</div>
	)
}

export default Home
