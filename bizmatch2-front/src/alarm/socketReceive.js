/**
 *
 * @param {소켓} socket
 * @param {useState} setNotifications
 */
export const receiveHandler = (socket, setNotifications) => {
  if (socket) {
    socket.onmessage = (message) => {
      var receiveData = message.data;
      var receiveMessage = JSON.parse(receiveData);
      if (receiveMessage.action === "RECEIVE_PENATLY") {
        setNotifications((prevNotifications) => {
          const updatedNotifications = [receiveMessage, ...prevNotifications];
          sessionStorage.setItem(
            "notifications",
            JSON.stringify(updatedNotifications)
          );
          return updatedNotifications;
        });
      } else if (receiveMessage.action === "NEW_PJREPLY") {
        setNotifications((prevNotifications) => {
          const updatedNotifications = [receiveMessage, ...prevNotifications];
          sessionStorage.setItem(
            "notifications",
            JSON.stringify(updatedNotifications)
          );
          return updatedNotifications;
        });
      } else if (receiveMessage.action === "NEW_BDREPLY") {
        setNotifications((prevNotifications) => {
          const updatedNotifications = [receiveMessage, ...prevNotifications];
          sessionStorage.setItem(
            "notifications",
            JSON.stringify(updatedNotifications)
          );
          return updatedNotifications;
        });
      } else if (receiveMessage.action === "DEADLINE_REQ") {
        setNotifications((prevNotifications) => {
          const updatedNotifications = [receiveMessage, ...prevNotifications];
          sessionStorage.setItem(
            "notifications",
            JSON.stringify(updatedNotifications)
          );
          return updatedNotifications;
        });
      } else if (receiveMessage.action === "PAYMENT_REQ") {
        setNotifications((prevNotifications) => {
          const updatedNotifications = [receiveMessage, ...prevNotifications];
          sessionStorage.setItem(
            "notifications",
            JSON.stringify(updatedNotifications)
          );
          return updatedNotifications;
        });
      }
    };
  }
};
