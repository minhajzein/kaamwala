export const HiringStatus = ({ hiringStatus }) => {
	const statusClass =
		hiringStatus === '1'
			? 'bg-yellow-50 border-yellow-300 border text-yellow-500'
			: hiringStatus === '2'
			? 'bg-green-50 border border-green-400 text-green-700'
			: 'bg-red-50 border border-red-400 text-red-700'

	return (
		<span
			className={`px-2 py-[2px] flex items-center justify-center rounded-lg capitalize ${statusClass}`}
		>
			{hiringStatus === '1'
				? 'Working'
				: hiringStatus === '2'
				? 'Ready to Hire'
				: 'Blacklisted'}
		</span>
	)
}

const RecentEmployeesColumns = () => [
	{ Header: 'ID', accessor: 'id' },
	{ Header: 'EMP Code', accessor: 'employee_code' },
	{ Header: 'Name', accessor: 'name' },
	{
		Header: 'Job Titles',
		accessor: 'job_categories',
		Cell: ({ row }) => (
			<ul>
				{row?.original?.job_categories.map((category, i) => (
					<li key={i}>{category}</li>
				))}
			</ul>
		),
	},
	{ Header: 'Location', accessor: 'location_name' },
	{ Header: 'Phone', accessor: 'phone' },
	{
		Header: 'Hiring Status',
		accessor: 'hiringStatus',
		Cell: ({ row }) => <HiringStatus hiringStatus={row.original.status} />,
	},
]

export { RecentEmployeesColumns }
