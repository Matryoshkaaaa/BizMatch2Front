import React from "react";
import { NavLink } from "react-router-dom"; // NavLink import 추가
import AfterLoginHeaderStyle from "./AfterLoginHeader.module.css";

export default function AfterLoginHeader() {
  return (
    <>
      <div className={AfterLoginHeaderStyle.headerContainer}>
        <div className={AfterLoginHeaderStyle.header}>
          <div>
            <img
              src="/img/teamLogo.svg"
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
                src="/img/Bell.svg"
                alt="알림"
              />

              <div className={AfterLoginHeaderStyle.notificationList}>
                <div className={AfterLoginHeaderStyle.notificationHeader}>
                  <p>전체 알람수</p>
                </div>

                <div className={AfterLoginHeaderStyle.notificationItem}>
                  <p className={AfterLoginHeaderStyle.notificationMsg}>
                    알림 1: 새 메시지가 도착했습니다!
                  </p>
                </div>
                <div className={AfterLoginHeaderStyle.notificationItem}>
                  <p className={AfterLoginHeaderStyle.notificationMsg}>
                    알림 2: 업데이트가 필요합니다.
                  </p>
                </div>
                <div className={AfterLoginHeaderStyle.notificationItem}>
                  <p className={AfterLoginHeaderStyle.notificationMsg}>
                    알림 3: 새로운 댓글이 있습니다.
                  </p>
                </div>
                <div className={AfterLoginHeaderStyle.notificationItem}>
                  <p className={AfterLoginHeaderStyle.notificationMsg}>
                    알림 4: 새로운 댓글이 있습니다.
                  </p>
                </div>
                <div className={AfterLoginHeaderStyle.notificationItem}>
                  <p className={AfterLoginHeaderStyle.notificationMsg}>
                    알림 5: 새로운 댓글이 있습니다.
                  </p>
                </div>
                <div className={AfterLoginHeaderStyle.notificationItem}>
                  <p className={AfterLoginHeaderStyle.notificationMsg}>
                    알림 6: 새로운 댓글이 있습니다.
                  </p>
                </div>
                <div className={AfterLoginHeaderStyle.notificationItem}>
                  <p className={AfterLoginHeaderStyle.notificationMsg}>
                    알림 7: 새로운 댓글이 있습니다.
                  </p>
                </div>
                <div className={AfterLoginHeaderStyle.notificationItem}>
                  <p className={AfterLoginHeaderStyle.notificationMsg}>
                    알림 8: 새로운 댓글이 있습니다.
                  </p>
                </div>
                <div className={AfterLoginHeaderStyle.notificationItem}>
                  <p className={AfterLoginHeaderStyle.notificationMsg}>
                    알림 9: 새로운 댓글이 있습니다.
                  </p>
                </div>
              </div>
            </div>
            <div className={AfterLoginHeaderStyle.notificationMypageMenu}>
              <img
                src="/img/User.svg"
                alt="유저"
                className={`${AfterLoginHeaderStyle.headerEmail} ${AfterLoginHeaderStyle.notificationMypageMenu}`}
                id="sessionA"
                data-email="{sessionScope._LOGIN_USER_.emilAddr}"
                data-mbrctgry="{sessionScope._LOGIN_USER_.mbrCtgry}"
                data-cmpid="{sessionScope._LOGIN_USER_.cmpId}"
              />

              <div
                className={AfterLoginHeaderStyle.notificationMypageList}
                data-membertype="{sessionScope._LOGIN_USER_.mbrCtgry}"
                data-id="{sessionScope._LOGIN_USER_.emilAddr}"
              >
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
    </>
  );
}
