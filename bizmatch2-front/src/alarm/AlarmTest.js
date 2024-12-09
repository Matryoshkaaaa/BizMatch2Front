// import React, { useState } from "react";
// import AfterLoginHeaderStyle from "../components/main/AfterLoginHeader.module.css";
// import { receiveHandler } from "./socketReceive";
// import { getSocket } from "./socketSender";

// export default function AlarmTest() {
//   const [notifications, setNotifications] = useState([]);

//   const socket = getSocket();
//   receiveHandler(socket, setNotifications);

//   return (
//     <div className={AfterLoginHeaderStyle.notificationItem}>
//       {notifications.length > 0 ? (
//         notifications.map((notification, index) => (
//           <p key={index} className={AfterLoginHeaderStyle.notificationMsg}>
//             {notification.message}{" "}
//           </p>
//         ))
//       ) : (
//         <p className={AfterLoginHeaderStyle.notificationMsg}>
//           알림이 없습니다.
//         </p>
//       )}
//     </div>
//   );
// }
