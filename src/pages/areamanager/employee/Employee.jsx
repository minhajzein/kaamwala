import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../components/table/DataTable';
import Modal from '../../../components/Modal';
import { StaffColumns } from '../../../components/table/Columns/StaffColumns';
import EditEmployee from './EditEmployee';

const Employee = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate =  useNavigate()
  useEffect(()=>{
    // dispatch(fetchAllMadrasaAdmin())
  },[])
  const data = [
    { id: 1, empCode: 'E001', name: 'Alice Smith', jobTitle: 'Software Engineer', location: 'New York', phone: '123-456-7890', hiringStatus: 'available', action: 'Edit' },
    { id: 2, empCode: 'E002', name: 'Bob Johnson', jobTitle: 'Data Analyst', location: 'San Francisco', phone: '234-567-8901', hiringStatus: 'available', action: 'Edit' },
    { id: 3, empCode: 'E003', name: 'Charlie Lee', jobTitle: 'Product Manager', location: 'Chicago', phone: '345-678-9012', hiringStatus: 'blacklisted', action: 'Edit' },
    { id: 4, empCode: 'E004', name: 'Dana White', jobTitle: 'UX Designer', location: 'Seattle', phone: '456-789-0123', hiringStatus: 'notavailable', action: 'Edit' },
    { id: 5, empCode: 'E005', name: 'Eva Green', jobTitle: 'Marketing Lead', location: 'Austin', phone: '567-890-1234', hiringStatus: 'available', action: 'Edit' },
    { id: 6, empCode: 'E006', name: 'Frank Black', jobTitle: 'HR Specialist', location: 'Boston', phone: '678-901-2345', hiringStatus: 'notavailable', action: 'Edit' },
  ];
  

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
    
      const handleView = (id)=>{
    //    dispatch(viewAdminMadrasa(id))
       navigate('/areamanager/employee/profile')
      }
      const handleEdit = (id)=>{
    //    dispatch(editAdminMadrasa(id))
       setShowEditModal(true)
      }
   
  const columns = StaffColumns(handleView,handleEdit)    
            
  return (
    <div>
             <DataTable
        data={data}
        columns={columns}
        filterColumn="district"
        filterColumn2="range"
        title={'Employee'}
        type={"redirect"}
        navigate={'/admin/staff/add'}
      />
          {showEditModal && (
                <Modal
                visibles={showEditModal}
                onClose={handleCloseEditModal}
                id="edit-Madrasa-admin"
                title="Edit Madrasa"
                content={<EditEmployee handleClose={handleCloseEditModal}/> }
                size = 'big'
                />
            )}

    </div>
  )
}

export default Employee