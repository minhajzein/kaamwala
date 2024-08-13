import React from 'react';

const Profile = ({ profileData, fields }) => {
  return (
    <div className="profile-container bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
      <div className="grid grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.key} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            <p className="text-gray-900">{profileData[field.key]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
