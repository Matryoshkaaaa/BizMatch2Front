import React, { useRef } from "react";
import FindPwdStyle from "./FindPwd.module.css";
import { askFindPwdEmail } from "../http/api/userApi";
import { useNavigate } from "react-router-dom";

export default function FindPwd() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const handleSendFindPwd = async () => {
    try {
      const result = await askFindPwdEmail(emailRef.current.value);
      if (result) {
        alert("이메일이 전송되었습니다. 이메일읠 확인해주세요.");
        navigate("/");
      }
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <div>
      <div className={FindPwdStyle.entire}>
        <div className={FindPwdStyle.findpwd}>
          <div className={FindPwdStyle.container}>
            <div className={FindPwdStyle.containerHeader}>
              <p className={FindPwdStyle.title}>비밀번호 찾기</p>
            </div>
            <div className={FindPwdStyle.containerBody}>
              <div className={FindPwdStyle.formGroup}>
                <div className={FindPwdStyle.formMsg}>
                  <label htmlFor="email">
                    가입된 이메일을 입력하시면,
                    <br />
                    비밀번호 재설정 메일을 전송해드립니다.
                  </label>
                </div>
                <div className={FindPwdStyle.emailBox}>
                  <input
                    className={FindPwdStyle.email}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="이메일을 입력하세요"
                    ref={emailRef}
                  />
                </div>
              </div>
              <button
                type="submit"
                className={FindPwdStyle.submitBtn}
                onClick={handleSendFindPwd}
              >
                인증번호 받기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
