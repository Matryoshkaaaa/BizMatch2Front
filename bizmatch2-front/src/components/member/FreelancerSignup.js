import React from "react";
import FreelancerSignupStyle from "./FreelancerSignup.module.css";

export default function FreelancerSignup() {
  return (
    <div>
      <div className={FreelancerSignupStyle.signupBox}>
        <p className={FreelancerSignupStyle.redWord}>*은 필수입력사항입니다.</p>

        <div className={FreelancerSignupStyle.textBox}>
          <p>
            <span className={FreelancerSignupStyle.redWord}>*</span>이용자명
          </p>
          <input id="mbrNm" type="text" name="mbrNm" placeholder="이름 입력" />
        </div>

        <div className={FreelancerSignupStyle.textBox}>
          <p>
            <span className={FreelancerSignupStyle.redWord}>*</span>생년월일
          </p>
          <input id="brthDt" type="date" name="brthDt" />
        </div>

        <div className={FreelancerSignupStyle.comAddr}>
          <p>
            <span className={FreelancerSignupStyle.redWord}>*</span>주소
          </p>
          <div className={FreelancerSignupStyle.comDiv}>
            <input
              type="text"
              id="postcode"
              placeholder="우편번호 입력"
              name="addr.postcode"
            />
            <button type="button" id="asd">
              도로명 주소 찾기
            </button>
          </div>
          <div className={FreelancerSignupStyle.comDiv}>
            <input
              type="text"
              id="addr"
              placeholder="도로명 주소 입력"
              name="addr.addr"
            />
            <input
              type="text"
              id="detailAddress"
              placeholder="상세주소 입력"
              name="addr.detailAddress"
            />
            <input
              type="text"
              id="extraAddress"
              placeholder="참고항목"
              name="addr.extraAddress"
            />
          </div>
        </div>

        <div className={FreelancerSignupStyle.btnBox}>
          <p>
            <span className={FreelancerSignupStyle.redWord}>*</span>이용자
            전화번호
          </p>
          <div>
            <input
              id="mbrPhnNum"
              type="tel"
              name="mbrPhnNum"
              placeholder="전화번호 입력"
            />
          </div>
        </div>

        <div className={FreelancerSignupStyle.btnBox}>
          <p>
            <span className={FreelancerSignupStyle.redWord}>*</span>이메일주소
          </p>
          <div>
            <input
              id="emilAddr"
              type="email"
              name="emilAddr"
              placeholder="업무용 이메일 사용을 권장합니다."
            />
            <button
              type="button"
              id="confirm-email"
              className={FreelancerSignupStyle.emailSubmit}
            >
              이메일 주소 인증
            </button>
          </div>
        </div>

        <div className={FreelancerSignupStyle.btnBox}>
          <p>
            <span className={FreelancerSignupStyle.redWord}>*</span>이메일 주소
            인증번호
          </p>
          <div>
            <div className={FreelancerSignupStyle.inputContainer}>
              <input
                id="authNumField"
                className={FreelancerSignupStyle.authNumField}
                type="text"
                placeholder="인증번호 6자리 입력 "
                name="emilAddrCnfrmNmbr"
              />
              <span className={FreelancerSignupStyle.timer}></span>
            </div>
            <button
              id="confirm-auth-num"
              className={FreelancerSignupStyle.confirmAuthNum}
              type="button"
            >
              인증번호 확인
            </button>
          </div>
        </div>

        <div className={FreelancerSignupStyle.textBox}>
          <p>
            <span className={FreelancerSignupStyle.redWord}>*</span>비밀번호
          </p>
          <div id="errorPwd"></div>
          <input
            id="pwd"
            type="password"
            name="pwd"
            placeholder="대소문자 및 특수문자 포함 8자리 이상 입력"
          />
        </div>

        <div className={FreelancerSignupStyle.textBox}>
          <p>
            <span className={FreelancerSignupStyle.redWord}>*</span>비밀번호
            확인
          </p>
          <div id="errorConfirmPwd"></div>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="대소문자 및 특수문자 포함 8자리 이상 입력"
          />
        </div>

        <div className={FreelancerSignupStyle.btnBox}>
          <p>
            <span className={FreelancerSignupStyle.redWord}>*</span>이용자
            첨부파일
          </p>
          <div className={FreelancerSignupStyle.fileBox}>
            <div className={FreelancerSignupStyle.addfile}>
              <input
                className={FreelancerSignupStyle.fileList}
                type="file"
                name="fileList[0]"
              />
            </div>
            <button
              className={FreelancerSignupStyle.fileButton}
              type="button"
              id="add_attr_file"
            >
              첨부자료 추가
            </button>
          </div>
        </div>

        <div className={FreelancerSignupStyle.textBox}>
          <p>
            <span className={FreelancerSignupStyle.redWord}>*</span>주요
            산업분야
          </p>
        </div>
        <div className={FreelancerSignupStyle.checkBox}>
          <p className="checkbox1">이용약관</p>
          <div>
            <input id="agree1" name="agree1" value="Y" type="checkbox" />
            <p>만 14세 이상입니다.</p>
          </div>
          <div>
            <input id="agree2" name="agree2" value="Y" type="checkbox" />
            <p>서비스 이용약관에 동의합니다.</p>
          </div>
          <div>
            <input id="agree3" name="agree3" value="Y" type="checkbox" />
            <p>개인정보 수집 및 이용에 동의합니다.</p>
          </div>
        </div>
        <input
          className={FreelancerSignupStyle.signupBtn}
          type="submit"
          value="가입하기"
        />
      </div>
    </div>
  );
}
