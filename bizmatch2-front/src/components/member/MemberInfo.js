import React, { useState } from "react";

const MemberInfo = () => {
  const [formData, setFormData] = useState({
    mbrNm: "",
    mbrPhnNum: "",
    newEmilAddr: "",
    emilAddrCnfrmNmbr: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("수정된 데이터:", formData);
    // 여기에서 서버에 데이터를 전송하거나 다른 작업 수행
  };

  return (
    <div>
      <div className="myinfo-edit">
        <form onSubmit={handleSubmit} className="signupbox">
          <div className="text-box">
            <p>이용자명</p>
            <input
              id="mbrNm"
              type="text"
              name="mbrNm"
              placeholder="이름 입력"
              value={formData.mbrNm}
              onChange={handleChange}
            />
          </div>

          <div className="text-box">
            <p>이용자 전화번호</p>
            <input
              id="mbrPhnNum"
              name="mbrPhnNum"
              type="text"
              placeholder="010-0000-0000"
              value={formData.mbrPhnNum}
              onChange={handleChange}
            />
          </div>

          <div className="btn-box">
            <p>이메일주소</p>
            <div>
              <input
                id="newEmilAddr"
                name="newEmilAddr"
                type="text"
                placeholder="업무용 이메일 사용을 권장합니다"
                value={formData.newEmilAddr}
                onChange={handleChange}
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
                  name="emilAddrCnfrmNmbr"
                  type="text"
                  placeholder="인증번호 6자리 입력 "
                  value={formData.emilAddrCnfrmNmbr}
                  onChange={handleChange}
                />
                <span className="timer"></span>
              </div>
              <button
                id="confirm-auth-num"
                className="confirm-auth-num"
                type="button"
              >
                인증번호 확인
              </button>
            </div>
          </div>
          <button type="submit" className="signupbtn">
            수정하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default MemberInfo;
