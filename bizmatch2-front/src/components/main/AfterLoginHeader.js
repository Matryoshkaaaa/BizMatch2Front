import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import AfterLoginHeaderStyle from "./AfterLoginHeader.module.css";
import { getSocket } from "../../alarm/socketSender";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "../../stores/socketSlice";
import { memberActions } from "../../stores/memberSlice";

export default function AfterLoginHeader() {
  const dispatcher = useDispatch();
  const socket = useSelector((state) => state.socket.socket);
  const notifications = useSelector((state) => state.member.notifications);

  useEffect(() => {
    if (!socket) {
      const newSocket = getSocket();
      dispatcher(setSocket(newSocket));
      console.log("Socket connected:", newSocket);

      newSocket.onclose = () => {
        const reconnectSocket = getSocket();
        dispatcher(setSocket(reconnectSocket));
        console.log("Reconnected socket:", reconnectSocket);
      };
    }

    const notificationHandler = (event) => {
      const newNotification = JSON.parse(event.data);
      console.log("새로운 알림:", newNotification);
      dispatcher(memberActions.addNotification(newNotification));
    };

    if (socket) {
      socket.onmessage = notificationHandler;
    }

    return () => {
      if (socket) {
        socket.onmessage = null;
        socket.close();
        console.log("Socket disconnected");
      }
    };
  }, [dispatcher, socket]);

  return (
    <div className={AfterLoginHeaderStyle.headerContainer}>
      <div className={AfterLoginHeaderStyle.header}>
        <div>
          <img
            src="./images/teamLogo.svg"
            alt="로고"
            id="main-logo"
            className={AfterLoginHeaderStyle.mainLogo}
          />
        </div>
        <div className={AfterLoginHeaderStyle.headerMenu}>
          <NavLink
            to="/project/regist"
            activeClassName={AfterLoginHeaderStyle.activeLink}
          >
            프로젝트 등록
          </NavLink>
          <NavLink
            to="/project/findpage"
            activeClassName={AfterLoginHeaderStyle.activeLink}
          >
            프로젝트 찾기
          </NavLink>
          <NavLink
            to="/board/list"
            activeClassName={AfterLoginHeaderStyle.activeLink}
          >
            공지사항 및 문의 게시판
          </NavLink>
        </div>
        <div className={AfterLoginHeaderStyle.headerBtn}>
          <div className={AfterLoginHeaderStyle.notificationMenu}>
            <img
              className={AfterLoginHeaderStyle.notificationMenu}
              src="./images/Bell.svg"
              alt="알림"
            />
            <div className={AfterLoginHeaderStyle.notificationList}>
              <div className={AfterLoginHeaderStyle.notificationHeader}>
                <p>전체 알람수: {notifications.length}</p>
              </div>
              <div className={AfterLoginHeaderStyle.notificationItems}>
                {notifications
                  .filter((notif) => notif && notif.message) // 알림 메시지가 있을 경우만 표시
                  .map((notif, index) => (
                    <div
                      key={index}
                      className={AfterLoginHeaderStyle.notificationItem}
                    >
                      <p>{notif.message}</p>
                      {notif.url && <a href={notif.url}>상세 보기</a>}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className={AfterLoginHeaderStyle.notificationMypageMenu}>
            <img
              src="./images/User.svg"
              alt="유저"
              className={`${AfterLoginHeaderStyle.headerEmail} ${AfterLoginHeaderStyle.notificationMypageMenu}`}
              id="sessionA"
            />
            <div className={AfterLoginHeaderStyle.notificationMypageList}>
              <div className={AfterLoginHeaderStyle.notificationMypageItem}>
                <p className={AfterLoginHeaderStyle.notificationMypageMsg}>
                  프로필 관리
                </p>
              </div>
              <div className={AfterLoginHeaderStyle.notificationMypageItem}>
                <p className={AfterLoginHeaderStyle.notificationMypageMsg}>
                  내 정보 관리
                </p>
              </div>
              <div className={AfterLoginHeaderStyle.notificationMypageItem}>
                <p className={AfterLoginHeaderStyle.notificationMypageMsg}>
                  프로젝트 관리
                </p>
              </div>
              <div className={AfterLoginHeaderStyle.notificationMypageItem}>
                <p className={AfterLoginHeaderStyle.notificationMypageMsg}>
                  로그아웃
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
