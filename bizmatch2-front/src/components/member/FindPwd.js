import React from "react";
import FindPwdStyle from "./FindPwd.module.css";

export default function FindPwd() {
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
                  />
                </div>
              </div>
              <button type="submit" className={FindPwdStyle.submitBtn}>
                인증번호 받기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
