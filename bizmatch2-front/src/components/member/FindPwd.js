import React from "react";
export default function FindPwd() {
  return (
    <div>
      <div classNameName="entire">
        <div classNameName="findpwd">
          <div classNameName="container">
            <div classNameName="container-header">
              <p classNameName="title">비밀번호 찾기</p>
            </div>
            <div classNameName="container-body">
              <div classNameName="form-group">
                <div classNameName="form-msg">
                  <label htmlFor="email">
                    가입된 이메일을 입력하시면,
                    <br />
                    비밀번호 재설정 메일을 전송해드립니다.
                  </label>
                </div>
                <div classNameName="email-box">
                  <input
                    classNameName="email"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="이메일을 입력하세요"
                  />
                </div>
              </div>
              <button type="submit" classNameName="submit-btn">
                인증번호 받기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
