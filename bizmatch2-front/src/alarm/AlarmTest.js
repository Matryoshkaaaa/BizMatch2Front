import React from "react";
import SockJS from "sockjs-client";
import AfterLoginHeaderStyle from "../components/main/AfterLoginHeader.module.css";
import { useEffect, useState } from "react";
import { receiveHandler } from "./socketReceive";

export default function AlarmTest() {
  const socket = new SockJS("http://localhost:8080/ws");

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    receiveHandler(socket, setNotifications);

    socket.onopen = () => {
      console.log("소켓 연결 성공");
      socket.send("클라이언트에서 보낸 메시지");
    };

    return () => {
      socket.close();
    };
  }, []);

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
