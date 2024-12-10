import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // NavLink import 추가
import AfterLoginHeaderStyle from "./AfterLoginHeader.module.css";
import { getSocket } from "../../alarm/socketSender"; // 소켓 연결 함수
import { receiveHandler } from "../../alarm/socketReceive";
import { useDispatch } from "react-redux";
import { doLogout } from "../http/api/userApi";
import { clearMember } from "../../stores/memberSlice";

export default function AfterLoginHeader() {
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/member/mypage/company");
  };

  const handleLogout = async () => {
    try {
      const result = await doLogout(); // 로그아웃 API 호출
      console.log("로그아웃 성공:", result);

      // Redux 상태와 세션 스토리지 초기화
      dispatch(clearMember());

      // 로그아웃 후 처리: 토큰 삭제 및 페이지 이동
      sessionStorage.removeItem("token");
      window.location.href = "/"; // 로그인 페이지로 리디렉션
    } catch (error) {
      console.error("로그아웃 실패:", error.message);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    const storedNotifications =
      JSON.parse(sessionStorage.getItem("notifications")) || [];
    setNotifications(storedNotifications);
  }, [setNotifications]);

  const socket = getSocket();
  receiveHandler(socket, setNotifications);

  return (
    <>
      <div className={AfterLoginHeaderStyle.headerContainer}>
        <div className={AfterLoginHeaderStyle.header}>
          <div>
            <NavLink to="/" activeClassName={AfterLoginHeaderStyle.activeLink}>
              <img
                src="/images/teamLogo.svg"
                alt="로고"
                id="main-logo"
                className={AfterLoginHeaderStyle.mainLogo}
              />
            </NavLink>
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
                src="/images/Bell.svg"
                alt="알림"
              />

              <div className={AfterLoginHeaderStyle.notificationList}>
                <div className={AfterLoginHeaderStyle.notificationHeader}>
                  <p>전체 알람수</p>
                </div>
              </div>
            </div>
          </div>
          <div className={AfterLoginHeaderStyle.notificationMypageMenu}>
            <img
              src="/images/User.svg"
              alt="유저"
              className={`${AfterLoginHeaderStyle.headerEmail} ${AfterLoginHeaderStyle.notificationMypageMenu}`}
              id="sessionA"
            />
            <div className={AfterLoginHeaderStyle.notificationMypageList}>
              <div className={AfterLoginHeaderStyle.notificationMypageItem}>
                <p
                  className={AfterLoginHeaderStyle.notificationMypageMsg}
                  onClick={handleProfileClick}
                >
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
                <p
                  className={AfterLoginHeaderStyle.notificationMypageMsg}
                  onClick={handleLogout}
                >
                  로그아웃
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
