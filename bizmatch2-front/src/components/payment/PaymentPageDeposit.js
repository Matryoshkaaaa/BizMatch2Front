import React from "react";
import styled from "styled-components";

// Global Styles
const GlobalStyle = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: "Arial", sans-serif;
    background-color: #f9f9f9;
    color: #333;
    line-height: 1.6;
  }
`;

// Styled Components
const Header = styled.header`
  background-color: #4758ee;
  color: white;
  padding: 1rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const BorderLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: #ddd;
  margin: 1rem 0;
`;

const ProjectCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin: 2rem;
  max-width: 600px;
  margin: auto;
`;

const ProjectBox = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

const ProjectHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Status = styled.span`
  background-color: #4caf50;
  color: white;
  padding: 0.2rem 0.8rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
`;

const ProjectBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProjectBodyBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProjectBodyContent = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ProjectBodyCard = styled.div`
  background-color: #e4f0ff;
  padding: 0.8rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  color: black;
`;

const PaymentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  gap: 3rem;
`;

const PaymentBoxWord1 = styled.div`
  font-size: 1rem;
  color: #666;
`;

const PaymentBoxWord2 = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #000;
`;

const PaymentBoxBtn = styled.button`
  background-color: #4758ee;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

// Main Component
const PaymentPageDeposit = ({ projectVO }) => {
  return (
    <GlobalStyle>
      <Header>프로젝트 결제</Header>
      <BorderLine />
      <ProjectCard>
        <ProjectBox>
          <ProjectHead>
            <div>
              <Status>모집중</Status>
              <h2>{projectVO?.pjTtl || "프로젝트 제목"}</h2>
            </div>
            <div>등록일자: {projectVO?.rgstrDt || "2024-01-01"}</div>
          </ProjectHead>
          <ProjectBody>
            <ProjectBodyBox>
              <div>프로젝트 분야</div>
              <ProjectBodyContent>
                <ProjectBodyCard>
                  <strong>IT·프로그래밍 / 웹사이트·모바일앱 개발</strong>
                </ProjectBodyCard>
              </ProjectBodyContent>
            </ProjectBodyBox>
            <ProjectBodyBox>
              <div>관련기술</div>
              <ProjectBodyContent />
            </ProjectBodyBox>
            <ProjectBodyBox>
              <div>모집 마감일</div>
              <ProjectBodyCard>
                {projectVO?.pjRcrutEndDt || "2024-12-31"}
              </ProjectBodyCard>
            </ProjectBodyBox>
            <ProjectBodyBox>
              <div>프로젝트 일정</div>
              <ProjectBodyCard>
                {projectVO?.strtDt || "2024-01-01"} ~{" "}
                {projectVO?.endDt || "2024-12-31"}
              </ProjectBodyCard>
            </ProjectBodyBox>
          </ProjectBody>
        </ProjectBox>
        <PaymentBox>
          <div>
            <PaymentBoxWord1>보증금</PaymentBoxWord1>
            <PaymentBoxWord2>
              {projectVO?.paymentVO?.grntAmt || "100,000"}원
            </PaymentBoxWord2>
          </div>
          <PaymentBoxBtn>납부하기</PaymentBoxBtn>
        </PaymentBox>
      </ProjectCard>
    </GlobalStyle>
  );
};

export default PaymentPageDeposit;
