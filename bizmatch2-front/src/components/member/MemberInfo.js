import React from "react";
export default function MemberInfo() {
  return (
    <div>
      <div className="myinfo-edit">
        <div className="text-box">
          <p>이용자명</p>
          <input id="mbrNm" type="text" placeholder="이름 입력" />
        </div>

        <div className="text-box">
          <p>이용자 전화번호</p>
          <input id="mbrPhnNum" type="text" placeholder="010-0000-0000" />
        </div>

        <div className="btn-box">
          <p>이메일주소</p>
          <div>
            <input
              id="newEmilAddr"
              type="text"
              placeholder="업무용 이메일 사용을 권장합니다"
            />
            <button type="button" id="confirm-email">
              이메일 주소 인증
            </button>
          </div>
        </div>

        <div className="btn-box">
          <p>이메일 주소 인증번호</p>
          <div>
            <div className="input-container">
              <input
                id="authNumField"
                className="authNumField"
                type="text"
                placeholder="인증번호 6자리 입력 "
              />
              <span className="timer"></span>
            </div>
            <button id="confirm-auth-num" type="button">
              인증번호 확인
            </button>
          </div>
        </div>
        <button className="signupbtn">수정하기</button>
      </div>
    </div>
  );
}
