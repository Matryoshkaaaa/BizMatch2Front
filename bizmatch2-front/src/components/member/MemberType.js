import React from "react";
export default function MemberType() {
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
          <div className="content-box" id="content-box-company">
            <img
              src="/img/Company-amico 1.png"
              alt="기업 사진"
              className="box-image"
            />
            <h2>기업형</h2>
            <p>사업자 등록증이 있는 경우</p>
          </div>
          <div className="content-box" id="content-box-free">
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
