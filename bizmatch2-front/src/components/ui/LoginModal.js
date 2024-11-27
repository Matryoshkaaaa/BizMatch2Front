export default function LoginModal() {
  return (
    <div className="login-modal-btns">
      <div className="signin_box">
        <form action="/member/signin" method="post">
          <div className="same_box">
            <input
              type="email"
              placeholder=" "
              id="login-input-email"
              name="emilAddr"
              required
            />
            <label for="login-input-email">이메일</label>
          </div>

          <div className="same_box">
            <input
              type="password"
              placeholder=" "
              id="login-input-pwd"
              name="pwd"
              required
            />
            <label for="login-input-pwd">비밀번호</label>
          </div>

          <div className="same_box">
            <button className="signin_button">로그인</button>
          </div>
          <div className="same_box">
            <button>Sign up with Google</button>
          </div>
        </form>
      </div>
    </div>
  );
}
