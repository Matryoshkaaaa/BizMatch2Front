export default function ResetPwd() {
  return (
    <div className="entire">
      <div className="findpwd">
        <div className="container">
          <div className="container-header">
            <p className="title">비밀번호 재설정</p>
          </div>

          <div className="container-body">
            <div className="form-group">
              <div className="form-msg">
                <label htmlFor="email">새로운 비밀번호를 작성해주세요.</label>
              </div>

              <div className="email-box">
                <input
                  className="email"
                  type="email"
                  id="email"
                  name="emilAddr"
                  placeholder="이메일 (아이디) 입력"
                />
              </div>

              <div className="email-box">
                <input
                  className="email"
                  type="password"
                  id="newPwd"
                  name="pwd"
                  placeholder="새 비밀번호 입력"
                />
              </div>

              <div className="email-box">
                <input
                  className="email"
                  type="password"
                  id="confirmNewPwd"
                  name="confirmNewPwd"
                  placeholder="비밀번호 확인"
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              비밀번호 재설정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
