import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  oneApplyGet,
  removeApplyAttFile,
  updateApply,
} from "../../stores/thunks/projectThunk";
import { useNavigate, useParams } from "react-router-dom";
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
export default function ApplyEditView() {
  const { pjApplyId } = useParams();
  const navigate = useNavigate();
  const apply = useSelector((state) => state.project.myApplyDetails);
  const fileList = useSelector((state) => state.project.myApplyAttData);
  const [selectedFile, setSelectedFile] = useState("");
  const emilAddr = useSelector((state) => state.member.info)?.emilAddr;
  const dispatch = useDispatch();
  const pjApplyTtlRef = useRef();
  const pjApplyDescRef = useRef();
  useEffect(() => {
    dispatch(oneApplyGet(pjApplyId));
  }, [pjApplyId, dispatch]);

  const saveButtonClickHandler = () => {
    const formData = new FormData();
    // const fileList = files;
    formData.append("emilAddr", emilAddr);
    formData.append("pjApplyId", pjApplyId);
    formData.append("pjApplyTtl", pjApplyTtlRef.current.value);
    formData.append("pjApplyDesc", pjApplyDescRef.current.value);
    fileList.forEach((file) => {
      formData.append("fileList", file);
    });

    dispatch(updateApply(formData))
      .then(() => {
        navigate(`/project/myapply/view/${pjApplyId}`);
      })
      .catch((error) => {
        console.log(error);
        alert("등록 중 오류가 발생했습니다.");
      });
  };

  //파일 선택
  const handleFileSelect = (event) => {
    const selectedFileUrl = event.target.value;
    setSelectedFile(selectedFileUrl);
  };

  // 파일 삭제 핸들러
  const handleRemoveFile = async () => {
    dispatch(removeApplyAttFile(selectedFile));
  };

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
            defaultValue={apply && apply.pjApplyTtl}
            ref={pjApplyTtlRef}
          />
        </Section>

        <Section>
          <SectionHeader>
            <SectionNum>02</SectionNum>
            <SectionName>지원 내용</SectionName>
          </SectionHeader>
          <Textarea
            name="pjApplyDesc"
            defaultValue={apply && apply.pjApplyDesc}
            ref={pjApplyDescRef}
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

              <select id="fileSelect" onChange={handleFileSelect}>
                <option value="">파일을 선택하세요</option>
                {fileList.map((file) => (
                  <option key={file.pjApplyAttId} value={file.pjApplyAttId}>
                    {file.pjApplyAttUrl}
                  </option>
                ))}
              </select>

              <button
                id="removeButton"
                type="button"
                onClick={handleRemoveFile}
              >
                삭제
              </button>
            </div>
          </FileAttachment>
        </Section>

        <ImportantMessage>
          기획서, 요구사항 정의서, 참고 자료 등
        </ImportantMessage>
        <ButtonArea>
          <input
            onClick={saveButtonClickHandler}
            type="button"
            value={"저장하기"}
          ></input>
        </ButtonArea>

        <ButtonArea>
          <HiddenInput name="pjId" />
          <HiddenInput name="pjApplyId" />
          <HiddenInput name="emilAddr" />
        </ButtonArea>
      </ProjectRegisterArea>
    </ProjectRegisterPage>
  );
}
