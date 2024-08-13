import DataTable from '../../../components/table/DataTable'
import Cards from './Cards'

//imports................................................................................................

const Card = ({ title, count, icon: Icon, color }) => (
	<div
		className={`bg-${color}-100 border-l-4 border-${color}-500 text-${color}-700 p-4`}
	>
		<div className='flex items-center'>
			<div className='flex-shrink-0'>
				<Icon className={`h-12 w-12 text-${color}-500`} />
			</div>
			<div className='ml-4'>
				<div className='text-lg font-semibold'>{title}</div>
				<div className='text-2xl'>{count}</div>
			</div>
		</div>
	</div>
)

const Dashboard = () => {
	const Madrasa = []
	const columns = []

	return (
		<div>
			<Cards />
			<DataTable
				data={Madrasa}
				columns={columns}
				filterColumn='id'
				filterColumn2='name'
				title={'madrasa'}
				nopagination={true}
			/>
		</div>
	)
}

export default Dashboard
