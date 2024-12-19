import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // NavLink import 추가
import AfterLoginHeaderStyle from "./AfterLoginHeader.module.css";
import { getSocket } from "../../alarm/socketSender"; // 소켓 연결 함수
import { receiveHandler } from "../../alarm/socketReceive";
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../http/api/userApi";
import { clearMember } from "../../stores/memberSlice";
import { Link } from "react-router-dom";

export default function AfterLoginHeader() {
  const loginState = useSelector((state) => ({ ...state.member }));
  const session = sessionStorage.getItem("info");
  const info = JSON.parse(session);
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // 알림 클릭 시 삭제 함수
  const handleNotificationClick = (index) => {
    // 새로운 알림 리스트 생성
    const updatedNotifications = notifications.filter((_, i) => i !== index);

    // 상태 업데이트
    setNotifications(updatedNotifications);

    // 세션 스토리지 업데이트
    sessionStorage.setItem(
      "notifications",
      JSON.stringify(updatedNotifications)
    );
  };

  const handleMyInfoEdit = () => {
    navigate("/member/myinfo/edit");
  };

  const handleProjectClick = () => {
    navigate("/project/myapply");
  };
  const handleProfileClick = () => {
    if (info?.mbrCtgry === 1) {
      navigate(`/member/mypage/freelancer/${info.emilAddr}`);
    } else {
      navigate(`/member/mypage/company/${info?.cmpId}`);
    }
  };
  const handlePaymentClick = () => {
    navigate("/payment/deposit");
  };

  const handleMainPage = () => {
    navigate("/");
  };

  const handleAdiminPage = () => {
    navigate("/admin");
  };

  const handleLogout = async () => {
    try {
      const result = await doLogout(); // 로그아웃 API 호출

      // Redux 상태와 세션 스토리지 초기화
      dispatch(clearMember());

      // 로그아웃 후 처리: 토큰 삭제 및 페이지 이동
      sessionStorage.removeItem("token");
      alert("로그아웃 되었습니다.");
      window.location.href = "/"; // 로그인 페이지로 리디렉션
    } catch (error) {
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 알림들 가져오는거
  useEffect(() => {
    const storedNotifications =
      JSON.parse(sessionStorage.getItem("notifications")) || [];
    setNotifications(storedNotifications);
  }, [setNotifications]);

  const socket = getSocket();
  receiveHandler(socket, setNotifications);

  return (
    <div className={AfterLoginHeaderStyle.headerContainer}>
      <div className={AfterLoginHeaderStyle.header}>
        <div>
          <img
            src="/images/teamLogo.svg"
            alt="로고"
            id="main-logo"
            className={AfterLoginHeaderStyle.mainLogo}
            onClick={handleMainPage}
          />
        </div>
        <div
          className={`${AfterLoginHeaderStyle.headerMenu} ${
            menuOpen ? AfterLoginHeaderStyle.open : ""
          }`}
        >
          <NavLink
            to={info?.cmpId ? "/project/regist" : "#"}
            activeClassName={AfterLoginHeaderStyle.activeLink}
            onClick={(e) => {
              if (!info?.cmpId) {
                e.preventDefault(); // 기본 동작 막기
                alert("프로젝트 등록 권한이 없습니다.");
              }
            }}
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
            to="/board"
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
                <p>전체 알람수: {notifications.length}</p>
              </div>
              <div className={AfterLoginHeaderStyle.notificationItems}>
                {notifications
                  .filter((notif) => notif && notif.message) // 메시지가 있는 경우만 표시
                  .map((notif, index) => (
                    <div
                      key={index}
                      className={AfterLoginHeaderStyle.notificationItem}
                    >
                      <p>{notif.message}</p>
                      {notif.url && (
                        <Link
                          to={notif.url}
                          onClick={() => handleNotificationClick(index)} // 클릭 시 삭제
                          className={AfterLoginHeaderStyle.notificationLink}
                        >
                          상세 보기
                        </Link>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className={AfterLoginHeaderStyle.notificationMypageMenu}>
            <img
              src="/images/User.svg"
              alt="유저"
              className={`${AfterLoginHeaderStyle.headerEmail} ${AfterLoginHeaderStyle.notificationMypageMenu}`}
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
              {loginState?.info?.mbrCtgry === 2 && (
                <div className={AfterLoginHeaderStyle.notificationMypageItem}>
                  <p
                    className={AfterLoginHeaderStyle.notificationMypageMsg}
                    onClick={handleAdiminPage}
                  >
                    관리자 페이지
                  </p>
                </div>
              )}

              <div className={AfterLoginHeaderStyle.notificationMypageItem}>
                <p
                  className={AfterLoginHeaderStyle.notificationMypageMsg}
                  onClick={handleMyInfoEdit}
                >
                  내 정보 관리
                </p>
              </div>
              <div className={AfterLoginHeaderStyle.notificationMypageItem}>
                <p
                  className={AfterLoginHeaderStyle.notificationMypageMsg}
                  onClick={handleProjectClick}
                >
                  프로젝트 관리
                </p>
              </div>
              <div className={AfterLoginHeaderStyle.notificationMypageItem}>
                <p
                  className={AfterLoginHeaderStyle.notificationMypageMsg}
                  onClick={handlePaymentClick}
                >
                  결제내역
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
          <div className={AfterLoginHeaderStyle.hamburger} onClick={toggleMenu}>
            ☰
          </div>
        </div>
      </div>
    </div>
  );
}
