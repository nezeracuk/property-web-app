'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import markMessageAsRead from '@/app/actions/markMessageAsRead';
import deleteMessage from '@/app/actions/deleteMessage';
import { format } from 'date-fns';
import { useGlobalContext } from '@/context/GlobalContext';

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    const read = await markMessageAsRead(message._id);
    setIsRead(read);
    setUnreadCount((prev) => (read ? prev - 1 : prev + 1));
    toast.success(`Message marked as ${read ? 'read' : 'new'}`);
  };
  const handleDeleteClick = async () => {
    await deleteMessage(message._id);
    setUnreadCount((prev) => (isRead ? prev : prev - 1));
    toast.success('Message deleted successfully');
  };
  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && <div className="absolute top-1 right-1 bg-yellow-600 text-white px-2 py-1 rounded-md">New</div>}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry: </span>
        {message.property.name}
      </h2>
      <p className="text-gray-700 ">{message.body}</p>
      <ul className="mt-4">
        <li>
          <strong>Reply Email:</strong>{' '}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{' '}
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong> {format(new Date(message.createdAt), 'MM/dd/yyyy, h:mm:ss a')}
        </li>
      </ul>
      <button className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md" onClick={handleReadClick}>
        {isRead ? 'Mark As New' : 'Mark As Read'}
      </button>
      <button className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md" onClick={handleDeleteClick}>
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
