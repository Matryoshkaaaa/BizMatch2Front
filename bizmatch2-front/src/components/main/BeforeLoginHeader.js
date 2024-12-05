import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../main/BeforeLoginHeader.module.css"
import LoginModal from "../ui/LoginModal"

export default function BeforeLoginHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const goToMemberType = () => navigate("/member/select/membertype"); // 페이지 이동 함수
  
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <div>
            <a href="/">
              <img
                src="/images/teamLogo.svg"
                alt="로고"
                className={styles.mainLogo}
              />
            </a>
          </div>
          <div className={styles.headerBtn}>
            <button
              className={styles.login}
              onClick={openModal} // 로그인 클릭 시 모달 열기
            >
              로그인
            </button>
            <button className={styles.signUp} onClick={goToMemberType}>회원가입</button>
          </div>
        </div>
      </div>

      {/* 모달 렌더링 */}
      {isModalOpen && <LoginModal onClose={closeModal} />}
    </>
  );
}
