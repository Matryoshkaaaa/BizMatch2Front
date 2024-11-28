export default function LoginModal() {
  return (
    <div classNameName="login-modal-btns">
      <div classNameName="signin_box">
        <form action="/member/signin" method="post">
          <div classNameName="same_box">
            <input
              type="email"
              placeholder=" "
              id="login-input-email"
              name="emilAddr"
              required
            />
            <label for="login-input-email">이메일</label>
          </div>

          <div classNameName="same_box">
            <input
              type="password"
              placeholder=" "
              id="login-input-pwd"
              name="pwd"
              required
            />
            <label for="login-input-pwd">비밀번호</label>
          </div>

          <div classNameName="same_box">
            <button classNameName="signin_button">로그인</button>
          </div>
          <div classNameName="same_box">
            <button>Sign up with Google</button>
          </div>
        </form>
      </div>
    </div>
  );
}
