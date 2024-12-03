import React from "react";
export default function MemberType() {
  return (
    <div>
      <header classNameName="before-login-header">
        {/* 공통 헤더 내용 */}
        <h1>BizMatch</h1>
      </header>

      <div classNameName="title">
        <h1>회원 유형을 선택해주세요</h1>
      </div>
      <div classNameName="select-container">
        <div classNameName="select-type">
          <div classNameName="content-box" id="content-box-company">
            <img
              src="/img/Company-amico 1.png"
              alt="기업 사진"
              classNameName="box-image"
            />
            <h2>기업형</h2>
            <p>사업자 등록증이 있는 경우</p>
          </div>
          <div classNameName="content-box" id="content-box-free">
            <img
              src="/img/Personal finance-rafiki 1.png"
              alt="프리랜서 사진"
              classNameName="box-image"
            />
            <h2>개인형</h2>
            <p>사업자 등록증이 없는 경우</p>
          </div>
        </div>
      </div>
    </div>
  );
}
