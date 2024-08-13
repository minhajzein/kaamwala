import React from 'react';
import { Card } from 'antd';

const JobCard = ({ job, isFocused, onClick }) => {
  return (
    <Card
      onClick={() => onClick(job.id)}
      className={`cursor-pointer p-1 mb-2 border rounded-lg shadow-md transition-transform transform hover:scale-95 ${isFocused ? 'border-blue-500' : 'border-gray-300'}`}
      hoverable
    >
    <h2 className="text-xl font-bold mb-2">{job.title}</h2>
    <p className="text-sm text-gray-700 mb-1"><strong>Company:</strong> {job.company}</p>
    <p className="text-sm text-gray-700 mb-1"><strong>Location:</strong> {job.location}</p>
    <p className="text-sm text-gray-700"><strong>Description:</strong> {job.description}</p>
    </Card>
  );
};

export default JobCard;
