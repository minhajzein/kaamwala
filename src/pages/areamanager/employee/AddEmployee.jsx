import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Input, Button, Upload, Radio } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const validationSchema = Yup.object().shape({
  photo: Yup.mixed().required('Photo is required'),
  adharFront: Yup.mixed().required('Adhar front is required'),
  adharBack: Yup.mixed().required('Adhar back is required'),
  name: Yup.string().required('Name is required'),
  job: Yup.string().required('Job is required'),
  address: Yup.string().required('Address is required'),
  location: Yup.string().required('Location is required'),
  phone: Yup.string().required('Phone is required'),
  status: Yup.string().required('Status is required'),
  totalExperience: Yup.number().required('Total working experience is required'),
});

const AddEmployee = () => {
  const handleSubmit = (values) => {
    console.log('Form Values', values);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div className=" mx-auto p-4 bg-white rounded-lg shadow-md">
      <Formik
        initialValues={{
          photo: null,
          adharFront: null,
          adharBack: null,
          name: '',
          job: '',
          address: '',
          location: '',
          phone: '',
          status: '',
          totalExperience: 0,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Photo</label>
                <Field name="photo">
                  {({ field }) => (
                    <Upload
                      name="photo"
                      maxCount={1}
                      listType="picture"
                      beforeUpload={() => false}
                      onChange={(info) => setFieldValue('photo', info.file)}
                    >
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  )}
                </Field>
                <ErrorMessage name="photo" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Adhar Front</label>
                <Field name="adharFront">
                  {({ field }) => (
                    <Upload
                      name="adharFront"
                      maxCount={1}
                      listType="picture"
                      beforeUpload={() => false}
                      onChange={(info) => setFieldValue('adharFront', info.file)}
                    >
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  )}
                </Field>
                <ErrorMessage name="adharFront" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Adhar Back</label>
                <Field name="adharBack">
                  {({ field }) => (
                    <Upload
                      name="adharBack"
                      maxCount={1}
                      listType="picture"
                      beforeUpload={() => false}
                      onChange={(info) => setFieldValue('adharBack', info.file)}
                    >
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  )}
                </Field>
                <ErrorMessage name="adharBack" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <Field name="name" as={Input} className="mt-1 block w-full p-2 border rounded-md" />
                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Job</label>
                <Field name="job" as={Input} className="mt-1 block w-full p-2 border rounded-md" />
                <ErrorMessage name="job" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <Field name="address" as={TextArea} className="mt-1 block w-full p-2 border rounded-md" />
                <ErrorMessage name="address" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <Field name="location" as={Input} className="mt-1 block w-full p-2 border rounded-md" />
                <ErrorMessage name="location" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <Field name="phone" as={Input} className="mt-1 block w-full p-2 border rounded-md" />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <Field name="status" as={Radio.Group} className="mt-1 block w-full">
                  <Radio value="available">Available</Radio>
                  <Radio value="not_available">Not Available</Radio>
                </Field>
                <ErrorMessage name="status" component="div" className="text-red-500 text-xs mt-1" />
              </div>

      

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Total Working Experience (years)</label>
                <Field name="totalExperience" as={Input} type="number" className="mt-1 block w-full p-2 border rounded-md" />
                <ErrorMessage name="totalExperience" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>

            <div className="mt-6">
              <Button type="primary" htmlType="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">Submit</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddEmployee;
