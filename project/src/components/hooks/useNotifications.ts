import { useState, useEffect } from 'react';
import { Notification } from '../types/Notification';

const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const savedNotifications: Notification[] = JSON.parse(localStorage.getItem('user-notifications') || '[]');
    setNotifications(savedNotifications);
  }, []);

  return { notifications, setNotifications };
};

export default useNotifications;
