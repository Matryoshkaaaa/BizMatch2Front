import React from "react";

const FindPwd = () => {
  return (
    <div>
      <div class="entire">
        <div class="findpwd">
          <div class="container">
            <div class="container-header">
              <p class="title">비밀번호 찾기</p>
            </div>

            <form action="/member/findpwd" method="post" id="sendFindPwdForm">
              <div class="container-body">
                <div class="form-group">
                  <div class="form-msg">
                    <label for="email">
                      가입된 이메일을 입력하시면,
                      <br />
                      비밀번호 재설정 메일을 전송해드립니다.
                    </label>
                  </div>
                  <div class="email-box">
                    <input
                      class="email"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="이메일을 입력하세요"
                    />
                  </div>
                </div>
                <button type="submit" class="submit-btn">
                  인증번호 받기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindPwd;
