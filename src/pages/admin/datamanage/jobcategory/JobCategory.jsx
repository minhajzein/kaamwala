import React, { useState } from 'react';
import { BiEdit, BiSearch } from 'react-icons/bi';
import JobCategoryForm from './JobCategoryForm';
import Modal from '../../../../components/Modal';

const JobCategory = () => {
//   const dispatch = useDispatch();
//   const { jobCategories, loading } = useSelector(state => state.jobCategory);
const jobCategories = []
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [search, setSearch] = useState('');

  const filteredItems = jobCategories.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleCreate = () => {
    setCurrentItem(null);
    setModalVisible(true);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setModalVisible(true);
  };

  const handleSubmit = (data) => {
    // if (currentItem) {
    //   dispatch(updateJobCategory({ id: currentItem.id, ...data }));
    // } else {
    //   dispatch(createJobCategory(data));
    // }
    setModalVisible(false);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

//   if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Job Category Management</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-md px-3 py-2 bg-white">
            <BiSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              className="ml-2 border-none focus:outline-none"
            />
          </div>
          <button onClick={handleCreate} className="bg-blue-600 text-white py-2 px-4 rounded-lg">
            Add New Job Category
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(item => (
              <tr key={item.id}>
                <td className="px-4 py-4 border-b border-gray-200 bg-white text-sm">
                  {item.name}
                </td>
                <td className="px-4 py-4 border-b border-gray-200 bg-white text-sm flex justify-end items-center">
                  <button onClick={() => handleEdit(item)} className="text-indigo-600 hover:text-indigo-900">
                    <BiEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className="text-xs bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-2 mx-1 rounded"
            >
              {number}
            </button>
          ))}
        </div>
      </div>
      {modalVisible && (
        <Modal
          visibles={modalVisible}
          id={"add-job-category"}
          onClose={handleClose}
          title={currentItem ? 'Edit Job Category' : 'Add Job Category'}
          content={<JobCategoryForm initialData={currentItem} onSubmit={handleSubmit} onCancel={handleClose} />
        }
        />
      )}
    </div>
  );
};

export default JobCategory;
