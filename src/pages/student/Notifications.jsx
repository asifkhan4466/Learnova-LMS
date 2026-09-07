import { Link } from "react-router-dom";
import useBatches from "../../utils/useBatches";
import { studentLiveNotifications, readLiveNotifications } from "../../utils/batchStorage";
import "./Notifications.css";
function Notifications() {
  const notifications = studentLiveNotifications(useBatches());


  return (
    <div className="notifications-page">

      <div className="notifications-header">
        <div>
          <h1>Notifications</h1>
          <p>Stay updated with your courses and Learnova activities.</p>
        </div>

        <div className="notification-count">
          {notifications.filter(
            (notification) => notification.unread
          ).length}{" "}
          Unread
        </div>
      </div>

      <div className="notifications-list">
        {notifications.some(item => item.unread) && <button onClick={() => readLiveNotifications()}>Mark All as Read</button>}
        {!notifications.length && <p>No live lecture alerts yet.</p>}

        {notifications.map((notification, index) => (
          <div
            className={`notification-card ${
              notification.unread ? "unread" : ""
            }`}
            key={index}
          >

            <div className="notification-icon">
              🔔
            </div>

            <div className="notification-content">

              <div className="notification-top">

                <h2>{notification.title}</h2>

                <span>{notification.type}</span>

              </div>

              <p>{notification.message}</p>

              <small>{notification.time}</small>
              {notification.live && <Link to="/student/live-classes">Open Live Class</Link>}

            </div>

            {notification.unread && (
              <div className="unread-dot"></div>
            )}

          </div>
        ))}

      </div>

    </div>
  );
}

export default Notifications;