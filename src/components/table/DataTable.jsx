import React, { useMemo, useState, useEffect, useRef } from 'react'
import { useTable, usePagination } from 'react-table'
import {
	FaChevronDown,
	FaFileDownload,
	FaFileExcel,
	FaFilePdf,
	FaTimes,
} from 'react-icons/fa'
import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import { format } from 'date-fns'
import { MdOutlineDownloading } from 'react-icons/md'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import ModalManage from './ModalManage'

const DataTable = ({
	data,
	columns,
	filterColumn,
	filterColumn2,
	title,
	total,
	Export,
	type,
	nopagination,
	navigate,
}) => {
	const [filterValue, setFilterValue] = useState('')
	const [filterValue2, setFilterValue2] = useState('')
	const [searchTerm, setSearchTerm] = useState('')
	const [showPrint, setShowPrint] = useState(true)
	const [isOpen, setIsOpen] = useState(false)
	const itemsPerPage = 10

	const dropdownRef = useRef(null)

	const toggleDropdown = () => {
		setIsOpen(!isOpen)
	}

	const handleClickOutside = event => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])
	const formatDate = timestamp => {
		if (!timestamp) return 'Invalid Date'
		try {
			const date = new Date(timestamp)
			return format(date, 'dd-MM-yyyy')
		} catch (error) {
			console.error('Error formatting date:', error)
			return 'Invalid Date'
		}
	}

	const filteredData = useMemo(() => {
		if (!Array.isArray(data)) return []

		return data.filter(item => {
			const searchMatch = Object.values(item)
				.join(' ')
				.toLowerCase()
				.includes(searchTerm.toLowerCase())

			// Combine filter conditions
			const filter1Match =
				filterValue === '' ||
				item?.[filterColumn]
					?.toString()
					.toLowerCase()
					.includes(filterValue.toLowerCase())

			const filter2Match =
				!filterColumn2 || // Handle undefined filterColumn2 gracefully
				filterValue2 === '' ||
				item?.[filterColumn2]
					?.toString()
					.toLowerCase()
					.includes(filterValue2.toLowerCase())

			return searchMatch && filter1Match && filter2Match
		})
	}, [data, searchTerm, filterValue, filterColumn, filterValue2, filterColumn2])

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex },
	} = useTable(
		{
			columns,
			data: filteredData,
			initialState: { pageIndex: 0, pageSize: itemsPerPage },
		},
		usePagination
	)

	useEffect(() => {
		setPageSize(itemsPerPage)
	}, [setPageSize, itemsPerPage])

	useEffect(() => {
		gotoPage(0)
	}, [filteredData, gotoPage])

	const formatText = text => {
		const formattedText = text?.replace(/_/g, ' ')
		const capitalizedText = formattedText?.replace(/\b\w/g, char =>
			char?.toUpperCase()
		)
		return capitalizedText
	}

	const handleExportExcel = async () => {
		const processdata = await beforedownload()
		const worksheet = XLSX.utils.json_to_sheet(processdata)
		const workbook = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(workbook, worksheet, 'My Sheet')
		XLSX.writeFile(workbook, 'newreport.xlsx')
	}

	const getNestedValue = (obj, path) => {
		if (!obj || !path) return undefined

		const keys = path.split('.')
		let value = obj

		for (const key of keys) {
			if (value && value.hasOwnProperty(key)) {
				value = value[key]
			} else {
				return undefined
			}
		}

		return value
	}

	const generatePDF = () => {
		const doc = new jsPDF()
		const modifiedColumns = columns.filter(
			column =>
				column.Header !== 'No' &&
				column.Header !== 'Actions' &&
				column.accessor !== 'actions'
		)
		const pdfData = filteredData.map(row => {
			return modifiedColumns.map(column => {
				const accessor =
					typeof column.accessor === 'string' ? column.accessor : ''
				const value = getNestedValue(row, accessor)

				if (column.Header === 'Channel') {
					return `${row?.channel?.channel}`
				}
				return column.accessor === 'total' ? parseFloat(value) || 0 : value
			})
		})

		// Format date in the PDF
		const formattedData = pdfData.map(row => {
			const formattedRow = [...row]
			// Assuming the date column is the last one in each row
			const dateIndex = formattedRow.length - 1
			formattedRow[dateIndex] = formatDate(formattedRow[dateIndex])
			return formattedRow
		})

		// Calculate total amount
		const totalAmount = formattedData.reduce((total, row) => {
			const rowTotal = parseFloat(
				row[modifiedColumns.findIndex(col => col.accessor === 'amount')]
			)
			return total + (isNaN(rowTotal) ? 0 : rowTotal)
		}, 0)
		let Heading = ''
		if (title === 'Vendor') {
			Heading = `Name: ${
				currentsupplier?.first_name + ' ' + currentsupplier?.last_name
			}`
		}

		const centerText = (doc, text, y) => {
			const textWidth = doc.getTextWidth(text)
			const pageWidth = doc.internal.pageSize.width
			const x = (pageWidth - textWidth) / 2
			doc.text(text, x, y)
		}

		// Define document metadata
		const heading = `Zain Sales Corporation ${title} Report`

		// Set background color
		doc.setFillColor(0, 0, 0) // Light grey background
		doc.rect(0, 0, doc.internal.pageSize.width, 15, 'FD') // Fill a rectangle

		// Add the heading
		doc.setFontSize(18)
		doc.setTextColor(255, 255, 255)
		centerText(doc, heading, 10)

		// Add some details below the heading
		doc.setTextColor(0, 0, 0)
		doc.setFontSize(12)
		doc.text(Heading, 14, 28)
		doc.text(`Date: ${formatDate(Date.now())}`, 14, 34)

		// Add some space before the table
		const tableStartY = 40
		// Add the table
		doc.autoTable({
			head: [modifiedColumns.map(column => column.Header)],
			body: pdfData,
			startY: tableStartY,
		})
		// Save the PDF
		doc.save('data.pdf')
	}

	const beforedownload = async () => {
		return await new Promise(resolve => {
			const modifiedColumns = columns.filter(
				column =>
					column.Header !== 'No' &&
					column.Header !== 'Actions' &&
					column.accessor !== 'actions'
			)
			const pdfData = filteredData.map(row => {
				return modifiedColumns.map(column => {
					const accessor =
						typeof column.accessor === 'string' ? column.accessor : ''
					const value = getNestedValue(row, accessor)
					return value
				})
			})

			const joinArraysWithHeaders = (headers, ...columnSets) => {
				const result = []
				for (const columns of columnSets) {
					if (columns.length !== headers.length) {
						throw new Error(
							'All column sets must have the same length as headers.'
						)
					}
					const row = {}
					for (let i = 0; i < headers.length; i++) {
						row[headers[i]] = columns[i]
					}
					result.push(row)
				}
				return result
			}
			const joinedArray = joinArraysWithHeaders(
				modifiedColumns.map(column => column.Header),
				...pdfData
			)
			resolve(joinedArray)
		})
	}

	const renderTableRows = () => {
		if (filteredData.length === 0) {
			return (
				<tr className='bg-beige-200'>
					<td
						colSpan={columns.length}
						className='md:py-4 py-2 px-2 text-start text-gray-600'
					>
						No data available
					</td>
				</tr>
			)
		}

		const emptyRows = Array.from({ length: itemsPerPage - page.length }).map(
			(_, index) => (
				<tr key={`empty-${index}`} className='bg-beige-200'>
					{columns.map((column, colIndex) => (
						<td
							key={colIndex}
							className='md:py-2 py-2 px-2 text-start text-gray-600'
						>
							&nbsp;
						</td>
					))}
				</tr>
			)
		)

		return (
			<>
				{page.map(row => {
					prepareRow(row)
					return (
						<tr
							{...row.getRowProps()}
							className='bg-beige-100 text-gray-800'
							key={row.id}
						>
							{row.cells.map(cell => (
								<td
									{...cell.getCellProps()}
									className='md:py-2 text-[.8rem] border-b py-2 px-2 whitespace-nowrap'
								>
									{cell.render('Cell')}
								</td>
							))}
						</tr>
					)
				})}
				{emptyRows}
			</>
		)
	}

	return (
		<div className='container bg-white  md:border md:rounded-xl border-dotted no-scrollbar  p-2 md:pt-4 md:px-4 md:pb-2 min-w-full bg-beige-50'>
			<div className='flex justify-between items-center md:mb-4 mb-2'>
				<div className='flex flex-col md:flex-row md:gap-3 gap-1'>
					<div className='md:mr-2 mr-1'>
						<input
							type='text'
							placeholder='Search...'
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className='px-3 md:px-4 no-number-spin py-2 md:py-1 border bg-beige-200 border-gray-500 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-xs md:text-sm'
						/>
					</div>
					<div
						className={`${
							filterColumn === undefined && 'hidden'
						} relative flex items-center`}
					>
						<select
							value={filterValue}
							onChange={e => setFilterValue(e.target.value)}
							className='bg-beige-200 appearance-none md:px-3 w-full px-1  py-1 md:pr-8 border text-gray-800 border-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-xs md:text-sm'
						>
							<option value=''>Filter {formatText(filterColumn)}</option>
							{[...new Set(data?.map(item => item?.[filterColumn]))].map(
								(value, index) => (
									<option key={index} value={value}>
										{value}
									</option>
								)
							)}
						</select>
						<div className='absolute inset-y-0 right-0 flex items-center px-2 pr-3 pointer-events-none'>
							<FaChevronDown className='text-gray-600 text-xs md:text-sm' />
						</div>
					</div>
					<div
						className={`${
							filterColumn2 === undefined && 'hidden'
						} relative flex items-center`}
					>
						<select
							value={filterColumn2}
							onChange={e => setFilterValue2(e.target.value)}
							className='bg-beige-200 appearance-none md:px-3 w-full px-1  py-1 md:pr-8 border text-gray-800 border-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-xs md:text-sm'
						>
							<option value=''>Filter {formatText(filterColumn2)}</option>
							{[...new Set(data?.map(item => item?.[filterColumn2]))].map(
								(value, index) => (
									<option key={index} value={value}>
										{value}
									</option>
								)
							)}
						</select>
						<div className='absolute inset-y-0 right-0 flex items-center px-2 pr-3 pointer-events-none'>
							<FaChevronDown className='text-gray-600 text-xs md:text-sm' />
						</div>
					</div>
				</div>
				<div className='flex flex-col md:flex-row items-center md:gap-3 gap-1'>
					{showPrint && (
						<div className='relative flex items-center' ref={dropdownRef}>
							<button
								className='bg-zinc-200  p-1 rounded-full shadow-md  hover:bg-zinc-300 focus:outline-none text-sm flex items-center space-x-2 transition-all'
								onClick={toggleDropdown}
							>
								<span>
									{isOpen ? (
										<IoIosCloseCircleOutline className='h-4 w-4 focus-within::animate-spin' />
									) : (
										<MdOutlineDownloading className='h-4 w-4 ' />
									)}
								</span>
								{/* <span>{isOpen ? <FaTimes /> : <FaChevronDown />}</span> */}
							</button>
							{isOpen && (
								<div className='absolute top-12 right-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-2 w-48 '>
									<button
										className='w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center space-x-2 transition-colors'
										onClick={generatePDF}
									>
										<FaFilePdf />
										<span>Download PDF</span>
									</button>
									<button
										className='w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center space-x-2 transition-colors'
										onClick={handleExportExcel}
									>
										<FaFileExcel />
										<span>Download Excel</span>
									</button>
								</div>
							)}
						</div>
					)}

					<ModalManage title={title} type={type} navigateto={navigate} />
				</div>
			</div>
			<div className='overflow-x-auto no-scrollbar'>
				<table {...getTableProps()} className='min-w-full bg-beige-500'>
					<thead className='bg-beige-300'>
						{headerGroups.map((headerGroup, index) => (
							<tr {...headerGroup.getHeaderGroupProps()} key={index}>
								{headerGroup.headers.map(column => (
									<th
										{...column.getHeaderProps()}
										className='px-2 py-2 md:px-3  border-b text-left text-[.3rem] md:text-sm font-medium text-gray-800 capitalize border   tracking-wider'
									>
										{column.render('Header')}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()} className='bg-beige-200'>
						{renderTableRows()}
					</tbody>
				</table>
			</div>
			{!nopagination && (
				<div className='flex justify-between items-center py-2 md:py-3 text-gray-800'>
					<span className='text-xs md:text-sm'>
						Page <strong>{pageIndex + 1}</strong> of{' '}
						<strong>{pageOptions.length}</strong>
					</span>
					<div className='flex gap-1 md:gap-2'>
						<button
							onClick={() => gotoPage(0)}
							disabled={!canPreviousPage}
							className='px-2 py-1 md:px-4 md:py-2 border border-gray-400 rounded-md text-xs md:text-sm hover:bg-gray-300 disabled:opacity-50'
						>
							{'<<'}
						</button>
						<button
							onClick={() => previousPage()}
							disabled={!canPreviousPage}
							className='px-2 py-1 md:px-4 md:py-2 border border-gray-400 rounded-md text-xs md:text-sm hover:bg-gray-300 disabled:opacity-50'
						>
							{'<'}
						</button>
						<button
							onClick={() => nextPage()}
							disabled={!canNextPage}
							className='px-2 py-1 md:px-4 md:py-2 border border-gray-400 rounded-md text-xs md:text-sm hover:bg-gray-300 disabled:opacity-50'
						>
							{'>'}
						</button>
						<button
							onClick={() => gotoPage(pageCount - 1)}
							disabled={!canNextPage}
							className='px-2 py-1 md:px-4 md:py-2 border border-gray-400 rounded-md text-xs md:text-sm hover:bg-gray-300 disabled:opacity-50'
						>
							{'>>'}
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default DataTable
