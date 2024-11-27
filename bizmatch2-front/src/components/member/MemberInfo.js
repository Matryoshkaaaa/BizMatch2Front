import React from "react";

const MemberInfo = () => {
  return (
    <div>
      <div class="myinfo-edit">
        <div class="signupbox">
          <div class="text-box">
            <p>이용자명</p>
            <input
              id="mbrNm"
              type="text"
              name="mbrNm"
              placeholder="이름 입력"
              value="${memberModifyVO.mbrNm }"
            />
          </div>
          <div class="text-box">
            <p>이용자 전화번호</p>
            <input
              id="mbrPhnNum"
              name="mbrPhnNum"
              type="text"
              placeholder="010-0000-0000"
              value="${memberModifyVO.mbrPhnNum }"
            />
          </div>

          <div class="btn-box">
            <p>이메일주소</p>
            <div>
              <input
                id="newEmilAddr"
                name="newEmilAddr"
                type="text"
                placeholder="업무용 이메일 사용을 권장합니다"
                value="${memberModifyVO.newEmilAddr}"
              />
              <button type="button" id="confirm-email">
                이메일 주소 인증
              </button>
            </div>
          </div>
          <div class="btn-box">
            <p>이메일 주소 인증번호</p>
            <div>
              <div class="input-container">
                <input
                  id="authNumField"
                  class="authNumField"
                  name="emilAddrCnfrmNmbr"
                  type="text"
                  placeholder="인증번호 6자리 입력 "
                />
                <span class="timer"></span>
              </div>
              <button
                id="confirm-auth-num"
                class="confirm-auth-num"
                type="button"
              >
                인증번호 확인
              </button>
            </div>
          </div>

          <button type="submit" class="signupbtn">
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;
