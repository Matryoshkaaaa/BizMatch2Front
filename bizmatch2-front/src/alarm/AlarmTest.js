import AfterLoginHeaderStyle from "../components/main/AfterLoginHeader.module.css";

export default function AlarmTest() {
  return (
    <div className={AfterLoginHeaderStyle.notificationItem}>
      <p className={AfterLoginHeaderStyle.notificationMsg}>
        알림 1: 새 메시지가 도착했습니다!
      </p>
    </div>
  );
}
