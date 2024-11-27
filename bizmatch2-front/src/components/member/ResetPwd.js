import React from "react";

const ResetPwd = () => {
  return (
    <div>
      <div class="entire">
        <div class="findpwd">
          <div class="container">
            <div class="container-header">
              <p class="title">비밀번호 재설정</p>
            </div>

            <form action="/member/resetpwd" method="post">
              <div class="container-body">
                <div class="form-group">
                  <div class="form-msg">
                    <label for="email"> 새로운 비밀번호를 작성해주세요.</label>
                  </div>
                  <div id="errorConfirmPwd"></div>
                  <div class="email-box">
                    <input
                      class="email"
                      type="email"
                      id="email"
                      name="emilAddr"
                      value="${memberResetPwdVO.emilAddr}"
                      placeholder="이메일 (아이디) 입력"
                    />
                  </div>
                  <div id="errorConfirmPwd"></div>
                  <div class="email-box">
                    <input
                      class="email"
                      type="password"
                      id="newPwd"
                      name="pwd"
                      value="${memberResetPwdVO.pwd}"
                      placeholder="새 비밀번호 입력"
                    />
                  </div>
                  <div id="errorConfirmPwd"></div>
                  <div class="email-box">
                    <input
                      class="email"
                      type="password"
                      id="confirmNewPwd"
                      name="confirmNewPwd"
                      value="${memberResetPwdVO.confirmNewPwd}"
                      placeholder="비밀번호 확인"
                    />
                  </div>
                </div>
                <button type="submit" class="submit-btn">
                  비밀번호 재설정
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPwd;
