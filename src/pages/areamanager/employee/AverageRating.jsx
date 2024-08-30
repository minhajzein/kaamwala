import { Rate } from 'antd'

//imports................................................................

function AverageRating({ experiences }) {
	return (
		<div className='text-gray-600 grid w-full mt-2'>
			<div className='flex w-full justify-between items-center capitalize'>
				<h1>Hygiene</h1>
				<hr className='w-[10%] md:w-[20%]' />
				<div>
					<Rate
						allowHalf
						disabled
						defaultValue={
							experiences?.reduce(
								(acc, cur) => (acc += Number(cur.hygiene)),
								0
							) / experiences?.length
						}
					/>
				</div>
			</div>
			<div className='flex w-full justify-between items-center capitalize'>
				<h1>waste control</h1>
				<hr className='w-[10%] md:w-[20%]' />
				<div>
					<Rate
						allowHalf
						disabled
						defaultValue={
							experiences?.reduce(
								(acc, cur) => (acc += Number(cur.wastage_control)),
								0
							) / experiences?.length
						}
					/>
				</div>
			</div>
			<div className='flex w-full justify-between items-center capitalize'>
				<h1>communication</h1>
				<hr className='w-[10%] md:w-[20%]' />
				<div>
					<Rate
						allowHalf
						disabled
						defaultValue={
							experiences?.reduce(
								(acc, cur) => (acc += Number(cur.communication)),
								0
							) / experiences?.length
						}
					/>
				</div>
			</div>
			<div className='flex w-full justify-between items-center capitalize'>
				<div>Attendance</div>
				<hr className='w-[10%] md:w-[20%]' />
				<div>
					<Rate
						allowHalf
						disabled
						defaultValue={
							experiences?.reduce(
								(acc, cur) => (acc += Number(cur.attenance)),
								0
							) / experiences?.length
						}
					/>
				</div>
			</div>
			<div className='flex w-full justify-between items-center capitalize'>
				<div>Productivity</div>
				<hr className='w-[10%] md:w-[20%]' />
				<div>
					<Rate
						allowHalf
						disabled
						defaultValue={
							experiences?.reduce(
								(acc, cur) => (acc += Number(cur.productivity)),
								0
							) / experiences?.length
						}
					/>
				</div>
			</div>
		</div>
	)
}

export default AverageRating
