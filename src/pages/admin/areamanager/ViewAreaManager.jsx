import { MdOutlineMailOutline, MdSmartphone } from 'react-icons/md'
import { FaGraduationCap, FaRegUser } from 'react-icons/fa'
import EmployeeCard from '../../../components/common/EmployeeCard'
import { useParams } from 'react-router-dom'
import { useGetSingleAreaManagerQuery } from '../../../redux/admin/api-slices/managerApiSlice'

//imports................................................................................................

const ViewAreaManager = () => {
	const { id } = useParams()
	const { data } = useGetSingleAreaManagerQuery(id)

	return (
		<div className='flex flex-col'>
			<div className='bg-white p-5 rounded-md border'>
				<div className='grid grid-cols-1 lg:grid-cols-[1fr] gap-4'>
					<div className='grid grid-cols-1 sm:grid-cols-3 gap-2 w-full pt-4 text-gray-600'>
						<div className='flex gap-2 items-center'>
							<FaRegUser />
							{data?.areaManger.name}
						</div>
						<div className='flex gap-2 items-center'>
							<MdOutlineMailOutline />
							{data?.areaManger.email}
						</div>
						<div className='flex gap-2 items-center'>
							<MdSmartphone />
							{data?.areaManger.phone}
						</div>
					</div>
				</div>
			</div>
			<div className='bg-white border rounded-sm p-4 mt-4'>
				<div className='flex gap-2 items-center mb-5'>
					<FaGraduationCap />
					Emmployees
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					<EmployeeCard employees={data?.employees} />
				</div>
			</div>
		</div>
	)
}

export default ViewAreaManager
