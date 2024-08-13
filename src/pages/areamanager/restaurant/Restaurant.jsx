import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../components/table/DataTable';
import Modal from '../../../components/Modal';
import { RestaurantColumns } from '../../../components/table/Columns/RestaurantColumn';
import UpdateRestaurant from './UpdateRestaurant';

const Restaurant = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate =  useNavigate()
  useEffect(()=>{
    // dispatch(fetchAllMadrasaAdmin())
  },[])
  const data = [
    {
      id: 1,
      owner_name: "John Doe",
      restaurant_name: "Doe's Diner",
      contact: "123-456-7890",
      email: "john@example.com",
      location: "New York",
      address: "123 Main St, New York, NY 10001",
    },
    {
      id: 2,
      owner_name: "Jane Smith",
      restaurant_name: "Smith's Eatery",
      contact: "987-654-3210",
      email: "jane@example.com",
      location: "Los Angeles",
      address: "456 Elm St, Los Angeles, CA 90001",
    },
    {
      id: 3,
      owner_name: "Alice Johnson",
      restaurant_name: "Alice's Restaurant",
      contact: "555-123-4567",
      email: "alice@example.com",
      location: "Chicago",
      address: "789 Oak St, Chicago, IL 60601",
    },
    {
      id: 4,
      owner_name: "Bob Brown",
      restaurant_name: "Bob's Bistro",
      contact: "444-987-6543",
      email: "bob@example.com",
      location: "Houston",
      address: "321 Pine St, Houston, TX 77001",
    },
    {
      id: 5,
      owner_name: "Charlie Davis",
      restaurant_name: "Charlie's Cafe",
      contact: "333-654-9876",
      email: "charlie@example.com",
      location: "Miami",
      address: "654 Cedar St, Miami, FL 33101",
    },
  ];

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
    
      const handleView = (id)=>{
    //    dispatch(viewAdminMadrasa(id))
       navigate('/areamanager/restaurant/profile')
      }
      const handleEdit = (id)=>{
    //    dispatch(editAdminMadrasa(id))
       setShowEditModal(true)
      }
   
  const columns = RestaurantColumns(handleView,handleEdit)    
            
  return (
    <div>
             <DataTable
        data={data}
        columns={columns}
        filterColumn="district"
        filterColumn2="range"
        title={'Restaurant'}
        type="modal"
      />
          {showEditModal && (
                <Modal
                visibles={showEditModal}
                onClose={handleCloseEditModal}
                id="edit-Madrasa-admin"
                title="Edit Madrasa"
                content={<UpdateRestaurant handleClose={handleCloseEditModal}/> }
                size = 'big'
                />
            )}

    </div>
  )
}

export default Restaurant