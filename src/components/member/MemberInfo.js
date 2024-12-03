import React from "react";
export default function MemberInfo() {
  return (
    <div>
      <div classNameName="myinfo-edit">
        <div classNameName="text-box">
          <p>이용자명</p>
          <input id="mbrNm" type="text" name="mbrNm" placeholder="이름 입력" />
        </div>

        <div classNameName="text-box">
          <p>이용자 전화번호</p>
          <input
            id="mbrPhnNum"
            name="mbrPhnNum"
            type="text"
            placeholder="010-0000-0000"
          />
        </div>

        <div classNameName="btn-box">
          <p>이메일주소</p>
          <div>
            <input
              id="newEmilAddr"
              name="newEmilAddr"
              type="text"
              placeholder="업무용 이메일 사용을 권장합니다"
            />
            <button type="button" id="confirm-email">
              이메일 주소 인증
            </button>
          </div>
        </div>

        <div classNameName="btn-box">
          <p>이메일 주소 인증번호</p>
          <div>
            <div classNameName="input-container">
              <input
                id="authNumField"
                classNameName="authNumField"
                name="emilAddrCnfrmNmbr"
                type="text"
                placeholder="인증번호 6자리 입력 "
              />
              <span classNameName="timer"></span>
            </div>
            <button
              id="confirm-auth-num"
              classNameName="confirm-auth-num"
              type="button"
            >
              인증번호 확인
            </button>
          </div>
        </div>
        <button type="submit" classNameName="signupbtn">
          수정하기
        </button>
      </div>
    </div>
  );
}
