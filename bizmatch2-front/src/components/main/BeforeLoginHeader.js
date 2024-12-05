import BeforeLoginHeaderStyle from "./BeforeLoginHeader.module.css";

export default function BeforeLoginHeader() {
  return (
    <>
      <div className={BeforeLoginHeaderStyle.headerContainer}>
        <div className={BeforeLoginHeaderStyle.header}>
          <div>
            <a href="/">
              <img
                src="../images/teamLogo.svg"
                alt="로고"
                className={BeforeLoginHeaderStyle.mainLogo}
              />
            </a>
          </div>
          <div className={BeforeLoginHeaderStyle.headerBtn}>
            <div>
              <button className={BeforeLoginHeaderStyle.login} id="loginBtn">
                로그인
              </button>
            </div>
            <div>
              <button className={BeforeLoginHeaderStyle.signUp} id="sign-up">
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="overlay" className={BeforeLoginHeaderStyle.overlay}></div>
      <div className={BeforeLoginHeaderStyle.loginModal} id="login-modal">
        <div className={BeforeLoginHeaderStyle.loginModalContainer}>
          <span
            className={BeforeLoginHeaderStyle.modalCloseBtn}
            id="modal-close-btn"
          >
            x
          </span>
          <div className={BeforeLoginHeaderStyle.loginModalImgArea}>
            <img src="/img/teamLogo.svg" alt="로고" />
          </div>
          <div className={BeforeLoginHeaderStyle.loginModalBtns}>
            <div className={BeforeLoginHeaderStyle.signinBox}>
              {/* 조건부 렌더링을 리액트 형식으로 변경 */}
              {/* {error && (
                <div className={BeforeLoginHeaderStyle.errorMsg}>{error}</div>
              )} */}
              <form action="/member/signin" method="post">
                <div className={BeforeLoginHeaderStyle.sameBox}>
                  <input
                    type="email"
                    placeholder=" "
                    id="login-input-email"
                    name="emailAddr"
                    required
                  />
                  <label htmlFor="login-input-email">이메일</label>
                </div>

                <div className={BeforeLoginHeaderStyle.sameBox}>
                  <input
                    type="password"
                    placeholder=" "
                    id="login-input-pwd"
                    name="pwd"
                    required
                  />
                  <label htmlFor="login-input-pwd">비밀번호</label>
                  {/* <div>{ex_message}</div> */}
                </div>

                <div className={BeforeLoginHeaderStyle.sameBox}>
                  <button className={BeforeLoginHeaderStyle.signinButton}>
                    로그인
                  </button>
                </div>
                <div className={BeforeLoginHeaderStyle.sameBox}>
                  <button>Google로 가입하기</button>
                </div>
              </form>
            </div>
          </div>

          <ul className={BeforeLoginHeaderStyle.accountMenu}>
            <li className={BeforeLoginHeaderStyle.accountMenuText}>
              <a href="/member/findpwd">비밀번호 찾기</a>
            </li>
            <li>/</li>
            <li className={BeforeLoginHeaderStyle.accountMenuText}>
              <a href="/member/select/membertype">회원가입</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
