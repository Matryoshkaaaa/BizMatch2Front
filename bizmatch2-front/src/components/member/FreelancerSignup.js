import React from "react";

const FreelancerSignup = () => {
  return (
    <div className="signup-container">
      <h1>프리랜서 회원가입</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label>
            이용자명<span className="required">*</span>
          </label>
          <input
            type="text"
            name="mbrNm"
            value={formData.mbrNm}
            onChange={handleChange}
            placeholder="이름 입력"
          />
        </div>

        <div className="form-group">
          <label>
            생년월일<span className="required">*</span>
          </label>
          <input
            type="date"
            name="brthDt"
            value={formData.brthDt}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            주소<span className="required">*</span>
          </label>
          <input
            type="text"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
            placeholder="우편번호 입력"
          />
          <input
            type="text"
            name="addr"
            value={formData.addr}
            onChange={handleChange}
            placeholder="도로명 주소 입력"
          />
          <input
            type="text"
            name="detailAddress"
            value={formData.detailAddress}
            onChange={handleChange}
            placeholder="상세주소 입력"
          />
          <input
            type="text"
            name="extraAddress"
            value={formData.extraAddress}
            onChange={handleChange}
            placeholder="참고항목"
          />
        </div>

        <div className="form-group">
          <label>
            이용자 전화번호<span className="required">*</span>
          </label>
          <input
            type="tel"
            name="mbrPhnNum"
            value={formData.mbrPhnNum}
            onChange={handleChange}
            placeholder="전화번호 입력"
          />
        </div>

        <div className="form-group">
          <label>
            이메일주소<span className="required">*</span>
          </label>
          <input
            type="email"
            name="emilAddr"
            value={formData.emilAddr}
            onChange={handleChange}
            placeholder="업무용 이메일 사용을 권장합니다."
          />
        </div>

        <div className="form-group">
          <label>첨부파일</label>
          <input type="file" onChange={handleFileChange} multiple />
        </div>

        <div className="form-group">
          <label>비밀번호</label>
          <input
            type="password"
            name="pwd"
            value={formData.pwd}
            onChange={handleChange}
            placeholder="대소문자 및 특수문자 포함 8자리 이상"
          />
        </div>

        <div className="form-group">
          <label>비밀번호 확인</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호 재입력"
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="agree1"
              checked={formData.agree1}
              onChange={handleChange}
            />
            만 14세 이상입니다.
          </label>
          <label>
            <input
              type="checkbox"
              name="agree2"
              checked={formData.agree2}
              onChange={handleChange}
            />
            서비스 이용약관에 동의합니다.
          </label>
          <label>
            <input
              type="checkbox"
              name="agree3"
              checked={formData.agree3}
              onChange={handleChange}
            />
            개인정보 수집 및 이용에 동의합니다.
          </label>
        </div>

        <button type="submit" className="signup-btn">
          가입하기
        </button>
      </form>
    </div>
  );
};

export default FreelancerSignup;
