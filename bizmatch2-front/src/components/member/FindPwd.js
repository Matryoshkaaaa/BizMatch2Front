import React from "react";
export default function FindPwd() {
  return (
    <div>
      <div className="entire">
        <div className="findpwd">
          <div className="container">
            <div className="container-header">
              <p className="title">비밀번호 찾기</p>
            </div>
            <div className="container-body">
              <div className="form-group">
                <div className="form-msg">
                  <label htmlFor="email">
                    가입된 이메일을 입력하시면,
                    <br />
                    비밀번호 재설정 메일을 전송해드립니다.
                  </label>
                </div>
                <div className="email-box">
                  <input
                    className="email"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="이메일을 입력하세요"
                  />
                </div>
              </div>
              <button type="submit" className="submit-btn">
                인증번호 받기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
