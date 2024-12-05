import React from "react";
import CompanySignupStyle from "./CompanySignup.module.css";

export default function CompanySignup() {
  return (
    <div className={CompanySignupStyle.signupBox}>
      <p className={CompanySignupStyle.redWord}>*은 필수입력사항입니다.</p>

      <div className={CompanySignupStyle.textBox}>
        <p>
          <span className={CompanySignupStyle.redWord}>*</span>이용자명
        </p>
        <input id="mbrNm" type="text" name="mbrNm" placeholder="이름 입력" />
      </div>

      <div className={CompanySignupStyle.btnBox}>
        <p>
          <span className={CompanySignupStyle.redWord}>*</span>이메일주소
        </p>
        <div>
          <input
            id="emilAddr"
            type="email"
            name="emilAddr"
            placeholder="업무용 이메일 사용을 권장합니다."
          />
          <button type="button" className={CompanySignupStyle.emailSubmit}>
            이메일 주소 인증..
          </button>
        </div>
      </div>

      <div className={CompanySignupStyle.btnBox}>
        <p>
          <span className={CompanySignupStyle.redWord}>*</span>이메일 주소
          인증번호
        </p>
        <div>
          <input
            id="authNumField"
            className={CompanySignupStyle.authNumField}
            name="emilAddrCnfrmNmbr"
            type="text"
            placeholder="인증번호 6자리 입력"
          />
        </div>
      </div>

      <div className={CompanySignupStyle.textBox}>
        <p>
          <span className={CompanySignupStyle.redWord}>*</span>비밀번호
        </p>
        <input
          id="pwd"
          type="password"
          name="pwd"
          placeholder="대소문자 및 특수문자 포함 8자리 이상 입력"
        />
      </div>

      <div className={CompanySignupStyle.textBox}>
        <p>
          <span className={CompanySignupStyle.redWord}>*</span>비밀번호 확인
        </p>
        <input
          id="confirmPwd"
          type="password"
          name="confirmPwd"
          placeholder="비밀번호 확인"
        />
      </div>

      <div className={CompanySignupStyle.textBox}>
        <p>
          <span className={CompanySignupStyle.redWord}>*</span>사업자 번호
        </p>
        <input
          id="cmpnyBrn"
          type="text"
          name="cmpnyBrn"
          placeholder="사업자 번호 입력"
        />
      </div>

      <div className={CompanySignupStyle.textBox}>
        <p>
          <span className={CompanySignupStyle.redWord}>*</span>직원 수
        </p>
        <input
          id="cmpnyEmplyCnt"
          type="number"
          name="cmpnyEmplyCnt"
          placeholder="직원 수 입력"
        />
      </div>

      <div className={CompanySignupStyle.textBox}>
        <p>
          <span className={CompanySignupStyle.redWord}>*</span>기업명
        </p>
        <input
          id="cmpnyNm"
          type="text"
          name="cmpnyNm"
          placeholder="기업명 입력"
        />
      </div>

      <div className={CompanySignupStyle.textBox}>
        <p>
          <span className={CompanySignupStyle.redWord}>*</span>기업주소
        </p>
        <input
          id="postcode"
          type="text"
          name="postcode"
          placeholder="우편번호 입력"
        />
        <input
          id="addr"
          type="text"
          name="addr"
          placeholder="도로명 주소 입력"
        />
        <input
          id="detailAddress"
          type="text"
          name="detailAddress"
          placeholder="상세주소 입력"
        />
        <input
          id="extraAddress"
          type="text"
          name="extraAddress"
          placeholder="참고항목 입력"
        />
      </div>

      <div className={CompanySignupStyle.checkBox}>
        <p className={CompanySignupStyle.checkbox1}>이용약관</p>
        <div>
          <input id="ageCheck" type="checkbox" name="agreeOne" />
          <p>만 14세 이상입니다.</p>
        </div>
        <div>
          <input id="termsCheck" type="checkbox" name="agreeTwo" />
          <p>서비스 이용약관에 동의합니다.</p>
        </div>
        <div>
          <input id="privacyCheck" type="checkbox" name="agreeThree" />
          <p>개인정보 수집 및 이용에 동의합니다.</p>
        </div>
      </div>

      <button type="submit" className={CompanySignupStyle.signupBtn}>
        가입하기
      </button>
    </div>
  );
}
