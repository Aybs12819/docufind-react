import React, { useState, useEffect } from 'react';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'review',
      title: 'Document Review Required',
      message: 'New document awaiting your review: Student Registration Process',
      timestamp: '2024-01-15T10:30:00',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'approval',
      title: 'Document Approved',
      message: 'Your document "Laboratory Safety Guidelines" has been approved',
      timestamp: '2024-01-15T09:15:00',
      read: true,
      priority: 'normal'
    }
  ]);

  const [showNotifications, setShowNotifications] = useState(false);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notification-system">
      <button 
        className="notification-trigger"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <i className="fas fa-bell"></i>
        {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
      </button>

      {showNotifications && (
        <div className="notification-panel">
          <div className="notification-header">
            <h3>Notifications</h3>
            <button className="mark-all-read">Mark all as read</button>
          </div>

          <div className="notification-list">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="notification-icon">
                  <i className={`fas fa-${notification.type === 'review' ? 'file-alt' : 'check-circle'}`}></i>
                </div>
                <div className="notification-content">
                  <h4>{notification.title}</h4>
                  <p>{notification.message}</p>
                  <span className="notification-time">
                    {new Date(notification.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className={`priority-indicator ${notification.priority}`}></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;