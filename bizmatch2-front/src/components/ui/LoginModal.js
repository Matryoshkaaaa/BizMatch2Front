import LoginModalLoginStyle from "./LoginModal.module.css";

export function LoginModal() {
  return (
    <div className={LoginModalLoginStyle.loginModalBtns}>
      <div className={LoginModalLoginStyle.signinBox}>
        <form action="/member/signin" method="post">
          <div className={LoginModalLoginStyle.sameBox}>
            <input
              type="email"
              placeholder=" "
              id="login-input-email"
              name="emilAddr"
              required
            />
            <label htmlFor="login-input-email">이메일</label>
          </div>

          <div className={LoginModalLoginStyle.sameBox}>
            <input
              type="password"
              placeholder=" "
              id="login-input-pwd"
              name="pwd"
              required
            />
            <label htmlFor="login-input-pwd">비밀번호</label>
          </div>

          <div className={LoginModalLoginStyle.sameBox}>
            <button className={LoginModalLoginStyle.signinButton}>
              로그인
            </button>
          </div>
          <div className={LoginModalLoginStyle.sameBox}>
            <button>Sign up with Google</button>
          </div>
        </form>
      </div>
    </div>
  );
}
