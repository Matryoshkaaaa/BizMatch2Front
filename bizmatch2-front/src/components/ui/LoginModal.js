export default function LoginModal() {
  return (
    <div class="login-modal-btns">
      <div class="signin_box">
        <form action="/member/signin" method="post">
          <div class="same_box">
            <input
              type="email"
              placeholder=" "
              id="login-input-email"
              name="emilAddr"
              required
            />
            <label for="login-input-email">이메일</label>
          </div>

          <div class="same_box">
            <input
              type="password"
              placeholder=" "
              id="login-input-pwd"
              name="pwd"
              required
            />
            <label for="login-input-pwd">비밀번호</label>
          </div>

          <div class="same_box">
            <button class="signin_button">로그인</button>
          </div>
          <div class="same_box">
            <button>Sign up with Google</button>
          </div>
        </form>
      </div>
    </div>
  );
}
