import React, { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // NavLink를 import합니다.
import styles from "../ui/LoginModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { memberActions } from "../../stores/ToolkitStrore";
import { getMyToken } from "../../stores/thunks/loginThunk";

export default function LoginModal({ onClose }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  const loginState = useSelector((state) => ({ ...state.member }));
  const loginDispatcher = useDispatch();

  useEffect(() => {
    loginDispatcher(memberActions.reload());
  }, [loginDispatcher]);

  const onClickLoginHandler = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email) {
      alert("email을 입력해주세요");
      return;
    }

    if (!password) {
      alert("password를 입력해주세요");
      return;
    }

    loginDispatcher(getMyToken(email, password));
    console.log("로그인 성공");
  };

  const navigate = useNavigate;

  useEffect(() => {
    if (loginState.info && loginState.info.email) {
      navigate("/");
    }
  }, [loginState, navigate]);

  return (
    <>
      <div className={styles.overlay} id="overlay"></div>

      <div className={styles.loginModal} id="login-modal">
        <div className={styles.loginModalContainer}>
          <span
            className={styles.modalCloseBtn}
            id="modal-close-btn"
            onClick={onClose}
          >
            x
          </span>

          <div className={styles.loginModalImgArea}>
            <img src="/images/teamLogo.svg" alt="Logo" />
          </div>

          <div className={styles.loginModalBtns}>
            <div className={styles.signinBox}>
              {/* 오류 메시지 */}
              <div>{/* 오류 메시지가 있을 경우 출력 */}</div>

              <div className={styles.sameBox}>
                <input
                  type="email"
                  placeholder=" "
                  id="login-input-email"
                  name="emailAddr"
                  ref={emailRef}
                  required
                />
                <label htmlFor="login-input-email">이메일</label>
              </div>

              <div className={styles.sameBox}>
                <input
                  type="password"
                  placeholder=" "
                  id="login-input-pwd"
                  name="pwd"
                  ref={passwordRef}
                  required
                />
                <label htmlFor="login-input-pwd">비밀번호</label>
              </div>

              <div className={styles.sameBox}>
                <button
                  onClick={onClickLoginHandler}
                  className={styles.signinButton}
                >
                  로그인
                </button>
              </div>

              <div className={styles.sameBox}>
                <button>Sign up with Google</button>
              </div>
            </div>
          </div>

          {/* 계정 관련 링크 */}
          <ul className={styles.accountMenu}>
            <li className={styles.accountMenuText}>
              <NavLink to="/member/findpwd">비밀번호 찾기</NavLink>
            </li>
            <li>/</li>
            <li className={styles.accountMenuText}>
              <NavLink to="/member/select/membertype">회원가입</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
