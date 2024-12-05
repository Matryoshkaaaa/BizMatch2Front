export const receiveHandler = (socket) => {
  if (socket) {
    socket.onmessage = (message) => {
      console.log(message);
      var receiveData = message.data;
      var receiveMessage = JSON.parse(receiveData);

      if (receiveMessage.action === "RECEIVE_PENATLY") {
      }
    };
  }
};
