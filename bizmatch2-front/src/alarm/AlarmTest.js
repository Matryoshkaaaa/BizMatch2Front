import SockJS from "sockjs-client";

export default function AlarmTest() {
  const testButtonClick = () => {
    const socket = new SockJS("http://localhost:8080/ws");

    socket.onopen = () => {
      console.log("소켓 연결 성공");
      socket.send("클라이언트에서 보낸 메시지");
    };
  };
  return <button onClick={testButtonClick}>alarmTest</button>;
}
