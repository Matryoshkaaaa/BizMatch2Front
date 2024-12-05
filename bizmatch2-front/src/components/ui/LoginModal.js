import React from "react";
import styles from "../ui/LoginModal.module.css"

export default function LoginModal({ onClose }) {
  return (
    <>
      {/* 오버레이 */}
      <div className={styles.overlay} onClick={onClose}></div>

      {/* 모달 본체 */}
      <div className={styles.signinBox}>
        <div>
          <span onClick={onClose} style={{ cursor: "pointer", float: "right" }}>
            ✕
          </span>
          <form action="/member/signin" method="post">
            <div className={styles.sameBox}>
              <input
                type="email"
                placeholder="이메일"
                name="emailAddr"
                required
              />
            </div>
            <div className={styles.sameBox}>
              <input
                type="password"
                placeholder="비밀번호"
                name="pwd"
                required
              />
            </div>
            <div className={styles.sameBox}>
              <button className={styles.signinButton}>로그인</button>
            </div>
            <div className={styles.sameBox}>
              <button>Google로 가입하기</button>
            </div>
          </form>
          <ul className={styles.accountMenu}>
            <li>
              <a href="/member/findpwd">비밀번호 찾기</a>
            </li>
            <li>/</li>
            <li>
              <a href="/member/select/membertype">회원가입</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
