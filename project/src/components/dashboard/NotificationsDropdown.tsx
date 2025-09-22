import React from 'react';
import { X } from 'lucide-react';

interface Props {
  notifications: any[];
  setNotifications: (value: any[]) => void;
  onClose: () => void;
}

const NotificationsDropdown: React.FC<Props> = ({ notifications, setNotifications, onClose }) => (
  <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
    <div className="p-4">
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-4">No notifications yet</p>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border ${notification.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'}`}
            >
              <div className="flex items-start justify-between mb-2">
                <p className="font-medium text-sm text-gray-800">{notification.title}</p>
                {!notification.read && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></span>}
              </div>
              <p className="text-xs text-gray-600 mb-2">{notification.message}</p>
              {notification.meetLink && (
                <a href={notification.meetLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-xs font-medium inline-block mb-2">
                  Join Meeting →
                </a>
              )}
              <p className="text-xs text-gray-500">{new Date(notification.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default NotificationsDropdown;
