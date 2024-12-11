import React from "react";
import styled from "styled-components";

// Styled Components
export const ProjectRegisterPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

export const ProjectRegisterArea = styled.div`
  width: 60%;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
`;

export const Section = styled.div`
  margin-bottom: 1.5rem;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const SectionNum = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #007bff;
  margin-right: 0.5rem;
`;

export const SectionName = styled.div`
  font-size: 1.2rem;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 0.5rem;
  &:read-only {
    background-color: #f9f9f9;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 8rem;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 0.5rem;
  resize: none;
  &:read-only {
    background-color: #f9f9f9;
  }
`;

export const ImportantMessage = styled.div`
  font-size: 0.9rem;
  color: #ff6b6b;
  margin-top: 0.5rem;
`;

export const FileAttachment = styled.div`
  .btn-box {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  input[type="file"] {
    display: none;
  }
  label {
    cursor: pointer;
    padding: 0.5rem 1rem;
    background: #007bff;
    color: white;
    border-radius: 4px;
    font-size: 0.9rem;
    &:hover {
      background: #0056b3;
    }
  }
  select {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    padding: 0.5rem 1rem;
    border: none;
    background: #ff6b6b;
    color: white;
    border-radius: 4px;
    font-size: 0.9rem;
    cursor: pointer;
    &:hover {
      background: #d9534f;
    }
  }
`;

export const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const Error = styled.div`
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
`;

// React Component
export default function ProjectApplyView({ applyProjectVO, error }) {
  return (
    <ProjectRegisterPage>
      <ProjectRegisterArea>
        <Title>프로젝트 지원서</Title>

        <Section>
          <SectionHeader>
            <SectionNum>01</SectionNum>
            <SectionName>제목</SectionName>
          </SectionHeader>
          <Input
            type="text"
            placeholder="제목을 입력하세요"
            name="pjApplyTtl"
            readOnly
          />
        </Section>

        <Section>
          <SectionHeader>
            <SectionNum>02</SectionNum>
            <SectionName>지원 내용</SectionName>
          </SectionHeader>
          <Textarea
            name="pjApplyDesc"
            placeholder="프로젝트 내용 작성 예시..."
            readOnly
          />
        </Section>

        <ImportantMessage>
          전화번호, 이메일 등 개인정보 입력 금지
        </ImportantMessage>

        <Section>
          <SectionHeader>
            <SectionNum>03</SectionNum>
            <SectionName>첨부파일</SectionName>
          </SectionHeader>
          <FileAttachment>
            <div className="btn-box">
              <input type="file" id="fileInput" name="fileList" multiple />
              <label htmlFor="fileInput">파일 선택</label>
              <select id="fileSelect"></select>
              <button id="removeButton" type="button">
                삭제
              </button>
            </div>
          </FileAttachment>
        </Section>

        <Error>{error}</Error>
        <ImportantMessage>
          기획서, 요구사항 정의서, 참고 자료 등
        </ImportantMessage>

        <ButtonArea>
          <HiddenInput name="pjId" />
          <HiddenInput name="pjApplyId" />
          <HiddenInput name="emilAddr" />
        </ButtonArea>
      </ProjectRegisterArea>
    </ProjectRegisterPage>
  );
}
