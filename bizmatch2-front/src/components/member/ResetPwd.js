import React, { useState } from "react";

export default function ResetPwd() {
  const [formData, setFormData] = useState({
    emilAddr: "",
    pwd: "",
    confirmNewPwd: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.pwd !== formData.confirmNewPwd) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    console.log("Form submitted:", formData);
    // 서버로 데이터를 전송하거나 추가 작업 수행
  };

  return (
    <div className="entire">
      <div className="findpwd">
        <div className="container">
          <div className="container-header">
            <p className="title">비밀번호 재설정</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="container-body">
              <div className="form-group">
                <div className="form-msg">
                  <label htmlFor="email">새로운 비밀번호를 작성해주세요.</label>
                </div>

                {error && <div className="error-msg">{error}</div>}

                <div className="email-box">
                  <input
                    className="email"
                    type="email"
                    id="email"
                    name="emilAddr"
                    value={formData.emilAddr}
                    onChange={handleChange}
                    placeholder="이메일 (아이디) 입력"
                  />
                </div>

                <div className="email-box">
                  <input
                    className="email"
                    type="password"
                    id="newPwd"
                    name="pwd"
                    value={formData.pwd}
                    onChange={handleChange}
                    placeholder="새 비밀번호 입력"
                  />
                </div>

                <div className="email-box">
                  <input
                    className="email"
                    type="password"
                    id="confirmNewPwd"
                    name="confirmNewPwd"
                    value={formData.confirmNewPwd}
                    onChange={handleChange}
                    placeholder="비밀번호 확인"
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn">
                비밀번호 재설정
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
