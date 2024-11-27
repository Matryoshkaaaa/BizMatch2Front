import React from "react";
import "./before_login_header.css";
import "./select_member_type.css";

export default function MemberType() {
  const handleSelect = (type) => {
    if (type === "company") {
      // 기업형 선택 시 로직
      console.log("기업형 회원가입으로 이동");
      // 예: window.location.href = "/signup/company";
    } else if (type === "freelancer") {
      // 개인형 선택 시 로직
      console.log("개인형 회원가입으로 이동");
      // 예: window.location.href = "/signup/freelancer";
    }
  };

  return (
    <div>
      <header className="before-login-header">
        {/* 공통 헤더 내용 */}
        <h1>BizMatch</h1>
      </header>

      <div className="title">
        <h1>회원 유형을 선택해주세요</h1>
      </div>
      <div className="select-container">
        <div className="select-type">
          <div
            className="content-box"
            id="content-box-company"
            onClick={() => handleSelect("company")}
          >
            <img
              src="/img/Company-amico 1.png"
              alt="기업 사진"
              className="box-image"
            />
            <h2>기업형</h2>
            <p>사업자 등록증이 있는 경우</p>
          </div>
          <div
            className="content-box"
            id="content-box-free"
            onClick={() => handleSelect("freelancer")}
          >
            <img
              src="/img/Personal finance-rafiki 1.png"
              alt="프리랜서 사진"
              className="box-image"
            />
            <h2>개인형</h2>
            <p>사업자 등록증이 없는 경우</p>
          </div>
        </div>
      </div>
    </div>
  );
}
