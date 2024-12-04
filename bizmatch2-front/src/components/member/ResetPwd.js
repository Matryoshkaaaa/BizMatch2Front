import React from "react";
export default function ResetPwd() {
  return (
    <div classNameName="entire">
      <div classNameName="findpwd">
        <div classNameName="container">
          <div classNameName="container-header">
            <p classNameName="title">비밀번호 재설정</p>
          </div>

          <div classNameName="container-body">
            <div classNameName="form-group">
              <div classNameName="form-msg">
                <label htmlFor="email">새로운 비밀번호를 작성해주세요.</label>
              </div>

              <div classNameName="email-box">
                <input
                  classNameName="email"
                  type="email"
                  id="email"
                  name="emilAddr"
                  placeholder="이메일 (아이디) 입력"
                />
              </div>

              <div classNameName="email-box">
                <input
                  classNameName="email"
                  type="password"
                  id="newPwd"
                  name="pwd"
                  placeholder="새 비밀번호 입력"
                />
              </div>

              <div classNameName="email-box">
                <input
                  classNameName="email"
                  type="password"
                  id="confirmNewPwd"
                  name="confirmNewPwd"
                  placeholder="비밀번호 확인"
                />
              </div>
            </div>

            <button type="submit" classNameName="submit-btn" >
              비밀번호 재설정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
