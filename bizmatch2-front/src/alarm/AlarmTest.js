import AfterLoginHeaderStyle from "../components/main/AfterLoginHeader.module.css";
import { useEffect, useState } from "react";
import { receiveHandler } from "./socketReceive";
import { getSocket } from "./socketSender";

export default function AlarmTest() {
  const [notifications, setNotifications] = useState([]);

  const socket = getSocket();
  receiveHandler(socket, setNotifications);

  // useEffect(() => {
  //   const socket = getSocket();

  //   receiveHandler(socket, setNotifications);

  //   return () => {
  //     socket.close();
  //   };
  // }, [notifications, setNotifications]);

  useEffect(() => {
    console.log("알림", notifications);
  }, [notifications]);

  return (
    <div className={AfterLoginHeaderStyle.notificationItem}>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <p key={index} className={AfterLoginHeaderStyle.notificationMsg}>
            {notification.message}{" "}
          </p>
        ))
      ) : (
        <p className={AfterLoginHeaderStyle.notificationMsg}>
          알림이 없습니다.
        </p>
      )}
    </div>
  );
}
