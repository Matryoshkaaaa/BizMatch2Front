import ResetPwdStyle from "./ResetPwd.module.css";

export default function ResetPwd() {
  return (
    <div className={ResetPwdStyle.entire}>
      <div className={ResetPwdStyle.findpwd}>
        <div className={ResetPwdStyle.container}>
          <div className={ResetPwdStyle.containerHeader}>
            <p className={ResetPwdStyle.title}>비밀번호 재설정</p>
          </div>

          <div className={ResetPwdStyle.containerBody}>
            <div className={ResetPwdStyle.formGroup}>
              <div className={ResetPwdStyle.formMsg}>
                <label htmlFor="email">새로운 비밀번호를 작성해주세요.</label>
              </div>

              <div className={ResetPwdStyle.emailBox}>
                <input
                  className={ResetPwdStyle.email}
                  type="email"
                  id="email"
                  name="emilAddr"
                  placeholder="이메일 (아이디) 입력"
                />
              </div>

              <div className={ResetPwdStyle.emailBox}>
                <input
                  className={ResetPwdStyle.email}
                  type="password"
                  id="newPwd"
                  name="pwd"
                  placeholder="새 비밀번호 입력"
                />
              </div>

              <div className={ResetPwdStyle.emailBox}>
                <input
                  className={ResetPwdStyle.email}
                  type="password"
                  id="confirmNewPwd"
                  name="confirmNewPwd"
                  placeholder="비밀번호 확인"
                />
              </div>
            </div>

            <button type="submit" className={ResetPwdStyle.submitBtn}>
              비밀번호 재설정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
