import React from "react";
export default function FreelancerSignup() {
  return (
    <div className="signup-container">
      <h1>프리랜서 회원가입</h1>
      <div className="form-group">
        <label>
          이용자명<span className="required">*</span>
        </label>
        <input type="text" name="mbrNm" placeholder="이름 입력" />
      </div>

      <div className="form-group">
        <label>
          생년월일<span className="required">*</span>
        </label>
        <input type="date" name="brthDt"  />
      </div>

      <div className="form-group">
        <label>
          주소<span className="required">*</span>
        </label>
        <input type="text" name="postcode" placeholder="우편번호 입력" />
        <input type="text" name="addr" placeholder="도로명 주소 입력" />
        <input type="text" name="detailAddress" placeholder="상세주소 입력" />
        <input type="text" name="extraAddress" placeholder="참고항목" />
      </div>

      <div className="form-group">
        <label>
          이용자 전화번호<span className="required">*</span>
        </label>
        <input type="tel" name="mbrPhnNum" placeholder="전화번호 입력" />
      </div>

      <div className="form-group">
        <label>
          이메일주소<span className="required">*</span>
        </label>
        <input
          type="email"
          name="emilAddr"
          placeholder="업무용 이메일 사용을 권장합니다."
        />
      </div>

      <div className="form-group">
        <label>첨부파일</label>
        <input type="file" />
      </div>

      <div className="form-group">
        <label>비밀번호</label>
        <input
          type="password"
          name="pwd"
          placeholder="대소문자 및 특수문자 포함 8자리 이상"
        />
      </div>

      <div className="form-group">
        <label>비밀번호 확인</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 재입력"
        />
      </div>

      <div className="form-group">
        <label>
          <input type="checkbox" name="agree1" />만 14세 이상입니다.
        </label>
        <label>
          <input type="checkbox" name="agree2" />
          서비스 이용약관에 동의합니다.
        </label>
        <label>
          <input type="checkbox" name="agree3" />
          개인정보 수집 및 이용에 동의합니다.
        </label>
      </div>

      <button type="submit" className="signup-btn">
        가입하기
      </button>
    </div>
  );
}
