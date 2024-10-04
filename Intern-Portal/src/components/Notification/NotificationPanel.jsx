import React, { useEffect, useState } from 'react';
import { Bell, Info, AlertCircle, CheckCircle, Check } from "lucide-react";
import './NotificationPanel.css';

const iconMap = {
  info: Info,
  warning: AlertCircle,
  success: CheckCircle
};

function NotificationPanel() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch('/api/notifications');
      const data = await response.json();
      setNotifications(data);
    };
    fetchNotifications();
  }, []);

  return (
    <div className="notification-panel">
      <div className="notification-header">
        <h2 className="notification-title">
          <Bell className="notification-bell-icon" />
          Notifications
        </h2>
        <button 
          className="mark-all-read-button"
          aria-label="Mark all as read"
        >
          <Check />
        </button>
      </div>
      <ul className="notification-list">
        {notifications.map((notification) => {
          const Icon = iconMap[notification.type];
          return (
            <li key={notification.id} className="notification-item">
              <div className="notification-icon">
                <Icon className={`icon-${notification.type}`} />
              </div>
              <div className="notification-content">
                <p className="notification-title">{notification.title}</p>
                <p className="notification-description">{notification.description}</p>
                <p className="notification-timestamp">{notification.timestamp}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="notification-footer">
        <button className="view-all-button">
          View all
        </button>
      </div>
    </div>
  );
}
export default NotificationPanel;