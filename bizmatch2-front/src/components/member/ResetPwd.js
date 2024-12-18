import React from "react";
import ResetPwdStyle from "./ResetPwd.module.css";
import { useRef } from "react";
import { askResetPwdEmailSend } from "../http/api/userApi";
import { useNavigate } from "react-router-dom";

export default function ResetPwd() {
  const emailRef = useRef();
  const pwdRef = useRef();
  const confirmPwdRef = useRef();
  const navigate = useNavigate();

  const handleAskResetPwdEmailSend = async () => {
    const updateData = {
      emilAddr: emailRef.current.value,
      pwd: pwdRef.current.value,
      confirmNewPwd: confirmPwdRef.current.value,
    };
    try {
      const response = await askResetPwdEmailSend(updateData);
      if (response.ok) {
        alert("비밀번호 재설정이 완료되었습니다.");
        navigate("/");
      }
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <div className={ResetPwdStyle.entire}>
      <div className={ResetPwdStyle.findpwd}>
        <div className={ResetPwdStyle.container}>
          <div className={ResetPwdStyle.containerHeader}>
            <p className={ResetPwdStyle.title}>비밀번호 재설정</p>
          </div>

          <div className={ResetPwdStyle.containerBody}>
            <div className={ResetPwdStyle.formGroup}>
              <div className={ResetPwdStyle.formMsg}>
                <label htmlFor="email">새로운 비밀번호를 작성해주세요.</label>
              </div>

              <div className={ResetPwdStyle.emailBox}>
                <input
                  className={ResetPwdStyle.email}
                  type="email"
                  id="email"
                  name="emilAddr"
                  placeholder="이메일 (아이디) 입력"
                  ref={emailRef}
                />
              </div>

              <div className={ResetPwdStyle.emailBox}>
                <input
                  className={ResetPwdStyle.email}
                  type="password"
                  id="newPwd"
                  name="pwd"
                  placeholder="새 비밀번호 입력"
                  ref={pwdRef}
                />
              </div>

              <div className={ResetPwdStyle.emailBox}>
                <input
                  className={ResetPwdStyle.email}
                  type="password"
                  id="confirmNewPwd"
                  name="confirmNewPwd"
                  placeholder="비밀번호 확인"
                  ref={confirmPwdRef}
                />
              </div>
            </div>

            <button
              className={ResetPwdStyle.submitBtn}
              onClick={handleAskResetPwdEmailSend}
            >
              비밀번호 재설정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
