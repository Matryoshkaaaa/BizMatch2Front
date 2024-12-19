import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../ui/LoginModal.module.css";
import { useDispatch } from "react-redux";
import { getMyToken } from "../../stores/thunks/loginThunk";
import { memberActions } from "../../stores/memberSlice";
import { login } from "../http/api/loginApi";
import styled from "styled-components";

const Error = styled.span`
  font-size: 1rem;
  color: red;
`;

export default function LoginModal({ onClose, loginState }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const loginDispatcher = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    loginDispatcher(memberActions.reload());
  }, [loginDispatcher]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        //console.log("ESC 키 눌림 - 모달 닫기");
        onClose(); // ESC 키를 누르면 onClose 호출
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown); // 이벤트 리스너 정리
    };
  }, [onClose]);

  const isValidEmail = (email) => {
    const regex =
      /^[a-zA-Z0-9._%+-]{4,10}@[a-zA-Z0-9.-]{4,10}$|^[a-zA-Z0-9._%+-]{4,10}@[a-zA-Z0-9.-]{4,10}\.[a-zA-Z]{2,}$/;

    return regex.test(email);
  };

  const onChangeEmailHandler = () => {
    if (isSubmit) {
      const email = emailRef.current.value;
      if (!email) {
        setErrorMsg("이메일을 입력해주세요.");
        emailRef.current.style.border = "2px solid red";
      } else if (!isValidEmail(email) && email) {
        setErrorMsg("이메일 형식이 올바르지 않습니다.");
        emailRef.current.style.border = "2px solid red";
      } else {
        setErrorMsg("");
        emailRef.current.style.border = "";
      }
    }
  };

  const onChangePasswordHandler = () => {
    if (isSubmit) {
      const password = passwordRef.current.value;
      if (!password) {
        setErrorMsg("비밀번호를 입력해주세요");
        passwordRef.current.style.border = "2px solid red";
      } else {
        setErrorMsg("");
        passwordRef.current.style.border = "";
      }
    }
  };
  // mbrStt
  const onClickLoginHandler = async () => {
    setIsSubmit(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email && !password) {
      setErrorMsg("이메일과 비밀번호를 입력해주세요.");
      emailRef.current.style.border = "2px solid red";
      passwordRef.current.style.border = "2px solid red";
    } else if (!email) {
      setErrorMsg("이메일을 입력해주세요");
      emailRef.current.style.border = "2px solid red";
    } else if (!password) {
      setErrorMsg("비밀번호를 입력해주세요");
      passwordRef.current.style.border = "2px solid red";
    }

    try {
      // getMyToken 호출 후 오류 메시지 처리
      const errorMessage = await loginDispatcher(getMyToken(email, password));

      if (errorMessage) {
        setErrorMsg(errorMessage);
        emailRef.current.style.border = "1px solid red";
        passwordRef.current.style.border = "1px solid red";
      } else if (!email && !password) {
        setErrorMsg("이메일과 비밀번호를 입력해주세요.");
        emailRef.current.style.border = "1px solid red";
        passwordRef.current.style.border = "1px solid red";
      } else if (!email) {
        setErrorMsg("이메일을 입력해주세요");
        emailRef.current.style.border = "1px solid red";
      } else if (!password) {
        setErrorMsg("비밀번호를 입력해주세요");
        passwordRef.current.style.border = "1px solid red";
      } else {
        loginDispatcher(getMyToken(email, password));

        if (loginState.info && loginState.info.emilAddr) {
          onClose();
          alert("로그인되었습니다");
          navigate("/");
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("로그인 처리 중 오류 발생:", error);
    }

    try {
      const tokenResponse = await login(email, password);
      if (tokenResponse.status === 401) {
        alert("회원 심사중이므로 로그인이 불가능합니다.");
        return;
      }
    } catch (error) {
      return;
    }

    if (loginState.info && loginState.info.emilAddr) {
      onClose();
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <>
      <div className={styles.overlay} id="overlay"></div>
      <div className={styles.loginModal} id="login-modal">
        <div className={styles.loginModalContainer}>
          <span
            className={styles.modalCloseBtn}
            id="modal-close-btn"
            onClick={onClose}
            style={{ color: "#333" }}
          >
            x
          </span>

          <div className={styles.loginModalImgArea}>
            <img src="/images/teamLogo.svg" alt="Logo" />
          </div>

          <div className={styles.loginModalBtns}>
            <div className={styles.signinBox}>
              <div>{/* 오류 메시지가 있을 경우 출력 */}</div>

              <div className={styles.sameBox}>
                <input
                  type="email"
                  placeholder=" "
                  name="emailAddr"
                  ref={emailRef}
                  onChange={onChangeEmailHandler}
                  required
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // 폼 제출 방지 (필요한 경우)
                      onClickLoginHandler();
                    }
                  }}
                />
                <label htmlFor="login-input-email">이메일</label>
              </div>

              <div className={styles.sameBox}>
                <input
                  type="password"
                  placeholder=" "
                  name="pwd"
                  onChange={onChangePasswordHandler}
                  ref={passwordRef}
                  required
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // 폼 제출 방지 (필요한 경우)
                      onClickLoginHandler();
                      onClose();
                    }
                  }}
                />
                <label htmlFor="login-input-pwd">비밀번호</label>
              </div>

              <Error>{errorMsg}</Error>

              <div className={styles.sameBox}>
                <button
                  onClick={onClickLoginHandler}
                  className={styles.signinButton}
                >
                  로그인
                </button>
              </div>
            </div>
          </div>

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
