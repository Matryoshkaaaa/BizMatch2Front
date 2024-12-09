/**
 *
 * @param {소켓} socket
 * @param {useState} setNotifications
 */
export const receiveHandler = (socket, setNotifications) => {
  if (socket) {
    socket.onmessage = (message) => {
      console.log("받은 메시지", message);
      var receiveData = message.data;
      var receiveMessage = JSON.parse(receiveData);
      console.log("파싱된 메시지:", receiveMessage); // 파싱된 메시지 출력
      if (receiveMessage.action === "RECEIVE_PENATLY") {
        setNotifications((prevNotifications) => [
          {
            message: receiveMessage.message,
          },
          ...prevNotifications,
        ]);
      } else if (receiveMessage.action === "NEW_PJREPLY") {
        setNotifications((prevNotifications) => [
          { message: receiveMessage.message, url: receiveMessage.url },
          ...prevNotifications,
        ]);
      } else if (receiveMessage.action === "NEW_BDREPLY") {
        setNotifications((prevNotifications) => [
          { message: receiveMessage.message, url: receiveMessage.url },
          ...prevNotifications,
        ]);
      } else if (receiveMessage.action === "DEADLINE_REQ") {
        setNotifications((prevNotifications) => [
          { message: receiveMessage.message, url: receiveMessage.url },
          ...prevNotifications,
        ]);
      } else if (receiveMessage.action === "PAYMENT_REQ") {
        setNotifications((prevNotifications) => [
          { message: receiveMessage.message, url: receiveMessage.url },
          ...prevNotifications,
        ]);
      }
    };
  }
};
