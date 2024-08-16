import DataTable from '../../../components/table/DataTable'
import Cards from './Cards'

//imports................................................................

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
