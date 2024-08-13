import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { Select } from 'antd';


const { Option } = Select;

const UpdateRestaurant = ({ handleClose }) => {
  const [loadingMessage, setLoadingMessage] = useState(false);

  const validationSchema = Yup.object({
    restuarant_name: Yup.string().required('Full name is required'),
    contact: Yup.string().required('Contact number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    location: Yup.string().required('Location is required'),
    status: Yup.string().required('Status is required'),
  });

  const formik = useFormik({
    initialValues: {
      restuarant_name: '',
      contact: '',
      email: '',
      location: '',
      status: '',
    },
    validationSchema,
    onSubmit: (values) => { 
      // setLoadingMessage(true);
      // const promise = dispatch(CreateAreaManager(values));
      // promise.then((res) => {
      //   setLoadingMessage(false);
      //   if (res.payload.error) {
      //     toast.error(res.payload.error);
      //     if (res.payload.errors.email) {
      //       toast.error(res.payload.errors.email[0]);
      //     }
      //   }
      //   if (res.payload.success) {
      //     toast.success(res.payload.success);
      //     handleClose();
      //   }
      // });
    },
  });

  return (
    <div className="text-black">
      <form onSubmit={formik.handleSubmit} className="">
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="restuarant_name" className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              id="restuarant_name"
              {...formik.getFieldProps('restuarant_name')}
              className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${
                formik.touched.restuarant_name && formik.errors.restuarant_name ? 'border-red-500' : ''
              }`}
              placeholder="Full Name"
            />
            {formik.touched.restuarant_name && formik.errors.restuarant_name && (
              <p className="text-red-500 text-xs italic">{formik.errors.restuarant_name}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="contact" className="block text-gray-700 text-sm font-medium mb-1">Contact</label>
            <input
              type="text"
              id="contact"
              {...formik.getFieldProps('contact')}
              className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${
                formik.touched.contact && formik.errors.contact ? 'border-red-500' : ''
              }`}
              placeholder="Contact Number"
            />
            {formik.touched.contact && formik.errors.contact && (
              <p className="text-red-500 text-xs italic">{formik.errors.contact}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              {...formik.getFieldProps('email')}
              className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${
                formik.touched.email && formik.errors.email ? 'border-red-500' : ''
              }`}
              placeholder="Email Address"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs italic">{formik.errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700 text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              id="location"
              {...formik.getFieldProps('location')}
              className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${
                formik.touched.location && formik.errors.location ? 'border-red-500' : ''
              }`}
              placeholder="Managed Area"
            />
            {formik.touched.location && formik.errors.location && (
              <p className="text-red-500 text-xs italic">{formik.errors.location}</p>
            )}
          </div>


          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700 text-sm font-medium mb-1">Status</label>
            <Select
              style={{ width: '100%' }}
              onChange={(value) => formik.setFieldValue('status', value)}
              placeholder="Select Status"
            >
              <Option value="active">Active</Option>
              <Option value="deactivated">Deactivated</Option>
            </Select>
            {formik.touched.status && formik.errors.status && (
              <p className="text-red-500 text-xs italic">{formik.errors.status}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-5">
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2"
          >
            Close
          </button>
          <button
            disabled={loadingMessage}
            type="submit"
            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white modalAddBtn hover:modalAddBtnHover ${loadingMessage ? 'animate-pulse' : ''}`}
          >
            {loadingMessage ? 'Updating Restaurent...' : 'Update Restuarantr'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
