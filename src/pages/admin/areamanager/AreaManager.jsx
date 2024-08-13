import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AreaManagerColumns } from '../../../components/table/Columns/AreaManagerColumn';
import DataTable from '../../../components/table/DataTable';
import Modal from '../../../components/Modal';
import EditAreaManager from './EditAreaManager';

const AreaManager = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate =  useNavigate()
  useEffect(()=>{
    // dispatch(fetchAllMadrasaAdmin())
  },[])

  const data = [
    { id: 1, name: 'John Doe', contact: '123-456-7890', email: 'john.doe@example.com', location: 'North Zone', staffCount: 12, status: 'active' },
    { id: 2, name: 'Jane Smith', contact: '098-765-4321', email: 'jane.smith@example.com', location: 'South Zone', staffCount: 8, status: 'inactive' },
    { id: 3, name: 'Alice Johnson', contact: '456-789-0123', email: 'alice.johnson@example.com', location: 'East Zone', staffCount: 15, status: 'active' },
    { id: 4, name: 'Bob Brown', contact: '321-654-0987', email: 'bob.brown@example.com', location: 'West Zone', staffCount: 10, status: 'inactive' },
  ]; 

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
    
      const handleView = (id)=>{
    //    dispatch(viewAdminMadrasa(id))
       navigate('/admin/areamanager/profile')
      }
      const handleEdit = (id)=>{
    //    dispatch(editAdminMadrasa(id))
       setShowEditModal(true)
      }
   
  const columns = AreaManagerColumns(handleView,handleEdit)    
            
  return (
    <div>
             <DataTable
        data={data}
        columns={columns}
        filterColumn="location"
        title='Area_Manager'
        type='modal'
      />
          {showEditModal && (
                <Modal
                visibles={showEditModal}
                onClose={handleCloseEditModal}
                id="edit-Madrasa-admin"
                title="Edit Madrasa"
                content={<EditAreaManager handleClose={handleCloseEditModal}/> }
                size = 'big'
                />
            )}

    </div>
  )
}

export default AreaManager